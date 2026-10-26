const images = import.meta.glob<string>("../assets/img/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

// Adapta las rutas /img usadas por los datos a las imágenes versionadas en src/assets.
export function assetUrl(source = ""): string {
  const legacyPath = source.replace(/^\/?img\//, "");
  return images["../assets/img/" + legacyPath] ?? source;
}
