import { Input } from "../atomos/Input";
import { useId } from "react";
export interface CampoFormularioProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  options?: string[];
  disabled?: boolean;
  multiline?: boolean;
}
export function CampoFormulario({
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  options,
  disabled,
  multiline,
}: CampoFormularioProps) {
  const id = useId();
  const props = {
    id,
    value,
    disabled,
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => onChange(e.target.value),
    "aria-invalid": !!error,
    "aria-describedby":
      [hint ? id + "-hint" : "", error ? id + "-error" : ""]
        .filter(Boolean)
        .join(" ") || undefined,
    className: "form-control" + (error ? " is-invalid" : ""),
  };
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {options ? (
        <select
          {...props}
          className={"form-select" + (error ? " is-invalid" : "")}
        >
          <option value="">Selecciona…</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : multiline ? (
        <textarea {...props} rows={4} />
      ) : (
        <Input {...props} type={type} />
      )}
      {hint && (
        <div id={id + "-hint"} className="form-text">
          {hint}
        </div>
      )}
      {error && (
        <div id={id + "-error"} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
