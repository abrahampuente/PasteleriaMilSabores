// ============================================
// carrito.js
// Maneja el carrito de compras guardándolo en
// localStorage, para que no se pierda al cambiar
// de página o al recargar el navegador.
// ============================================

// Lee el carrito guardado en el navegador; si no hay nada, devuelve un arreglo vacío
export function obtenerCarrito() {
  if (typeof window === "undefined") return [];
  const datosGuardados = localStorage.getItem("carritoMilSabores");
  return datosGuardados ? JSON.parse(datosGuardados) : [];
}

// Guarda el arreglo del carrito en localStorage convertido a texto (JSON)
export function guardarCarrito(carrito) {
  if (typeof window !== "undefined") {
    localStorage.setItem("carritoMilSabores", JSON.stringify(carrito));
  }
}

// Agrega un producto al carrito (o suma 1 a la cantidad si ya estaba agregado)
export function agregarAlCarrito(producto, mensajePersonalizado) {
  const carrito = obtenerCarrito();

  // buscamos si el producto ya está en el carrito con el mismo mensaje
  const existente = carrito.find(function (item) {
    return item.id === producto.id && item.mensaje === mensajePersonalizado;
  });

  if (existente) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    // si no está, lo agregamos como un item nuevo con cantidad 1
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      emoji: producto.emoji,
      mensaje: mensajePersonalizado || "",
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

// Quita por completo un item del carrito según su posición (index) en el arreglo
export function quitarDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  return carrito;
}

// Cambia la cantidad de un item (delta puede ser +1 o -1)
export function cambiarCantidad(index, delta) {
  const carrito = obtenerCarrito();
  if (carrito[index]) {
    carrito[index].cantidad += delta;

    if (carrito[index].cantidad < 1) {
      carrito[index].cantidad = 1; // nunca dejamos que baje de 1
    }

    guardarCarrito(carrito);
  }
  return carrito;
}

// Suma el total a pagar considerando precio x cantidad de cada item
export function calcularTotal(carrito) {
  return carrito.reduce(function (total, item) {
    return total + item.precio * item.cantidad;
  }, 0);
}