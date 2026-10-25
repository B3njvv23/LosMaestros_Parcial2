import { assetUrl } from "../../data/assets";
import { useState } from "react";
import type { Product } from "../../types";
import { productImage } from "../../data/images";
export function ImagenProducto({
  product,
  className = "",
  lazy = true,
}: {
  product: Product;
  className?: string;
  lazy?: boolean;
}) {
  const source = productImage(product);
  const [failedSource, setFailedSource] = useState("");
  return (
    <img
      className={className}
      src={assetUrl(
        failedSource === source ? "/img/logo_maestros.jpg" : source,
      )}
      alt={product.nombre}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      onError={() => setFailedSource(source)}
    />
  );
}
