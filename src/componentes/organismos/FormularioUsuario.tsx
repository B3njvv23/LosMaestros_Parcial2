import { focusFirstError } from "../../utils/focus";
import { useState } from "react";
import type { User, Errors } from "../../types";
import { users } from "../../data/repository";
import { regions } from "../../data/seed";
import { validateUser } from "../../data/validation";
import { CampoFormulario } from "../moleculas/CampoFormulario";
import { Boton } from "../atomos/Boton";
import { Aviso } from "../atomos/Aviso";
export const emptyUser: User = {
  id: "",
  nombre: "",
  apellidos: "",
  correo: "",
  rol: "Cliente",
  rut: "",
  tipo: "",
  region: "",
  comuna: "",
  direccion: "",
  fecha: "",
  clave: "",
};
export function FormularioUsuario({
  initial = emptyUser,
  registration = false,
  onSave,
  allowRole = false,
}: {
  initial?: User;
  registration?: boolean;
  onSave: (u: User) => void;
  allowRole?: boolean;
}) {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [confirmation, setConfirmation] = useState("");
  function field(
    k: keyof User,
    label: string,
    options?: string[],
    type = "text",
  ) {
    return (
      <CampoFormulario
        key={k}
        label={label}
        value={v[k]}
        type={type}
        options={options}
        error={errors[k]}
        onChange={(s) =>
          setV({ ...v, [k]: s, ...(k === "region" ? { comuna: "" } : {}) })
        }
      />
    );
  }
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const next = {
          ...v,
          nombre: v.nombre.trim(),
          correo: v.correo.trim().toLowerCase(),
        };
        const errs = validateUser(next, registration);
        if (registration && !confirmation)
          errs.confirmation = "Confirma tu contraseña.";
        else if (registration && confirmation !== v.clave)
          errs.confirmation = "Las contraseñas no coinciden.";
        if (
          users
            .list()
            .some(
              (u) => u.id !== v.id && u.correo.toLowerCase() === next.correo,
            )
        )
          errs.correo = "Este correo ya está registrado.";
        if (
          registration &&
          !errs.rut &&
          users
            .list()
            .some(
              (u) =>
                u.id !== v.id && u.rut.toUpperCase() === v.rut.toUpperCase(),
            )
        )
          errs.rut = "Este RUN ya está registrado.";
        setErrors(errs);
        if (Object.keys(errs).length) {
          focusFirstError(form);
          return;
        }
        try {
          onSave({ ...next, id: next.id || crypto.randomUUID() });
        } catch (e) {
          setErrors({ general: (e as Error).message });
          focusFirstError(form);
        }
      }}
    >
      {field("nombre", "Nombre")}
      {registration && field("apellidos", "Apellidos")}
      {field("correo", "Correo electrónico", undefined, "email")}
      {field("clave", "Contraseña", undefined, "password")}
      {registration && (
        <CampoFormulario
          label="Confirmar contraseña"
          type="password"
          value={confirmation}
          onChange={setConfirmation}
          error={errors.confirmation}
        />
      )}
      {allowRole && field("rol", "Rol", ["Administrador", "Cliente"])}
      {registration && (
        <>
          {field("rut", "RUN sin puntos ni guion")}
          {field("fecha", "Fecha de nacimiento (opcional)", undefined, "date")}
          {field("tipo", "Tipo de cliente", ["particular", "contratista"])}
          {field(
            "region",
            "Región",
            regions.map((r) => r.nombre),
          )}
          {field(
            "comuna",
            "Comuna",
            regions.find((r) => r.nombre === v.region)?.comunas || [],
          )}
          {field("direccion", "Dirección")}
        </>
      )}
      <Aviso text={errors.general || ""} error />
      <Boton type="submit">
        {registration ? "Registrarse" : "Guardar usuario"}
      </Boton>
    </form>
  );
}
