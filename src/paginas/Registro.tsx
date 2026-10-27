import { focusElement } from "../utils/focus";
import { useState } from "react";
import { Link } from "react-router-dom";

import { users } from "../data/repository";

import { FormularioUsuario } from "../componentes/organismos/FormularioUsuario";

import { Aviso } from "../componentes/atomos/Aviso";

export function Registro({
  embedded = false,
  onBack,
}: {
  embedded?: boolean;
  onBack?: () => void;
}) {
  const [done, setDone] = useState(false);
  return (
    <section className={embedded ? "embedded-registration" : "form-panel"}>
      {!embedded && <p className="eyebrow">Sé parte de Los Maestros</p>}
      <h1 id={embedded ? "login-title" : undefined} tabIndex={-1}>
        Crear cuenta
      </h1>
      <p className="form-intro">
        Completa tus datos para preparar tu próxima compra.
      </p>
      {done ? (
        <>
          <div id="registration-feedback" tabIndex={-1}>
            <Aviso text="Cuenta creada correctamente." />
          </div>
          {embedded ? (
            <button type="button" className="login-switch" onClick={onBack}>
              Iniciar sesión
            </button>
          ) : (
            <Link to="/login">Iniciar sesión</Link>
          )}
        </>
      ) : (
        <FormularioUsuario
          registration
          onSave={(u) => {
            users.create(u);
            setDone(true);
            focusElement("registration-feedback");
          }}
        />
      )}
      {embedded && !done && (
        <button
          type="button"
          className="login-switch registration-back"
          onClick={onBack}
        >
          Volver a iniciar sesión
        </button>
      )}
    </section>
  );
}

