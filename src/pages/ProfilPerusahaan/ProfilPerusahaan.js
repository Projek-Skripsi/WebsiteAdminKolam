import React, { useState, useEffect } from 'react'
import { getDataPerusahaan, putDataPerusahaan } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './ProfilPerusahaan.module.css'

const ProfilPerusahaan = () => {
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [namaPerusahaan, setNamaPerusahaan] = useState('')
  const [alamat, setAlamat] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [jamBuka, setJamBuka] = useState('')
  const [jamTutup, setJamTutup] = useState('')
  const [instagram, setInstagram] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')

  async function getPerusahaan () {
    const { data } = await getDataPerusahaan()
    setNamaPerusahaan(data[0].NamaPerusahaan)
    setAlamat(data[0].Alamat)
    setDeskripsi(data[0].Deskripsi)
    setJamBuka(data[0].JamBuka)
    setJamTutup(data[0].JamTutup)
    setEmail(data[0].Email)
    setWhatsapp(data[0].NoWA)
    setInstagram(data[0].Instagram)
  }

  useEffect(() => {
    setLoading(true)
    getPerusahaan()
    setLoading(false)
  }, [])

  async function simpanData (event) {
    event.preventDefault()
    const payload = {
      NamaPerusahaan: namaPerusahaan,
      Alamat: alamat,
      Deskripsi: deskripsi,
      JamBuka: jamBuka,
      JamTutup: jamTutup,
      Email: email,
      NoWA: whatsapp,
      Instagram: instagram
    }
    setLoading(true)
    await putDataPerusahaan({ ...payload })
    await getPerusahaan()
    Swal.fire('Berhasil', 'Data berhasil diperbarui', 'success')
    setReadOnly(!readOnly)
    setLoading(false)
  }

  return (
    <section>
      <Loading visible={loading} />
      <div className="page_title">Profil Perusahaan</div>
      <form onSubmit={simpanData} className={styles.form}>
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
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaPerusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              required
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
              maxLength={100}
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
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
              maxLength={200}
              disabled={readOnly}
              className={cn(styles.text_area, 'form-control shadow-none')}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
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
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={jamBuka}
              onChange={(e) => setJamBuka(e.target.value)}
              required
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
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={jamTutup}
              onChange={(e) => setJamTutup(e.target.value)}
              required
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
              disabled={readOnly}
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
              type="number"
              id="whatsapp"
              disabled={readOnly}
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
              disabled={readOnly}
              className={cn(styles.input, 'form-control shadow-none')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button hidden={!readOnly} type='button' className={cn(styles.btn_edit, 'btn btn-outline-primary')} onClick={() => setReadOnly(!readOnly) }>
          Edit
        </button>
        <button hidden={readOnly} type='submit' className={cn(styles.btn_edit, 'btn btn-outline-primary')} >
          Simpan
        </button>
      </form>
    </section>
  )
}

export default ProfilPerusahaan
