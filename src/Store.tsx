import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, Product, CartLine } from "./types";
import { users, products, price } from "./repository";
interface Store {
  user: User | undefined;
  login: (email: string, password: string) => void;
  logout: () => void;
  cart: CartLine[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  checkout: () => void;
  refreshUser: () => void;
}
const Context = createContext<Store | undefined>(undefined);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(() => {
    const id = sessionStorage.getItem("maestros.session");
    return id ? users.get(id) : undefined;
  });
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const v: unknown = JSON.parse(
        localStorage.getItem("maestros.cart") || "[]",
      );
      return Array.isArray(v)
        ? v.filter(
            (x) =>
              typeof x.id === "string" &&
              Number.isInteger(x.cantidad) &&
              x.cantidad > 0,
          )
        : [];
    } catch {
      return [];
    }
  });
  function persist(v: CartLine[]) {
    localStorage.setItem("maestros.cart", JSON.stringify(v));
    setCart(v);
  }
  function login(email: string, password: string) {
    const u = users
      .list()
      .find(
        (u) =>
          u.correo.toLowerCase() === email.trim().toLowerCase() &&
          u.clave === password,
      );
    if (!u) throw Error("Correo o contraseña incorrectos.");
    sessionStorage.setItem("maestros.session", u.id);
    setUser(u);
  }
  function add(p: Product) {
    const current = products.get(p.id);
    if (!current?.stock) throw Error("El producto ya no está disponible.");
    persist(
      cart.some((c) => c.id === p.id)
        ? cart.map((c) =>
            c.id === p.id ? { ...c, cantidad: c.cantidad + 1 } : c,
          )
        : [...cart, { id: p.id, cantidad: 1 }],
    );
  }
  function checkout() {
    if (!user) throw Error("Inicia sesión para confirmar la compra simulada.");
    if (!cart.length) throw Error("El carrito está vacío.");
    if (cart.some((c) => !products.get(c.id)?.stock))
      throw Error(
        "Hay productos eliminados o sin stock. Quítalos del carrito.",
      );
    const total = cart.reduce(
      (n, c) => n + price(products.get(c.id)!) * c.cantidad,
      0,
    );
    localStorage.setItem(
      "maestros.lastOrder",
      JSON.stringify({
        id: crypto.randomUUID(),
        userId: user.id,
        cart,
        total,
        date: new Date().toISOString(),
      }),
    );
    persist([]);
  }
  return (
    <Context.Provider
      value={{
        user,
        cart,
        login,
        logout() {
          sessionStorage.removeItem("maestros.session");
          setUser(undefined);
        },
        add,
        remove: (id) => persist(cart.filter((c) => c.id !== id)),
        clear: () => persist([]),
        checkout,
        refreshUser() {
          setUser(user ? users.get(user.id) : undefined);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useStore() {
  const value = useContext(Context);
  if (!value) throw Error("Falta StoreProvider");
  return value;
}
