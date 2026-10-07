// ============================================
// CarritoPage.jsx 
// ============================================
import React, { useState, useEffect } from 'react';
import { obtenerCarrito, cambiarCantidad, quitarDelCarrito, calcularTotal } from './carrito.js';
import { formatearPrecio } from './productos.js';

export const CarritoPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(obtenerCarrito());
  }, []);

  const handleCambiarCantidad = (index, delta) => {
    const nuevoCarrito = cambiarCantidad(index, delta);
    setItems([...nuevoCarrito]);
  };

  const handleQuitar = (index) => {
    const nuevoCarrito = quitarDelCarrito(index);
    setItems([...nuevoCarrito]);
  };

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const totalPagar = calcularTotal(items);

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
            🛒 <span id="contador-carrito">{totalItems}</span>
          </a>
        </div>
      </header>

      {/* Contenido principal del carrito */}
      <main>
        <section className="catalogo">
          <h1>Mi carrito de compras</h1>
          <br />

          {/* Lista de productos en el carrito */}
          <div id="lista-carrito">
            {items.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              items.map((item, index) => (
                <div className="item-carrito" key={`${item.id}-${index}`}>
                  <div>
                    <strong>{item.emoji} {item.nombre}</strong>
                    {item.mensaje && (
                      <p style={{ fontSize: '0.85rem' }}>Mensaje: "{item.mensaje}"</p>
                    )}
                    <p>{formatearPrecio(item.precio)} c/u</p>
                  </div>
                  <div className="cantidad-controles">
                    <button onClick={() => handleCambiarCantidad(index, -1)}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => handleCambiarCantidad(index, 1)}>+</button>
                  </div>
                  <button className="btn btn-rosa" onClick={() => handleQuitar(index)}>
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Resumen del total */}
          <div className="resumen-carrito">
            <h2>
              Total: <span id="total-carrito">{formatearPrecio(totalPagar)}</span>
            </h2>
            <br />
            <button className="btn" onClick={() => alert('¡Gracias por tu compra!')}>
              Pagar
            </button>
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