import { Route, Routes } from 'react-router-dom'
import 'styles/app.css'
import Sidebar from './components/Sidebar/Sidebar'
import Home from './pages/Home/Home'
import ProfilPerusahaan from './pages/ProfilPerusahaan/ProfilPerusahaan'
import Kolam from './pages/Kolam/Kolam'
import DetailKolam from './pages/DetailKolam/DetailKolam'
import MetodePembayaran from './pages/MetodePembayaran/MetodePembayaran'
import DetailMetodePembayaran from './pages/DetailMetodePembayaran/DetailMetodePembayaran'

function App () {
  return (
    <>
      <Sidebar />
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
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
