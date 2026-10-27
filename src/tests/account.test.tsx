import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  FormularioUsuario,
  emptyUser,
} from "../componentes/organismos/FormularioUsuario";
const client = {
  ...emptyUser,
  id: "recovery-client",
  nombre: "Ana",
  apellidos: "Pérez",
  correo: "ana@example.cl",
  rut: "123456785",
  clave: "Antes123",
  tipo: "particular",
  region: "Coquimbo",
  comuna: "La Serena",
  direccion: "Calle de prueba 123",
};
it("registro exige confirmar la contraseña", async () => {
  const save = vi.fn();
  render(
    <FormularioUsuario
      registration
      initial={{ ...client, id: "" }}
      onSave={save}
    />,
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Registrarse" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Confirma tu contraseña.",
  );
  expect(save).not.toHaveBeenCalled();
});
it("registro rechaza contraseñas diferentes", async () => {
  const save = vi.fn();
  render(
    <FormularioUsuario
      registration
      initial={{ ...client, id: "" }}
      onSave={save}
    />,
  );
  await userEvent.type(
    screen.getByLabelText("Confirmar contraseña"),
    "Distinta1",
  );
  await userEvent.click(screen.getByRole("button", { name: "Registrarse" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Las contraseñas no coinciden.",
  );
  expect(save).not.toHaveBeenCalled();
});
it("registro permite coincidencia y no guarda la confirmación", async () => {
  const save = vi.fn();
  render(
    <FormularioUsuario
      registration
      initial={{ ...client, id: "" }}
      onSave={save}
    />,
  );
  await userEvent.type(
    screen.getByLabelText("Confirmar contraseña"),
    client.clave,
  );
  await userEvent.click(screen.getByRole("button", { name: "Registrarse" }));
  expect(save).toHaveBeenCalledTimes(1);
  expect(save.mock.calls[0][0]).toEqual({ ...client, id: expect.any(String) });
  expect(save.mock.calls[0][0]).not.toHaveProperty("confirmation");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});









