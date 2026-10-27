export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  stock: boolean;
  descripcion?: string;
  enOferta?: boolean;
  precioOferta?: number;
}
export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  correo: string;
  rol: "Administrador" | "Cliente";
  rut: string;
  tipo: string;
  region: string;
  comuna: string;
  direccion: string;
  fecha: string;
  clave: string;
}
export interface Message {
  id: string;
  nombre: string;
  correo: string;
  mensaje: string;
}
export interface CartLine {
  id: string;
  cantidad: number;
}
export type Errors = Record<string, string>;
