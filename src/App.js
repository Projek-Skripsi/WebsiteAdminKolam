import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'styles/app.css'
import './assets/Fonts/Gloss_And_Bloom.ttf'
import './assets/Fonts/Inter.ttf'
import { CONFIQ } from 'utils/utils'
import { getAllDataAdmin, logout } from 'confiq/api'
import Swal from 'sweetalert2'
import Login from 'pages/Login/Login'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import ProfilPerusahaan from './pages/ProfilPerusahaan/ProfilPerusahaan'
import Kolam from './pages/Kolam/Kolam'
import DetailKolam from './pages/DetailKolam/DetailKolam'
import MetodePembayaran from './pages/MetodePembayaran/MetodePembayaran'
import DetailMetodePembayaran from './pages/DetailMetodePembayaran/DetailMetodePembayaran'
import Carousel from './pages/Carousel/Carousel'
import KategoriKolam from 'pages/KategoriKolam/KategoriKolam'
import DetailKategoriKolam from 'pages/DetailKategoriKolam/DetailKategoriKolam'
import RiwayatPemesanan from 'pages/RiwayatPemesanan/RiwayatPemesanan'
import Laporan from 'pages/Laporan/Laporan'

function App () {
  const [auth, setAuth] = useState(localStorage.getItem(CONFIQ.authAdmin) || null)
  const [dataAdmin, setDataAdmin] = useState([])

  async function getAllAdmin () {
    const { data } = await getAllDataAdmin()
    setDataAdmin(data)
  }

  useEffect(() => {
    getAllAdmin()
  }, [])

  async function onLoginAdmin (data) {
    for (let i = 0; i < dataAdmin.length; i++) {
      if (dataAdmin[i].IdAdmin === data.uid) {
        localStorage.setItem(CONFIQ.authAdmin, data.uid)
        return setAuth(data.uid)
      }
    }
    if (auth === null) {
      Swal.fire('Akses ditolak', 'akun tidak memiliki akses ke halaman ini!', 'error')
      await onLogOut()
    }
  }

  async function onLogOut () {
    const { error } = await logout()
    if (!error) {
      localStorage.clear()
      setAuth(null)
    }
  }

  if (!auth) {
    return (
      <Routes>
        <Route path="/*" element={<Login onlogin={onLoginAdmin} />} />
      </Routes>
    )
  }

  return (
    <>
      <Sidebar onLogOut={onLogOut} />
      <div className='main'>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/profil" element={<ProfilPerusahaan />} />
          <Route path="/kolam" element={<Kolam />} />
          <Route path="/kolam/:IdKolam" element={<DetailKolam />} />
          <Route path="/pembayaran" element={<MetodePembayaran />} />
          <Route path="/pembayaran/:IdPembayaran" element={<DetailMetodePembayaran />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/kategori" element={<KategoriKolam />} />
          <Route path="/kategori/:IdKategori" element={<DetailKategoriKolam />} />
          <Route path="/riwayat" element={<RiwayatPemesanan />} />
          <Route path="/riwayat/:periode" element={<Laporan />} />
        </Routes>
      </div>
    </>
  )
}

export default App
