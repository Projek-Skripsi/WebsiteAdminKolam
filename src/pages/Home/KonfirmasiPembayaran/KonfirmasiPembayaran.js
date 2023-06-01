import React from 'react'
import konfirmasi from 'mocks/konfirmasi'
import styles from './KonfirmasiPembayaran.module.css'
import { currencyFormat } from 'utils/utils'

export default function KonfirmasiPembayaran () {
  const clonedKonfirmasi = Array(4).fill(konfirmasi).flat()
  const count = clonedKonfirmasi.length

  return (
    <section id={styles.konfirmasi_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Konfirmasi Pembayaran</div>
        <div className={styles.count}>{count}</div>
      </div>

      {/* Table Konfirmasi Pembayaran */}
      <div className={styles.tableContainer}>
        <table class="table text-center align-middle table-responsive">
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Id Pemesanan</th>
              <th scope="col">Tanggal berenang</th>
              <th scope="col">Total</th>
              <th scope="col">Metode pembayaran</th>
              <th scope="col">Bukti pembayaran</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {clonedKonfirmasi.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.tanggal_berenang}</td>
                <td>{currencyFormat(item.jumlah_bayar)}</td>
                <td>{item.metode_pembayaran}</td>
                <td>
                  <img src={item.bukti_pembayaran} style={{ cursor: 'pointer' }} width={100} height={100} alt="bukti_pembayaran" data-bs-toggle='modal' data-bs-target={`#showImg${item.id}`} />
                  {/* MODAL SHOW IMG */}
                  <div class="modal fade" id={`showImg${item.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                      <div class="modal-content">
                          <img src={item.bukti_pembayaran} alt="bukti_pembayaran" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex flex-column'>
                    <button className="btn btn-outline-success mb-2">
                      Terima
                    </button>
                    <button className="btn btn-outline-danger">
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
