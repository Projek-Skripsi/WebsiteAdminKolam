import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'styles/app.css'
import { CONFIQ } from 'utils/utils'
import { getAllDataAdmin, logout } from 'confiq/api'
import Swal from 'sweetalert2'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import ProfilPerusahaan from './pages/ProfilPerusahaan/ProfilPerusahaan'
import Kolam from './pages/Kolam/Kolam'
import DetailKolam from './pages/DetailKolam/DetailKolam'
import MetodePembayaran from './pages/MetodePembayaran/MetodePembayaran'
import DetailMetodePembayaran from './pages/DetailMetodePembayaran/DetailMetodePembayaran'

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

  // if (!auth) {
  //   return (
  //     <Routes>
  //       <Route path="/*" element={<LoginUserPage onlogin={onLoginAdmin} />} />
  //     </Routes>
  //   )
  // }

  return (
    <>
      <Sidebar onLogOut={onLogOut} />
      <div className='main'>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/profil" element={<ProfilPerusahaan />} />
          <Route path="/kolam" element={<Kolam />} />
          <Route path="/kolam/:id" element={<DetailKolam />} />
          <Route path="/pembayaran" element={<MetodePembayaran />} />
          <Route path="/pembayaran/:id" element={<DetailMetodePembayaran />} />
        </Routes>
      </div>
    </>
  )
}

export default App
