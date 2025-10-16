# Elit Task Manager Frontend

### Todo funciona en [elit-taskmanager.pfeifferf.com](https://elit-taskmanager.pfeifferf.com/)

Sistema completo de gestión de tareas tipo Kanban desarrollado con Next.js 15 y TypeScript.

## Descripción del Proyecto

Aplicación web full-stack que permite crear, visualizar y gestionar tareas organizadas en tres estados: Pendiente, En Curso y Completada. Los usuarios pueden crear nuevas tareas, moverlas entre columnas mediante drag & drop, editarlas y eliminarlas según sea necesario.

## Stack Tecnológico

### Frontend
* **Next.js 15.5.4** con App Router y React Server Components
* **React 19.1.0** - Última versión estable
* **TypeScript 5** - Tipado estático completo
* **Tailwind CSS 4.1.9** - Diseño utility-first con variables CSS
* **Zustand** - Manejo de estado global
* **@dnd-kit** - Drag and drop nativo y accesible
* **Lucide React** - Iconografía moderna
* **Radix UI** - Componentes accesibles y sin estilos

### Testing
* **Bun Test** - Test runner ultrarrápido
* **@testing-library/react** - Testing de componentes
* **Happy DOM** - Entorno DOM para tests

### Herramientas de Desarrollo
* **ESLint** - Linting con configuración de Next.js
* **Geist Font** - Tipografía de Vercel

## Características Principales

### Funcionalidades Core
- Crear tareas con título y descripción opcional
- Visualizar tareas agrupadas por estado (Kanban board)
- Mover tareas entre columnas con drag & drop
- Editar tareas (título, descripción y estado)
- Eliminar tareas
- Interfaz responsive (mobile-first)
- Dark mode / Light mode
- Optimistic UI updates

### Gestión de Estado
El proyecto utiliza **Zustand** para el manejo de estado global, proporcionando:

- Estado centralizado de todas las tareas
- Optimistic updates para mejor UX
- Manejo de estados de carga y errores
- API simple y sin boilerplate
- Persistencia del estado durante la sesión

#### Estructura del Store

```typescript
interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null

  loadTasks: () => Promise<void>
  addTask: (data) => Promise<Task>
  updateTask: (id, updates) => Promise<Task>
  updateTaskStatus: (id, status) => Promise<Task>
  deleteTask: (id) => Promise<boolean>
  getTasksByStatus: (status) => Task[]
}
```

### Características de UI/UX
- Animaciones suaves con Tailwind
- Feedback visual en todas las interacciones
- Sistema de diseño basado en variables CSS (OKLCH)
- Componentes accesibles con Radix UI
- Diseño adaptativo para móviles y desktop
- Bottom sheet nativo en móviles
- Menús contextuales para acciones de tareas

## Estructura del Proyecto

```
elit-taskmanager-fe/
├── app/
│   ├── globals.css          # Estilos globales y variables CSS
│   ├── layout.tsx            # Layout principal con providers
│   └── page.tsx              # Página principal con tablero Kanban
├── components/
│   ├── NewTaskDialog.tsx     # Modal para crear tareas
│   ├── TaskCard.tsx          # Tarjeta individual de tarea
│   ├── TaskColumn.tsx        # Columna del tablero Kanban
│   ├── TaskEditModal.tsx     # Modal para editar tareas
│   └── ThemeToggle.tsx       # Switcher de tema dark/light
├── lib/
│   ├── store/
│   │   ├── __tests__/
│   │   │   └── TaskStore.test.ts
│   │   └── TaskStore.ts      # Store global con Zustand
│   ├── api.ts                # Cliente HTTP para API
│   ├── TaskService.ts        # Capa de servicio
│   └── types.ts              # Tipos TypeScript
├── public/
│   └── elit-logo.svg         # Logo de Elit
├── .env.local                # Variables de entorno
├── bunfig.toml               # Configuración de Bun
├── test-setup.ts             # Setup para tests
├── next.config.ts            # Configuración de Next.js
├── postcss.config.mjs        # Configuración de PostCSS
└── tsconfig.json             # Configuración de TypeScript
```

## Instalación y Ejecución

### Requisitos Previos
* Node.js 18+ o Bun 1.0+
* npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/franpfeiffer/elit-taskmanager-fe.git
cd elit-taskmanager-fe
```

2. **Instalar dependencias**
```bash
npm install
# o
bun install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://elit-taskmanager-api.elit-taskmanager.workers.dev
```

4. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
# o
bun dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Genera build de producción
npm run start        # Ejecuta build de producción
npm run lint         # Ejecuta ESLint
npm test             # Ejecuta tests con Bun
npm run test:watch   # Tests en modo watch
```

## Tests

El proyecto incluye tests unitarios usando **Bun Test**.

### Ejecutar tests

```bash
bun test
```

### Tests en modo watch

```bash
bun test --watch
```

### Coverage

- **TaskStore** - Tests del store de Zustand
- **Types** - Validación de tipos TypeScript
- **TaskService** - Tests de la capa de servicio

**Total: 7 tests pasando**

```
✓ TaskStore > initializes with empty tasks
✓ TaskStore > filters tasks by status
✓ TaskStore > adds multiple tasks to state
✓ Types > validates TaskStatus values
✓ Types > creates a valid Task object
✓ TaskService > has required methods
✓ TaskService > exports TaskStatus type
```

## API Integration

El frontend se comunica con la API REST desplegada en Cloudflare Workers.

### Endpoints Consumidos

```typescript
GET    /api/tasks           // Obtener todas las tareas
GET    /api/tasks/:id       // Obtener tarea por ID
POST   /api/tasks           // Crear nueva tarea
PATCH  /api/tasks/:id       // Actualizar tarea
DELETE /api/tasks/:id       // Eliminar tarea
```

### Formato de Datos

```typescript
interface Task {
  id: string
  title: string
  description?: string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  createdAt: string
  updatedAt: string
}
```

## Decisiones Técnicas

### ¿Por qué Next.js 15 con App Router?
- Server Components por defecto para mejor rendimiento
- Streaming y Suspense nativos
- Optimizaciones automáticas de imágenes y fonts
- Mejor SEO con renderizado del servidor
- Sistema de routing basado en archivos

### ¿Por qué Zustand sobre Redux?
- API más simple y menos boilerplate
- Mejor integración con TypeScript
- No requiere providers ni context
- Optimistic updates más fáciles de implementar
- Store más pequeño (~1KB vs ~5KB de Redux)

### ¿Por qué Tailwind CSS 4?
- Desarrollo rápido con utility classes
- Sistema de diseño consistente con variables CSS
- Árbol de estilos shakeado automáticamente
- Soporte nativo para OKLCH (mejor percepción de color)
- Configuración mínima

### ¿Por qué @dnd-kit?
- Accesible por defecto (keyboard navigation)
- Performance superior a react-beautiful-dnd
- Flexible y personalizable
- Sin dependencias de jQuery
- Compatible con React 19

### ¿Por qué Bun Test?
- Más rápido que Jest (~10x)
- Configuración mínima
- Compatible con sintaxis de Jest
- Integrado con el runtime de Bun
- TypeScript nativo

## Deployment

### Vercel (Producción)

El proyecto está desplegado en Vercel con las siguientes configuraciones:

**Variables de entorno:**
```
NEXT_PUBLIC_API_URL=https://elit-taskmanager-api.elit-taskmanager.workers.dev
```

**Comandos de build:**
```bash
npm run build
```

**Deploy automático:**
- Push a `main` → Deploy a producción
- Pull requests → Preview deployments

### Proceso de Deploy

1. Conectar repositorio con Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

**URL de producción:** https://elit-taskmanager.pfeifferf.com

## Variables de Entorno

```env
NEXT_PUBLIC_API_URL=https://elit-taskmanager-api.elit-taskmanager.workers.dev
```

## Características Adicionales

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions en móviles
- Menús adaptados según dispositivo

### Accesibilidad
- Navegación por teclado completa
- ARIA labels en todos los componentes interactivos
- Contraste de colores WCAG AA
- Focus visible en todos los elementos

### Performance
- Server Components para reducir JavaScript del cliente
- Lazy loading de componentes pesados
- Optimistic updates para mejor perceived performance
- Memoización de componentes con React.memo

## Troubleshooting

### El frontend no se conecta al backend
Verificar que `NEXT_PUBLIC_API_URL` esté correctamente configurada en `.env.local`

### Error de CORS
Verificar que el backend tenga CORS configurado para aceptar requests del frontend

### Dark mode no funciona
Limpiar caché del navegador o probar en modo incógnito
