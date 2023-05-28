import React, { useState } from "react";
import cn from "classnames";
import styles from "./Carousel.module.css";
import carousel from "mocks/carousel";
import { Plus, Trash } from "@phosphor-icons/react";

const Carousel = () => {
  const [tambahCarousel, setTambahCarousel] = useState(false);

  return (
    <section id={styles.carousel}>
      <div className="page_title">Carousel</div>
      {tambahCarousel === false && (
        <button
          className={cn(styles.btn_tambah, "btn btn-success")}
          onClick={() => setTambahCarousel(!tambahCarousel)}
        >
          <Plus size={18} color="#ffffff" weight="bold" />
          <span>Tambah Carousel</span>
        </button>
      )}

      {tambahCarousel && (
        <section id={styles.tambah_carousel}>
          <h5>Tambah Carousel</h5>
          <div className="row align-items-center mb-3">
            <div className="col-auto">
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
              onClick={() => setTambahCarousel(false)}
            >
              Batal
            </button>
            <button className={cn(styles.btn_simpan, "btn")}>Simpan</button>
          </div>
        </section>
      )}

      {/* Table Carousel */}
      <table className="table table-bordered align-middle table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Gambar</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {carousel.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <img src={item.gambar} alt="carousel" />
              </td>
              <td className="text-center">
                <button className="btn btn-outline-danger">
                  <Trash size={32} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Carousel;
