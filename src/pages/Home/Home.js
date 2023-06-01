import React from 'react'

import Laporan from './Laporan/Laporan'
import Pengunjung from './Pengunjung/Pengunjung'
import KonfirmasiPembayaran from './KonfirmasiPembayaran/KonfirmasiPembayaran'
import MenungguPembayaran from './MenungguPembayaran/MenungguPembayaran'

export default function Home () {
  return (
    <>
      <Laporan />
      <Pengunjung />
      <KonfirmasiPembayaran />
      <MenungguPembayaran />
    </>
  )
}
