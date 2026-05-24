# FoodStore — Admin App

Panel de administración del sistema FoodStore. Permite gestionar productos, categorías, ingredientes, pedidos y usuarios.

## Tecnologías

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM v7
- TanStack Query v5
- TanStack Table v8
- Axios
- Zustand v5

## Requisitos previos

- Node.js 18 o superior
- pnpm

## Instalación

```bash
pnpm install
```

## Configuración

Crear un archivo `.env` en la raíz de la carpeta `front/` basándose en `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Levantar el proyecto

```bash
pnpm dev
```

La app estará disponible en `http://localhost:5173`.

## Estructura de carpetas
src/
├── api/              # Funciones de llamadas HTTP (axios)
├── components/
│   └── layout/       # AppLayout (sidebar) y AuthLayout (login)
├── modules/          # Módulos por dominio
│   ├── auth/         # Login
│   ├── categorias/   # Gestión de categorías y subcategorías
│   ├── ingredientes/ # Gestión de ingredientes
│   ├── productos/    # Gestión de productos
│   ├── pedidos/      # Gestión y seguimiento de pedidos
│   └── usuarios/     # Gestión de usuarios (solo ADMIN)
├── router/           # Configuración de rutas y protección
├── stores/           # Estado global con Zustand
└── types/            # Interfaces y tipos TypeScript

## Roles del sistema

| Rol | Acceso |
|-----|--------|
| ADMIN | CRUD completo de todo el sistema |
| PEDIDOS | Ver y avanzar estados de pedidos |
| STOCK | Habilitar/deshabilitar productos |
| CLIENT | Sin acceso al panel de administración |

## Autenticación

La autenticación usa JWT almacenado en una cookie httpOnly. El navegador la envía automáticamente en cada request. Al iniciar la app se verifica la sesión contra el backend via `GET /auth/me`.