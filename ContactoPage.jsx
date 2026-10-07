// ============================================
// ContactoPage.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { validarContacto } from './validaciones.js';
import { obtenerCarrito } from './carrito.js';

export const ContactoPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [contadorCarrito, setContadorCarrito] = useState(0);

  useEffect(() => {
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setContadorCarrito(totalItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = validarContacto({ nombre, correo, mensaje });

    if (!resultado.esValido) {
      setErrores(resultado.errores);
    } else {
      setErrores({});
      alert('¡Mensaje enviado con éxito!, nos pondremos en contacto contigo pronto.');
      setNombre('');
      setCorreo('');
      setMensaje('');
    }
  };

  return (
    <>
      {/* Encabezado con navegación */}
      <header>
        <div className="logo">Pastelería Mil Sabores</div>
        <nav>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="productos.html">Productos</a></li>
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="blogs.html">Blogs</a></li>
            <li><a href="contacto.html">Contacto</a></li>
          </ul>
        </nav>
        <div className="header-derecha">
          <a href="login.html">Iniciar sesión</a>
          <a href="registro.html">Registrarse</a>
          <a className="carrito-icono" href="carrito.html">
            🛒 <span id="contador-carrito">{contadorCarrito}</span>
          </a>
        </div>
      </header>

      {/* Contenido principal de contacto */}
      <main>
        <section>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Contáctanos</h1>
          <form className="formulario" id="form-contacto" onSubmit={handleSubmit} noValidate>
            <div className="campo">
              <label htmlFor="contacto-nombre">Nombre completo</label>
              <input
                type="text"
                id="contacto-nombre"
                maxLength={100}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={errores.nombre ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-contacto-nombre">
                {errores.nombre}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="contacto-correo">Correo (opcional)</label>
              <input
                type="email"
                id="contacto-correo"
                maxLength={100}
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className={errores.correo ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-contacto-correo">
                {errores.correo}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="contacto-mensaje">Mensaje</label>
              <textarea
                id="contacto-mensaje"
                rows={4}
                maxLength={500}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className={errores.mensaje ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-contacto-mensaje">
                {errores.mensaje}
              </span>
            </div>

            <button type="submit" className="btn">
              Enviar mensaje
            </button>
          </form>
        </section>
      </main>

      {/* Pie de página */}
      <footer>
        <p>Pastelería Mil Sabores &copy; 2026 - Celebrando 50 años de tradición</p>
        <p>Síguenos: <a href="#">Instagram</a> · <a href="#">Facebook</a></p>
      </footer>
    </>
  );
};