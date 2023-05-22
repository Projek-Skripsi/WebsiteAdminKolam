import React, { useState } from "react";
import cn from "classnames";
import styles from "./Kolam.module.css";
import kolam from "mocks/kolam";
import { Plus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Kolam = () => {
  const [namaKolam, setNamaKolam] = useState("");
  const [tambahKolam, setTambahKolam] = useState(false);

  return (
    <section id={styles.kolam}>
      <div className="page_title">Data Kolam</div>
      {tambahKolam === false && (
        <button
          className={cn(styles.btn_tambah, "btn btn-success")}
          onClick={() => setTambahKolam(!tambahKolam)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Kolam</span>
        </button>
      )}

      {tambahKolam && (
        <section id={styles.tambah_kolam}>
          <h5>Tambah Kolam</h5>
          <div className="row align-items-center mb-3">
            <div className="col">
              <label className="col-form-label">Nama Kolam</label>
              <input
                type="text"
                className="form-control"
                value={namaKolam}
                onChange={(e) => setNamaKolam(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="kategori" className="col-form-label">
                Kategori
              </label>

              <select className="form-select">
                <option selected>Pilih Kategori</option>
                <option value="Anak-anak">Anak-anak</option>
                <option value="Dewasa">Dewasa</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="gambar" className="col-form-label">
                Gambar
              </label>

              <div className="input-group">
                <input type="file" className="form-control" id="gambar" />
              </div>
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center w-100 justify-content-end">
            <button
              className={cn(styles.btn_batal, "btn btn-outline-secondary")}
              onClick={() => setTambahKolam(false)}
            >
              Batal
            </button>
            <button className={cn(styles.btn_simpan, "btn")}>Simpan</button>
          </div>
        </section>
      )}

      {/* Table Data Kolam */}
      <table className="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nama Kolam</th>
            <th scope="col">Kategori</th>
            <th scope="col">Gambar</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {kolam.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link to={`/kolam/${item.id}`}>{item.nama_kolam}</Link>
              </td>
              <td>{item.kategori}</td>
              <td>
                <img src={item.gambar} alt="bukti_pembayaran" />
              </td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Kolam;
