import articles from "../data/articles.json";
import { Articulo } from "../componentes/organismos/Articulo";

export function Nosotros() {
  return <Articulo blocks={articles.nosotros} />;
}

