// ============================================
// productos.js
// Capa de datos y operaciones CRUD
// ============================================

let productos = [
  { id: "TC001", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000, emoji: "🍫", descripcion: "Torta de chocolate con capas de ganache y avellanas." },
  { id: "TC002", categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000, emoji: "🍓", descripcion: "Frutas frescas y crema chantilly sobre bizcocho de vainilla." },
  { id: "TT001", categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000, emoji: "🎂", descripcion: "Bizcocho de vainilla relleno con crema pastelera." },
  { id: "TT002", categoria: "Tortas Circulares", nombre: "Torta Circular de Manjar", precio: 42000, emoji: "🎂", descripcion: "Torta tradicional chilena con manjar y nueces." },
  { id: "PI001", categoria: "Postres Individuales", nombre: "Mousse de Chocolate", precio: 5000, emoji: "🍮", descripcion: "Postre individual cremoso hecho con chocolate de alta calidad." },
  { id: "PI002", categoria: "Postres Individuales", nombre: "Tiramisú Clásico", precio: 5500, emoji: "🍰", descripcion: "Postre italiano con capas de café, mascarpone y cacao." },
  { id: "PSA001", categoria: "Productos Sin Azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, emoji: "🍊", descripcion: "Torta ligera endulzada naturalmente." },
  { id: "PG001", categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000, emoji: "🍫", descripcion: "Rico y denso, perfecto para quienes evitan el gluten." },
  { id: "PV001", categoria: "Productos Vegana", nombre: "Torta Vegana de Chocolate", precio: 50000, emoji: "🌱", descripcion: "Torta de chocolate húmeda, sin productos de origen animal." },
  { id: "TE001", categoria: "Tortas Especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, emoji: "🎉", descripcion: "Diseñada especialmente para celebraciones, con mensaje incluido." }
];

// Función auxiliar para dar formato a los precios
export const formatearPrecio = (numero) => {
  return "$" + Number(numero || 0).toLocaleString("es-CL");
};

// ============================================
// OPERACIONES CRUD (Requeridas por la evaluación)
// ============================================

// READ: Obtener todos los productos
export const getProductos = () => {
  return [...productos];
};

// READ: Obtener un solo producto por ID
export const getProductoById = (id) => {
  return productos.find((p) => p.id === id);
};

// CREATE: Agregar un nuevo producto al catálogo
export const createProducto = (nuevoProducto) => {
  productos.push(nuevoProducto);
  return nuevoProducto;
};

// UPDATE: Actualizar datos de un producto existente
export const updateProducto = (id, datosActualizados) => {
  productos = productos.map((p) =>
    p.id === id ? { ...p, ...datosActualizados } : p
  );
  return getProductoById(id);
};

// DELETE: Eliminar un producto del catálogo
export const deleteProducto = (id) => {
  productos = productos.filter((p) => p.id !== id);
  return true;
};