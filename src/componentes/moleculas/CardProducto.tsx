import { BotonEnlace } from "../atomos/BotonEnlace";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { money, price } from "../../repository";
import { Boton } from "../atomos/Boton";
import { ImagenProducto } from "../atomos/ImagenProducto";
import { isReferenceImage } from "../../images";
export function CardProducto({
  product: p,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product) => void;
}) {
  return (
    <article className="card product-card h-100">
      <div className="product-visual">
        {p.enOferta && <span className="offer-badge">Oferta</span>}
        <ImagenProducto product={p} className="card-img-top product-image" />
        {isReferenceImage(p) && (
          <span className="image-reference">Imagen referencial</span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <small className="product-category">
          {p.categoria} · {p.id}
        </small>
        <h3 className="h6 mt-2">
          <Link to={"/catalogo/" + p.id}>{p.nombre}</Link>
        </h3>
        <p className="product-description small flex-grow-1">{p.descripcion}</p>
        {p.enOferta && <del className="text-secondary">{money(p.precio)}</del>}
        <p className="product-price fw-bold fs-5">{money(price(p))}</p>
        <div className="product-actions">
          <BotonEnlace
            className="btn btn-outline-primary"
            to={"/catalogo/" + p.id}
            aria-label={"Ver detalle de " + p.nombre}
          >
            Ver detalle
          </BotonEnlace>
          <Boton disabled={!p.stock} onClick={() => onAdd(p)}>
            {p.stock ? "Agregar al carrito" : "Sin stock"}
          </Boton>
        </div>
      </div>
    </article>
  );
}
