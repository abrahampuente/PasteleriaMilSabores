// ============================================
// NosotrosPage.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { obtenerCarrito } from './carrito.js';

export const NosotrosPage = () => {
  const [contadorCarrito, setContadorCarrito] = useState(0);

  useEffect(() => {
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setContadorCarrito(totalItems);
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

      {/* Contenido principal de Nosotros */}
      <main>
        <section style={{ padding: '40px 30px', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Nosotros</h1>
          <p>
            Pastelería Mil Sabores celebra 50 años como un referente en la repostería chilena.
            Somos conocidos por haber participado en un récord Guinness en 1995, cuando
            colaboramos en la creación de la torta más grande del mundo.
          </p>
          <br />
          <h2>Misión</h2>
          <p>
            Ofrecer una experiencia dulce y memorable a nuestros clientes, con productos de
            repostería de alta calidad para todas las ocasiones.
          </p>
          <br />
          <h2>Visión</h2>
          <p>
            Ser la tienda online líder de productos de repostería en Chile, apoyando además la
            formación de nuevos talentos en gastronomía.
          </p>
          <br />
          <h2>Impacto comunitario</h2>
          <p>
            Cada compra apoya a los estudiantes de gastronomía de Duoc UC, quienes colaboran
            con recetas y contenido para nuestro blog.
          </p>
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