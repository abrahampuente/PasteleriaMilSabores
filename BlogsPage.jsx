// ============================================
// BlogsPage.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { obtenerCarrito } from './carrito.js';

export const BlogsPage = () => {
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

      {/* Contenido principal del blog */}
      <main>
        <section className="catalogo">
          <h1>Blog de repostería</h1>
          <p>
            Noticias, recetas y consejos escritos por estudiantes de gastronomía de Duoc UC.
          </p>
          <br />
          <div className="grid-productos">
            <div className="tarjeta-producto">
              <div className="emoji-producto">📖</div>
              <h3>El origen de la Torta de Manjar</h3>
              <p>
                Una receta tradicional chilena que pasa de generación en generación.
              </p>
              <br />
              <a className="btn" href="blog-detalle-1.html">
                Leer más
              </a>
            </div>

            <div className="tarjeta-producto">
              <div className="emoji-producto">🧁</div>
              <h3>3 tips para decorar cupcakes</h3>
              <p>
                Consejos simples de nuestros estudiantes para lograr un acabado profesional en casa.
              </p>
              <br />
              <a className="btn" href="blog-detalle-2.html">
                Leer más
              </a>
            </div>
          </div>
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