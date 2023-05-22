import React, { useState } from "react";
import cn from "classnames";
import styles from "./DetailKolam.module.css";
import { useParams } from "react-router-dom";
import kolam from "mocks/kolam";

const DetailKolam = () => {
  const { id } = useParams();
  const data = kolam.find((item) => item.id === parseInt(id));
  const [namaKolam, setNamaKolam] = useState(data.nama_kolam);
  const [kategori, setKategori] = useState(data.kategori);
  const [gambar, setGambar] = useState(data.gambar);

  return (
    <section>
      <div className="page_title">Detail Kolam</div>

      <form className={styles.form}>
        {/* Nama Kolam */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="namaperusahaan" className="col-form-label">
              Nama Kolam
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="namaperusahaan"
              className={cn(styles.input, "form-control shadow-none")}
              value={namaKolam}
              onChange={(e) => setNamaKolam(e.target.value)}
            />
          </div>
        </div>

        {/* Kategori */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="kategori" className="col-form-label">
              Kategori
            </label>
          </div>
          <div className="col-auto">
            <select
              className={cn(styles.select, "form-select")}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option selected>Pilih Kategori</option>
              <option value="Anak-anak">Anak-anak</option>
              <option value="Dewasa">Dewasa</option>
            </select>
          </div>
        </div>

        {/* Gambar */}
        <div className={cn(styles.input_group, "row justify-content-between")}>
          <div className="col-auto">
            <label htmlFor="gambar" className="col-form-label">
              Gambar
            </label>
          </div>
          <div className="col-6 row">
            <img
              src={gambar}
              alt="gambar"
              className={cn(styles.gambar, "img-fluid")}
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

export default DetailKolam;
