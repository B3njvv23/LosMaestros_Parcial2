import { useState } from "react";
import { Link } from "react-router-dom";
import { products, filterProducts } from "../../data/repository";
import { useStore } from "../../context/Store";
import type { Product } from "../../types";
import { ListaProductos } from "./ListaProductos";
import { CampoFormulario } from "../moleculas/CampoFormulario";
import { Aviso } from "../atomos/Aviso";
import { Boton } from "../atomos/Boton";
export function CatalogoProductos({ home = false }: { home?: boolean }) {
  const [items] = useState(() => products.list());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [onlyStock, setOnlyStock] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const { add } = useStore();
  const onAdd = (p: Product) => {
    try {
      add(p);
      setError(false);
      setNotice(p.nombre + " agregado al carrito.");
    } catch (e) {
      setError(true);
      setNotice((e as Error).message);
    }
  };
  const list = home
    ? items.filter((p) =>
        ["HE001", "TR005", "SE003", "MC004", "MD004", "HM007"].includes(p.id),
      )
    : filterProducts(items, query, category, onlyStock);
  return (
    <>
      {home && (
        <>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">
                <span />
                Para quienes construyen
              </p>
              <h1>
                Grandes proyectos.
                <br />
                <span>Buenos comienzos.</span>
              </h1>
              <p className="hero-description">
                Las herramientas y materiales que necesitas, con la atención de
                una ferretería de siempre.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-warning" to="/catalogo">
                  Explorar catálogo <span aria-hidden="true">↗</span>
                </Link>
                <Link className="hero-secondary" to="/contacto">
                  Te ayudamos a elegir <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-note">
                <span className="hero-note-line" />
                Desde La Serena, junto a tus proyectos.
              </div>
            </div>
            <div className="hero-caption">
              <span>LOS MAESTROS</span>
              <small>Herramientas para hacerlo posible.</small>
            </div>
          </section>
          <section className="service-strip" aria-label="Nuestra ferretería">
            {[
              [
                "01",
                "Todo en un lugar",
                "Herramientas y materiales para cada etapa.",
              ],
              [
                "02",
                "Atención cercana",
                "Para particulares, maestros y contratistas.",
              ],
              [
                "03",
                "Elige con confianza",
                "Revisa precios y disponibilidad en el catálogo.",
              ],
            ].map(([n, title, text]) => (
              <div className="service-item" key={n}>
                <span>{n}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {home ? "Una selección para comenzar" : "Materiales y herramientas"}
          </p>
          {home ? <h2>Productos destacados</h2> : <h1>Catálogo completo</h1>}
          <p className="section-description">
            Encuentra materiales, compara precios y prepara tu selección.
          </p>
        </div>
        {home && (
          <Link className="text-link" to="/catalogo">
            Ver todo el catálogo <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      {!home && (
        <section
          className="filter-panel row g-3 align-items-center mb-4"
          aria-label="Filtros de productos"
        >
          <div className="col-md-6">
            <CampoFormulario
              label="Buscar por nombre o código"
              value={query}
              onChange={setQuery}
            />
          </div>
          <div className="col-md-4">
            <CampoFormulario
              label="Categoría"
              value={category}
              onChange={setCategory}
              options={[...new Set(items.map((p) => p.categoria))]}
            />
          </div>
          <div className="col-md-2">
            <label>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={onlyStock}
                onChange={(e) => setOnlyStock(e.target.checked)}
              />
              Solo disponibles
            </label>
          </div>
          <p className="filter-count col-auto me-auto mb-0">
            {list.length} productos encontrados
          </p>
          <div className="col-auto">
            <Boton
              className="btn-sm btn-filter-reset"
              onClick={() => {
                setQuery("");
                setCategory("");
                setOnlyStock(false);
              }}
            >
              Limpiar filtros
            </Boton>
          </div>
        </section>
      )}
      <Aviso text={notice} error={error} />
      <ListaProductos items={list} onAdd={onAdd} />
      {home && (
        <section className="project-callout">
          <div>
            <p className="eyebrow">Tu proyecto, acompañado</p>
            <h2>¿No sabes por dónde empezar?</h2>
            <p>
              Cuéntanos qué tienes en mente. Te ayudamos a encontrar lo que
              necesitas.
            </p>
          </div>
          <Link className="btn btn-primary" to="/contacto">
            Hablemos de tu proyecto <span aria-hidden="true">↗</span>
          </Link>
        </section>
      )}
    </>
  );
}
