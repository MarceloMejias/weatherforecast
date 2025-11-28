# 🌤️ Weather Forecast - Proyecto Full Stack

Aplicación web para consultar el clima utilizando la API pública de Open-Meteo. Proyecto construido con arquitectura de microservicios, contenedores Docker, CI/CD con Jenkins y análisis de código con SonarQube.

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Desarrollo](#desarrollo)
- [Pipeline CI/CD](#pipeline-cicd)
- [SonarQube](#sonarqube)
- [Docker](#docker)

---

## 🏗️ Arquitectura

El proyecto está dividido en tres componentes principales:

```
┌─────────────┐      ┌─────────────┐     ┌─────────────────┐
│   Frontend  │─────▶│   Backend   │────▶│  Open-Meteo API │
│  React+Vite │      │ Node+Express│     │   (External)    │
│   Port 3000 │      │  Port 3001  │     └─────────────────┘
└─────────────┘      └─────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌─────────────────────────────────┐
│        Docker Network           │
│         weather-net             │
└─────────────────────────────────┘
```

### Herramientas DevOps

- **Jenkins** (Port 8080): Orquestación del pipeline CI/CD
- **SonarQube** (Port 9000): Análisis de calidad y seguridad del código

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca UI
- **Vite 4** - Build tool y dev server
- **CSS3** - Estilos modernos estilo macOS
- **Nginx** - Servidor web para producción

### Backend
- **Node.js 18** - Runtime
- **Express** - Framework web
- **Axios** - Cliente HTTP
- **CORS** - Manejo de peticiones cross-origin
- **Jest** - Testing framework

### DevOps
- **Docker & Docker Compose** - Contenedorización
- **Jenkins** - CI/CD automation
- **SonarQube** - Code quality & security analysis
- **Nginx** - Reverse proxy y servidor estático

---

## 📁 Estructura del Proyecto

```
weatherforecast/
├── backend/
│   ├── Dockerfile              # Imagen Docker del backend
│   ├── index.js                # Servidor Express
│   ├── package.json            # Dependencias Node.js
│   ├── sonar-project.properties # Configuración SonarQube
│   └── test/
│       └── app.test.js         # Tests unitarios
│
├── frontend/
│   ├── Dockerfile              # Multi-stage build (Node + Nginx)
│   ├── index.html              # Punto de entrada HTML
│   ├── package.json            # Dependencias React
│   ├── sonar-project.properties # Configuración SonarQube
│   ├── vite-config.js          # Configuración Vite
│   └── src/
│       ├── main.jsx            # Punto de entrada React
│       ├── app.jsx             # Componente principal
│       └── App.css             # Estilos modernos
│
├── docker-compose.yaml         # Orquestación de contenedores
├── Jenkinsfile                 # Pipeline CI/CD
└── README.md                   # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerequisitos

- Docker Desktop instalado
- Docker Compose v2+
- Node.js 18+ (para desarrollo local)
- Git

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd weatherforecast
```

### 2. Configurar Variables de Entorno

No se requieren variables de entorno adicionales. Los puertos están configurados por defecto:
- Frontend: `3000`
- Backend: `3001`
- Jenkins: `8080`
- SonarQube: `9000`

### 3. Levantar los Servicios

```bash
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build
```

### 4. Verificar los Servicios

- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api/weather?lat=-33.44&lon=-70.66
- Jenkins: http://localhost:8080
- SonarQube: http://localhost:9000

---

## 💻 Desarrollo

### Backend

```bash
cd backend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start

# Ejecutar tests
npm test

# Ver cobertura
npm run test:coverage
```

**API Endpoints:**
- `GET /api/weather?lat={latitude}&lon={longitude}`
  - Query params: `lat` (latitud), `lon` (longitud)
  - Response: `{ temperature, windspeed, condition }`

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🔄 Pipeline CI/CD

El pipeline está definido en `Jenkinsfile` y consta de las siguientes etapas:

### Stages

1. **Checkout** - Clona el código del repositorio
2. **Install Dependencies** - Instala dependencias de backend y frontend
3. **Test & Coverage** - Ejecuta tests y genera reportes de cobertura
4. **SonarQube Analysis** - Analiza el código con SonarQube
5. **Quality Gate** - Verifica que el código pase los estándares de calidad
6. **Build Docker Images** - Construye las imágenes Docker
7. **Deploy Dev** - Despliega a entorno de desarrollo (rama `dev`)
8. **Deploy Prod** - Despliega a producción (rama `main`)

### Configuración de Jenkins

1. Acceder a Jenkins en http://localhost:8080
2. Configurar credenciales de SonarQube
3. Instalar plugins:
   - SonarQube Scanner
   - Docker Pipeline
   - Git
4. Crear un nuevo Pipeline apuntando al `Jenkinsfile`

---

## 🔍 SonarQube

### Configuración Inicial

1. Acceder a SonarQube: http://localhost:9000
2. Login por defecto: `admin/admin`
3. Crear un token de acceso
4. Configurar el proyecto con las propiedades definidas en `sonar-project.properties`

### Análisis Manual

```bash
# Backend
cd backend
sonar-scanner

# Frontend
cd frontend
sonar-scanner
```

### Métricas Monitoreadas

- **Bugs** - Errores en el código
- **Vulnerabilities** - Problemas de seguridad
- **Code Smells** - Patrones de código mejorable
- **Coverage** - Cobertura de tests
- **Duplications** - Código duplicado

---

## 🐳 Docker

### Servicios Definidos

#### Backend
```yaml
build: ./backend
ports: 3001:3001
```

#### Frontend
```yaml
build: ./frontend (multi-stage)
ports: 3000:80
```

#### Jenkins
```yaml
image: jenkins/jenkins:lts
ports: 8080:8080, 50000:50000
volumes: jenkins_home, docker.sock
```

#### SonarQube
```yaml
image: sonarqube:community
ports: 9000:9000
volumes: sonarqube_data, extensions, logs
```

### Comandos Útiles

```bash
# Levantar servicios específicos
docker-compose up backend frontend

# Reconstruir sin cache
docker-compose build --no-cache

# Ver logs
docker-compose logs -f [servicio]

# Detener todo
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Ver estado de contenedores
docker-compose ps
```

---

## 🎨 Características del Frontend

### Diseño Estilo macOS

- **Tipografía**: San Francisco (-apple-system)
- **Glassmorphism**: backdrop-filter con blur
- **Colores**: Paleta de grises (#f5f5f7) y azul sistema (#007aff)
- **Sombras**: Sutiles y elevadas
- **Animaciones**: Transiciones suaves con cubic-bezier
- **Responsive**: Adaptable a diferentes tamaños de pantalla

### Funcionalidades

- ✅ Consulta de clima en tiempo real
- ✅ Muestra temperatura, velocidad del viento y código de condición
- ✅ Estados de carga y error
- ✅ Diseño minimalista y moderno
- ✅ Animaciones fluidas

---

## 🧪 Testing

### Backend Tests

Los tests están ubicados en `backend/test/app.test.js` y verifican:
- Respuestas de API correctas
- Manejo de errores
- Validación de parámetros

```bash
cd backend
npm test
```

---

## 📝 Notas de Desarrollo

### API Externa Utilizada

**Open-Meteo API**
- URL: `https://api.open-meteo.com/v1/forecast`
- No requiere API key
- Parámetros: latitude, longitude, current_weather

### Ejemplo de Request

```bash
curl "http://localhost:3001/api/weather?lat=-33.44&lon=-70.66"
```

### Ejemplo de Response

```json
{
  "temperature": 22.5,
  "windspeed": 15.3,
  "condition": 0
}
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto fue creado con fines educativos.

---

## 👨‍💻 Autor

Desarrollado como proyecto de demostración de arquitectura full stack con DevOps.

---

## 🔗 Referencias

- [React Documentation](https://react.dev)
- [Express.js](https://expressjs.com)
- [Docker Documentation](https://docs.docker.com)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [SonarQube Docs](https://docs.sonarqube.org)
- [Open-Meteo API](https://open-meteo.com/en/docs)
