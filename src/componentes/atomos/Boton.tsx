import type { ButtonHTMLAttributes } from "react";
export function Boton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={"btn btn-primary " + className}
      {...props}
    />
  );
}
