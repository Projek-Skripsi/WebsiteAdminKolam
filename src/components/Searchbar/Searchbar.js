import React from 'react'
import cn from 'classnames'
import styles from './Searchbar.module.css'
import { MagnifyingGlass } from '@phosphor-icons/react'

const Searchbar = () => {
  return (
    <div className={styles.form_group}>
      <span className={styles.icon}>
        <MagnifyingGlass size={18} color="#666666" />
      </span>
      <input
        type="text"
        className={cn(styles.form_control, 'form-control shadow-none')}
        placeholder="Cari ID"
      />
    </div>
  )
}

export default Searchbar
