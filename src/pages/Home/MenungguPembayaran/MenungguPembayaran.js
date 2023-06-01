import React from 'react'
import styles from './MenungguPembayaran.module.css'
import { currencyFormat } from 'utils/utils'
import menungguPembayaran from 'mocks/menunggupembayaran'

export default function MenungguPembayaran () {
  const clonedData = Array(4).fill(menungguPembayaran).flat()
  const count = clonedData.length

  return (
    <section id={styles.menunggu_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Menunggu Pembayaran</div>
        <div className={styles.count}>{count}</div>
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
            {clonedData.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.tanggal_berenang}</td>
                <td>{currencyFormat(item.jumlah_bayar)}</td>
                <td>
                  <button className="btn btn-outline-danger">
                    Batalkan Pemesanan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
