# Elit Task Manager FrontEnd
### Todo funciona en [elit-taskmanager.pfeifferf.com](https://elit-taskmanager.pfeifferf.com/)

Sistema completo de gestión de tareas tipo Kanban desarrollado con Next.js y TypeScript.

## Descripción del Proyecto

Aplicación web que permite crear, visualizar y gestionar tareas organizadas en tres estados: Pendiente, En Curso y Completada. Los usuarios pueden crear nuevas tareas, moverlas entre columnas y eliminarlas según sea necesario.

## Stack Tecnológico

### Frontend
* **Next.js 15.5.4** con App Router
* **React 19.1.0**
* **TypeScript 5**
* **Tailwind CSS 4.1.9**
* **Lucide React** para iconografía

### Backend
* **Node.js** con TypeScript
* **API REST** para gestión de tareas
* Base de datos configurable

## Estructura del Proyecto

```
/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── new-task-dialog.tsx
│   ├── task-card.tsx
│   └── task-column.tsx
├── hooks/
│   └── use-tasks.ts
├── lib/
│   ├── api.ts
│   ├── task-service.ts
│   └── types.ts
└── public/
```

## Instalación y Ejecución

### Requisitos Previos
* Node.js 18 o superior
* npm, yarn, pnpm o bun

### Pasos de Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/franpfeiffer/elit-taskmanager-fe.git
cd elit-taskmanager-fe
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Editar `.env.local` y configurar:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Ejecutar el servidor de desarrollo
```bash
npm run dev
```

5. Abrir http://localhost:3000 en el navegador

### Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Genera build de producción
npm run start    # Ejecuta build de producción
npm run lint     # Ejecuta linter
```

## Funcionalidades Implementadas

### Core
* Crear nuevas tareas con título y descripción opcional
* Listar tareas agrupadas por estado
* Actualizar estado de tareas de forma interactiva
* Eliminar tareas
* Interfaz responsive y accesible

### Características de UI
* Sistema de diseño basado en variables CSS
* Modo oscuro soportado
* Animaciones suaves con Tailwind
* Feedback visual en todas las interacciones
* Diseño tipo Kanban con tres columnas

## Decisiones Técnicas

### Arquitectura Frontend

**Next.js 15 con App Router**: Permite aprovechar React Server Components y optimizaciones automáticas de Next.js mientras se mantiene la interactividad del cliente donde es necesaria.

**Custom Hook `useTasks`**: Centraliza toda la lógica de gestión de estado y comunicación con la API, facilitando el mantenimiento y testing.

**Separación de concerns**:
* `lib/api.ts`: Comunicación HTTP directa
* `lib/task-service.ts`: Capa de servicio con lógica de negocio
* `hooks/use-tasks.ts`: Gestión de estado y efectos
* `components/`: Componentes de UI puros

### Gestión de Estado

Se optó por estado local con React hooks en lugar de una solución global como Redux o Zustand porque:
* El estado es relativamente simple
* No hay necesidad de compartir estado entre rutas
* Menor complejidad y mejor rendimiento
* El hook personalizado provee toda la abstracción necesaria

### Estilización

**Tailwind CSS 4**: Permite desarrollo rápido con un sistema de diseño consistente. Se configuró con:
* Variables CSS para temas y personalización
* Sistema de colores OKLCH para mejor percepción visual
* Utilidades personalizadas para animaciones

### TypeScript

Tipado estricto en todo el proyecto para:
* Prevenir errores en tiempo de desarrollo
* Mejor experiencia de autocompletado
* Documentación implícita del código
* Refactorización más segura

## API Endpoints

El frontend espera los siguientes endpoints REST:

```
GET    /api/tasks           # Obtener todas las tareas
GET    /api/tasks/:id       # Obtener tarea por ID
POST   /api/tasks           # Crear nueva tarea
PATCH  /api/tasks/:id       # Actualizar tarea
DELETE /api/tasks/:id       # Eliminar tarea
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

## Mejoras Futuras

* Implementación de drag and drop para mover tareas
* Filtros y búsqueda de tareas
* Edición inline de título y descripción
* Historial de cambios
* Etiquetas y categorías
* Fechas de vencimiento
* Asignación de tareas a usuarios
* Tests unitarios y de integración
* Documentación de API con Swagger

## Notas de Desarrollo

### Manejo de Errores

Todos los servicios incluyen try-catch y manejan errores gracefully mostrando feedback al usuario.

### Accesibilidad

* Labels semánticos en formularios
* Textos alternativos en iconos
* Navegación por teclado soportada
* Contraste de colores WCAG AA compliant

### Performance

* Memoización de funciones con useCallback
* Cache de requests cuando es apropiado
* Lazy loading de componentes pesados
* Optimización de re-renders con React
