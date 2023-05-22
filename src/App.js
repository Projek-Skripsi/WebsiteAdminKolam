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
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
