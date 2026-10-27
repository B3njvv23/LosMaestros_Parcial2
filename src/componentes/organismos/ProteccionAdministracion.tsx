import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../../Store";

export function ProteccionAdministracion({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" replace />;
  if (user.rol !== "Administrador")
    return (
      <>
        <h1>Acceso restringido</h1>
        <p>Esta sección requiere una cuenta de administrador.</p>
      </>
    );
  return <>{children}</>;
}
