import React from 'react'
import styles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div id={styles.sidebar}>
      <header>Kolam Sejahtera</header>
      <div className={styles.menuAdmin}>
        <NavLink to='/' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Dashboard</NavLink>
        <NavLink to='/profil' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Profil Perusahaan</NavLink>
        <NavLink to='/carousel' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Carousel</NavLink>
        <NavLink to='/kategori' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Kategori Kolam</NavLink>
        <NavLink to='/kolam' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Kolam</NavLink>
        <NavLink to='/pembayaran' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Metode Pembayaran</NavLink>
        <NavLink to='/riwayat' className={({ isActive }) => (isActive ? styles.btnMenuActive : styles.btnMenu)}>Riwayat Pemesanan</NavLink>
      </div>
    </div>
  )
}

export default Sidebar
