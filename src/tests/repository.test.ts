import { describe, it, expect, vi } from "vitest";
import { createRepository, filterProducts } from "../repository";
const sample = {
  id: "T1",
  nombre: "Taladro",
  categoria: "Herramientas",
  precio: 100,
  imagen: "",
  stock: true,
};
describe("Repository CRUD persistente", () => {
  it("lee todos los productos iniciales y un registro por ID", () => {
    const r = createRepository("t", [sample]);
    expect(r.list()).toEqual([sample]);
    expect(r.get("T1")).toEqual(sample);
  });
  it("crea y persiste un registro mediante Storage", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");
    const r = createRepository<typeof sample>("t", []);
    r.create(sample);
    expect(r.list()).toEqual([sample]);
    expect(spy).toHaveBeenCalledWith("t", JSON.stringify([sample]));
    spy.mockRestore();
  });
  it("actualiza un registro sin duplicarlo", () => {
    const r = createRepository("t", [sample]);
    r.update("T1", { ...sample, precio: 200 });
    expect(r.list()).toEqual([{ ...sample, precio: 200 }]);
  });
  it("elimina un registro y conserva los demás", () => {
    const r = createRepository("t", [sample, { ...sample, id: "T2" }]);
    r.remove("T1");
    expect(r.list().map((p) => p.id)).toEqual(["T2"]);
    expect(r.get("T1")).toBeUndefined();
  });
  
  
  
  
  
});
describe("Filtros y precios", () => {
  const list = [
    sample,
    {
      ...sample,
      id: "P2",
      nombre: "Pintura látex",
      categoria: "Pinturas",
      stock: false,
    },
  ];
  
  it("busca sin distinguir acentos ni mayúsculas", () =>
    expect(filterProducts(list, " LATEX ")).toEqual([list[1]]));
  
  it("combina categoría y disponibilidad", () =>
    expect(filterProducts(list, "", "Pinturas", true)).toEqual([]));
  
  
  
});
