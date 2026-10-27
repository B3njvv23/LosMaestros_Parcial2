import { focusElement, focusFirstError } from "../utils/focus";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Errors } from "../types";
import {
  recoverPassword,
  validateRecovery,
  type RecoveryInput,
} from "../data/account";
import { CampoFormulario } from "../componentes/moleculas/CampoFormulario";
import { Boton } from "../componentes/atomos/Boton";
import { Aviso } from "../componentes/atomos/Aviso";
const empty: RecoveryInput = {
  correo: "",
  rut: "",
  clave: "",
  confirmation: "",
};
export function RecuperarContrasena() {
  const [value, setValue] = useState<RecoveryInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  return (
    <section className="form-panel">
      <p className="eyebrow">Recupera el acceso</p>
      <h1>Olvidé mi contraseña</h1>
      <p className="form-intro">
        Verifica tus datos y elige una nueva contraseña para tu cuenta.
      </p>
      <p className="form-helper">
        Recuperación local de demostración: usa el correo y RUN registrados en
        este navegador. No se envían correos. Las cuentas de prueba sin RUN
        utilizan las credenciales de demostración del inicio de sesión.
      </p>
      {done ? (
        <>
          <div id="recovery-feedback" tabIndex={-1}>
            <Aviso text="Contraseña actualizada correctamente. Ya puedes iniciar sesión." />
          </div>
          <Link className="btn btn-primary w-100" to="/login">
            Volver a iniciar sesión
          </Link>
        </>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const nextErrors = validateRecovery(value);
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length) {
              focusFirstError(form);
              return;
            }
            try {
              recoverPassword(value);
              setValue(empty);
              setDone(true);
              focusElement("recovery-feedback");
            } catch (e) {
              setErrors({ general: (e as Error).message });
              focusFirstError(form);
            }
          }}
        >
          <CampoFormulario
            label="Correo electrónico"
            type="email"
            value={value.correo}
            onChange={(correo) => setValue({ ...value, correo })}
            error={errors.correo}
          />
          <CampoFormulario
            label="RUN sin puntos ni guion"
            value={value.rut}
            onChange={(rut) => setValue({ ...value, rut })}
            error={errors.rut}
          />
          <CampoFormulario
            label="Nueva contraseña"
            type="password"
            value={value.clave}
            onChange={(clave) => setValue({ ...value, clave })}
            error={errors.clave}
          />
          <CampoFormulario
            label="Confirmar nueva contraseña"
            type="password"
            value={value.confirmation}
            onChange={(confirmation) => setValue({ ...value, confirmation })}
            error={errors.confirmation}
          />
          <Aviso text={errors.general || ""} error />
          <Boton type="submit">Restablecer contraseña</Boton>
          <Link className="d-block mt-3 text-center" to="/login">
            Volver al inicio de sesión
          </Link>
        </form>
      )}
    </section>
  );
}

