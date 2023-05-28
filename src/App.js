import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "styles/app.css";

const Layout = lazy(() =>
  import("components").then((module) => ({ default: module.Layout }))
);
const Home = lazy(() =>
  import("pages").then((module) => ({ default: module.Home }))
);
const ProfilPerusahaan = lazy(() =>
  import("pages").then((module) => ({ default: module.ProfilPerusahaan }))
);
const Kolam = lazy(() =>
  import("pages").then((module) => ({ default: module.Kolam }))
);
const DetailKolam = lazy(() =>
  import("pages").then((module) => ({ default: module.DetailKolam }))
);
const MetodePembayaran = lazy(() =>
  import("pages").then((module) => ({ default: module.MetodePembayaran }))
);
const DetailMetodePembayaran = lazy(() =>
  import("pages").then((module) => ({ default: module.DetailMetodePembayaran }))
);
const Carousel = lazy(() =>
  import("pages").then((module) => ({ default: module.Carousel }))
);
const KategoriKolam = lazy(() =>
  import("pages").then((module) => ({ default: module.KategoriKolam }))
);
const DetailKategoriKolam = lazy(() =>
  import("pages").then((module) => ({ default: module.DetailKategoriKolam }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil-perusahaan" element={<ProfilPerusahaan />} />
            <Route path="/kolam" element={<Kolam />} />
            <Route path="/kolam/:id" element={<DetailKolam />} />
            <Route path="/metode-pembayaran" element={<MetodePembayaran />} />
            <Route
              path="/metode-pembayaran/:id"
              element={<DetailMetodePembayaran />}
            />
            <Route path="/carousel" element={<Carousel />} />
            <Route path="/kategori-kolam" element={<KategoriKolam />} />
            <Route
              path="/kategori-kolam/:id"
              element={<DetailKategoriKolam />}
            />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
