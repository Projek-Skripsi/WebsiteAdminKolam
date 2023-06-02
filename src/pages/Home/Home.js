import React, { useState, useEffect } from 'react'
import { getAllDataPemesanan, editDataPemesanan } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import moment from 'moment/moment'
import Swal from 'sweetalert2'
import Laporan from './Laporan/Laporan'
import Pengunjung from './Pengunjung/Pengunjung'
import KonfirmasiPembayaran from './KonfirmasiPembayaran/KonfirmasiPembayaran'
import MenungguPembayaran from './MenungguPembayaran/MenungguPembayaran'

export default function Home () {
  const hariIni = moment().format('YYYY-MM-DD')
  const [loading, setLoading] = useState(false)
  const [allPemesanan, setAllPemesanan] = useState([])
  const [dataPengunjungSection, setDataPengunjungSection] = useState([])
  const [dataKonfirmasiSection, setDataKonfirmasiSection] = useState([])
  const [dataTungguBayarSection, setDataTungguBayarSection] = useState([])

  async function getAllPemesanan () {
    const { data } = await getAllDataPemesanan()
    setAllPemesanan(data)
    setDataPengunjungSection(data.filter((order) => moment(order.TanggalMasuk).format('YYYY-MM-DD') === hariIni))
    setDataKonfirmasiSection(data.filter((order) => order.Status === 'Menunggu Konfirmasi'))
    setDataTungguBayarSection(data.filter((order) => order.Status === 'Menunggu Pembayaran'))
  }

  useEffect(() => {
    setLoading(true)
    getAllPemesanan()
    setLoading(false)
  }, [])

  async function changeStatus (IdPemesanan, newStatus) {
    await editDataPemesanan({ IdPemesanan, Status: newStatus })
    await getAllPemesanan()
    await Swal.fire({
      showConfirmButton: false,
      icon: 'success',
      title: 'Perubahan disimpan',
      timer: 1000
    })
  }

  return (
    <>
      <Loading visible={loading} />
      <Laporan allOrder={allPemesanan.length} pendapatan={dataPengunjungSection} totalTransaksi={dataPengunjungSection.length} />
      <Pengunjung changeStatus={changeStatus} data={dataPengunjungSection} />
      <KonfirmasiPembayaran changeStatus={changeStatus} data={dataKonfirmasiSection} />
      <MenungguPembayaran changeStatus={changeStatus} data={dataTungguBayarSection} />
    </>
  )
}
