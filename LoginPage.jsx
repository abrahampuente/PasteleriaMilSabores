// ============================================
// LoginPage.jsx 
// ============================================
import React, { useState, useEffect } from 'react';
import { validarLogin } from './validaciones.js';
import { obtenerCarrito } from './carrito.js';

export const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
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
    const resultado = validarLogin(correo, clave);

    if (!resultado.esValido) {
      setErrores(resultado.errores);
    } else {
      setErrores({});
      alert('¡Inicio de sesión exitoso!');
      // Lógica de redirección o autenticación
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

      {/* Contenido principal del login */}
      <main>
        <section>
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Iniciar sesión</h1>
          <form className="formulario" id="form-login" onSubmit={handleSubmit} noValidate>
            <div className="campo">
              <label htmlFor="login-correo">Correo</label>
              <input
                type="email"
                id="login-correo"
                maxLength={100}
                placeholder="tucorreo@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className={errores.correo ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-login-correo">
                {errores.correo}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="login-clave">Contraseña</label>
              <input
                type="password"
                id="login-clave"
                maxLength={10}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className={errores.clave ? 'invalido' : ''}
              />
              <span className="mensaje-error" id="error-login-clave">
                {errores.clave}
              </span>
            </div>

            <button type="submit" className="btn">
              Iniciar sesión
            </button>
            <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
              ¿No tienes cuenta?{' '}
              <a href="registro.html" style={{ color: 'var(--color-chocolate)', fontWeight: 'bold' }}>
                Regístrate aquí
              </a>
            </p>
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