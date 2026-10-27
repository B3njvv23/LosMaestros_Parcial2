# Ferretería Los Maestros

Tienda desarrollada con React, Vite y TypeScript. Incluye catálogo, cuentas, carrito y administración de productos y usuarios.

## Abrir y ejecutar

Abre en VS Code la carpeta que contiene este README y `package.json`. Si faltan las dependencias, ejecuta primero `npm ci`. Después ejecuta:

```powershell
npm run dev
```

Abre el enlace Local indicado por Vite. Si el puerto está ocupado, puede usar el siguiente. Deja la terminal abierta y utiliza Ctrl+C para detener el servidor.

En este computador, Node.js y npm están añadidos al PATH del usuario. Cierra y vuelve a abrir VS Code después de cambiar el entorno para que sus terminales reconozcan los comandos.

En otro equipo, instala Node.js 22.12 o superior. Antes de ejecutar por primera vez:

```powershell
npm ci
```

## Comandos

```powershell
npm run build
npm run preview
npm test
npm run test:coverage
npm run format:check
npm run lint
```

`npm run build` genera `dist/`. Las pruebas de cobertura generan `coverage/`. Esas carpetas se pueden regenerar y no son necesarias para editar el código. La aplicación debe abrirse mediante Vite, no con doble clic en index.html ni con Live Server.

## Cuentas de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@losmaestros.cl | Admin123 |
| Cliente | valentina@test.cl | Cliente123 |

Usa datos ficticios. Las cuentas y la recuperación de contraseña son una simulación local, sin autenticación de servidor.

## Funcionalidades

- Catálogo de 85 productos con imágenes locales y descripciones breves.
- Búsqueda por nombre o código, filtros por categoría y disponibilidad, ofertas y detalle de producto.
- Registro en el mismo panel de acceso con confirmación de contraseña, inicio y cierre de sesión, recuperación local y edición del perfil.
- Carrito persistente con eliminación de líneas y compra simulada.
- Administración con crear, listar, editar y eliminar productos y usuarios.
- Contacto con validación y almacenamiento local.
- Navegación React Router y diseño adaptable con Bootstrap.

## Organización

```text
src/
  componentes/
    atomos/
    moleculas/
    organismos/
  paginas/                   
  tests/                     Pruebas Vitest y configuración
  Store.tsx                  Sesión y carrito compartidos
  repository.ts              Datos, repositorio y validaciones
  App.tsx                    Rutas de la aplicación
  main.tsx                   Punto de entrada y estilos
public/
  img/                       Fotografías locales
```
La organización sigue Atomic Design: las páginas componen organismos, los organismos utilizan moléculas y estas reutilizan átomos. `FormularioContacto` y `FormularioLogin` mantienen sus campos controlados con `useState`; `CampoFormulario` reúne etiqueta, `Input` y errores. `BotonEnlace` reutiliza `Link` para navegar a detalles y volver al catálogo. Atomic Design organiza los componentes. Repository separa las operaciones de datos de la interfaz. Las propiedades están tipadas con TypeScript y los formularios utilizan estado controlado.

## Datos locales

Productos, usuarios, mensajes y carrito se almacenan en el navegador. La sesión utiliza sessionStorage. Borrar los datos del sitio restaura la demostración. No hay cobros, envío de correos ni backend real; no se descuenta inventario físico al confirmar una compra.

En administración, escribe `6990` para mostrar `$6.990`. Los precios se expresan en pesos enteros.

## Compartir el código

El archivo de bloqueo `package-lock.json` permite reproducir la instalación. No compartas `node_modules/`, `.pnpm-store/`, registros de ejecución ni cachés: se generan localmente. Conserva `src/`, `public/img/`, los archivos de configuración y este README.


## Análisis estático

`eslint.config.js` configura ESLint para JavaScript, TypeScript y las reglas de Hooks de React. Ejecuta `npm run lint` para detectar problemas. `package-lock.json` fija las versiones y `npm ci` reproduce la instalación.

El catálogo presenta una tarjeta por fila en celular, dos en tablet y tres en computador.
