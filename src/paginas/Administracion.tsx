import { Link } from "react-router-dom";

export function Administracion() {
  return (
    <>
      <h1>Administración</h1>
      <p>Gestiona los datos del catálogo y las cuentas de la demostración.</p>
      <div className="d-flex gap-3 flex-wrap">
        <Link className="btn btn-primary" to="/admin/productos">
          Gestionar productos
        </Link>
        <Link className="btn btn-primary" to="/admin/usuarios">
          Gestionar usuarios
        </Link>
      </div>
    </>
  );
}
