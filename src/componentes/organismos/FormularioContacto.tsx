import { focusFirstError } from "../../focus";
import { useState } from "react";
import { messages } from "../../repository";
import { validateContact } from "../../validation";
import type { Errors } from "../../types";
import { CampoFormulario } from "../moleculas/CampoFormulario";
import { Boton } from "../atomos/Boton";
import { Aviso } from "../atomos/Aviso";
export function FormularioContacto() {
  const [v, setV] = useState({ nombre: "", correo: "", mensaje: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  return (
    <>
      <Aviso text={notice} />
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          setNotice("");
          const errs = validateContact(v);
          setErrors(errs);
          if (Object.keys(errs).length) {
            focusFirstError(form);
            return;
          }
          try {
            messages.create({ id: crypto.randomUUID(), ...v });
            setV({ nombre: "", correo: "", mensaje: "" });
            setNotice("Mensaje guardado correctamente.");
          } catch (e) {
            setErrors({ general: (e as Error).message });
            focusFirstError(form);
          }
        }}
      >
        {(["nombre", "correo", "mensaje"] as const).map((k) => (
          <CampoFormulario
            key={k}
            label={
              {
                nombre: "Nombre completo",
                correo: "Correo electrónico",
                mensaje: "Mensaje",
              }[k]
            }
            value={v[k]}
            onChange={(s) => setV({ ...v, [k]: s })}
            multiline={k === "mensaje"}
            error={errors[k]}
          />
        ))}
        <Aviso text={errors.general || ""} error />
        <Boton type="submit">Enviar mensaje</Boton>
      </form>
    </>
  );
}
