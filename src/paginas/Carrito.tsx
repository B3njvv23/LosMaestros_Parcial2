import { focusElement } from "../focus";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../Store";
import { products, money, price } from "../repository";
import { Boton } from "../componentes/atomos/Boton";
import { Aviso } from "../componentes/atomos/Aviso";
export function Carrito() {
  const { cart, remove, clear, checkout } = useStore();
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const total = cart.reduce((sum, c) => {
    const p = products.get(c.id);
    return sum + (p ? price(p) * c.cantidad : 0);
  }, 0);
  return (
    <>
      <h1 id="cart-title" tabIndex={-1}>
        Mi carrito
      </h1>
      <div id="cart-feedback" tabIndex={-1}>
        <Aviso text={notice} error={error} />
      </div>
      {cart.length ? (
        <>
          <div
            className="table-responsive"
            role="region"
            aria-label="Carrito, tabla desplazable"
            tabIndex={0}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((c) => {
                  const p = products.get(c.id);
                  return (
                    <tr key={c.id}>
                      <td>
                        {p?.nombre || "Producto eliminado"}
                        {p && !p.stock && " — Sin stock"}
                      </td>
                      <td>{c.cantidad}</td>
                      <td>{p ? money(price(p) * c.cantidad) : "—"}</td>
                      <td>
                        <Boton
                          onClick={() => {
                            remove(c.id);
                            setNotice("");
                            setError(false);
                            focusElement("cart-title");
                          }}
                          aria-label={"Quitar " + (p?.nombre || c.id)}
                        >
                          Quitar
                        </Boton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="fs-4 fw-bold">Total: {money(total)}</p>
          <div className="d-flex flex-wrap gap-2">
            <Boton
              className="btn-danger"
              onClick={() => {
                clear();
                setNotice("");
                setError(false);
                focusElement("cart-title");
              }}
            >
              Vaciar selección
            </Boton>
            <Boton
              onClick={() => {
                try {
                  checkout();
                  setError(false);
                  setNotice(
                    "Compra simulada confirmada. No se realizó ningún cobro.",
                  );
                } catch (e) {
                  setError(true);
                  setNotice((e as Error).message);
                }
                focusElement("cart-feedback");
              }}
            >
              Confirmar compra simulada
            </Boton>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <Link className="d-block mt-3" to="/catalogo">
        Seguir comprando
      </Link>
    </>
  );
}
