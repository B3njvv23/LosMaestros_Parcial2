import { assetUrl } from "../../data/assets";
export interface ArticleBlock {
  kind: string;
  text?: string;
  src?: string;
  alt?: string;
  items?: string[];
}
export function Articulo({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <article className="article-body mx-auto">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "title":
            return <h1 key={i}>{b.text}</h1>;
          case "heading":
            return (
              <h2 className="h4 mt-4" key={i}>
                {b.text}
              </h2>
            );
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "image":
            return (
              <img
                className="rounded my-3"
                key={i}
                src={assetUrl(b.src)}
                alt={b.alt}
              />
            );
          case "list":
            return (
              <ul key={i}>
                {b.items?.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </article>
  );
}
