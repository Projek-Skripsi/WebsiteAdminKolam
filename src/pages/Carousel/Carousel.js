import React, { useState, useEffect } from 'react'
import { getAllDataCarousel, addCarousel, deleteCarousel } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './Carousel.module.css'
import { Plus, Trash } from '@phosphor-icons/react'

const Carousel = () => {
  const [loading, setLoading] = useState(false)
  const [tambahCarousel, setTambahCarousel] = useState(false)
  const [data, setData] = useState([])
  const [gambar, setGambar] = useState()

  async function getAllCarousel () {
    const { data } = await getAllDataCarousel()
    setData(data)
  }

  useEffect(() => {
    setLoading(true)
    getAllCarousel()
    setLoading(false)
  }, [])

  function btnBatalHandler () {
    setTambahCarousel(!tambahCarousel)
    setGambar('')
  }

  async function postCarousel (event) {
    event.preventDefault()
    setLoading(true)
    await addCarousel(gambar)
    await Swal.fire('Berhasil', 'Data berhasil ditambah', 'success')
    window.location.reload()
    setLoading(false)
  }

  function hapusData (IdCarousel) {
    Swal.fire({
      title: 'Perhatian',
      text: 'Yakin ingin menghapus gambar carousel ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#106AF0',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Yakin'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        await deleteCarousel(IdCarousel)
        await getAllCarousel()
        Swal.fire('Berhasil', 'Gambar carousel berhasil dihapus', 'success')
        setLoading(false)
      }
    })
  }

  return (
    <section id={styles.carousel}>
      <Loading visible={loading} />
      <div className="page_title">Carousel</div>
      {tambahCarousel === false && (
        <button
          className={cn(styles.btn_tambah, 'btn btn-success')}
          onClick={() => setTambahCarousel(!tambahCarousel)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Carousel</span>
        </button>
      )}

      {tambahCarousel && (
        <section id={styles.tambah_carousel}>
          <h5>Tambah Carousel</h5>
          <form onSubmit={postCarousel} className="row align-items-center mb-3">
            <div className="col-auto">
              <label htmlFor="gambar" className="col-form-label">Gambar</label>
              <div className="input-group">
                <input required type="file" accept='image/*' onChange={(e) => setGambar(e.target.files[0])} className="form-control" id="gambar" />
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center w-100 justify-content-end">
              <button type='button' className={cn(styles.btn_batal, 'btn btn-outline-secondary')} onClick={btnBatalHandler} >
                Batal
              </button>
              <button type='submit' className={cn(styles.btn_simpan, 'btn')}>Simpan</button>
            </div>
          </form>
        </section>
      )}

      {/* Table Carousel */}
      <table className="table text-center table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">Id Carousel</th>
            <th scope="col">Gambar Carousel</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.IdCarousel}>
              <td>{item.IdCarousel}</td>
              <td>
                <img src={item.UrlGambar} width={300} height={120} alt="carousel" />
              </td>
              <td>
                <button className="btn btn-outline-danger" onClick={() => hapusData(item.IdCarousel)}><Trash size={32} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Carousel
