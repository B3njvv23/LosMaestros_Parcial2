import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { StoreProvider } from "./context/Store";
import { Estructura } from "./componentes/organismos/Estructura";
import { Inicio } from "./paginas/Inicio";
import { Productos } from "./paginas/Productos";
import { DetalleProducto } from "./paginas/DetalleProducto";
import { Contacto } from "./paginas/Contacto";
import { Nosotros } from "./paginas/Nosotros";
import { Novedades } from "./paginas/Novedades";
import { DetalleNovedad } from "./paginas/DetalleNovedad";
import { IniciarSesion } from "./paginas/IniciarSesion";
import { Registro } from "./paginas/Registro";
import { Perfil } from "./paginas/Perfil";
import { RecuperarContrasena } from "./paginas/RecuperarContrasena";

export function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route element={<Estructura />}>
            <Route index element={<Inicio />} />
            <Route path="catalogo" element={<Productos />} />
            <Route path="catalogo/:id" element={<DetalleProducto />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="novedades" element={<Novedades />} />
            <Route path="novedades/:id" element={<DetalleNovedad />} />
            <Route path="login" element={<IniciarSesion />} />
            <Route path="registro" element={<Registro />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route
              path="*"
              element={
                <section className="py-5 text-center">
                  <h1>Página no encontrada</h1>
                  <p>La dirección solicitada no está disponible.</p>
                  <Link className="btn btn-primary" to="/">Volver al inicio</Link>
                </section>
              }
            />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}
