import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataPembayaran, putDataPembayaran } from 'confiq/api'
import Loading from 'components/Loading/Loading'
import Swal from 'sweetalert2'
import cn from 'classnames'
import styles from './DetailMetodePembayaran.module.css'

const DetailMetodePembayaran = () => {
  const { IdPembayaran } = useParams()
  const [namaMetodePembayaran, setNamaMetodePembayaran] = useState('')
  const [nomorRekening, setNomorRekening] = useState('')
  const [namaPemilik, setNamaPemilik] = useState('')
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)

  async function getPembayaran () {
    const { data } = await getDataPembayaran(IdPembayaran)
    setNamaMetodePembayaran(data[0].NamaPembayaran)
    setNomorRekening(data[0].NoRekening)
    setNamaPemilik(data[0].An)
  }

  useEffect(() => {
    setLoading(true)
    getPembayaran()
    setLoading(false)
  }, [])

  async function simpanData (e) {
    e.preventDefault()
    const payload = {
      IdPembayaran,
      NamaPembayaran: namaMetodePembayaran,
      NoRekening: nomorRekening,
      An: namaPemilik
    }
    setLoading(true)
    await putDataPembayaran({ ...payload })
    Swal.fire('Berhasil', 'Data berhasil disimpan', 'success')
    setReadOnly(!readOnly)
    setLoading(false)
  }

  return (
    <section>
      <div className="page_title">Detail Pembayaran</div>

      <form onSubmit={simpanData} className={styles.form}>
        {/* Metode Pembayaran */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="metodepembayaran" className="col-form-label">
              Metode Pembayaran
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              maxLength={255}
              disabled={readOnly}
              required
              id="metodepembayaran"
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaMetodePembayaran}
              onChange={(e) => setNamaMetodePembayaran(e.target.value)}
            />
          </div>
        </div>

        {/* Nomor Rekening */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="nomorrekening" className="col-form-label">
              Nomor Rekening
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              maxLength={20}
              disabled={readOnly}
              required
              id="nomorrekening"
              className={cn(styles.input, 'form-control shadow-none')}
              value={nomorRekening}
              onChange={(e) => setNomorRekening(e.target.value)}
            />
          </div>
        </div>

        {/* Nama Pemilik */}
        <div className={cn(styles.input_group, 'row justify-content-between')}>
          <div className="col-auto">
            <label htmlFor="namapemilik" className="col-form-label">
              Nama Pemilik
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              maxLength={30}
              disabled={readOnly}
              required
              id="namapemilik"
              className={cn(styles.input, 'form-control shadow-none')}
              value={namaPemilik}
              onChange={(e) => setNamaPemilik(e.target.value)}
            />
          </div>
        </div>

        <div className={cn(styles.button_group, 'justify-content-end')}>
          <button type='button' hidden={!readOnly} className={cn(styles.btn_edit, 'btn btn-outline-info')} onClick={() => setReadOnly(!readOnly)} >
            Edit
          </button>
          <button type='submit' hidden={readOnly} className={cn(styles.btn_hapus, 'btn btn-outline-primary')}>
            Simpan
          </button>
        </div>
      </form>
    </section>
  )
}

export default DetailMetodePembayaran
