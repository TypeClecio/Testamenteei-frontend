import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import "./assets/styles/global.scss";

import Inicio from "./pages/Inicio/Inicio";
import Jogatina from "./pages/Jogatina/Jogatina";
import Final from "./pages/Final/Final";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/jogatina" element={<Jogatina />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </BrowserRouter>

      <Analytics />
    </>
  )
}

export default App;
