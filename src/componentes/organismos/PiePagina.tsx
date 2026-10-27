import { Link } from "react-router-dom";

export function PiePagina() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 footer-main">
          <div className="col-lg-6">
            <p className="footer-brand">
              Los Maestros<span>.</span>
            </p>
            <p>
              Materiales, herramientas y atención cercana.
              <br />
              Todo para dar el siguiente paso en tu proyecto.
            </p>
            <span className="footer-location">
              La Serena · Región de Coquimbo
            </span>
          </div>
          <div className="col-6 col-lg-3">
            <h2>Explora</h2>
            <Link to="/catalogo">Nuestro catálogo</Link>
            <Link to="/novedades">Novedades y consejos</Link>
            <Link to="/nosotros">Sobre nosotros</Link>
          </div>
          <div className="col-6 col-lg-3">
            <h2>Estamos para ayudarte</h2>
            <Link to="/contacto">Escríbenos</Link>
            <Link to="/perfil">Mi cuenta</Link>
            <Link to="/carrito">Mi selección</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ferretería Los Maestros</span>
          <span>Construyamos tu próximo proyecto.</span>
        </div>
      </div>
    </footer>
  );
}
