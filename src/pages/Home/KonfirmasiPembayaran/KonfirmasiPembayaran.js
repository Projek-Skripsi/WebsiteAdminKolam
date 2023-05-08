import React from "react";
import cn from "classnames";
import konfirmasi from "mocks/konfirmasi";
import styles from "./KonfirmasiPembayaran.module.css";

const KonfirmasiPembayaran = () => {
  const clonedKonfirmasi = Array(4).fill(konfirmasi).flat();
  const count = clonedKonfirmasi.length;

  return (
    <section id={styles.konfirmasi_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Konfirmasi Pembayaran</div>
        <div className={styles.count}>{count}</div>
      </div>

      {/* Table Konfirmasi Pembayaran */}
      <table class="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tanggal berenang</th>
            <th scope="col">Jumlah pembayaran</th>
            <th scope="col">Metode pembayaran</th>
            <th scope="col">Bukti pembayaran</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {clonedKonfirmasi.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.tanggal_berenang}</td>
              <td>{item.jumlah_bayar}</td>
              <td>{item.metode_pembayaran}</td>
              <td>
                <img src={item.bukti_pembayaran} alt="bukti_pembayaran" />
              </td>
              <td>
                <button className="btn btn-outline-success w-100">
                  Terima
                </button>
                <button className="btn btn-outline-danger w-100 mt-2">
                  Tolak
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default KonfirmasiPembayaran;
