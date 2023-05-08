import React from "react";
import styles from "./MenungguPembayaran.module.css";
import menunggu_pembayaran from "mocks/menunggupembayaran";

const MenungguPembayaran = () => {
  const clonedData = Array(4).fill(menunggu_pembayaran).flat();
  const count = clonedData.length;

  return (
    <section id={styles.menunggu_pembayaran}>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="group_title">Menunggu Pembayaran</div>
        <div className={styles.count}>{count}</div>
      </div>

      {/* Table Menunggu Pembayaran */}
      <table class="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tanggal berenang</th>
            <th scope="col">Jumlah pembayaran</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {clonedData.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.tanggal_berenang}</td>
              <td>{item.jumlah_bayar}</td>
              <td>
                <button className="btn btn-outline-danger w-100 mt-2">
                  Batalkan Pemesanan
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MenungguPembayaran;
