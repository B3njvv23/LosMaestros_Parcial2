import { assetUrl } from "../data/assets";
import { Link } from "react-router-dom";

const news = [
  {
    id: "1",
    title: "Cómo proteger tus herramientas del óxido",
    image: "/img/oxido.jpg",
    description:
      "Consejos de limpieza y almacenamiento para cuidar tus herramientas.",
  },
  {
    id: "2",
    title: "Llegó el nuevo stock de tuberías PVC",
    image: "/img/tuberias.jpg",
    description: "Conoce materiales y productos para tus instalaciones.",
  },
];

export function Novedades() {
  return (
    <>
      <h1>Novedades y consejos</h1>
      <div className="row g-4 mt-2">
        {news.map((n) => (
          <article className="col-md-6" key={n.id}>
            <div className="card h-100">
              <img
                className="card-img-top"
                style={{ height: 230, objectFit: "cover" }}
                src={assetUrl(n.image)}
                alt=""
              />
              <div className="card-body">
                <h2 className="h4">{n.title}</h2>
                <p>{n.description}</p>
                <Link to={"/novedades/" + n.id}>Leer artículo</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

