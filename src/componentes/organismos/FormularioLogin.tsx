import { focusFirstError } from "../../utils/focus";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/Store";

import { emailValid } from "../../data/validation";
import type { Errors } from "../../types";

import { CampoFormulario } from "../moleculas/CampoFormulario";
import { Boton } from "../atomos/Boton";
import { Aviso } from "../atomos/Aviso";

export function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const { login } = useStore();
  const navigate = useNavigate();
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const errs: Errors = {};
        if (!emailValid(email)) errs.email = "Ingresa un correo válido.";
        if (password.length < 4 || password.length > 10)
          errs.password = "La contraseña debe tener entre 4 y 10 caracteres.";
        setErrors(errs);
        if (Object.keys(errs).length) {
          focusFirstError(form);
          return;
        }
        try {
          login(email, password);
          navigate("/perfil");
        } catch (e) {
          setErrors({ general: (e as Error).message });
          focusFirstError(form);
        }
      }}
    >
      <CampoFormulario
        label="Correo electrónico"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <CampoFormulario
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Aviso text={errors.general || ""} error />
      <Boton type="submit">Entrar</Boton>
    </form>
  );
}
