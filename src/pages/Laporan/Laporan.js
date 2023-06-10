import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Laporan.module.css'
import cn from 'classnames'
import { getDataPerusahaan, getDataTabelLaporan, getDataQtyKategori } from 'confiq/api'
import ReactToPrint from 'react-to-print'
import Loading from 'components/Loading/Loading'
import moment from 'moment'
import { currencyFormat } from 'utils/utils'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Laporan () {
  const { periode } = useParams()
  const periodeAwal = periode.slice(0, 8)
  const periodeAkhir = periode.slice(9)
  const [loading, setLoading] = useState(false)
  const [dataPerusahaan, setDataPerusahaan] = useState([])
  const [dataTabel, setDataTabel] = useState([])
  const [dataQty, setDataQty] = useState([])
  const componentRef = useRef()

  async function getPerusahaan () {
    const { data } = await getDataPerusahaan()
    setDataPerusahaan(data[0])
  }

  async function getLaporan () {
    const { data } = await getDataTabelLaporan({ periodeAwal, periodeAkhir })
    setDataTabel(data)
  }

  async function getQtyKategori () {
    const { data } = await getDataQtyKategori({ periodeAwal, periodeAkhir })
    setDataQty(data)
  }

  useEffect(() => {
    setLoading(true)
    getPerusahaan()
    getLaporan()
    getQtyKategori()
    setLoading(false)
  }, [])

  function EmptyData () {
    return (
      <tr>
        <td colSpan={8} className='text-secondary' >Data tidak ditemukan</td>
      </tr>
    )
  }

  function ShowData () {
    return (
      dataTabel.map((item, index) => (
        <tr key={item.IdPemesanan}>
          <td>{index + 1}</td>
          <td>{item.IdPemesanan}</td>
          <td>{moment(item.TanggalPemesanan).format('DD MMM YYYY (hh:mm:ss)')}</td>
          <td>{moment(item.TanggalMasuk).format('DD MMM YYYY')}</td>
          <td>{item.TotalQty}</td>
          <td>{currencyFormat(item.Total)}</td>
          <td>{item.NamaPembayaran}</td>
          <td>{item.Status}</td>
          <td></td>
        </tr>
      ))
    )
  }

  return (
    <div>
      <Loading visible={loading} />
      <ReactToPrint
        trigger={() => <button className={styles.BtnPrint}>Print/Download</button>}
        content={() => componentRef.current}
        documentTitle={`Laporan ${moment(periodeAwal).format('DD MMM YYYY')} sampai ${moment(periodeAkhir).format('DD MMM YYYY')}`}
      />
      <div ref={componentRef} className='p-5'>
        <div className='text-center ms-2'>
          <h2 className={styles.NamaKolam}>{dataPerusahaan.NamaPerusahaan}</h2>
          <p className={cn(styles.AlamatKolam, 'mt-3 mb-1')}>{dataPerusahaan.Alamat}</p>
          <div className='d-flex justify-content-center'>
            <p className={styles.Kontak}><FiMail /> {dataPerusahaan.Email}</p>
            <p className={cn(styles.Kontak, styles.Border)}><FaWhatsapp /> {dataPerusahaan.NoWA}</p>
            <p className={styles.Kontak}><FaInstagram /> {dataPerusahaan.Instagram}</p>
          </div>
        </div>
        <div className='my-4'>
          <table class="table text-center align-middle table-responsive">
            <thead>
              <tr className='align-middle'>
                <th scope="col">No</th>
                <th scope="col">Id Pemesanan</th>
                <th scope="col">Tanggal Pemesanan</th>
                <th scope="col">Tanggal Berenang</th>
                <th scope="col">Qty</th>
                <th scope="col">Total</th>
                <th scope="col">Pembayaran</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataTabel.length !== 0 ? <ShowData /> : <EmptyData />}
              <tr className='fw-bold'>
                <td colSpan={4}>Jumlah</td>
                <td>{dataTabel.reduce((x, y) => x + y.TotalQty, 0)}</td>
                <td>{currencyFormat(dataTabel.reduce((x, y) => x + y.Total, 0))}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          {dataQty.map((item, index) => (
            <div key={index} className='d-flex justify-content-end text-secondary gap-1'>
              <p className='m-0'>Tiket {item.NamaKategori} =</p>
              <p className='m-0'>{item.Total ? item.Total : 0}</p>
            </div>
          ))}
          <div className='d-flex justify-content-end text-secondary gap-1 mt-2'>
            <p className='m-0'>Pendapatan Bersih =</p>
            <p className='m-0'>{currencyFormat(dataTabel.filter((order) => order.Status === 'Selesai' || order.Status === 'Berhasil').reduce((x, y) => x + y.Total, 0))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
