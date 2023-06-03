import React, { useState, useEffect } from 'react'
import { getAllDataKategoriKolam, addKategori } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import styles from './KategoriKolam.module.css'
import cn from 'classnames'
import { currencyFormat } from 'utils/utils'
import { Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const KategoriKolam = () => {
  const [loading, setLoading] = useState(false)
  const [tambahKategori, setTambahKategori] = useState(false)
  const [data, setData] = useState([])
  const [namaKategori, setNamaKategori] = useState('')
  const [hargaNormal, setHargaNormal] = useState('')
  const [hargaLibur, setHargaLibur] = useState('')

  async function getAllKategoriKolam () {
    const { data } = await getAllDataKategoriKolam()
    setData(data)
  }

  useEffect(() => {
    setLoading(true)
    getAllKategoriKolam()
    setLoading(false)
  }, [])

  function btnBatalHandler () {
    setTambahKategori(!tambahKategori)
    setNamaKategori('')
    setHargaNormal('')
    setHargaLibur('')
  }

  async function postKategori (event) {
    event.preventDefault()
    const payload = {
      NamaKategori: namaKategori,
      HargaNormal: hargaNormal,
      HargaLibur: hargaLibur
    }
    setLoading(true)
    await addKategori(payload)
    await Swal.fire('Berhasil', 'Data berhasil ditambah', 'success')
    window.location.reload()
    setLoading(false)
  }

  return (
    <section className={styles.kategori_kolam}>
      <Loading visible={loading} />
      <div className="page_title">Kategori Kolam</div>
      {tambahKategori === false && (
        <button
          className={cn(styles.btn_tambah, 'btn btn-success')}
          onClick={() => setTambahKategori(!tambahKategori)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Kategori</span>
        </button>
      )}

      {tambahKategori && (
        <section id={styles.tambah_kategori}>
          <h5>Tambah Kategori</h5>
          <form onSubmit={postKategori} className="row align-items-center">
            <div className="col">
              <label className="col-form-label">Kategori</label>
              <input
                type="text"
                maxLength={10}
                required
                className="form-control"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Harga Normal</label>
              <input
                type="number"
                step={500}
                required
                min={0}
                className="form-control"
                value={hargaNormal}
                onChange={(e) => setHargaNormal(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Harga Libur</label>
              <input
                type="number"
                step={500}
                min={0}
                required
                className="form-control"
                value={hargaLibur}
                onChange={(e) => setHargaLibur(e.target.value)}
              />
            </div>
            <div className="d-flex mt-3 gap-2 align-items-center w-100 justify-content-end">
              <button
                type='button'
                className={cn(styles.btn_batal, 'btn btn-outline-secondary')}
                onClick={btnBatalHandler}
              >
                Batal
              </button>
              <button type='submit' className={cn(styles.btn_simpan, 'btn')}>Simpan</button>
            </div>
          </form>
        </section>
      )}

      {/* Table Kategori */}
      <table className="table text-center table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">Id Kategori</th>
            <th scope="col">Nama Kategori</th>
            <th scope="col">Harga Normal</th>
            <th scope="col">Harga Libur</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.IdKategori}</td>
              <td>
                <Link to={`/kategori/${item.IdKategori}`}>{item.NamaKategori}</Link>
              </td>
              <td>{currencyFormat(item.HargaNormal)}</td>
              <td>{currencyFormat(item.HargaLibur)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default KategoriKolam
