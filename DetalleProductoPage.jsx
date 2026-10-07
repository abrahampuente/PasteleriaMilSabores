// ============================================
// DetalleProductoPage.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import { getProductoById, formatearPrecio } from './productos.js';
import { obtenerCarrito, agregarAlCarrito } from './carrito.js';

export const DetalleProductoPage = () => {
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [contadorCarrito, setContadorCarrito] = useState(0);

  useEffect(() => {
    actualizarContador();

    // Obtener id desde la URL (?id=TC001)
    const parametros = new URLSearchParams(window.location.search);
    const idProducto = parametros.get('id');

    if (idProducto) {
      const prodEncontrado = getProductoById(idProducto);
      setProducto(prodEncontrado || null);
    }
    setCargando(false);
  }, []);

  const actualizarContador = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setContadorCarrito(totalItems);
  };

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto, mensaje);
      actualizarContador();
      alert(`Se agregó ${producto.nombre} al carrito.`);
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

      {/* Contenido principal del detalle del producto */}
      <main>
        <section className="catalogo" id="detalle-producto">
          {cargando ? (
            <p>Cargando producto...</p>
          ) : !producto ? (
            <p>No encontramos ese producto.</p>
          ) : (
            <>
              <div className="emoji-producto" style={{ fontSize: '6rem' }}>
                {producto.emoji}
              </div>
              <h1>{producto.nombre}</h1>
              <p className="precio">{formatearPrecio(producto.precio)}</p>
              <p>{producto.descripcion}</p>

              <div className="campo">
                <label htmlFor="mensaje-personalizado">
                  Mensaje para la torta (opcional)
                </label>
                <input
                  type="text"
                  id="mensaje-personalizado"
                  maxLength={60}
                  placeholder="Ej: Feliz cumpleaños Camila"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>

              <button
                className="btn"
                id="btn-agregar-carrito"
                onClick={handleAgregarAlCarrito}
              >
                Añadir al carrito
              </button>
            </>
          )}
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