import React from 'react'
import styles from './DetailRiwayat.module.css'
import moment from 'moment'
import { currencyFormat } from 'utils/utils'
import { CgCloseO } from 'react-icons/cg'

export default function DetailRiwayat ({ item }) {
  function LabelStatus ({ status }) {
    switch (status) {
      case 'Menunggu Pembayaran':
        return <p className={styles.Label} style={{ backgroundColor: '#75B2D4' }} >Menunggu Pembayaran</p>
      case 'Menunggu Konfirmasi':
        return <p className={styles.Label} style={{ backgroundColor: '#ECC995' }} >Menunggu Konfirmasi</p>
      case 'Berhasil':
        return <p className={styles.Label} style={{ backgroundColor: '#75DB7F' }} >Berhasil</p>
      case 'Selesai':
        return <p className={styles.Label} style={{ backgroundColor: '#1CAAFA', color: 'white' }} >Selesai</p>
      case 'Batal':
        return <p className={styles.Label} style={{ backgroundColor: '#EA7D7D' }} >Batal</p>
      default:
        break
    }
  }

  return (
    <>
        <p className={styles.MainId} data-bs-toggle='modal' data-bs-target={`#detail${item.IdPemesanan}`} >#{item.IdPemesanan}</p>

        {/* MODAL DETAIL */}
        <div class="modal fade" id={`detail${item.IdPemesanan}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content p-3">
                <div className={styles.ModalHeader} >
                    <h2>Riwayat Pemesanan</h2>
                    <CgCloseO data-bs-dismiss='modal' style={{ fontSize: '25px', color: 'red', cursor: 'pointer' }} />
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className={styles.Id}>#{item.IdPemesanan}</p>
                    <LabelStatus status={item.Status} />
                </div>
                <div className='mb-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className={styles.ModalTitle}>Tanggal Pemesanan</p>
                        <p className={styles.ModalText}>{moment(item.TanggalPemesanan).format('DD MMM YYYY (hh:mm:ss)')}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className={styles.ModalTitle}>Tanggal Berenang</p>
                        <p className={styles.ModalText}>{moment(item.TanggalMasuk).format('DD MMM YYYY')}</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <p className={styles.ModalTitle}>Metode Pembayaran</p>
                    <p className={styles.ModalText}>{item.NamaPembayaran}</p>
                </div>
                <div className='mb-3'>
                    <p className={styles.ModalTitle} style={{ textAlign: 'left' }} >Tiket</p>
                    {item.detail.map((detail, index) => (
                        <div key={index} className='d-flex justify-content-between ms-2'>
                            <p className={styles.ModalText}>Tiket {detail.NamaKategori} = {detail.Qty} x {currencyFormat(detail.Harga)}</p>
                            <p className={styles.ModalText}>{currencyFormat(detail.Qty * detail.Harga)}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.ModalFooter}>
                    <p className={styles.ModalFooterText}>Total</p>
                    <p className={styles.ModalFooterText}>{currencyFormat(item.Total)}</p>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}
