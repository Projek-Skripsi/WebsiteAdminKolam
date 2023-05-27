import React from 'react'
import styles from './Layout.module.css'
import Sidebar from 'components/Sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className={styles.main}>
        {children}
      </div>
    </>
  )
}

export default Layout
