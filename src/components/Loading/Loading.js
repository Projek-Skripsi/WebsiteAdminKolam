import React from 'react'
import styles from './Loading.module.css'

export default function Loading ({ visible = true }) {
  return (
    visible && <div className={styles.loading}>
      <div className={styles.ring}>Loading<span className={styles.dot}></span></div>
    </div>
  )
}
