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
