import { focusElement, focusPanel } from "../utils/focus";
import { useState } from "react";
import { Link } from "react-router-dom";

import { products, filterProducts, money } from "../data/repository";
import type { Product } from "../types";
import { FormularioProducto } from "../componentes/organismos/FormularioProducto";

import { CampoFormulario } from "../componentes/moleculas/CampoFormulario";
import { Boton } from "../componentes/atomos/Boton";
import { Aviso } from "../componentes/atomos/Aviso";

export function AdministrarProductos() {
  const [items, setItems] = useState(() => products.list());
  const [selected, setSelected] = useState<Product>();
  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState<Product>();
  const reload = () => setItems(products.list());
  return (
    <>
      <Link to="/admin">← Administración</Link>
      <h1>Gestionar productos</h1>
      <a href="#form-producto" className="text-link mb-3">
        Ir al formulario de producto ↓
      </a>
      <Aviso text={notice} error={error} />
      <div className="row g-4">
        <section className="col-lg-8">
          <CampoFormulario
            label="Buscar productos"
            value={query}
            onChange={setQuery}
          />
          <p>{filterProducts(items, query).length} productos</p>
          {pending && (
            <div
              className="alert alert-warning"
              role="alert"
              tabIndex={-1}
              id="confirm-producto"
            >
              ¿Eliminar {pending.nombre}?{" "}
              <Boton
                className="btn-danger me-2"
                onClick={() => {
                  try {
                    products.remove(pending.id);
                    reload();
                    if (selected?.id === pending.id) {
                      setSelected(undefined);
                      setVersion((v) => v + 1);
                    }
                    setNotice("Producto eliminado.");
                    setError(false);
                  } catch (e) {
                    setError(true);
                    setNotice((e as Error).message);
                  }
                  setPending(undefined);
                  focusElement("products-table");
                }}
              >
                Confirmar eliminación
              </Boton>
              <Boton
                onClick={() => {
                  setPending(undefined);
                  focusElement("products-table");
                }}
              >
                Cancelar eliminación
              </Boton>
            </div>
          )}
          <div
            className="table-responsive admin-table"
            role="region"
            id="products-table"
            aria-label="Tabla de productos, desplazable"
            tabIndex={0}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filterProducts(items, query).map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <Link to={"/catalogo/" + p.id}>{p.nombre}</Link>
                    </td>
                    <td>{money(p.precio)}</td>
                    <td>{p.stock ? "Disponible" : "Sin stock"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Boton
                          aria-label={"Editar " + p.nombre}
                          className="btn-sm"
                          onClick={() => {
                            setSelected(p);
                            setVersion((v) => v + 1);
                            focusPanel("form-producto");
                          }}
                        >
                          Editar
                        </Boton>
                        <Boton
                          aria-label={"Eliminar " + p.nombre}
                          className="btn-sm btn-danger"
                          onClick={() => {
                            setPending(p);
                            focusPanel("confirm-producto");
                          }}
                        >
                          Eliminar
                        </Boton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!filterProducts(items, query).length && (
            <p>No se encontraron productos.</p>
          )}
        </section>
        <section className="col-lg-4" id="form-producto" tabIndex={-1}>
          <h2 className="h4">
            {selected ? "Editar producto" : "Nuevo producto"}
          </h2>
          {selected && (
            <Boton
              className="mb-3"
              onClick={() => {
                setSelected(undefined);
                setVersion((v) => v + 1);
              }}
            >
              Cancelar edición
            </Boton>
          )}
          <FormularioProducto
            key={version}
            initial={selected}
            onSave={(p) => {
              if (selected) products.update(selected.id, p);
              else products.create(p);
              reload();
              setSelected(undefined);
              setVersion((v) => v + 1);
              setError(false);
              setNotice("Producto guardado.");
              focusPanel("form-producto");
            }}
          />
        </section>
      </div>
    </>
  );
}

