import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    email: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'nombreApellido') {
      if (!value.trim()) {
        error = 'El nombre y apellido es obligatorio.';
      } else if (value.trim().length < 3) {
        error = 'Debe ingresar al menos 3 caracteres.';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = 'El correo electrónico es obligatorio.';
      } else if (!emailRegex.test(value)) {
        error = 'Ingrese un formato de correo electrónico válido (ej: usuario@dominio.com).';
      }
    }

    if (name === 'mensaje') {
      if (!value.trim()) {
        error = 'El mensaje no puede estar vacío.';
      } else if (value.length > 300) {
        error = 'El mensaje no puede superar los 300 caracteres.';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mensaje' && value.length > 300) return;

    setFormData({ ...formData, [name]: value });

    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      nombreApellido: validateField('nombreApellido', formData.nombreApellido),
      email: validateField('email', formData.email),
      mensaje: validateField('mensaje', formData.mensaje)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== '')) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    emailjs.send(
      'service_7a7h6tf',
      'template_km3xdwh',
      {
        from_name: formData.nombreApellido,
        reply_to: formData.email,
        message: formData.mensaje
      },
      'HnBHGI7GOd1DEkciA'
    )
    .then(() => {
      setStatusMessage('¡Mensaje enviado con éxito!');
      setFormData({ nombreApellido: '', email: '', mensaje: '' });
    })
    .catch((err) => {
      console.error('Error al enviar mensaje:', err);
      setStatusMessage('Ocurrió un error al enviar el mensaje. Intente nuevamente.');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="formulario-container">
      <h2>Contáctanos</h2>
      
      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="nombreApellido">Nombre y Apellido *</label>
          <input
            type="text"
            id="nombreApellido"
            name="nombreApellido"
            value={formData.nombreApellido}
            onChange={handleChange}
            placeholder="Ingrese su nombre y apellido"
          />
          {errors.nombreApellido && <span className="error-text">{errors.nombreApellido}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Mensaje *</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escriba su mensaje aquí (máx. 300 caracteres)"
          ></textarea>
          <div className="char-counter">
            {formData.mensaje.length}/300 caracteres
          </div>
          {errors.mensaje && <span className="error-text">{errors.mensaje}</span>}
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
};