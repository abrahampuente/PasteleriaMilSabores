// ============================================
// BlogDetalle2Page.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { obtenerCarrito } from './carrito.js';

export const BlogDetalle2Page = () => {
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

      {/* Contenido principal de la publicación */}
      <main>
        <section style={{ padding: '40px 30px', maxWidth: '800px', margin: '0 auto' }}>
          <h1>3 tips para decorar cupcakes</h1>
          <div className="emoji-producto" style={{ fontSize: '5rem' }}>🧁</div>
          <p>
            1. Deja enfriar completamente el cupcake antes de decorar.<br />
            2. Usa una manga pastelera para un acabado más parejo.<br />
            3. Agrega el topping (fruta, chocolate) justo antes de servir para que se vea fresco.
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