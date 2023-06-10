import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useInput from 'hooks/useInput'
import cn from 'classnames'
import styles from './Login.module.css'
import { resetPassword, login } from 'confiq/api'
import Swal from 'sweetalert2'
import Logo from '../../assets/Images/Logo2.png'
import Loading from 'components/Loading/Loading'
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'

export default function Login ({ onlogin }) {
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function showPass () {
    const password = document.getElementById('password')
    if (showPassword) {
      password.setAttribute('type', 'password')
      setShowPassword(false)
    } else {
      password.setAttribute('type', 'text')
      setShowPassword(true)
    }
  }

  async function loginHandler (e) {
    e.preventDefault()
    setLoading(true)
    const { error, data } = await login(email, password)
    if (!error) {
      onlogin(data)
      navigate('/')
    }
    setLoading(false)
  }

  async function onResetPassword () {
    const { value: email } = await Swal.fire({
      title: 'Reset Password',
      input: 'email',
      inputPlaceholder: 'Masukkan Email Anda...'
    })

    if (email) {
      setLoading(true)
      await resetPassword(email)
      console.log(email)
      setLoading(false)
    }
  }

  return (
    <div className='row min-vh-100 m-0 p-0'>
        <Loading visible={loading} />
        <div className={cn(styles.LeftSection, 'col-5 d-flex flex-column justify-content-center align-items-center')}>
            <img src={Logo} alt='Logo Kolam Sejahtera' height={150} width={200} />
            <p className={styles.Title}>Kolam Sejahtera</p>
            <p className={styles.Slogan}>Effortlessly Book Your Swimming Pool Tickets</p>
        </div>
        <div className='col-7 d-flex flex-column justify-content-center align-items-center'>
          <h3 style={{ fontWeight: 'bold' }}>Masuk sebagai Admin</h3>
          <form onSubmit={loginHandler} className='d-flex flex-column mt-4'>
            <div className={styles.FormTextInput}>
              <FiMail />
              <input type="email" placeholder='Masukkan Email...' id="email" value={email} onChange={setEmail} required />
            </div>
            <div className={styles.FormTextInput}>
              <FiLock />
              <input type="password" placeholder='Masukkan Password...' id="password" value={password} onChange={setPassword} required />
              {!showPassword ? <FiEyeOff onClick={ () => showPass() } className='iconPass'/> : <FiEye onClick={() => showPass()} className='iconPass'/>}
            </div>
            <button type='submit' className={styles.BtnLogin}>MASUK</button>
            <p className={styles.ResetPass} onClick={() => onResetPassword()}>Lupa Password?</p>
          </form>
        </div>
    </div>
  )
}
