import { Link, type LinkProps } from "react-router-dom";
export function BotonEnlace({
  className = "btn btn-secondary",
  ...props
}: LinkProps) {
  return <Link className={className} {...props} />;
}
