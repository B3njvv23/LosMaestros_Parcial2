export function Icono({ name }: { name: "cart" | "user" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "cart" ? (
        <>
          <path d="M2 3h2l2.5 12h12l2-8H5" />
          <path d="M7 15l-1 3h13" />
          <circle cx="8" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </>
      ) : (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </>
      )}
    </svg>
  );
}
