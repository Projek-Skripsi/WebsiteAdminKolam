import React, { useState } from 'react'
import cn from 'classnames'
import styles from './MetodePembayaran.module.css'
import metodepembayaran from 'mocks/metodepembayaran'
import { Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const MetodePembayaran = () => {
  const [tambahPembayaran, setTambahPembayaran] = useState(false)
  const [namaPembayaran, setNamaPembayaran] = useState('')
  const [nomorRekening, setNomorRekening] = useState('')
  const [atasNama, setAtasNama] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <section id={styles.metode_pembayaran}>
      <div className="page_title">Metode Pembayaran</div>
      {tambahPembayaran === false && (
        <button
          className={cn(styles.btn_tambah, 'btn btn-success')}
          onClick={() => setTambahPembayaran(!tambahPembayaran)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Metode Pembayaran</span>
        </button>
      )}

      {tambahPembayaran && (
        <section id={styles.tambah_pembayaran}>
          <h5>Tambah Metode Pembayaran</h5>
          <div className="row align-items-center mb-3">
            <div className="col">
              <label className="col-form-label">Nama Kolam</label>
              <input
                type="text"
                className="form-control"
                value={namaPembayaran}
                onChange={(e) => setNamaPembayaran(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Nomor Rekening</label>
              <input
                type="text"
                className="form-control"
                value={nomorRekening}
                onChange={(e) => setNomorRekening(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">A/N</label>
              <input
                type="text"
                className="form-control"
                value={atasNama}
                onChange={(e) => setAtasNama(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center w-100 justify-content-end">
            <button
              className={cn(styles.btn_batal, 'btn btn-outline-secondary')}
              onClick={() => setTambahPembayaran(false)}
            >
              Batal
            </button>
            <button className={cn(styles.btn_simpan, 'btn')}>Simpan</button>
          </div>
        </section>
      )}

      {/* Table Metode Pembayaran */}
      <table className="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Metode Pembayaran</th>
            <th scope="col">Nomor Rekening</th>
            <th scope="col">A/N</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {metodepembayaran.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link to={`/metode-pembayaran/${item.id}`}>{item.nama}</Link>
              </td>
              <td>{item.no_rek}</td>
              <td>{item.nama_pemilik}</td>
              <td>
                <div className={styles.switch}>
                  <input
                    type="checkbox"
                    id={`toggle-btn-${index}`}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <label htmlFor={`toggle-btn-${index}`}></label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MetodePembayaran
