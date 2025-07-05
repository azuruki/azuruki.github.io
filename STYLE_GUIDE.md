# Guía de Estilo - Azurukisan

## Paleta de Colores

### Colores Principales
- **Púrpura Principal** (`--primary`): #8B5CF6
  - Usado para elementos principales, botones y acentos
- **Púrpura Claro** (`--primary-light`): #A78BFA
  - Usado para hover states y elementos secundarios
- **Púrpura Oscuro** (`--primary-dark`): #7C3AED
  - Usado para estados activos y elementos de énfasis

### Colores de Acento
- **Rosa Neón** (`--accent`): #EC4899
  - Usado para llamadas a la acción y elementos destacados
- **Rosa Claro** (`--accent-light`): #F472B6
  - Usado para hover states y elementos secundarios
- **Rosa Oscuro** (`--accent-dark`): #DB2777
  - Usado para estados activos y elementos de énfasis

### Colores de Fondo
- **Fondo Claro** (`--bg-light`): #F9FAFB
  - Color de fondo principal
- **Fondo Oscuro** (`--bg-dark`): #1F2937
  - Color de fondo para modo oscuro

### Colores de Texto
- **Texto Principal** (`--text-primary`): #1F2937
  - Color principal para texto
- **Texto Secundario** (`--text-secondary`): #4B5563
  - Color para texto secundario
- **Texto Claro** (`--text-light`): #F9FAFB
  - Color para texto sobre fondos oscuros

## Tipografía

### Fuentes
- **Fuente Principal**: Poppins
  - Usada para títulos y elementos destacados
- **Fuente Secundaria**: Quicksand
  - Usada para texto general y elementos de interfaz

### Tamaños de Fuente
- **Extra Pequeño**: 0.75rem (12px)
- **Pequeño**: 0.875rem (14px)
- **Base**: 1rem (16px)
- **Grande**: 1.125rem (18px)
- **Extra Grande**: 1.25rem (20px)
- **2XL**: 1.5rem (24px)
- **3XL**: 1.875rem (30px)
- **4XL**: 2.25rem (36px)

## Espaciado

### Sistema de Espaciado
- **Extra Pequeño**: 0.25rem (4px)
- **Pequeño**: 0.5rem (8px)
- **Medio**: 1rem (16px)
- **Grande**: 1.5rem (24px)
- **Extra Grande**: 2rem (32px)

## Breakpoints

### Puntos de Quiebre
- **Móvil**: 640px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Desktop Grande**: 1280px

## Componentes

### Botones
- **Botón Primario**
  - Fondo: `--primary`
  - Texto: `--text-light`
  - Hover: `--primary-dark`
  - Transición: 300ms

- **Botón Secundario**
  - Fondo: `--bg-light`
  - Texto: `--primary`
  - Hover: `--primary`
  - Transición: 300ms

### Tarjetas
- **Tarjeta de Cosplay**
  - Border Radius: 1rem
  - Sombra: `--shadow-md`
  - Hover: Elevación y escala suave
  - Transición: 300ms

### Carrusel
- **Controles**
  - Fondo: rgba(255, 255, 255, 0.8)
  - Hover: `--primary`
  - Transición: 300ms

## Accesibilidad

### Contraste
- Todos los textos deben mantener un ratio de contraste mínimo de 4.5:1
- Elementos interactivos deben mantener un ratio de contraste mínimo de 3:1

### Navegación
- Skip links implementados para navegación por teclado
- Todos los elementos interactivos deben ser accesibles por teclado
- ARIA labels implementados en elementos no descriptivos

### Modo Oscuro
- Soporte completo para modo oscuro
- Transiciones suaves entre modos
- Respeto a las preferencias del sistema

## Animaciones

### Transiciones
- **Rápida**: 150ms
- **Normal**: 300ms
- **Lenta**: 500ms

### Efectos
- Hover suave en elementos interactivos
- Animación de flotación para elementos destacados
- Transiciones suaves para cambios de estado

## Imágenes

### Optimización
- Lazy loading implementado
- Formatos modernos (WebP con fallback)
- Tamaños responsivos

### Accesibilidad
- Alt text descriptivo obligatorio
- Lazy loading con placeholder
- Manejo de errores de carga

## Performance

### Carga
- Preload de recursos críticos
- Defer de scripts no críticos
- Optimización de fuentes web

### Rendimiento
- Minimización de CSS/JS
- Optimización de imágenes
- Caché de recursos estáticos 