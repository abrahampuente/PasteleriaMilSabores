// ============================================
// Home.jsx 
// ============================================
import React, { useState, useEffect } from 'react';
import { getProductos, formatearPrecio } from './productos.js';
import { obtenerCarrito, agregarAlCarrito } from './carrito.js';

export const Home = () => {
  const [productos, setProductos] = useState([]);
  const [contadorCarrito, setContadorCarrito] = useState(0);

  // Cargar productos y calcular contador del carrito al cargar el componente
  useEffect(() => {
    setProductos(getProductos());
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setContadorCarrito(totalItems);
  };

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto, "");
    actualizarContador();
    alert(`Se agregó ${producto.nombre} al carrito.`);
  };

  return (
    <>
      {/* Encabezado con logo y menú de navegación */}
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
          {/* Carrito con contador reactivo */}
          <a className="carrito-icono" href="carrito.html">
            🛒 <span id="contador-carrito">{contadorCarrito}</span>
          </a>
        </div>
      </header>

      {/* Contenido principal de la página de inicio */}
      <main>
        {/* Sección hero */}
        <section className="hero">
          <div className="hero-texto">
            <h1>Celebra la dulzura de la vida</h1>
            <p>
              Hace 50 años endulzamos momentos especiales con tortas y productos de repostería hechos con dedicación. Descubre nuestra tienda online y arma tu pedido en pocos clics.
            </p>
            <br />
            <a className="btn" href="productos.html">Ver productos</a>
          </div>
          <div className="hero-imagen">🎂</div>
        </section>

        {/* Lista de productos destacados */}
        <section className="catalogo">
          <h2>Algunos de nuestros productos</h2>
          <br />
          <div className="grid-productos" id="grid-productos">
            {productos.map((producto) => (
              <div className="tarjeta-producto" key={producto.id}>
                <div className="emoji-producto">{producto.emoji}</div>
                <h3>{producto.nombre}</h3>
                <p className="precio">{formatearPrecio(producto.precio)}</p>
                <button 
                  className="btn" 
                  onClick={() => handleAgregarAlCarrito(producto)}
                  style={{ marginTop: '10px' }}
                >
                  Añadir al carrito
                </button>
              </div>
            ))}
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