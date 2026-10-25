import type { Errors } from "../types";
import { users } from "./repository";
import { emailValid, rutValid } from "./validation";
export interface RecoveryInput {
  correo: string;
  rut: string;
  clave: string;
  confirmation: string;
}
export function validateRecovery(v: RecoveryInput): Errors {
  const errors: Errors = {};
  if (!emailValid(v.correo.trim())) errors.correo = "Ingresa un correo válido.";
  if (!rutValid(v.rut.trim()))
    errors.rut = "Ingresa tu RUN válido sin puntos ni guion.";
  if (v.clave.length < 4 || v.clave.length > 10)
    errors.clave = "La contraseña debe tener entre 4 y 10 caracteres.";
  if (!v.confirmation) errors.confirmation = "Confirma tu nueva contraseña.";
  else if (v.confirmation !== v.clave)
    errors.confirmation = "Las contraseñas no coinciden.";
  return errors;
}
// Recuperación del prototipo local: no es un servicio de restablecimiento por email.
export function recoverPassword(v: RecoveryInput): void {
  if (Object.keys(validateRecovery(v)).length)
    throw Error("Revisa los datos del formulario.");
  const user = users
    .list()
    .find(
      (u) =>
        u.correo.toLowerCase() === v.correo.trim().toLowerCase() &&
        u.rut.toUpperCase() === v.rut.trim().toUpperCase(),
    );
  if (!user)
    throw Error(
      "El correo y el RUN no corresponden a una cuenta registrada en este navegador.",
    );
  users.update(user.id, { ...user, clave: v.clave });
}
