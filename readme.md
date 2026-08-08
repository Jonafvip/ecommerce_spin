# Ecommerce Spin

Ecommerce Spin es una aplicación web completa de comercio electrónico desarrollada con Django REST Framework en el backend y React + TypeScript en el frontend.

## Descripción general

La plataforma permite gestionar productos, categorías, usuarios, carritos y órdenes. El backend expone una API REST con autenticación por token y documentación OpenAPI, mientras que el frontend ofrece una interfaz para explorar productos, administrar el carrito y consultar el historial de órdenes.

## Stack tecnológico

- Backend: Django 6, Django REST Framework, PostgreSQL, DRF Spectacular, CORS headers, Django Filters.
- Frontend: React 19, TypeScript, Vite, Tailwind, React Router, Recharts, shadcn-style UI.

## Estructura del proyecto

```text
backend/                 # API REST con Django
frontend/                # Aplicación React + TypeScript
readme.md                # Documentación principal
```

## Requisitos previos

Antes de levantar el proyecto asegúrate de tener instalado:

- Python 3.10 o superior
- PostgreSQL
- Node.js 18+ y pnpm (o npm)
- Git

## Configuración del backend

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd ecommerce_spin
```

2. Entra al directorio del backend:

```bash
cd backend
```

3. Crea y activa un entorno virtual:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

En Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

4. Instala las dependencias del backend:

```bash
pip install -r requirements.txt
```

5. Configura las variables de entorno de base de datos. El proyecto usa un archivo de ejemplo llamado `example.env` que se puede copiar como referencia:

```bash
cp example.env .env
```

Completa los valores necesarios para la conexión a PostgreSQL:

```env
DB_NAME_DATABASE=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_PORT=5432
```

6. Crea la base de datos y aplica las migraciones:

```bash
python manage.py migrate
```

7. Opcionalmente, puedes cargar datos iniciales con el comando de seeds:

```bash
python manage.py load_seeds
```

8. Inicia el servidor de desarrollo del backend:

```bash
python manage.py runserver 0.0.0.0:8000
```

La API queda disponible en:

- http://localhost:8000/api/
- http://localhost:8000/api/docs/
- http://localhost:8000/api/schema/

## Configuración del frontend

1. Desde la raíz del proyecto, entra al frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
pnpm install
# o
npm install
```

3. Ejecuta el entorno de desarrollo:

```bash
pnpm dev
# o
npm run dev
```

Por defecto, Vite expone la app en:

- http://localhost:5173

## Scripts útiles

### Backend

```bash
python manage.py test
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
pnpm build
pnpm lint
pnpm dev
```

## Flujo recomendado

1. Levantar PostgreSQL local.
2. Crear el archivo de variables de entorno con las credenciales.
3. Ejecutar migraciones en Django.
4. Levantar backend en el puerto 8000.
5. Levantar frontend con Vite y consumir la API desde `http://localhost:8000/api/`.

## Estado del proyecto

Este proyecto está orientado a un entorno de desarrollo local y no está preparado para despliegue en producción sin revisar configuración de seguridad, secretos y variables de entorno.

Hecho por JonafVip!
