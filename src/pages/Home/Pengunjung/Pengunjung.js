import React from 'react'
import cn from 'classnames'
import styles from './Pengunjung.module.css'
import pengunjung from 'mocks/pengunjung'
import Searchbar from 'components/Searchbar/Searchbar'

const Pengunjung = () => {
  return (
    <section id={styles.pengunjung}>
      <div className="d-flex justify-content-between align-items-start w-100 mb-4">
        <div className="group_title">Pengunjung Hari Ini</div>
        <Searchbar />
      </div>

      {/* Table Pengunjung Hari Ini */}
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Jumlah Tiket Anak</th>
            <th scope="col">Jumlah Tiket Orang Dewasa</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {pengunjung.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.jumlah_tiket_anak}</td>
              <td>{item.jumlah_tiket_dewasa}</td>
              <td>{item.status}</td>
              <td>
                <button
                  type="button"
                  className={cn([
                    'btn w-100',
                    {
                      'btn-outline-success': item.status === 'Berhasil',
                      'btn-outline-danger':
                        item.status === 'Menunggu Pembayaran' ||
                        item.status === 'Menunggu Konfirmasi'
                    }
                  ])}
                >
                  {item.tombol}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Pengunjung
