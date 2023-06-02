import React, { useState } from 'react'
import styles from './Pengunjung.module.css'
import DetailRiwayat from 'components/DetailRiwayat/DetailRiwayat'
import moment from 'moment'
import Searchbar from 'components/Searchbar/Searchbar'

export default function Pengunjung ({ data, changeStatus }) {
  const [keyword, setkeyword] = useState('')

  const searchId = data.filter((order) => { return order.IdPemesanan.toString().toLowerCase().includes(keyword.toLocaleLowerCase()) && order.Status !== 'Selesai' })

  function EmptyData () {
    return (
      <tr>
        <td colSpan={5} className='text-secondary' >Data tidak ditemukan</td>
      </tr>
    )
  }

  function ShowData () {
    return (
      searchId.map((item) => (
        <tr key={item.IdPemesanan}>
          <td><DetailRiwayat item={item} /></td>
          <td>{moment(item.TanggalPemesanan).format('DD MMM YYYY (hh:mm:ss)')}</td>
          <td>{item.TotalQty}</td>
          <td>{item.Status}</td>
          <td>
            {item.Status === 'Berhasil' ? <button type='button' className='btn w-100 btn-outline-success' onClick={() => changeStatus(item.IdPemesanan, 'Selesai')}>Selesai</button> : <button type='button' className='btn w-100 btn-outline-danger' onClick={() => changeStatus(item.IdPemesanan, 'Batal')}>Batal</button> }
          </td>
        </tr>
      ))
    )
  }

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
              <th scope="col">Tanggal Pemesanan</th>
              <th scope="col">Jumlah Tiket</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody >
            {searchId.length !== 0 ? <ShowData /> : <EmptyData /> }
          </tbody>
        </table>
      </div>
    </section>
  )
}
