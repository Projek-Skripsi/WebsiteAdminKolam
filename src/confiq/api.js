import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { getStorage, ref as refImg, uploadBytes, getDownloadURL } from 'firebase/storage'
import Swal from 'sweetalert2'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

const firebaseConfig = {
  apiKey: 'AIzaSyBQoJg3prl1beUIpmVqlXjGarP8I5Rwkd8',
  authDomain: 'kolamsejahtera-c2d19.firebaseapp.com',
  projectId: 'kolamsejahtera-c2d19',
  storageBucket: 'kolamsejahtera-c2d19.appspot.com',
  messagingSenderId: '481005580114',
  appId: '1:481005580114:web:14d3d154e3627feffa548b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)
// Initialize Storage and get a reference to the service
const storage = getStorage()

export function login (email, password) {
  return (
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser
        return { error: false, data: user }
      })
      .catch((error) => {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: error.code,
          text: error.message,
          showConfirmButton: false,
          timer: 1500
        })
        return { error: true, data: null }
      })
  )
}

export function resetPassword (email) {
  return (
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire('Berhasil', 'Silahkan cek email Anda!', 'success')
      })
      .catch((error) => {
        Swal.fire(error.code, error.message, 'error')
      })
  )
}

export function logout () {
  return (
    signOut(auth)
      .then(() => {
        return { error: false }
      })
      .catch(() => {
        return { error: true }
      })
  )
}

export async function getAllDataAdmin () {
  try {
    const response = await api.get('/admin')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataPerusahaan () {
  try {
    const response = await api.get('/perusahaan')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function putDataPerusahaan ({ NamaPerusahaan, Alamat, Deskripsi, JamBuka, JamTutup, Email, NoWA, Instagram }) {
  await api.put('/perusahaan', { NamaPerusahaan, Alamat, Deskripsi, JamBuka, JamTutup, Email, NoWA, Instagram })
}

export async function getAllDataKategoriKolam () {
  try {
    const response = await api.get('/kategori')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataKategoriKolam (IdKategori) {
  try {
    const response = await api.get(`/kategori/${IdKategori}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function putDataKategori ({ IdKategori, NamaKategori, HargaNormal, HargaLibur }) {
  await api.put(`/kategori/${IdKategori}`, { NamaKategori, HargaNormal, HargaLibur })
}

export async function addKategori (data) {
  await api.post('/kategori', data)
}

export async function getAllDataKolam () {
  try {
    const response = await api.get('/kolam')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataKolam (IdKolam) {
  try {
    const response = await api.get(`/kolam/${IdKolam}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function addKolam (file, data) {
  const imagePath = `Kolam/${+new Date()}${file.name}`
  const storageRef = refImg(storage, imagePath)
  return (
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(refImg(storage, imagePath))
          .then(async (url) => {
            await api.post('/kolam', { ...data, UrlGambar: url })
          })
          .catch((error) => {
            Swal.fire(error.message)
          })
      })
      .then(() => {
        return { error: false }
      }).catch((error) => {
        Swal.fire(error.message)
        return { error: true }
      })
  )
}

export async function putDataKolam ({ IdKolam, Judul, IdKategori, UrlGambar, Status }) {
  await api.put(`/kolam/${IdKolam}`, { Judul, IdKategori, UrlGambar, Status })
}

export function uploadGambarKolam (file, IdKolam) {
  const imagePath = `Kolam/${+new Date()}${file.name}`
  const storageRef = refImg(storage, imagePath)
  return (
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(refImg(storage, imagePath))
          .then(async (url) => {
            await putDataKolam({ IdKolam, UrlGambar: url })
          })
          .catch((error) => {
            Swal.fire(error.message)
          })
      })
      .then(() => {
        return { error: false }
      }).catch((error) => {
        Swal.fire(error.message)
        return { error: true }
      })
  )
}

export async function deleteKolam (IdKolam) {
  await api.delete(`/kolam/${IdKolam}`)
}

export async function getAllDataPembayaran () {
  try {
    const response = await api.get('/pembayaran')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataPembayaran (IdPembayaran) {
  try {
    const response = await api.get(`/pembayaran/${IdPembayaran}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function putDataPembayaran ({ IdPembayaran, NamaPembayaran, NoRekening, An, Status }) {
  await api.put(`/pembayaran/${IdPembayaran}`, { NamaPembayaran, NoRekening, An, Status })
}

export async function addPembayaran (data) {
  await api.post('/pembayaran', data)
}

export async function getAllDataCarousel () {
  try {
    const response = await api.get('/carousel')
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function addCarousel (file) {
  const imagePath = `Carousel/${+new Date()}${file.name}`
  const storageRef = refImg(storage, imagePath)
  return (
    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(refImg(storage, imagePath))
          .then(async (url) => {
            await api.post('/carousel', { UrlGambar: url })
          })
          .catch((error) => {
            Swal.fire(error.message)
          })
      })
      .then(() => {
        return { error: false }
      }).catch((error) => {
        Swal.fire(error.message)
        return { error: true }
      })
  )
}

export async function deleteCarousel (IdCarousel) {
  await api.delete(`/carousel/${IdCarousel}`)
}

export async function getAllDataPemesanan () {
  try {
    const response = await api.get('/pemesanan')
    const data = await response.data.payload.pemesanan
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function editDataPemesanan ({ IdPemesanan, Status }) {
  await api.put(`/pemesanan/${IdPemesanan}`, { Status })
}

export async function deleteKonfirmasiPembayaran (IdPemesanan) {
  await api.delete(`/konfirmasi/${IdPemesanan}`)
}

export async function getDataTabelLaporan ({ periodeAwal, periodeAkhir }) {
  try {
    const response = await api.get(`/laporan/table/${periodeAwal}/${periodeAkhir}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataQtyKategori ({ periodeAwal, periodeAkhir }) {
  try {
    const response = await api.get(`/laporan/qtykategori/${periodeAwal}/${periodeAkhir}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}

export async function getDataTotalPendapatan ({ periodeAwal, periodeAkhir }) {
  try {
    const response = await api.get(`/laporan/pendapatan/${periodeAwal}/${periodeAkhir}`)
    const data = await response.data.payload
    return { data }
  } catch (error) {
    alert(error.code, error.message)
  }
}
