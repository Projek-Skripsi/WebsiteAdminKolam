import React, { useState } from 'react'
import styles from './Pengunjung.module.css'
import pengunjung from 'mocks/pengunjung'
import Searchbar from 'components/Searchbar/Searchbar'

export default function Pengunjung () {
  const [keyword, setkeyword] = useState('')

  const searchId = pengunjung.filter((order) => { return order.id.toString().toLowerCase().includes(keyword.toLocaleLowerCase()) })

  return (
    <section id={styles.pengunjung}>
      <div className="d-flex justify-content-between align-items-center w-100 mb-4">
        <div className="group_title">Pengunjung Hari Ini</div>
        <Searchbar keyword={keyword} keywordChange={setkeyword} />
      </div>

      {/* Table Pengunjung Hari Ini */}
      <div className={styles.tableContainer}>
        <table className='table text-center align-middle' >
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Id Pemesanan</th>
              <th scope="col">Jumlah Tiket Anak</th>
              <th scope="col">Jumlah Tiket Orang Dewasa</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody >
            {searchId.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.jumlah_tiket_anak}</td>
                <td>{item.jumlah_tiket_dewasa}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'Berhasil' ? <button type='button' className='btn w-100 btn-outline-success'>Selesai</button> : <button type='button' className='btn w-100 btn-outline-danger'>Batal</button> }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
