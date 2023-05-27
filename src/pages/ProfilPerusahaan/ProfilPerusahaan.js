import React, { useState } from 'react'
import cn from 'classnames'
import styles from './ProfilPerusahaan.module.css'

const ProfilPerusahaan = () => {
  const [namaPerusahaan, setNamaPerusahaan] = useState('')
  const [alamat, setAlamat] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [jamBuka, setJamBuka] = useState('')
  const [jamTutup, setJamTutup] = useState('')
  const [instagram, setInstagram] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')

  return (
    <section>
      <div className="page_title">Profil Perusahaan</div>
      <form className={styles.form}>
        {/* Nama Perusahaan */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="namaperusahaan" class="col-form-label">
              Nama Perusahaan
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="namaperusahaan"
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaPerusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
            />
          </div>
        </div>

        {/* Alamat */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="alamat" class="col-form-label">
              Alamat
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="alamat"
              className={cn(styles.input, 'form-control shadow-none')}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="deskripsi" class="col-form-label">
              Deskripsi
            </label>
          </div>
          <div class="col-auto">
            <textarea
              type="text"
              id="deskripsi"
              className={cn(styles.text_area, 'form-control shadow-none')}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
        </div>

        {/* Jam Buka */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="jambuka" class="col-form-label">
              Jam Buka
            </label>
          </div>
          <div class="col-auto">
            <input
              type="time"
              id="jambuka"
              className={cn(styles.input, 'form-control shadow-none')}
              value={jamBuka}
              onChange={(e) => setJamBuka(e.target.value)}
            />
          </div>
        </div>

        {/* Jam Tutup */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="jamtutup" class="col-form-label">
              Jam Tutup
            </label>
          </div>
          <div class="col-auto">
            <input
              type="time"
              id="jamtutup"
              className={cn(styles.input, 'form-control shadow-none')}
              value={jamTutup}
              onChange={(e) => setJamTutup(e.target.value)}
            />
          </div>
        </div>

        {/* Instagram */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="instagram" class="col-form-label">
              Instagram
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="instagram"
              className={cn(styles.input, 'form-control shadow-none')}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
        </div>

        {/* Whatsapp */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="whatsapp" class="col-form-label">
              Whatsapp
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="whatsapp"
              className={cn(styles.input, 'form-control shadow-none')}
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div class={cn(styles.input_group, 'row justify-content-between')}>
          <div class="col-auto">
            <label for="email" class="col-form-label">
              Email
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="email"
              className={cn(styles.input, 'form-control shadow-none')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button className={cn(styles.btn_edit, 'btn btn-outline-primary')}>
          Edit
        </button>
      </form>
    </section>
  )
}

export default ProfilPerusahaan
