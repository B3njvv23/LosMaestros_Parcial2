import { FormularioLogin } from "../componentes/organismos/FormularioLogin";
import { Registro } from "./Registro";
import { focusElement } from "../focus";
import { useState } from "react";
import { Link } from "react-router-dom";

export function IniciarSesion() {
  const [registering, setRegistering] = useState(false);
  return (
    <section className="login-stage" aria-labelledby="login-title">
      <div
        className={`container login-layout ${registering ? "registration-layout" : ""}`}
      >
        <div className="login-card">
          <p className="login-kicker">TU ESPACIO EN LOS MAESTROS</p>
          {registering ? (
            <Registro
              embedded
              onBack={() => {
                setRegistering(false);
                focusElement("login-title");
              }}
            />
          ) : (
            <>
              <h1 id="login-title" tabIndex={-1}>
                Iniciar sesión
              </h1>
              <p className="login-intro">
                Qué bueno tenerte de vuelta. Sigamos construyendo.
              </p>
              <FormularioLogin />
              <div className="login-links">
                <Link to="/recuperar-contrasena">Olvidé mi contraseña</Link>
                <button
                  type="button"
                  className="login-switch"
                  onClick={() => {
                    setRegistering(true);
                    focusElement("login-title");
                  }}
                >
                  Crear cuenta
                </button>
              </div>
              <details className="demo-access">
                <summary>Acceso de demostración</summary>
                <p>
                  Administrador: admin@losmaestros.cl
                  <br />
                  Contraseña: Admin123
                </p>
              </details>
            </>
          )}
        </div>
        <div className="login-story">
          <p className="login-kicker">HERRAMIENTAS PARA LO QUE VIENE</p>
          <h2>
            Grandes proyectos.
            <br />
            Buenas manos.
          </h2>
          <p>
            Todo lo que necesitas para construir, reparar y hacer realidad tu
            próxima idea.
          </p>
          <Link to="/catalogo">
            Explora nuestro catálogo <span aria-hidden="true">↗</span>
          </Link>
          <span className="login-location">LOS MAESTROS · LA SERENA</span>
        </div>
      </div>
    </section>
  );
}
