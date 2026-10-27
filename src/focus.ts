/** Espera al render de React antes de enfocar el primer error visible. */
export function focusFirstError(form: HTMLFormElement) {
  requestAnimationFrame(() => {
    const target = form.querySelector<HTMLElement>(
      '[aria-invalid="true"], [role="alert"]',
    );
    target?.focus();
  });
}
/** Mantiene la edición al alcance en tablas largas y pantallas pequeñas. */
export function focusPanel(id: string) {
  requestAnimationFrame(() => {
    const panel = document.getElementById(id);
    const control = panel?.querySelector<HTMLElement>(
      "input:not(:disabled),select:not(:disabled),textarea:not(:disabled)",
    );
    (control || panel?.querySelector<HTMLElement>("button") || panel)?.focus();
  });
}

export function focusElement(id: string) {
  requestAnimationFrame(() => document.getElementById(id)?.focus());
}
