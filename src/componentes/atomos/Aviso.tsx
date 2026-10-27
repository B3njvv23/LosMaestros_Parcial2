export function Aviso({
  text,
  error = false,
}: {
  text: string;
  error?: boolean;
}) {
  return text ? (
    <div
      role={error ? "alert" : "status"}
      tabIndex={error ? -1 : undefined}
      className={"alert " + (error ? "alert-danger" : "alert-success")}
    >
      {text}
    </div>
  ) : null;
}
