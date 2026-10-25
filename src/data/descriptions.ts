import descriptions from "./product-descriptions.json";
import type { Product } from "../types";
const catalog: Record<string, string> = descriptions;
export function withProductDescription(p: Product): Product {
  if (p.descripcion?.trim() || !catalog[p.id]) return p;
  return { ...p, descripcion: catalog[p.id] };
}
