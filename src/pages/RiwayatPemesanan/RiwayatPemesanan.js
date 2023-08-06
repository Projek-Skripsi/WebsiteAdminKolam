import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDataPemesanan } from 'confiq/api'
import styles from './RiwayatPemesanan.module.css'
import cn from 'classnames'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import DetailRiwayat from 'components/DetailRiwayat/DetailRiwayat'
import moment from 'moment'
import { currencyFormat } from 'utils/utils'
import Searchbar from 'components/Searchbar/Searchbar'

export default function RiwayatPemesanan () {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPembayaran, setFilterPembayaran] = useState('')
  const [allPemesanan, setAllPemesanan] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const [periodeAwal, setPeriodeAwal] = useState('')
  const [periodeAkhir, setPeriodeAkhir] = useState('')
  const navigate = useNavigate()

  async function getAllPemesanan () {
    const { data } = await getAllDataPemesanan()
    setAllPemesanan(data)
    setDataFilter(data)
  }

  useEffect(() => {
    setLoading(true)
    getAllPemesanan()
    setLoading(false)
  }, [])

  function changeFilterStatus (e) {
    setFilterStatus(e.target.value)
    switch (e.target.value) {
      case '':
        if (filterPembayaran !== '') return setDataFilter(allPemesanan.filter((order) => { return order.NamaPembayaran === filterPembayaran }))
        return setDataFilter(allPemesanan)
      default:
        if (filterPembayaran !== '') return setDataFilter(allPemesanan.filter((order) => { return order.Status === e.target.value && order.NamaPembayaran === filterPembayaran }))
        return setDataFilter(allPemesanan.filter((order) => { return order.Status === e.target.value }))
    }
  }

  function changeFilterPembayaran (e) {
    setFilterPembayaran(e.target.value)
    switch (e.target.value) {
      case '':
        if (filterStatus !== '') return setDataFilter(allPemesanan.filter((order) => { return order.Status === filterStatus }))
        return setDataFilter(allPemesanan)
      default:
        if (filterStatus !== '') return setDataFilter(allPemesanan.filter((order) => { return order.NamaPembayaran === e.target.value && order.Status === filterStatus }))
        return setDataFilter(allPemesanan.filter((order) => { return order.NamaPembayaran === e.target.value }))
    }
  }

  const searchId = dataFilter.filter((order) => { return order.IdPemesanan.toString().toLowerCase().includes(keyword.toLocaleLowerCase()) })

  function EmptyData () {
    return (
      <tr>
        <td colSpan={5} className='text-secondary' >Data tidak ditemukan</td>
      </tr>
    )
  }

  function ShowData () {
    return (
      searchId.map((item, index) => (
        <tr key={index}>
          <td><DetailRiwayat item={item} /></td>
          <td>{moment(item.TanggalMasuk).format('DD MMM YYYY')}</td>
          <td>{currencyFormat(item.Total)}</td>
          <td>{item.NamaPembayaran}</td>
          <td>{item.Status}</td>
        </tr>
      ))
    )
  }

  function btnTampilLaporan (e) {
    e.preventDefault()
    navigate(`/riwayat/${moment(periodeAwal).format('YYYYMMDD')}-${moment(periodeAkhir).format('YYYYMMDD')}`)
  }

  return (
    <section id={styles.riwayat_pemesanan}>
        <Loading visible={loading} />
        <div className="page_title">Riwayat Pemesanan</div>
        <div className={styles.buat_laporan}>
            <h5 className="mb-4">Buat Laporan</h5>
            <form onSubmit={btnTampilLaporan} className="row align-items-center justify-content-between">
              <div className="col-8 d-flex align-items-center">
                <label className="col-form-label me-3">Periode</label>
                <input required type="date" max={periodeAkhir} className="form-control py-3" onChange={(e) => setPeriodeAwal(e.target.value)} />
                <span className="mx-2">-</span>
                <input required type="date" min={periodeAwal} className="form-control py-3" onChange={(e) => setPeriodeAkhir(e.target.value)} />
              </div>
              <div className="col-auto">
                <button type='submit' className={cn(styles.btn_laporan, 'btn py-3 px-4')}>
                  Tampilkan Laporan
                </button>
              </div>
            </form>
        </div>

        <div className="mb-3 row justify-content-between align-items-center mt-4">
          <div className="col-auto">
            <Searchbar keyword={keyword} keywordChange={setKeyword} />
          </div>
          <div className="col-auto d-flex gap-2 align-items-center">
            <label htmlFor="status" className={cn(styles.label_filter, 'col-form-label w-100')} >Filter berdasarkan</label>
            <select value={filterStatus} onChange={(e) => changeFilterStatus(e)} className={cn(styles.filter_select, 'form-select shadow-none')}>
              <option value=''>Semua Status</option>
              <option value='Menunggu Pembayaran'>Menunggu Pembayaran</option>
              <option value='Menunggu Konfirmasi'>Menunggu Konfirmasi</option>
              <option value='Berhasil'>Berhasil</option>
              <option value='Selesai'>Selesai</option>
              <option value='Batal'>Batal</option>
            </select>
            <select value={filterPembayaran} onChange={(e) => changeFilterPembayaran(e)} className={cn(styles.filter_select, 'form-select shadow-none')}>
              <option value=''>Semua Pembayaran</option>
              <option value='Gopay'>Gopay</option>
              <option value='Bank Mandiri'>Bank Mandiri</option>
              <option value='OVO'>OVO</option>
            </select>
          </div>
        </div>

        {/* Tabel Riwayat Pemesanan */}
        <div className={styles.tableContainer}>
          <table className="table text-center align-middle table-responsive">
              <thead className={styles.thead}>
                  <tr>
                      <th scope="col">Id Pemesanan</th>
                      <th scope="col">Tanggal Masuk</th>
                      <th scope="col">Total</th>
                      <th scope="col">Metode Pembayaran</th>
                      <th scope="col">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {searchId.length !== 0 ? <ShowData /> : <EmptyData /> }
              </tbody>
          </table>
        </div>
    </section>
  )
}
