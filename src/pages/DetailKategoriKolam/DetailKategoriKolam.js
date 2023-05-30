import React, { useState } from 'react'
import cn from 'classnames'
import styles from './DetailKategoriKolam.module.css'
import { useParams } from 'react-router-dom'
import kategori from 'mocks/kategori'

const DetailKategoriKolam = () => {
  const { id } = useParams()
  const data = kategori.find((item) => item.id === parseInt(id))
  const [namaKategori, setNamaKategori] = useState(data.kategori)
  const [hargaNormal, setHargaNormal] = useState(data.hargaNormal)
  const [hargaLibur, setHargaLibur] = useState(data.hargaLibur)

  return (
    <section>
      <div className="page_title">Detail Kategori</div>

      <form className={styles.form}>
        {/* Nama Kategori */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="namakategori" className="col-form-label">
              Nama Kategori
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="namakategori"
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
            />
          </div>
        </div>

        {/* Harga Normal */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="harganormal" className="col-form-label">
              Harga Normal
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="harganormal"
              className={cn(styles.input, 'form-control shadow-none')}
              value={hargaNormal}
              onChange={(e) => setHargaNormal(e.target.value)}
            />
          </div>
        </div>

        {/* Harga Libur */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="hargalibur" className="col-form-label">
              Harga Libur
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="hargalibur"
              className={cn(styles.input, 'form-control shadow-none')}
              value={hargaLibur}
              onChange={(e) => setHargaLibur(e.target.value)}
            />
          </div>
        </div>

        <div className={cn(styles.button_group, 'justify-content-end')}>
          <button className={cn(styles.btn_edit, 'btn btn-outline-info')}>
            Edit
          </button>
        </div>
      </form>
    </section>
  )
}

export default DetailKategoriKolam
