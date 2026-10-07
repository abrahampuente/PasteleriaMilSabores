// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './HomeTemp.jsx';
import { ProductosPage } from './ProductosPage.jsx';
import { DetalleProductoPage } from './DetalleProductoPage.jsx';
import { NosotrosPage } from './NosotrosPage.jsx';
import { BlogsPage } from './BlogsPage.jsx';
import { BlogDetalle1Page } from './BlogDetalle1Page.jsx';
import { BlogDetalle2Page } from './BlogDetalle2Page.jsx';
import { ContactoPage } from './ContactoPage.jsx';
import { LoginPage } from './LoginPage.jsx';
import { RegistroPage } from './RegistroPage.jsx';
import { CarritoPage } from './CarritoPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />

        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/productos.html" element={<ProductosPage />} />

        <Route path="/producto/:id" element={<DetalleProductoPage />} />
        <Route path="/producto-detalle.html" element={<DetalleProductoPage />} />

        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/nosotros.html" element={<NosotrosPage />} />

        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs.html" element={<BlogsPage />} />

        <Route path="/blog-detalle-1" element={<BlogDetalle1Page />} />
        <Route path="/blog-detalle-1.html" element={<BlogDetalle1Page />} />

        <Route path="/blog-detalle-2" element={<BlogDetalle2Page />} />
        <Route path="/blog-detalle-2.html" element={<BlogDetalle2Page />} />

        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/contacto.html" element={<ContactoPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login.html" element={<LoginPage />} />

        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/registro.html" element={<RegistroPage />} />

        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/carrito.html" element={<CarritoPage />} />
      </Routes>
    </Router>
  );
}