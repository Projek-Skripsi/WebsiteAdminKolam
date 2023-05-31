import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDataKolam, putDataKolam, uploadGambarKolam, deleteKolam, getAllDataKategoriKolam } from '../../confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './DetailKolam.module.css'
import { FiEdit2 } from 'react-icons/fi'

const DetailKolam = () => {
  const { IdKolam } = useParams()
  const [kategoriKolam, setKategoriKolam] = useState([])
  const [namaKolam, setNamaKolam] = useState('')
  const [kategori, setKategori] = useState('')
  const [gambar, setGambar] = useState('')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const navigate = useNavigate()
  const avatar = useRef()

  async function getAllKategoriKolam () {
    const { data } = await getAllDataKategoriKolam()
    setKategoriKolam(data)
  }

  async function getKolam () {
    const { data } = await getDataKolam(IdKolam)
    setNamaKolam(data[0].Judul)
    setKategori(data[0].IdKategori)
    setGambar(data[0].UrlGambar)
  }

  useEffect(() => {
    setLoading(true)
    getAllKategoriKolam()
    getKolam()
    setLoading(false)
  }, [])

  async function uploadGambar (e) {
    setLoading(true)
    const file = e.target.files[0]
    const { error } = await uploadGambarKolam(file, IdKolam)
    if (!error) { window.location.reload() }
    setLoading(false)
  }

  async function simpanData (e) {
    e.preventDefault()
    setLoading(true)
    await putDataKolam({ IdKolam, Judul: namaKolam, IdKategori: kategori })
    Swal.fire('Berhasil', 'Data berhasil disimpan', 'success')
    setReadOnly(!readOnly)
    setLoading(false)
  }

  function hapusData () {
    Swal.fire({
      title: 'Perhatian',
      text: 'Yakin ingin menghapus data kolam renang ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#106AF0',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Yakin'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        await deleteKolam(IdKolam)
        Swal.fire('Berhasil', 'Data berhasil dihapus', 'success')
        navigate('/kolam')
        setLoading(false)
      }
    })
  }

  return (
    <section>
      <Loading visible={loading} />
      <div className="page_title">Detail Kolam</div>

      <form onSubmit={simpanData} className={styles.form}>
        {/* Nama Kolam */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-6">
            <label htmlFor="namaKolam" className="col-form-label">
              Nama Kolam
            </label>
          </div>
          <div className="col-6 p-0">
            <input
              type="text"
              maxLength={50}
              disabled={readOnly}
              required
              id="namaKolam"
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaKolam}
              onChange={(e) => setNamaKolam(e.target.value)}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-6">
            <label htmlFor="kategori" className="col-form-label">
              Kategori
            </label>
          </div>
          <div className="col-6 p-0">
            <select required disabled={readOnly} value={kategori} className={cn(styles.select, 'form-select')} onChange={(e) => setKategori(e.target.value)} >
              {kategoriKolam.map((item) => (
                <option key={item.IdKategori} value={item.IdKategori}>{item.NamaKategori}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gambar */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-6">
            <label htmlFor="gambar" className="col-form-label">
              Gambar
            </label>
          </div>
          <div className="col-6 position-relative p-0">
            <img src={gambar} alt="Gambar Kolam" className={cn(styles.gambar, 'img-fluid')} />
            <button type='button' hidden={readOnly} className={styles.btnEditGambar} onClick={() => avatar.current.click()} >Ganti Gambar <FiEdit2 /></button>
            <input ref={avatar} type='file' hidden accept='image/*' onChange={uploadGambar} />
          </div>
        </div>
        <div className={cn(styles.button_group, 'justify-content-end')}>
          <button hidden={readOnly} type='button' className={cn(styles.btn_hapus, 'btn btn-outline-danger')} onClick={hapusData} >
            Hapus
          </button>
          <button hidden={readOnly} type='submit' className={cn(styles.btn_edit, 'btn btn-outline-primary')}>
            Simpan
          </button>
          <button hidden={!readOnly} type='button' className={cn(styles.btn_edit, 'btn btn-outline-primary')} onClick={() => setReadOnly(!readOnly)} >
            Edit
          </button>
        </div>
      </form>
    </section>
  )
}

export default DetailKolam
