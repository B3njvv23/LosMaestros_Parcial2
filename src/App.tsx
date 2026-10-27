import { Component, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/Store";
import { Estructura } from "./componentes/organismos/Estructura";
import { Productos } from "./paginas/Productos";
import { DetalleProducto } from "./paginas/DetalleProducto";
import { Inicio } from "./paginas/Inicio";
import { Contacto } from "./paginas/Contacto";
import { Carrito } from "./paginas/Carrito";
import { IniciarSesion } from "./paginas/IniciarSesion";
import { Registro } from "./paginas/Registro";
import { Perfil } from "./paginas/Perfil";
import { RecuperarContrasena } from "./paginas/RecuperarContrasena";
import { Administracion } from "./paginas/Administracion";
import { ProteccionAdministracion } from "./componentes/organismos/ProteccionAdministracion";
import { AdministrarProductos } from "./paginas/AdministrarProductos";
import { AdministrarUsuarios } from "./paginas/AdministrarUsuarios";
import { Nosotros } from "./paginas/Nosotros";
import { Novedades } from "./paginas/Novedades";
import { DetalleNovedad } from "./paginas/DetalleNovedad";
import { PaginaNoEncontrada } from "./paginas/PaginaNoEncontrada";
class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: string }
> {
  state = { error: "" };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    return this.state.error ? (
      <main className="container py-5">
        <h1>No se pudo cargar la aplicación</h1>
        <p role="alert">{this.state.error}</p>
        <button className="btn btn-primary" onClick={() => location.reload()}>
          Reintentar
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Estructura />}>
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Productos />} />
        <Route path="catalogo/:id" element={<DetalleProducto />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<IniciarSesion />} />
        <Route path="registro" element={<Registro />} />
        <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="novedades" element={<Novedades />} />
        <Route path="novedades/:id" element={<DetalleNovedad />} />
        <Route
          path="admin"
          element={
            <ProteccionAdministracion>
              <Administracion />
            </ProteccionAdministracion>
          }
        />
        <Route
          path="admin/productos"
          element={
            <ProteccionAdministracion>
              <AdministrarProductos />
            </ProteccionAdministracion>
          }
        />
        <Route
          path="admin/usuarios"
          element={
            <ProteccionAdministracion>
              <AdministrarUsuarios />
            </ProteccionAdministracion>
          }
        />
        {Object.entries({
          "index.html": "/",
          "catalogo.html": "/catalogo",
          "nosotros.html": "/nosotros",
          "contacto.html": "/contacto",
          "login.html": "/login",
          "registro.html": "/registro",
          "perfil.html": "/perfil",
          "novedades.html": "/novedades",
          "novedad1.html": "/novedades/1",
          "novedad2.html": "/novedades/2",
          "admin.html": "/admin",
          "admin-productos.html": "/admin/productos",
          "admin-usuarios.html": "/admin/usuarios",
        }).map(([old, to]) => (
          <Route key={old} path={old} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Route>
    </Routes>
  );
}
export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <StoreProvider>
          <AppRoutes />
        </StoreProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

