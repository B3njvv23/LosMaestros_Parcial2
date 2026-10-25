import { focusFirstError } from "../../utils/focus";
import { useState } from "react";
import type { Product, Errors } from "../../types";
import { validateProduct } from "../../data/validation";
import { CampoFormulario } from "../moleculas/CampoFormulario";
import { Boton } from "../atomos/Boton";
import { Aviso } from "../atomos/Aviso";
export const emptyProduct: Product = {
  id: "",
  nombre: "",
  categoria: "",
  precio: 0,
  imagen: "/img/logo_maestros.jpg",
  stock: true,
  descripcion: "",
  enOferta: false,
  precioOferta: 0,
};
export function FormularioProducto({
  initial = emptyProduct,
  onSave,
}: {
  initial?: Product;
  onSave: (p: Product) => void;
}) {
  const [p, setP] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const next = {
          ...p,
          id: p.id.trim(),
          nombre: p.nombre.trim(),
          categoria: p.categoria.trim(),
        };
        const errs = validateProduct(next);
        setErrors(errs);
        if (Object.keys(errs).length) {
          focusFirstError(form);
          return;
        }
        try {
          onSave(next);
        } catch (e) {
          setErrors({ general: (e as Error).message });
          focusFirstError(form);
        }
      }}
    >
      <CampoFormulario
        label="Código"
        value={p.id}
        disabled={!!initial.id}
        onChange={(id) => setP({ ...p, id })}
        error={errors.id}
      />
      <CampoFormulario
        label="Nombre"
        value={p.nombre}
        onChange={(nombre) => setP({ ...p, nombre })}
        error={errors.nombre}
      />
      <CampoFormulario
        label="Categoría"
        value={p.categoria}
        onChange={(categoria) => setP({ ...p, categoria })}
        error={errors.categoria}
      />
      <CampoFormulario
        hint="En pesos chilenos, sin puntos: escribe 6990 para mostrar $6.990."
        label="Precio"
        type="number"
        value={Number.isFinite(p.precio) ? String(p.precio) : ""}
        onChange={(precio) =>
          setP({ ...p, precio: precio === "" ? NaN : Number(precio) })
        }
        error={errors.precio}
      />
      <CampoFormulario
        label="Descripción"
        multiline
        value={p.descripcion || ""}
        onChange={(descripcion) => setP({ ...p, descripcion })}
      />
      <label className="d-block mb-3">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={p.stock}
          onChange={(e) => setP({ ...p, stock: e.target.checked })}
        />
        Disponible
      </label>
      <label className="d-block mb-3">
        <input
          className="form-check-input me-2"
          type="checkbox"
          checked={!!p.enOferta}
          onChange={(e) => setP({ ...p, enOferta: e.target.checked })}
        />
        En oferta
      </label>
      {p.enOferta && (
        <CampoFormulario
          hint="Sin puntos ni decimales. Ejemplo: 5990 se muestra como $5.990."
          label="Precio de oferta"
          type="number"
          value={String(p.precioOferta || 0)}
          onChange={(s) => setP({ ...p, precioOferta: Number(s) })}
          error={errors.precioOferta}
        />
      )}
      <Aviso text={errors.general || ""} error />
      <Boton type="submit">Guardar producto</Boton>
    </form>
  );
}
