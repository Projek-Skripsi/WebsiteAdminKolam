import React from 'react'
import { deleteKonfirmasiPembayaran } from 'confiq/api'
import styles from './KonfirmasiPembayaran.module.css'
import DetailRiwayat from 'components/DetailRiwayat/DetailRiwayat'
import moment from 'moment'
import Swal from 'sweetalert2'
import { currencyFormat } from 'utils/utils'

export default function KonfirmasiPembayaran ({ data, changeStatus }) {
  const dataKonfirmasi = data.filter((order) => order.Status !== 'Selesai')

  async function btnTerimaHandler (IdPemesanan, newStatus) {
    Swal.fire({
      title: 'Perhatian',
      text: 'Terima bukti Pembayaran dan tuntaskan pemesanan ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#106AF0',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Ya'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await changeStatus(IdPemesanan, newStatus)
      }
    })
  }

  async function btnTolakHandler (IdPemesanan, newStatus) {
    Swal.fire({
      title: 'Perhatian',
      text: 'Tolak bukti Pembayaran dan minta pengunjung mengupload bukti yang baru?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#106AF0',
      cancelButtonText: 'Tidak',
      confirmButtonText: 'Ya'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteKonfirmasiPembayaran(IdPemesanan)
        await changeStatus(IdPemesanan, newStatus)
      }
    })
  }

  function EmptyData () {
    return (
      <tr>
        <td colSpan={6} className='text-secondary' >Data tidak ditemukan</td>
      </tr>
    )
  }

  function ShowData () {
    return (
      dataKonfirmasi.map((item) => (
        <tr key={item.IdPemesanan}>
          <td><DetailRiwayat item={item} /></td>
          <td>{moment(item.TanggalMasuk).format('DD MMM YYYY')}</td>
          <td>{currencyFormat(item.Total)}</td>
          <td>{item.NamaPembayaran}</td>
          <td>
            <img src={item.UrlBuktiBayar} style={{ cursor: 'pointer' }} width={100} height={100} alt="Gambar Bukti Bayar" data-bs-toggle='modal' data-bs-target={`#showImg${item.IdPemesanan}`} />
            {/* MODAL SHOW IMG */}
            <div class="modal fade" id={`showImg${item.IdPemesanan}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                    <img src={item.UrlBuktiBayar} alt="Gambar Bukti Bayar" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex flex-column'>
              <button className="btn btn-outline-success mb-2" onClick={() => btnTerimaHandler(item.IdPemesanan, 'Berhasil')}>
                Terima
              </button>
              <button className="btn btn-outline-danger" onClick={() => btnTolakHandler(item.IdPemesanan, 'Menunggu Pembayaran')}>
                Tolak
              </button>
            </div>
          </td>
        </tr>
      ))
    )
  }

  return (
    <section id={styles.konfirmasi_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Konfirmasi Pembayaran</div>
        <div className={styles.count}>{dataKonfirmasi.length}</div>
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
            {dataKonfirmasi.length !== 0 ? <ShowData /> : <EmptyData />}
          </tbody>
        </table>
      </div>
    </section>
  )
}
