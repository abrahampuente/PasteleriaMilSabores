// ============================================
// validaciones.js
// Revisa los datos de los formularios ANTES de
// enviarlos. Mantiene las reglas de negocio del proyecto.
// ============================================

// Revisa que el correo termine en uno de los dominios permitidos por el caso
export function correoValido(correo) {
  const dominiosPermitidos = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  return dominiosPermitidos.some(function (dominio) {
    return correo.toLowerCase().endsWith(dominio);
  });
}

// Calcula la edad de una persona a partir de su fecha de nacimiento (formato YYYY-MM-DD)
export function calcularEdad(fechaTexto) {
  if (!fechaTexto) return 0;
  const hoy = new Date();
  const nacimiento = new Date(fechaTexto);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();

  // si todavía no llega el mes/día de cumpleaños este año, restamos 1
  const noHaCumplidoAnos =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAnos) {
    edad = edad - 1;
  }
  return edad;
}

// ==========================================
// 1. VALIDACIÓN FORMULARIO LOGIN
// ==========================================
export const validarLogin = (correo, clave) => {
  const errores = {};
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correo || !regexCorreo.test(correo.trim())) {
    errores.correo = "Debe ingresar un correo electrónico válido.";
  }

  if (!clave || clave.trim() === "") {
    errores.clave = "La contraseña no puede estar vacía.";
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
};

// ==========================================
// 2. VALIDACIÓN FORMULARIO REGISTRO
// ==========================================
export function validarRegistro({ nombre, correo, clave, confirmarClave, fechaNacimiento, codigo }) {
  const errores = {};

  if (!nombre || nombre.trim() === '') {
    errores.nombre = 'El nombre completo es obligatorio.';
  }

  if (!correo || correo.trim() === '') {
    errores.correo = 'El correo es obligatorio.';
  } else if (!correoValido(correo.trim())) {
    errores.correo = 'El correo debe terminar en @duocuc.cl, @profesor.duoc.cl o @gmail.com.';
  }

  if (!clave || clave.trim() === '') {
    errores.clave = 'La contraseña es obligatoria.';
  }

  if (!confirmarClave || confirmarClave.trim() === '') {
    errores.confirmarClave = 'Debes confirmar la contraseña.';
  } else if (clave && clave.trim() !== '' && clave !== confirmarClave) {
    errores.confirmarClave = 'Las contraseñas no coinciden.';
  }

  if (!fechaNacimiento || fechaNacimiento.trim() === '') {
    errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
  }

  const esValido = Object.keys(errores).length === 0;
  let mensajeBienvenida = "";

  if (esValido) {
    const edad = calcularEdad(fechaNacimiento);
    mensajeBienvenida = "¡Registro exitoso! Bienvenido/a a Pastelería Mil Sabores.";
    if (edad >= 50) {
      mensajeBienvenida += " Por ser mayor de 50 años, tienes un 50% de descuento en todos los productos.";
    }
    if (codigo && codigo.trim() === 'FELICES50') {
      mensajeBienvenida += " Además, aplicaste el código de descuento FELICES50, ¡disfruta tu descuento adicional!";
    }
  }

  return {
    esValido,
    errores,
    mensajeBienvenida
  };
}

// ==========================================
// 3. VALIDACIÓN FORMULARIO CONTACTO
// ==========================================
export function validarContacto({ nombre, correo, mensaje }) {
  const errores = {};

  if (!nombre || nombre.trim() === '') {
    errores.nombre = 'El nombre es obligatorio.';
  }

  if (correo && correo.trim() !== '' && !correoValido(correo.trim())) {
    errores.correo = 'El correo debe terminar en @duocuc.cl, @profesor.duoc.cl o @gmail.com.';
  }

  if (!mensaje || mensaje.trim() === '') {
    errores.mensaje = 'El mensaje no puede estar vacío.';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
}