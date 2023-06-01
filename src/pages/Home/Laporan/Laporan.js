import React from 'react'
import { currencyFormat } from 'utils/utils'
import cn from 'classnames'
import styles from './Laporan.module.css'

export default function Laporan () {
  return (
    <div id="report" className="row gap-3">
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Total Transaksi Hari Ini</h5>
        <p className={styles.card_text}>0</p>
      </div>
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Jumlah Pendapatan Hari Ini</h5>
        <p className={styles.card_text}>{currencyFormat(0)}</p>
      </div>
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Total Transaksi</h5>
        <p className={styles.card_text}>0</p>
      </div>
    </div>
  )
}
