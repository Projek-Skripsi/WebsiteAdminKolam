/* eslint-disable no-unneeded-ternary */
import React, { useState, useEffect } from 'react'
import { getAllDataKolam, addKolam, putDataKolam, getAllDataKategoriKolam } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './Kolam.module.css'
import { Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const Kolam = () => {
  const [loading, setLoading] = useState(false)
  const [tambahKolam, setTambahKolam] = useState(false)
  const [kolam, setKolam] = useState([])
  const [kategoriKolam, setKategoriKolam] = useState([])
  const [namaKolam, setNamaKolam] = useState('')
  const [kategori, setKategori] = useState('')
  const [gambar, setGambar] = useState()

  async function getAllKolam () {
    const { data } = await getAllDataKolam()
    setKolam(data)
  }

  async function getAllKategoriKolam () {
    const { data } = await getAllDataKategoriKolam()
    setKategoriKolam(data)
  }

  useEffect(() => {
    setLoading(true)
    getAllKolam()
    getAllKategoriKolam()
    setLoading(false)
  }, [])

  function btnBatalHandler () {
    setTambahKolam(!tambahKolam)
    setNamaKolam('')
    setKategori('')
    setGambar('')
  }

  async function postKolam (event) {
    event.preventDefault()
    const payload = {
      Judul: namaKolam,
      IdKategori: kategori,
      Status: 'Tersedia'
    }
    setLoading(true)
    await addKolam(gambar, payload)
    await Swal.fire('Berhasil', 'Data berhasil ditambah', 'success')
    window.location.reload()
    setLoading(false)
  }

  async function changeStatus (IdKolam, status) {
    setLoading(true)
    const Status = status === true ? 'Tersedia' : 'Tidak Tersedia'
    await putDataKolam({ IdKolam, Status })
    await getAllKolam()
    setLoading(false)
  }

  return (
    <section id={styles.kolam}>
      <Loading visible={loading} />
      <div className="page_title">Data Kolam</div>
      {tambahKolam === false && (
        <button
          className={cn(styles.btn_tambah, 'btn btn-success')}
          onClick={() => setTambahKolam(!tambahKolam)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Kolam</span>
        </button>
      )}

      {tambahKolam && (
        <section id={styles.tambah_kolam}>
          <h5>Tambah Kolam</h5>
          <form onSubmit={postKolam} className="row align-items-center">
            <div className="col">
              <label className="col-form-label">Nama Kolam</label>
              <input
                type="text"
                maxLength={50}
                required
                className="form-control"
                value={namaKolam}
                onChange={(e) => setNamaKolam(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="kategori" className="col-form-label">
                Kategori
              </label>

              <select required value={kategori} onChange={(e) => setKategori(e.target.value)} className="form-select">
                <option value=''>Pilih Kategori</option>
                {kategoriKolam.map((item) => (
                  <option key={item.IdKategori} value={item.IdKategori}>{item.NamaKategori}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label htmlFor="gambar" className="col-form-label">
                Gambar
              </label>

              <div className="input-group">
                <input required type="file" accept='image/*' onChange={(e) => setGambar(e.target.files[0])} className="form-control" id="gambar" />
              </div>
            </div>
            <div className="d-flex mt-3 gap-2 align-items-center w-100 justify-content-end">
              <button type='button' className={cn(styles.btn_batal, 'btn btn-outline-secondary')} onClick={btnBatalHandler} >
                Batal
              </button>
              <button type='submit' className={cn(styles.btn_simpan, 'btn')}>Simpan</button>
            </div>
          </form>
        </section>
      )}

      {/* Table Data Kolam */}
      <table className="table text-center table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">Id Kolam</th>
            <th scope="col">Judul</th>
            <th scope="col">Kategori</th>
            <th scope="col">Gambar</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {kolam.map((item, index) => (
            <tr key={index}>
              <td>{item.IdKolam}</td>
              <td>
                <Link to={`/kolam/${item.IdKolam}`}>{item.Judul}</Link>
              </td>
              <td>{item.NamaKategori}</td>
              <td>
                <img src={item.UrlGambar} width={300} height={120} alt="Gambar Kolam" />
              </td>
              <td>
                <div className={styles.switch}>
                  <input
                    type="checkbox"
                    id={`toggle-btn-${item.IdKolam}`}
                    checked={item.Status === 'Tersedia' ? true : false}
                    onChange={(e) => changeStatus(item.IdKolam, e.target.checked)}
                  />
                  <label htmlFor={`toggle-btn-${item.IdKolam}`}></label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Kolam
