import { Link, useParams } from "react-router-dom";
import articles from "../data/articles.json";
import { Articulo } from "../componentes/organismos/Articulo";

export function DetalleNovedad() {
  const { id } = useParams();
  const html =
    id === "1" ? articles.novedad1 : id === "2" ? articles.novedad2 : undefined;
  return (
    <>
      <Link to="/novedades">← Volver a novedades</Link>
      {html ? <Articulo blocks={html} /> : <h1>Artículo no encontrado</h1>}
    </>
  );
}

