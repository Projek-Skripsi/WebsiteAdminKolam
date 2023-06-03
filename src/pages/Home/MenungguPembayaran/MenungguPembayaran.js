import React from 'react'
import styles from './MenungguPembayaran.module.css'
import { currencyFormat } from 'utils/utils'
import DetailRiwayat from 'components/DetailRiwayat/DetailRiwayat'
import moment from 'moment'

export default function MenungguPembayaran ({ data, changeStatus }) {
  const dataTungguBayar = data.filter((order) => order.Status !== 'Selesai')

  function EmptyData () {
    return (
      <tr>
        <td colSpan={6} className='text-secondary' >Data tidak ditemukan</td>
      </tr>
    )
  }

  function ShowData () {
    return (
      dataTungguBayar.map((item) => (
        <tr key={item.IdPemesanan}>
          <td><DetailRiwayat item={item} /></td>
          <td>{moment(item.TanggalMasuk).format('DD MMM YYYY')}</td>
          <td>{currencyFormat(item.Total)}</td>
          <td>
            <button className="btn btn-outline-danger" onClick={() => changeStatus(item.IdPemesanan, 'Batal')}>
              Batalkan Pemesanan
            </button>
          </td>
        </tr>
      ))
    )
  }

  return (
    <section id={styles.menunggu_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Menunggu Pembayaran</div>
        <div className={styles.count}>{dataTungguBayar.length}</div>
      </div>

      {/* Table Menunggu Pembayaran */}
      <div className={styles.tableContainer}>
        <table class="table text-center align-middle table-responsive">
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Id Pemesanan</th>
              <th scope="col">Tanggal berenang</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {dataTungguBayar.length !== 0 ? <ShowData /> : <EmptyData />}
          </tbody>
        </table>
      </div>
    </section>
  )
}
