import { FormularioContacto } from "../componentes/organismos/FormularioContacto";
export function Contacto() {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <section className="form-panel">
          {" "}
          <p className="eyebrow">Hagamos realidad tu proyecto</p>
          <h1>Contacto</h1>
          <p className="form-intro">
            Cuéntanos qué necesitas y prepara tu próximo proyecto con nosotros.
          </p>
          <p className="form-helper">
            Formulario de demostración: tu mensaje se guarda en este navegador.
          </p>
          <FormularioContacto />
        </section>
      </div>
    </div>
  );
}

