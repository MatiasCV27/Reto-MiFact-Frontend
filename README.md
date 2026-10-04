# 🖥️ Sistema de Gestión de Productos - Frontend

Dashboard de administración de productos desarrollado con **Angular 18** como parte del reto técnico de MiFact.

El proyecto implementa una arquitectura limpia orientada a **Standalone Components**, separación de responsabilidades y una interfaz moderna, responsiva y minimalista.

---

## 🛠️ Tecnologías y Librerías Utilizadas

- 🅰️ **Angular 18** - Framework principal utilizando Standalone Components.
- 📘 **TypeScript** - Lenguaje principal de desarrollo.
- 🎨 **Tailwind CSS** - Diseño moderno, responsivo y minimalista.
- 🔔 **SweetAlert2** - Alertas interactivas y notificaciones visuales.
- 🔄 **RxJS** - Manejo de flujos de datos asíncronos y peticiones HTTP.
- 🧭 **Angular Router** - Gestión de navegación y rutas de la aplicación.

---

## 🏗️ Arquitectura y Estructura del Proyecto

El proyecto sigue principios de **Clean Architecture / Hexagonal Architecture**, adaptados al desarrollo frontend.

La estructura permite separar claramente las responsabilidades entre dominio, lógica de aplicación y presentación.

```text
src/
└── app/
    ├── features/
    │   └── products/
    │       ├── domain/
    │       │   └── # Entidades, contratos e interfaces de negocio
    │       │
    │       ├── application/
    │       │   └── # Casos de uso y lógica de aplicación
    │       │
    │       ├── adapters/
    │       │   └── # Consumo de APIs
    │       │
    │       └── presentation/
    │           └── # Componentes UI y vistas
    │               ├── Listar
    │               ├── Crear
    │               └── Actualizar
    │
    ├── app.routes.ts
    │   └── # Configuración de rutas y Lazy Loading
    │
    └── app.config.ts
        └── # Proveedores globales de la aplicación
```

### 📌 Separación de Responsabilidades

| Capa | Responsabilidad |
|---|---|
| `domain` | Entidades, interfaces y contratos de negocio |
| `application` | Casos de uso y lógica de aplicación |
| `adapters` | Consumo de APIs |
| `presentation` | Componentes, vistas e interacción con el usuario |
| `app.routes.ts` | Configuración de navegación y Lazy Loading |
| `app.config.ts` | Configuración y proveedores globales |

---

## ✨ Características Principales

### 📋 Listado de Productos

Permite visualizar los productos registrados mediante una tabla optimizada y de fácil navegación, con acceso rápido a las diferentes operaciones disponibles, con presionar enter ya filtra los resultados.

El listado incorpora un **buscador inteligente** que permite realizar consultas simples o utilizar filtros avanzados.

#### 🔎 Búsqueda por defecto

Por defecto, el texto ingresado en el buscador se utiliza para realizar una búsqueda por **código del producto (`code`)**.

Ejemplo:

```text
PROD-1001
```

#### 🎯 Filtros avanzados

Para realizar consultas más precisas, se pueden utilizar filtros mediante el prefijo de la clave correspondiente:

| Filtro | Ejemplo |
|---|---|
| `code` | `code: PROD-1001` |
| `name` | `name: example` |
| `description` | `description: texto` |
| `category` | `category: categoria` |
| `enabled` | `enabled: true` |

Los filtros pueden **combinarse de manera flexible** dentro de una misma consulta para obtener resultados más específicos.

Por ejemplo:

```text
name: laptop category: Accesorios
```

Esta consulta permite buscar productos cuyo nombre coincida con `laptop` y con la categoia `accesorios`

Los filtros son procesados y enviados al **backend**, permitiendo realizar consultas precisas sobre los productos registrados.

---

### ➕ Creación de Productos

Formulario reactivo para registrar nuevos productos.

Incluye:

- Validaciones de campos.
- Validación en tiempo real.
- Manejo de formularios mediante **Reactive Forms**.
- Mensajes visuales para informar al usuario sobre el resultado de la operación.

---

### ✏️ Actualización de Productos

Permite editar productos existentes mediante una ruta parametrizada:

```text
/main/update/:code
```

El código del producto se obtiene directamente desde los parámetros de la ruta y se utiliza para cargar automáticamente la información correspondiente.

---

### 📱 Diseño Compacto y Responsivo

La interfaz está desarrollada utilizando **Tailwind CSS**, buscando una experiencia de usuario:

- Limpia.
- Moderna.
- Minimalista.
- Responsiva.
- Adaptada a diferentes tamaños de pantalla.

---

### 🧭 Navegación SPA

La aplicación utiliza el sistema de **Routing de Angular** para proporcionar una experiencia de Single Page Application (SPA).

Se utiliza **Lazy Loading** para cargar las funcionalidades de manera eficiente y reducir la carga inicial de la aplicación.

---

## ⚙️ Configuración y Ejecución Local

Sigue los siguientes pasos para ejecutar el proyecto en tu entorno local.

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Accede al directorio del proyecto:

```bash
cd Reto-MiFact-Frontend
```

---

### 2. Instalar Dependencias

Ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias definidas en `package.json`.

---

### 3. Ejecutar el Servidor de Desarrollo

Inicia la aplicación mediante:

```bash
ng serve
```

---

### 4. Acceder a la Aplicación

Una vez iniciado el servidor, abre tu navegador y accede a:

```text
http://localhost:4200/
```

La aplicación redirigirá automáticamente al dashboard principal:

```text
/main
```

---

## 🗺️ Rutas Principales

| Ruta | Descripción |
|---|---|
| `/main` | Vista principal con el listado general de productos |
| `/main/save` | Formulario para crear un nuevo producto |
| `/main/update/:code` | Formulario para actualizar un producto existente |

### Ejemplos

**Listado de productos:**

```text
http://localhost:4200/main
```

**Crear producto:**

```text
http://localhost:4200/main/save
```

**Actualizar producto:**

```text
http://localhost:4200/main/update/PROD001
```

---

## 🔗 Integración con el Backend

El frontend consume la API REST desarrollada con **Spring Boot**, permitiendo realizar las operaciones CRUD sobre los productos.

Flujo general:

```text
┌──────────────────────┐
│   Angular 18         │
│      Frontend        │
└──────────┬───────────┘
           │
           │ HTTP / REST
           ▼
┌──────────────────────┐
│   Spring Boot        │
│       Backend        │
└──────────┬───────────┘
           │
           │ JPA / Hibernate
           ▼
┌──────────────────────┐
│       MySQL          │
│   scm_product        │
└──────────────────────┘
```

> 📌 **Importante:** Para utilizar todas las funcionalidades del frontend, asegúrate de que el backend esté ejecutándose correctamente y que la URL configurada para la API sea accesible desde la aplicación Angular.

---

## 👨‍💻 Autor

**Matias Paolo Criollo Vigo**

Frontend Developer | Angular | TypeScript 
