import React, { useState } from "react";
import styles from "./RiwayatPemesanan.module.css";
import cn from "classnames";
import loadable from "@loadable/component";
import riwayatpemesanan from "mocks/riwayatpemesanan";

const Searchbar = loadable(() =>
  import("components").then((module) => module.Searchbar)
);
const Modal = loadable(() =>
  import("components").then((module) => module.Modal)
);

const RiwayatPemesanan = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <section id={styles.riwayat_pemesanan}>
      <div className="page_title">Riwayat Pemesanan</div>

      <div className={styles.buat_laporan}>
        <h5 className="mb-4">Buat Laporan</h5>
        <div className="row align-items-center justify-content-between">
          <div className="col-8 d-flex align-items-center">
            <label className="col-form-label me-3">Periode</label>
            <input type="date" className="form-control py-3" />
            <span className="mx-2">-</span>
            <input type="date" className="form-control py-3" />
          </div>
          <div className="col-auto">
            <button className={cn(styles.btn_laporan, "btn py-3 px-4")}>
              Tampilkan Laporan
            </button>
          </div>
        </div>
      </div>

      <div className="row justify-content-between align-items-center mt-4">
        <div className="col-auto">
          <Searchbar />
        </div>
        <div className="col-auto d-flex gap-2 align-items-center">
          <label
            htmlFor="status"
            className={cn(styles.label_filter, "col-form-label w-100")}
          >
            Filter berdasarkan status
          </label>

          <select
            className={cn(styles.filter_select, "form-select shadow-none")}
          >
            <option selected>Semua</option>
            <option value="Anak-anak">Berhasil</option>
            <option value="Dewasa">Menunggu Pembayaran</option>
            <option value="Dewasa">Menunggu Konfirmasi</option>
            <option value="Dewasa">Batal</option>
            <option value="Dewasa">Selesai</option>
          </select>
        </div>
      </div>

      {/* Tabel Riwayat Pemesanan */}
      <table className="mt-4 table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tanggal Masuk</th>
            <th scope="col">Total</th>
            <th scope="col">Metode Pembayaran</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {riwayatpemesanan.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.tanggalMasuk}</td>
              <td>{item.total}</td>
              <td>{item.metodePembayaran}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detail Pemesanan */}
      <Modal isShow={isShow} />
    </section>
  );
};

export default RiwayatPemesanan;
