import type { Product } from "../types";
import photos from "./product-photos.json";
const photoMap: Record<string, string> = photos;
// Conserva imágenes personalizadas; mejora registros antiguos sin modificar sus datos guardados.
export function productImage(product: Product): string {
  const current = product.imagen;
  const generic =
    !current ||
    current.includes("placehold.co") ||
    current === "/img/logo_maestros.jpg" ||
    current === "img/logo_maestros.jpg";
  return generic ? photoMap[product.id] || "/img/logo_maestros.jpg" : current;
}
export function isReferenceImage(product: Product): boolean {
  return productImage(product).startsWith("/img/catalogo/");
}
