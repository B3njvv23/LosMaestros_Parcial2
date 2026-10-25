import type { Errors, Product, User } from "../types";
import { regions } from "./seed";
export const emailValid = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 100;
export function rutValid(s: string) {
  if (!/^\d{7,8}[\dkK]$/.test(s)) return false;
  let total = 0,
    m = 2;
  for (const c of s.slice(0, -1).split("").reverse()) {
    total += Number(c) * m;
    m = m === 7 ? 2 : m + 1;
  }
  const dv = 11 - (total % 11);
  return (
    s.slice(-1).toUpperCase() ===
    (dv === 11 ? "0" : dv === 10 ? "K" : String(dv))
  );
}
export function validateProduct(p: Product): Errors {
  const e: Errors = {};
  if (!/^[A-Za-z0-9_-]{2,20}$/.test(p.id))
    e.id = "Usa entre 2 y 20 letras, números, guion o guion bajo.";
  if (!p.nombre.trim() || p.nombre.length > 100)
    e.nombre = "Nombre obligatorio, máximo 100 caracteres.";
  if (!p.categoria.trim()) e.categoria = "La categoría es obligatoria.";
  if (
    !Number.isFinite(p.precio) ||
    !Number.isInteger(p.precio) ||
    p.precio <= 0
  )
    e.precio = "El precio debe ser un entero mayor que cero.";
  if (
    p.enOferta &&
    (!Number.isInteger(p.precioOferta) ||
      !p.precioOferta ||
      p.precioOferta <= 0 ||
      p.precioOferta >= p.precio)
  )
    e.precioOferta =
      "La oferta debe ser un entero mayor que cero y menor al precio normal.";
  return e;
}
export function validateUser(u: User, registration = false): Errors {
  const e: Errors = {};
  if (!["Administrador", "Cliente"].includes(u.rol))
    e.rol = "Selecciona un rol válido.";
  if (!u.nombre.trim() || u.nombre.length > 50)
    e.nombre = "Nombre obligatorio, máximo 50 caracteres.";
  if (!emailValid(u.correo))
    e.correo = "Ingresa un correo válido, máximo 100 caracteres.";
  if (u.clave.length < 4 || u.clave.length > 10)
    e.clave = "La contraseña debe tener entre 4 y 10 caracteres.";
  if (registration) {
    if (!rutValid(u.rut)) e.rut = "Ingresa un RUN válido sin puntos ni guion.";
    if (!u.apellidos.trim() || u.apellidos.length > 100)
      e.apellidos = "Apellidos obligatorios, máximo 100 caracteres.";
    if (!["particular", "contratista"].includes(u.tipo))
      e.tipo = "Selecciona el tipo de cliente.";
    if (!regions.some((r) => r.nombre === u.region))
      e.region = "Selecciona una región.";
    if (!regions.find((r) => r.nombre === u.region)?.comunas.includes(u.comuna))
      e.comuna = "Selecciona región y comuna.";
    if (!u.direccion.trim() || u.direccion.length > 300)
      e.direccion = "Dirección obligatoria, máximo 300 caracteres.";
    if (
      u.fecha &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(u.fecha) ||
        Number.isNaN(Date.parse(u.fecha)) ||
        new Date(u.fecha) > new Date())
    )
      e.fecha = "La fecha de nacimiento no puede ser futura ni inválida.";
  }
  return e;
}
export function validateContact(v: Record<string, string>): Errors {
  const e: Errors = {};
  if (!v.nombre.trim() || v.nombre.length > 100)
    e.nombre = "Nombre obligatorio, máximo 100 caracteres.";
  if (!emailValid(v.correo)) e.correo = "Ingresa un correo válido.";
  if (!v.mensaje.trim() || v.mensaje.length > 500)
    e.mensaje = "Mensaje obligatorio, máximo 500 caracteres.";
  return e;
}
