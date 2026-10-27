import { Link } from "react-router-dom";

export function PaginaNoEncontrada() {
  return (
    <>
      <h1>Página no encontrada</h1>
      <Link to="/">Volver al inicio</Link>
    </>
  );
}
