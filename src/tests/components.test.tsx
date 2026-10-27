import { assetUrl } from "../assets";
import { it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Boton } from "../componentes/atomos/Boton";
import { Aviso } from "../componentes/atomos/Aviso";
import { CardProducto } from "../componentes/moleculas/CardProducto";
import { ListaProductos } from "../componentes/organismos/ListaProductos";
import { FormularioProducto } from "../componentes/organismos/FormularioProducto";
import { FormularioUsuario } from "../componentes/organismos/FormularioUsuario";
import { Contacto } from "../paginas/Contacto";
import { messages, products, users } from "../repository";
import { StoreProvider } from "../Store";
import { AppRoutes } from "../App";
const p = {
  id: "T1",
  nombre: "Taladro de prueba",
  categoria: "Herramientas",
  precio: 10000,
  imagen: "/img/logo_maestros.jpg",
  stock: true,
};
function app(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </MemoryRouter>,
  );
}
it("Button transmite propiedades y ejecuta el evento", async () => {
  const click = vi.fn();
  render(<Boton onClick={click}>Guardar</Boton>);
  await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
  expect(click).toHaveBeenCalledTimes(1);
});
it("Notice solo muestra errores cuando hay mensaje", () => {
  const { rerender } = render(<Aviso text="" error />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  rerender(<Aviso text="Error específico" error />);
  expect(screen.getByRole("alert")).toHaveTextContent("Error específico");
});
it("ProductCard muestra propiedades y comunica el producto al agregar", async () => {
  const add = vi.fn();
  render(
    <MemoryRouter>
      <CardProducto product={p} onAdd={add} />
    </MemoryRouter>,
  );
  expect(screen.getByRole("heading", { name: p.nombre })).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("src", assetUrl(p.imagen));
  await userEvent.click(
    screen.getByRole("button", { name: "Agregar al carrito" }),
  );
  expect(add).toHaveBeenCalledWith(p);
});
it("un producto sin stock desactiva agregar", async () => {
  const add = vi.fn();
  render(
    <MemoryRouter>
      <CardProducto product={{ ...p, stock: false }} onAdd={add} />
    </MemoryRouter>,
  );
  const b = screen.getByRole("button", { name: "Sin stock" });
  expect(b).toBeDisabled();
  await userEvent.click(b);
  expect(add).not.toHaveBeenCalled();
});
it("la grilla renderiza todos los elementos esperados", () => {
  render(
    <MemoryRouter>
      <ListaProductos
        items={[p, { ...p, id: "T2", nombre: "Serrucho de prueba" }]}
        onAdd={vi.fn()}
      />
    </MemoryRouter>,
  );
  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(screen.getByText("Serrucho de prueba")).toBeVisible();
  expect(screen.getByText(p.nombre)).toBeVisible();
});

it("el formulario de producto no guarda datos inválidos", async () => {
  const save = vi.fn();
  render(<FormularioProducto onSave={save} />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  await userEvent.click(
    screen.getByRole("button", { name: "Guardar producto" }),
  );
  expect(screen.getAllByRole("alert")).toHaveLength(4);
  expect(save).not.toHaveBeenCalled();
});

it("contacto muestra errores específicos y no persiste entradas inválidas", async () => {
  render(<Contacto />);
  await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(screen.getAllByRole("alert")).toHaveLength(3);
  expect(messages.list()).toEqual([]);
});
it("contacto válido persiste y limpia los errores anteriores", async () => {
  render(<Contacto />);
  await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  await userEvent.type(screen.getByLabelText("Nombre completo"), "Ana");
  await userEvent.type(
    screen.getByLabelText("Correo electrónico"),
    "ana@test.cl",
  );
  await userEvent.type(screen.getByLabelText("Mensaje"), "Necesito un taladro");
  await userEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Mensaje guardado");
  expect(messages.list()).toEqual([
    expect.objectContaining({ nombre: "Ana", mensaje: "Necesito un taladro" }),
  ]);
  expect(screen.getByLabelText("Nombre completo")).toHaveValue("");
});
it("cambiar región reinicia la comuna y actualiza sus opciones", async () => {
  render(<FormularioUsuario registration onSave={vi.fn()} />);
  await userEvent.selectOptions(screen.getByLabelText("Región"), "Coquimbo");
  await userEvent.selectOptions(screen.getByLabelText("Comuna"), "La Serena");
  await userEvent.selectOptions(
    screen.getByLabelText("Región"),
    "Metropolitana",
  );
  expect(screen.getByLabelText("Comuna")).toHaveValue("");
  expect(
    within(screen.getByLabelText("Comuna")).getByRole("option", {
      name: "Santiago",
    }),
  ).toBeInTheDocument();
  expect(
    within(screen.getByLabelText("Comuna")).queryByRole("option", {
      name: "La Serena",
    }),
  ).not.toBeInTheDocument();
});
it("catálogo muestra todos los productos y filtra desde la interfaz", async () => {
  app("/catalogo");
  expect(screen.getAllByRole("article")).toHaveLength(products.list().length);
  await userEvent.type(
    screen.getByLabelText("Buscar por nombre o código"),
    "HE001",
  );
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(
    screen.getByRole("heading", { name: "Taladro percutor 650W 13mm" }),
  ).toBeVisible();
  await userEvent.click(
    screen.getByRole("button", { name: "Limpiar filtros" }),
  );
  expect(screen.getAllByRole("article")).toHaveLength(products.list().length);
});
it("ruta con parámetro muestra detalle del producto", () => {
  app("/catalogo/HE001");
  expect(
    screen.getByRole("heading", { name: "Taladro percutor 650W 13mm" }),
  ).toBeVisible();
  expect(screen.getByText("Disponible")).toBeVisible();
});

it("protege la administración sin sesión", () => {
  app("/admin/productos");
  expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: "Gestionar productos" }),
  ).not.toBeInTheDocument();
});

it("rechaza credenciales incorrectas", async () => {
  app("/login");
  await userEvent.type(
    screen.getByLabelText("Correo electrónico"),
    "admin@losmaestros.cl",
  );
  await userEvent.type(screen.getByLabelText("Contraseña"), "incorrecta");
  await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Correo o contraseña incorrectos",
  );
  expect(sessionStorage.getItem("maestros.session")).toBeNull();
});

it("permite crear, leer, actualizar y eliminar un producto desde administración", async () => {
  sessionStorage.setItem("maestros.session", "admin");
  app("/admin/productos");
  await userEvent.type(screen.getByLabelText("Buscar productos"), "TEST99");
  await userEvent.type(screen.getByLabelText("Código"), "TEST99");
  await userEvent.type(screen.getByLabelText("Nombre"), "Producto nuevo");
  await userEvent.type(screen.getByLabelText("Categoría"), "Pruebas");
  await userEvent.clear(screen.getByLabelText("Precio"));
  await userEvent.type(screen.getByLabelText("Precio"), "4500");
  await userEvent.click(
    screen.getByRole("button", { name: "Guardar producto" }),
  );
  expect(products.get("TEST99")?.nombre).toBe("Producto nuevo");
  expect(screen.getByRole("link", { name: "Producto nuevo" })).toBeVisible();
  await userEvent.click(
    screen.getByRole("button", { name: "Editar Producto nuevo" }),
  );
  await userEvent.clear(screen.getByLabelText("Nombre"));
  await userEvent.type(screen.getByLabelText("Nombre"), "Producto editado");
  await userEvent.click(
    screen.getByRole("button", { name: "Guardar producto" }),
  );
  expect(products.get("TEST99")?.nombre).toBe("Producto editado");
  expect(screen.getByRole("link", { name: "Producto editado" })).toBeVisible();
  await userEvent.click(
    screen.getByRole("button", { name: "Eliminar Producto editado" }),
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Confirmar eliminación" }),
  );
  expect(products.get("TEST99")).toBeUndefined();
  expect(
    screen.queryByRole("link", { name: "Producto editado" }),
  ).not.toBeInTheDocument();
});
it("agrega al carrito y confirma compra simulada con sesión", async () => {
  sessionStorage.setItem("maestros.session", "cliente");
  app("/catalogo/HE001");
  await userEvent.click(
    screen.getByRole("button", { name: "Agregar al carrito" }),
  );
  await userEvent.click(screen.getByRole("link", { name: "Carrito (1)" }));
  expect(
    screen.getByRole("cell", { name: "Taladro percutor 650W 13mm" }),
  ).toBeVisible();
  await userEvent.click(
    screen.getByRole("button", { name: "Confirmar compra simulada" }),
  );
  expect(screen.getByRole("status")).toHaveTextContent(
    "Compra simulada confirmada",
  );
  expect(screen.getByText("Tu carrito está vacío.")).toBeVisible();
  expect(JSON.parse(localStorage.getItem("maestros.lastOrder")!).total).toBe(
    79990,
  );
});
it("permite el CRUD de usuarios desde administración", async () => {
  sessionStorage.setItem("maestros.session", "admin");
  app("/admin/usuarios");
  await userEvent.type(screen.getByLabelText("Nombre"), "Usuario prueba");
  await userEvent.type(
    screen.getByLabelText("Correo electrónico"),
    "nuevo@test.cl",
  );
  await userEvent.type(screen.getByLabelText("Contraseña"), "Test123");
  await userEvent.click(
    screen.getByRole("button", { name: "Guardar usuario" }),
  );
  const created = users.list().find((u) => u.correo === "nuevo@test.cl")!;
  expect(created.nombre).toBe("Usuario prueba");
  const row = screen
    .getByRole("cell", { name: "nuevo@test.cl" })
    .closest("tr")!;
  await userEvent.click(within(row).getByRole("button", { name: "Editar" }));
  await userEvent.clear(screen.getByLabelText("Nombre"));
  await userEvent.type(screen.getByLabelText("Nombre"), "Usuario editado");
  await userEvent.click(
    screen.getByRole("button", { name: "Guardar usuario" }),
  );
  expect(users.get(created.id)?.nombre).toBe("Usuario editado");
  const updated = screen
    .getByRole("cell", { name: "nuevo@test.cl" })
    .closest("tr")!;
  await userEvent.click(
    within(updated).getByRole("button", { name: "Eliminar" }),
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Confirmar eliminación" }),
  );
  expect(users.get(created.id)).toBeUndefined();
  expect(
    screen.queryByRole("cell", { name: "nuevo@test.cl" }),
  ).not.toBeInTheDocument();
});
