import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../Store";
import { users } from "../repository";

import { FormularioUsuario } from "../componentes/organismos/FormularioUsuario";

import { Aviso } from "../componentes/atomos/Aviso";

export function Perfil() {
  const { user, refreshUser } = useStore();
  const [notice, setNotice] = useState("");
  if (!user) return <Navigate to="/login" replace />;
  return (
    <section className="form-panel">
      <p className="eyebrow">Tu espacio</p>
      <h1>Mi perfil</h1>
      <p>
        {user.rol} · {user.correo}
      </p>
      <Aviso text={notice} />
      <FormularioUsuario
        initial={user}
        onSave={(u) => {
          users.update(u.id, { ...u, rol: user.rol });
          refreshUser();
          setNotice("Perfil actualizado.");
        }}
      />
    </section>
  );
}
