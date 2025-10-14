# 📚 Sistema de Biblioteca

**Descripción general:**  
Sistema web desarrollado en **React + TypeScript + Vite**, diseñado para la **gestión y administración de materiales de una biblioteca**.  
El sistema permite a los **administradores** registrar, editar y gestionar materiales y préstamos, mientras que los **usuarios** pueden visualizar los materiales disponibles y consultar su estado.

---

## 🚀 Tecnologías principales

- ⚛️ **React 18 + TypeScript**
- ⚙️ **Vite** como herramienta de build
- 🧱 **Axios** para comunicación con la API
- 🧩 **React Router DOM** para la navegación
- 🎨 **CSS Modules / Tema personalizado**
- 🧰 **ESLint** para linting
- 🧪 **Jest / React Testing Library** (si se agregan pruebas)

---

## 🏗️ Estructura del proyecto

```
📦 SistemaDeBiblioteca
 ┣ 📂 src
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 common
 ┃ ┃ ┗ 📂 interfaces
 ┃ ┃ ┃ ┗ 📜 material.interface.ts
 ┃ ┣ 📂 components
 ┃ ┣ 📂 guards
 ┃ ┣ 📂 layout
 ┃ ┃ ┗ 📂 components
 ┃ ┃ ┃ ┗ 📜 user.layout.tsx
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📂 404
 ┃ ┃ ┃ ┗ 📜 404.page.tsx
 ┃ ┃ ┣ 📂 Home
 ┃ ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┗ 📜 home.page.tsx
 ┃ ┣ 📂 utilities
 ┃ ┃ ┗ 📜 routes-with-not-found.utility.tsx
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┃ ┗ 📜 index.ts
 ┃ ┃ ┣ 📂 interfaces
 ┃ ┃ ┃ ┗ 📜 user.interface.ts
 ┃ ┃ ┗ 📂 services
 ┃ ┃ ┃ ┗ 📜 users-services.interface.ts
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📂 users
 ┃ ┃ ┃ ┣ 📜 user.service.ts
 ┃ ┃ ┃ ┗ 📜 users.endpoints.ts
 ┃ ┃ ┣ 📜 axios.config.ts
 ┃ ┃ ┗ 📜 index.ts
 ┃ ┣ 📜 App.tsx
 ┃ ┣ 📜 index.css
 ┃ ┣ 📜 main.tsx
 ┃ ┗ 📜 vite-env.d.ts
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┣ 📜 vite.config.ts
 ┗ 📜 README.md
```

---

## ⚡ Instalación y ejecución

### Requisitos previos
- Node.js v18+  
- npm, yarn o pnpm

### Instalación
```bash
git clone https://github.com/tu-usuario/SistemaDeBiblioteca.git
cd SistemaDeBiblioteca
npm install
```

### Ejecutar en modo desarrollo
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

### Previsualizar el build
```bash
npm run preview
```

---

## 🧩 Variables de entorno

Archivo `.env` (crear en la raíz):

```bash
VITE_API_URL=https://api.tu-dominio.com
```

> ⚠️ No subas tu `.env` real al repositorio. En su lugar, crea un `.env.example` con ejemplos de las variables.

---

## 🧠 Funcionalidades principales

### 👩‍💼 Rol Administrador
- Gestión completa de **materiales de biblioteca** (agregar, editar, eliminar).
- Control de **préstamos** y **devoluciones**.
- Visualización de estadísticas (pendientes, devueltos, etc.).

### 📖 Rol Usuario / Cliente
- Consulta de materiales disponibles.
- Visualización de detalles de cada material.
- Solicitud o reserva de préstamos (según permisos).

---

## 🧱 Servicios y API

Los servicios están estructurados bajo `/src/services` e implementan **Axios** para consumir la API REST.

Ejemplo de endpoint (archivo `users.endpoints.ts`):
```ts
export const USERS_ENDPOINTS = {
  getAll: '/users',
  getById: (id: string) => `/users/${id}`,
  create: '/users',
  update: (id: string) => `/users/${id}`,
  delete: (id: string) => `/users/${id}`,
};
```

---

## 🎨 Estilos y temas

El proyecto usa un sistema de temas ubicado en:  
`src/theme/theme.ts`

> Se pueden agregar variables globales para colores, fuentes y breakpoints.  

Ejemplo de uso:
```ts
export const theme = {
  colors: {
    primary: "#2c5364",
    secondary: "#203a43",
    accent: "#0f2027"
  }
};
```

---

## 🧰 Scripts principales

| Comando | Descripción |
|----------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build localmente |
| `npm run lint` | Ejecuta ESLint sobre el código |

---

## 🧑‍💻 Autor

**José Manuel Bernal**  
Desarrollador de Software — *React, TypeScript, NestJS*  
📧 [tu.email@ejemplo.com]  
🌐 [https://github.com/tu-usuario](https://github.com/tu-usuario)

---

## 🪪 Licencia

Proyecto bajo licencia **MIT**.  
Eres libre de usarlo y modificarlo con fines educativos o profesionales.

---

## 🌟 Agradecimientos

- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Axios](https://axios-http.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [TailwindCSS / Material UI] (según lo que se use)
