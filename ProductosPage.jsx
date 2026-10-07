// ============================================
// ProductosPage.jsx 
// ============================================
import React, { useState, useEffect } from 'react';
import { getProductos, formatearPrecio } from './productos.js';
import { obtenerCarrito } from './carrito.js';

export const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [contadorCarrito, setContadorCarrito] = useState(0);

  useEffect(() => {
    setProductos(getProductos());
    actualizarContador();
  }, []);

  const actualizarContador = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    setContadorCarrito(totalItems);
  };

  // Obtener categorías únicas partiendo por "Todos"
  const categorias = ['Todos', ...new Set(productos.map((p) => p.categoria))];

  // Filtrar catálogo por categoría seleccionada
  const productosFiltrados =
    categoriaSel === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSel);

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

      {/* Contenido principal del catálogo */}
      <main>
        <section className="catalogo">
          <h1>Nuestros productos</h1>
          <p>Filtra por categoría para encontrar lo que buscas.</p>
          <br />

          {/* Botones de filtro de categorías */}
          <div className="filtros" id="filtros">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={categoriaSel === cat ? 'activo' : ''}
                onClick={() => setCategoriaSel(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid con las tarjetas de productos */}
          <div className="grid-productos" id="grid-productos">
            {productosFiltrados.map((producto) => (
              <div className="tarjeta-producto" key={producto.id}>
                <div className="emoji-producto">{producto.emoji}</div>
                <h3>{producto.nombre}</h3>
                <p className="precio">{formatearPrecio(producto.precio)}</p>
                <a className="btn" href={`detalle-producto.html?id=${producto.id}`}>
                  Ver más
                </a>
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