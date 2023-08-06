import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Laporan.module.css'
import cn from 'classnames'
import { getDataPerusahaan, getDataTabelLaporan, getDataQtyKategori, getDataTotalPendapatan } from 'confiq/api'
import ReactToPrint from 'react-to-print'
import Loading from 'components/Loading/Loading'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { currencyFormat } from 'utils/utils'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export default function Laporan () {
  const { periode } = useParams()
  const periodeAwal = periode.slice(0, 8)
  const periodeAkhir = periode.slice(9)
  const [loading, setLoading] = useState(false)
  const [dataPerusahaan, setDataPerusahaan] = useState([])
  const [chartBar, setChartBar] = useState()
  const [dataQty, setDataQty] = useState([])
  const [dataPendapatan, setDataPendapatan] = useState([])
  const componentRef = useRef()

  async function getPerusahaan () {
    const { data } = await getDataPerusahaan()
    setDataPerusahaan(data[0])
  }

  async function getLaporan () {
    const { data } = await getDataTabelLaporan({ periodeAwal, periodeAkhir })
    if (data) {
      setChartBar({
        labels: data.map((item) => moment(item.TanggalMasuk).format('DD MMM YYYY')),
        datasets: [
          {
            label: 'Anak-Anak',
            data: data.map((item) => item.Anak)
          },
          {
            label: 'dewasa',
            data: data.map((item) => item.Dewasa)
          }
        ]
      })
      console.log(chartBar)
    }
  }

  async function getQtyKategori () {
    const { data } = await getDataQtyKategori({ periodeAwal, periodeAkhir })
    setDataQty(data)
  }

  async function getTotalPendapatan () {
    const { data } = await getDataTotalPendapatan({ periodeAwal, periodeAkhir })
    setDataPendapatan(data[0])
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      await getPerusahaan()
      await getLaporan()
      await getQtyKategori()
      await getTotalPendapatan()
      setLoading(false)
    })()
  }, [])

  function EmptyData () {
    return (
      <p className='text-center text-secondary'>Data tidak ditemukan</p>
    )
  }

  function ShowData () {
    return (
      <Bar data={chartBar} />
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
        <div className='my-5'>
          {!chartBar ? <EmptyData /> : <ShowData />}
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
            <p className='m-0'>{currencyFormat(dataPendapatan.Total)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
