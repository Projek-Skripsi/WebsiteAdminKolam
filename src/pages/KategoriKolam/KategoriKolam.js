import React, { useState } from 'react'
import styles from './KategoriKolam.module.css'
import cn from 'classnames'
import kategori from 'mocks/kategori'
import { Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const KategoriKolam = () => {
  const [tambahKategori, setTambahKategori] = useState(false)
  const [namaKategori, setNamaKategori] = useState('')
  const [hargaNormal, setHargaNormal] = useState('')
  const [hargaLibur, setHargaLibur] = useState('')

  return (
    <section className={styles.kategori_kolam}>
      <div className="page_title">Carousel</div>
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
          <div className="row align-items-center mb-3">
            <div className="col">
              <label className="col-form-label">Kategori</label>
              <input
                type="text"
                className="form-control"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Harga Normal</label>
              <input
                type="text"
                className="form-control"
                value={hargaNormal}
                onChange={(e) => setHargaNormal(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Harga Libur</label>
              <input
                type="text"
                className="form-control"
                value={hargaLibur}
                onChange={(e) => setHargaLibur(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center w-100 justify-content-end">
            <button
              className={cn(styles.btn_batal, 'btn btn-outline-secondary')}
              onClick={() => setTambahKategori(!tambahKategori)}
            >
              Batal
            </button>
            <button className={cn(styles.btn_simpan, 'btn')}>Simpan</button>
          </div>
        </section>
      )}

      {/* Table Kategori */}
      <table className="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Kategori</th>
            <th scope="col">Harga Normal</th>
            <th scope="col">Harga Libur</th>
          </tr>
        </thead>
        <tbody>
          {kategori.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link to={`/kategori-kolam/${item.id}`}>{item.kategori}</Link>
              </td>
              <td>{item.hargaNormal}</td>
              <td>{item.hargaLibur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default KategoriKolam
