import React from 'react'
import { currencyFormat } from 'utils/utils'
import cn from 'classnames'
import styles from './Laporan.module.css'

export default function Laporan ({ allOrder, pendapatan, totalTransaksi }) {
  const incomeToday = pendapatan.reduce((x, y) => x + y.Total, 0)

  return (
    <div id="report" className="row gap-3">
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Total Transaksi Hari Ini</h5>
        <p className={styles.card_text}>{totalTransaksi}</p>
      </div>
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Jumlah Pendapatan Hari Ini</h5>
        <p className={styles.card_text}>{currencyFormat(incomeToday)}</p>
      </div>
      <div className={cn(styles.card, 'card col')}>
        <h5 className={styles.card_title}>Total Transaksi</h5>
        <p className={styles.card_text}>{allOrder}</p>
      </div>
    </div>
  )
}
