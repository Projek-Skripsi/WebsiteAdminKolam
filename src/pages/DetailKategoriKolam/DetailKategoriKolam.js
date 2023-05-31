import React, { useState, useEffect } from 'react'
import { getDataKategoriKolam, putDataKategori } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './DetailKategoriKolam.module.css'
import { useParams } from 'react-router-dom'

const DetailKategoriKolam = () => {
  const { IdKategori } = useParams()
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [namaKategori, setNamaKategori] = useState('')
  const [hargaNormal, setHargaNormal] = useState('')
  const [hargaLibur, setHargaLibur] = useState('')

  async function getKategoriKolam () {
    const { data } = await getDataKategoriKolam(IdKategori)
    console.log(data[0])
    setNamaKategori(data[0].NamaKategori)
    setHargaNormal(data[0].HargaNormal)
    setHargaLibur(data[0].HargaLibur)
  }

  useEffect(() => {
    setLoading(true)
    getKategoriKolam()
    setLoading(false)
  }, [])

  async function simpanData (event) {
    event.preventDefault()
    const payload = {
      IdKategori,
      NamaKategori: namaKategori,
      HargaNormal: hargaNormal,
      HargaLibur: hargaLibur
    }
    setLoading(true)
    await putDataKategori({ ...payload })
    await getDataKategoriKolam()
    Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success')
    setReadOnly(!readOnly)
    setLoading(false)
  }

  return (
    <section>
      <Loading visible={loading} />
      <div className="page_title">Detail Kategori</div>

      <form onSubmit={simpanData} className={styles.form}>
        {/* Nama Kategori */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="namakategori" className="col-form-label">
              Nama Kategori
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              maxLength={10}
              id="namakategori"
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Harga Normal */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="harganormal" className="col-form-label">
              Harga Normal
            </label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              id="harganormal"
              step={500}
              min={0}
              disabled={readOnly}
              required
              className={cn(styles.input, 'form-control shadow-none')}
              value={hargaNormal}
              onChange={(e) => setHargaNormal(e.target.value)}
            />
          </div>
        </div>

        {/* Harga Libur */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="hargalibur" className="col-form-label">
              Harga Libur
            </label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              id="hargalibur"
              min={0}
              step={500}
              disabled={readOnly}
              required
              className={cn(styles.input, 'form-control shadow-none')}
              value={hargaLibur}
              onChange={(e) => setHargaLibur(e.target.value)}
            />
          </div>
        </div>

        <div className={cn(styles.button_group, 'justify-content-end')}>
          <button type='button' hidden={!readOnly} className={cn(styles.btn_edit, 'btn btn-outline-primary')} onClick={() => setReadOnly(!readOnly)} >
            Edit
          </button>
          <button type='submit' hidden={readOnly} className={cn(styles.btn_edit, 'btn btn-outline-primary')} >
            Simpan
          </button>
        </div>
      </form>
    </section>
  )
}

export default DetailKategoriKolam
