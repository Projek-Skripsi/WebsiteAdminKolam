import React, { useState, useEffect } from 'react'
import { getAllDataPembayaran, addPembayaran, putDataPembayaran } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './MetodePembayaran.module.css'
import { Plus } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const MetodePembayaran = () => {
  const [loading, setLoading] = useState(false)
  const [tambahPembayaran, setTambahPembayaran] = useState(false)
  const [data, setData] = useState([])
  const [namaPembayaran, setNamaPembayaran] = useState('')
  const [nomorRekening, setNomorRekening] = useState('')
  const [atasNama, setAtasNama] = useState('')

  async function getAllPembayaran () {
    const { data } = await getAllDataPembayaran()
    setData(data)
  }

  useEffect(() => {
    setLoading(true)
    getAllPembayaran()
    setLoading(false)
  }, [])

  function btnBatalHandler () {
    setTambahPembayaran(!tambahPembayaran)
    setNamaPembayaran('')
    setNomorRekening('')
    setAtasNama('')
  }

  async function postPembayaran (event) {
    event.preventDefault()
    const payload = {
      NamaPembayaran: namaPembayaran,
      NoRekening: nomorRekening,
      An: atasNama,
      Status: 'Aktif'
    }
    setLoading(true)
    await addPembayaran(payload)
    await Swal.fire('Berhasil', 'Data berhasil ditambah', 'success')
    window.location.reload()
    setLoading(false)
  }

  async function changeStatus (IdPembayaran, status) {
    setLoading(true)
    const Status = status === true ? 'Aktif' : 'Tidak Aktif'
    await putDataPembayaran({ IdPembayaran, Status })
    await getAllPembayaran()
    setLoading(false)
  }

  return (
    <section id={styles.metode_pembayaran}>
      <Loading visible={loading} />
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
          <form onSubmit={postPembayaran} className="row align-items-center">
            <div className="col">
              <label className="col-form-label">Nama Pembayaran</label>
              <input
                type="text"
                maxLength={255}
                required
                className="form-control"
                value={namaPembayaran}
                onChange={(e) => setNamaPembayaran(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">Nomor Rekening</label>
              <input
                type="text"
                maxLength={20}
                required
                className="form-control"
                value={nomorRekening}
                onChange={(e) => setNomorRekening(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="col-form-label">A/N</label>
              <input
                type="text"
                maxLength={30}
                required
                className="form-control"
                value={atasNama}
                onChange={(e) => setAtasNama(e.target.value)}
              />
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

      {/* Table Metode Pembayaran */}
      <table className="table text-center table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">Id Pembayaran</th>
            <th scope="col">Metode Pembayaran</th>
            <th scope="col">Nomor Rekening</th>
            <th scope="col">A/N</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.IdPembayaran}>
              <td>{item.IdPembayaran}</td>
              <td>
                <Link to={`/pembayaran/${item.IdPembayaran}`}>{item.NamaPembayaran}</Link>
              </td>
              <td>{item.NoRekening}</td>
              <td>{item.An}</td>
              <td>
                <div className={styles.switch}>
                  <input
                    type="checkbox"
                    id={`toggle-btn-${item.IdPembayaran}`}
                    checked={item.Status === 'Aktif' ? true : false}
                    onChange={(e) => changeStatus(item.IdPembayaran, e.target.checked)}
                  />
                  <label htmlFor={`toggle-btn-${item.IdPembayaran}`}></label>
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
