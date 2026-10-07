// ============================================
// RegistroPage.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { validarRegistro } from './validaciones.js';
import { obtenerCarrito } from './carrito.js';

export const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    clave: '',
    confirmarClave: '',
    fechaNacimiento: '',
    codigo: ''
  });

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      'registro-nombre': 'nombre',
      'registro-correo': 'correo',
      'registro-clave': 'clave',
      'registro-clave-confirmar': 'confirmarClave',
      'registro-fecha-nacimiento': 'fechaNacimiento',
      'registro-codigo': 'codigo'
    };

    setFormData((prev) => ({
      ...prev,
      [keyMap[id]]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultado = validarRegistro(formData);

    if (!resultado.esValido) {
      setErrores(resultado.errores);
    } else {
      setErrores({});
      alert(resultado.mensajeBienvenida);
      // Redirección o envío de formulario aquí
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

      {/* Contenido principal del registro */}
      <main>
        <section>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Crear una cuenta</h1>
          <form className="formulario" id="form-registro" onSubmit={handleSubmit} noValidate>
            <div className="campo">
              <label htmlFor="registro-nombre">Nombre completo</label>
              <input
                type="text"
                id="registro-nombre"
                maxLength={50}
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-registro-nombre">
                {errores.nombre}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="registro-correo">Correo</label>
              <input
                type="email"
                id="registro-correo"
                maxLength={100}
                placeholder="tucorreo@duoc.cl"
                value={formData.correo}
                onChange={handleChange}
                className={errores.correo ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-registro-correo">
                {errores.correo}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="registro-clave">Contraseña</label>
              <input
                type="password"
                id="registro-clave"
                maxLength={10}
                value={formData.clave}
                onChange={handleChange}
                className={errores.clave ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-registro-clave">
                {errores.clave}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="registro-clave-confirmar">Confirmar contraseña</label>
              <input
                type="password"
                id="registro-clave-confirmar"
                maxLength={10}
                value={formData.confirmarClave}
                onChange={handleChange}
                className={errores.confirmarClave ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-registro-clave-confirmar">
                {errores.confirmarClave}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="registro-fecha-nacimiento">Fecha de nacimiento</label>
              <input
                type="date"
                id="registro-fecha-nacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={errores.fechaNacimiento ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-registro-fecha">
                {errores.fechaNacimiento}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="registro-codigo">Código promocional (opcional)</label>
              <input
                type="text"
                id="registro-codigo"
                placeholder="Ej: FELICES50"
                value={formData.codigo}
                onChange={handleChange}
              />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-texto-claro)', marginTop: '4px' }}>
                Con el código FELICES50 obtienes 10% de descuento de por vida.
              </p>
            </div>

            <button type="submit" className="btn">
              Registrarme
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
