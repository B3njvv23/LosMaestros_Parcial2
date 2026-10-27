import { BotonEnlace } from "../componentes/atomos/BotonEnlace";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { products, money, price } from "../repository";
import { useStore } from "../Store";
import { Aviso } from "../componentes/atomos/Aviso";
import { Boton } from "../componentes/atomos/Boton";
import { ImagenProducto } from "../componentes/atomos/ImagenProducto";
import { isReferenceImage } from "../images";
export function DetalleProducto() {
  const { id } = useParams();
  const p = products.get(id || "");
  const { add } = useStore();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  if (!p)
    return (
      <>
        <h1>Producto no encontrado</h1>
        <BotonEnlace to="/catalogo">Volver al catálogo</BotonEnlace>
      </>
    );
  return (
    <>
      <BotonEnlace to="/catalogo">← Volver al catálogo</BotonEnlace>
      <div className="row g-5 mt-2 product-detail">
        <div className="col-md-6 detail-image-panel">
          <ImagenProducto className="detail-img" product={p} lazy={false} />
          {isReferenceImage(p) && (
            <p className="image-reference-detail">
              Fotografía referencial. La marca, color o presentación pueden
              variar.
            </p>
          )}
        </div>
        <section className="col-md-6">
          <p>
            {p.categoria} · {p.id}
          </p>
          <h1>{p.nombre}</h1>
          <p>
            {p.descripcion ||
              "Consulta a nuestro equipo para asesoría sobre este producto."}
          </p>
          {p.enOferta && <del>{money(p.precio)}</del>}
          <p className="fs-3 fw-bold">{money(price(p))}</p>
          <p className={"stock-label " + (p.stock ? "in-stock" : "out-stock")}>
            {p.stock ? "Disponible" : "Sin stock"}
          </p>
          <Boton
            disabled={!p.stock}
            onClick={() => {
              try {
                add(p);
                setError(false);
                setNotice("Producto agregado al carrito.");
              } catch (e) {
                setError(true);
                setNotice((e as Error).message);
              }
            }}
          >
            Agregar al carrito
          </Boton>
          <Aviso text={notice} error={error} />
        </section>
      </div>
    </>
  );
}
