// Resuelve rutas de imágenes servidas desde public/img.
export function assetUrl(source = ""): string {
  if (!source) return "/img/logo_maestros.jpg";
  if (/^(https?:|data:|blob:)/i.test(source)) return source;
  const relative = source
    .replace(/\\/g, "/")
    .replace(/^\.?\/?img\//i, "")
    .replace(/^\/+/, "");
  return `/img/${relative}`;
}