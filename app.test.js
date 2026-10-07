// app.test.js
import { describe, it, expect } from 'vitest';
import { validarLogin, validarRegistro, validarContacto } from './validaciones.js';
import { getProductos, createProducto, getProductoById, deleteProducto } from './productos.js';
import { agregarAlCarrito, calcularTotal } from './carrito.js';

describe('Pruebas Unitarias - Pastelería Mil Sabores', () => {

  // ==========================================
  // 1. MÓDULO DE VALIDACIONES
  // ==========================================
  describe('Validaciones de Formularios', () => {
    it('Debe rechazar un inicio de sesión con correo con formato incorrecto', () => {
      const resultado = validarLogin('correoInvalido', '123456');
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores.correo).toBeDefined();
    });

    it('Debe permitir inicio de sesión con credenciales válidas', () => {
      const resultado = validarLogin('estudiante@duoc.cl', '123456');
      expect(resultado.esValido).toBe(true);
      expect(resultado.errores.correo).toBeUndefined();
    });

    it('Debe detectar cuando las contraseñas no coinciden en el registro', () => {
      const datosRegistro = {
        nombre: 'Carlos Pérez',
        correo: 'carlos@duoc.cl',
        clave: 'Clave123',
        confirmarClave: 'Diferente123',
        fechaNacimiento: '2000-01-01'
      };
      const resultado = validarRegistro(datosRegistro);
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores.confirmarClave).toBeDefined();
    });
  });

  // ==========================================
  // 2. MÓDULO DE PRODUCTOS (CRUD)
  // ==========================================
  describe('CRUD de Productos', () => {
    it('Debe obtener la lista completa de productos', () => {
      const productos = getProductos();
      expect(productos.length).toBeGreaterThan(0);
    });

    it('Debe encontrar un producto existente por su ID', () => {
      const producto = getProductoById('TC001');
      expect(producto).toBeDefined();
      expect(producto.nombre).toBe('Torta Cuadrada de Chocolate');
    });

    it('Debe agregar un nuevo producto al catálogo (CREATE)', () => {
      const nuevo = {
        id: 'PRUEBA01',
        categoria: 'Tortas Especiales',
        nombre: 'Torta de Prueba',
        precio: 15000,
        emoji: '🎂'
      };
      createProducto(nuevo);
      const creado = getProductoById('PRUEBA01');
      expect(creado).toBeDefined();
      expect(creado.nombre).toBe('Torta de Prueba');
    });

    it('Debe eliminar un producto del catálogo (DELETE)', () => {
      deleteProducto('PRUEBA01');
      const eliminado = getProductoById('PRUEBA01');
      expect(eliminado).toBeUndefined();
    });
  });

  // ==========================================
  // 3. MÓDULO DEL CARRITO DE COMPRAS
  // ==========================================
  describe('Cálculos del Carrito', () => {
    it('Debe calcular correctamente el total acumulado', () => {
      const items = [
        { id: '1', nombre: 'Torta 1', precio: 10000, cantidad: 2 },
        { id: '2', nombre: 'Torta 2', precio: 5000, cantidad: 1 }
      ];
      const total = calcularTotal(items);
      expect(total).toBe(25000);
    });
  });

});