import { assetUrl } from "../../data/assets";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useStore } from "../../context/Store";
import { Boton } from "../atomos/Boton";
import { Icono } from "../atomos/Icono";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout, cart } = useStore();
  return (
    <>
      <div className="utility-bar">
        <div className="container d-flex justify-content-between gap-3">
          <span>Ferretería de confianza, desde La Serena</span>
          <Link to="/contacto">
            Conversemos sobre tu proyecto <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <header className="site-header">
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            <Link
              className="navbar-brand d-flex align-items-center gap-2"
              to="/"
            >
              <img src={assetUrl("/img/logo_maestros.jpg")} alt="" />
              <span className="brand-name">
                Los Maestros<small>FERRETERÍA · LA SERENA</small>
              </span>
            </Link>
            <div className="header-actions">
              <NavLink
                className="header-icon-link"
                to="/carrito"
                aria-label={`Carrito (${cart.reduce((n, c) => n + c.cantidad, 0)})`}
                title="Carrito"
                onClick={() => setOpen(false)}
              >
                <Icono name="cart" />
                <span className="cart-count" aria-hidden="true">
                  {cart.reduce((n, c) => n + c.cantidad, 0)}
                </span>
              </NavLink>
              <NavLink
                className="header-icon-link"
                to={user ? "/perfil" : "/login"}
                aria-label={user ? "Mi perfil" : "Iniciar sesión"}
                title={user ? "Mi perfil" : "Iniciar sesión"}
                onClick={() => setOpen(false)}
              >
                <Icono name="user" />
              </NavLink>
            </div>
            <button
              className="navbar-toggler"
              aria-label="Abrir navegación"
              aria-expanded={open}
              aria-controls="main-navigation"
              onClick={() => setOpen(!open)}
            >
              <span className="menu-lines" aria-hidden="true">
                ☰
              </span>
            </button>
            <div
              id="main-navigation"
              className={"collapse navbar-collapse " + (open ? "show" : "")}
            >
              <div
                className="navbar-nav ms-auto"
                onClick={() => setOpen(false)}
              >
                {[
                  ["/", "Inicio"],
                  ["/catalogo", "Catálogo"],
                  ["/nosotros", "Nosotros"],
                  ["/novedades", "Novedades"],
                  ["/contacto", "Contacto"],
                ].map(([to, label]) => (
                  <NavLink
                    className="nav-link"
                    end={to === "/"}
                    key={to}
                    to={to}
                  >
                    {label}
                  </NavLink>
                ))}
                {user && (
                  <>
                    {user.rol === "Administrador" && (
                      <NavLink className="nav-link" to="/admin">
                        Admin
                      </NavLink>
                    )}
                    <Boton className="btn-sm nav-exit" onClick={logout}>
                      Salir
                    </Boton>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
