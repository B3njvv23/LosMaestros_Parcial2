import type { Product } from "../../types";
import { CardProducto } from "../moleculas/CardProducto";
export function ListaProductos({
  items,
  onAdd,
}: {
  items: Product[];
  onAdd: (p: Product) => void;
}) {
  return items.length ? (
    <div className="row g-4 product-grid">
      {items.map((p) => (
        <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
          <CardProducto product={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  ) : (
    <p role="status">No se encontraron productos.</p>
  );
}
