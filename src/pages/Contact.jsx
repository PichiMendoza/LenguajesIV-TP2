import { FormularioContacto } from '../components/FormularioContacto';

function Contact() {
  return (
    <section className="contacto-section">
      <div className="header-contacto">
        <h4><strong>ESTAMOS PARA AYUDARTE</strong></h4>
        <h1>Contacto</h1>
        <h4><strong>Encontrá aquí los medios para comunicarte con nosotros.</strong></h4>
      </div>

      <FormularioContacto />
    </section>
  );
}

export default Contact;