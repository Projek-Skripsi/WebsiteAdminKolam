import React, { useState } from "react";
import cn from "classnames";
import styles from "./DetailMetodePembayaran.module.css";
import { useParams } from "react-router-dom";
import metodepembayaran from "mocks/metodepembayaran";

const DetailMetodePembayaran = () => {
  const { id } = useParams();
  const data = metodepembayaran.find((item) => item.id === parseInt(id));
  const [namaMetodePembayaran, setNamaMetodePembayaran] = useState(data.nama);
  const [nomorRekening, setNomorRekening] = useState(data.no_rek);
  const [namaPemilik, setNamaPemilik] = useState(data.nama_pemilik);

  return (
    <section>
      <div className="page_title">Detail Kolam</div>

      <form className={styles.form}>
        {/* Metode Pembayaran */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="metodepembayaran" className="col-form-label">
              Metode Pembayaran
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="metodepembayaran"
              className={cn(styles.input, "form-control shadow-none")}
              value={namaMetodePembayaran}
              onChange={(e) => setNamaMetodePembayaran(e.target.value)}
            />
          </div>
        </div>

        {/* Nomor Rekening */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="nomorrekening" className="col-form-label">
              Nomor Rekening
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="nomorrekening"
              className={cn(styles.input, "form-control shadow-none")}
              value={nomorRekening}
              onChange={(e) => setNomorRekening(e.target.value)}
            />
          </div>
        </div>

        {/* Nama Pemilik */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="namapemilik" className="col-form-label">
              Nama Pemilik
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="namapemilik"
              className={cn(styles.input, "form-control shadow-none")}
              value={namaPemilik}
              onChange={(e) => setNamaPemilik(e.target.value)}
            />
          </div>
        </div>

        <div className={cn(styles.button_group, "justify-content-end")}>
          <button className={cn(styles.btn_hapus, "btn btn-outline-danger")}>
            Hapus
          </button>
          <button className={cn(styles.btn_edit, "btn btn-outline-info")}>
            Edit
          </button>
        </div>
      </form>
    </section>
  );
};

export default DetailMetodePembayaran;
