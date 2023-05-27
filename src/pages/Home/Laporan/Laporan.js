import React from 'react'
import cn from 'classnames'
import styles from './Laporan.module.css'

const data = [
  {
    id: 1,
    name: 'Total Transaksi Hari Ini',
    number: 30
  },
  {
    id: 2,
    name: 'Jumlah Pendapatan Hari Ini',
    number: 1800000
  },
  {
    id: 3,
    name: 'Total Transaksi',
    number: 5
  }
]

const Laporan = () => {
  return (
    <div id="report" className="row gap-3">
      {data.map((item, index) => (
        <div className={cn(styles.card, 'card col')} key={index}>
          <h5 className={styles.card_title}>{item.name}</h5>
          <p className={styles.card_text}>{item.number}</p>
        </div>
      ))}
    </div>
  )
}

export default Laporan
