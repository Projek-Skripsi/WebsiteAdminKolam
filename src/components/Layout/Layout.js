import React from 'react'
import loadable from '@loadable/component'
import styles from './Layout.module.css'

const Sidebar = loadable(() =>
  import('components').then((module) => ({ default: module.Sidebar }))
)

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div id="main" className={styles.main}>
        {children}
      </div>
    </>
  )
}

export default Layout
