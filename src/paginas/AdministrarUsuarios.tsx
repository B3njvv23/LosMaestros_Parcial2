import { focusElement, focusPanel } from "../focus";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../Store";
import { users } from "../repository";
import type { User } from "../types";

import { FormularioUsuario } from "../componentes/organismos/FormularioUsuario";
import { CampoFormulario } from "../componentes/moleculas/CampoFormulario";
import { Boton } from "../componentes/atomos/Boton";
import { Aviso } from "../componentes/atomos/Aviso";

export function AdministrarUsuarios() {
  const [items, setItems] = useState(() => users.list());
  const [selected, setSelected] = useState<User>();
  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState<User>();
  const { user, refreshUser } = useStore();
  const reload = () => setItems(users.list());
  const filtered = items.filter((u) =>
    (u.nombre + " " + u.correo).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Link to="/admin">← Administración</Link>
      <h1>Gestionar usuarios</h1>
      <a href="#form-usuario" className="text-link mb-3">
        Ir al formulario de usuario ↓
      </a>
      <Aviso text={notice} error={error} />
      <div className="row g-4">
        <section className="col-lg-8">
          <CampoFormulario
            label="Buscar usuarios"
            value={query}
            onChange={setQuery}
          />
          {pending && (
            <div
              role="alert"
              className="alert alert-warning"
              tabIndex={-1}
              id="confirm-usuario"
            >
              ¿Eliminar {pending.nombre}?{" "}
              <Boton
                className="btn-danger me-2"
                onClick={() => {
                  try {
                    users.remove(pending.id);
                    reload();
                    if (selected?.id === pending.id) {
                      setSelected(undefined);
                      setVersion((v) => v + 1);
                    }
                    setError(false);
                    setNotice("Usuario eliminado.");
                  } catch (e) {
                    setError(true);
                    setNotice((e as Error).message);
                  }
                  setPending(undefined);
                  focusElement("users-table");
                }}
              >
                Confirmar eliminación
              </Boton>
              <Boton
                onClick={() => {
                  setPending(undefined);
                  focusElement("users-table");
                }}
              >
                Cancelar eliminación
              </Boton>
            </div>
          )}
          <div
            className="table-responsive admin-table"
            role="region"
            id="users-table"
            aria-label="Tabla de usuarios, desplazable"
            tabIndex={0}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Boton
                          className="btn-sm"
                          onClick={() => {
                            setSelected(u);
                            setVersion((v) => v + 1);
                            focusPanel("form-usuario");
                          }}
                        >
                          Editar
                        </Boton>
                        <Boton
                          className="btn-sm btn-danger"
                          disabled={u.id === user?.id}
                          onClick={() => {
                            setPending(u);
                            focusPanel("confirm-usuario");
                          }}
                        >
                          Eliminar
                        </Boton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && <p>No se encontraron usuarios.</p>}
        </section>
        <section className="col-lg-4" id="form-usuario" tabIndex={-1}>
          <h2 className="h4">
            {selected ? "Editar usuario" : "Nuevo usuario"}
          </h2>
          {selected && (
            <Boton
              className="mb-3"
              onClick={() => {
                setSelected(undefined);
                setVersion((v) => v + 1);
              }}
            >
              Cancelar edición
            </Boton>
          )}
          <FormularioUsuario
            key={version}
            initial={selected}
            allowRole
            onSave={(u) => {
              if (u.id === user?.id && u.rol !== "Administrador")
                throw Error("No puedes quitarte el rol de administrador.");
              if (selected) users.update(selected.id, u);
              else users.create(u);
              if (u.id === user?.id) refreshUser();
              reload();
              setSelected(undefined);
              setVersion((v) => v + 1);
              setError(false);
              setNotice("Usuario guardado.");
              focusPanel("form-usuario");
            }}
          />
        </section>
      </div>
    </>
  );
}
