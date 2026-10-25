import { Navbar } from "./Navbar";
import { PiePagina } from "./PiePagina";

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export function Estructura() {
  const { pathname } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const contenido = document.getElementById("contenido");
      if (!contenido?.contains(document.activeElement)) {
        contenido?.focus({ preventScroll: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  return (
    <div
      className={`site-shell d-flex flex-column min-vh-100 ${pathname === "/login" ? "login-shell" : ""}`}
    >
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main
        tabIndex={-1}
        id="contenido"
        className="container site-main flex-grow-1"
      >
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}
