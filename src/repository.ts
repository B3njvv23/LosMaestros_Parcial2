import type { Product, User, Message } from "./types";
import { seedProducts, seedUsers } from "./seed";
import { withProductDescription } from "./descriptions";
export interface Repository<T extends { id: string }> {
  list(): T[];
  get(id: string): T | undefined;
  create(item: T): T;
  update(id: string, item: T): T;
  remove(id: string): void;
}
// Repository separa el almacenamiento de los componentes y permite inyectar Storage en pruebas.
export function createRepository<T extends { id: string }>(
  key: string,
  seed: T[],
  storage: Storage = localStorage,
): Repository<T> {
  const list = (): T[] => {
    const raw = storage.getItem(key);
    if (raw === null) return structuredClone(seed);
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        !Array.isArray(parsed) ||
        !parsed.every((x) => x && typeof x.id === "string")
      )
        throw Error();
      return parsed as T[];
    } catch {
      throw new Error(
        "Los datos guardados están dañados. Restablece los datos del sitio en el navegador.",
      );
    }
  };
  const save = (items: T[]) => {
    storage.setItem(key, JSON.stringify(items));
  };
  return {
    list,
    get: (id) => list().find((x) => x.id === id),
    create(item) {
      const items = list();
      if (items.some((x) => x.id === item.id))
        throw Error("El identificador ya existe.");
      save([...items, item]);
      return item;
    },
    update(id, item) {
      const items = list();
      if (!items.some((x) => x.id === id))
        throw Error("El registro no existe.");
      if (item.id !== id) throw Error("No se puede cambiar el identificador.");
      save(items.map((x) => (x.id === id ? item : x)));
      return item;
    },
    remove(id) {
      const items = list();
      if (!items.some((x) => x.id === id))
        throw Error("El registro no existe.");
      save(items.filter((x) => x.id !== id));
    },
  };
}
const productRepository = createRepository<Product>(
  "maestros.ep2.products",
  seedProducts,
);
export const products: Repository<Product> = {
  ...productRepository,
  list: () => productRepository.list().map(withProductDescription),
  get: (id) => {
    const p = productRepository.get(id);
    return p ? withProductDescription(p) : undefined;
  },
};
export const users = createRepository<User>("maestros.ep2.users", seedUsers);
export const messages = createRepository<Message>("maestros.ep2.messages", []);
export function filterProducts(
  items: Product[],
  query: string,
  category = "",
  stockOnly = false,
) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return items.filter(
    (p) =>
      normalize(p.nombre + " " + p.id).includes(normalize(query.trim())) &&
      (!category || p.categoria === category) &&
      (!stockOnly || p.stock),
  );
}
export const price = (p: Product) =>
  p.enOferta && p.precioOferta !== undefined ? p.precioOferta : p.precio;
export const money = (n: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(
    n,
  );
