# Signature Onboarding App

Aplicación full-stack para la solicitud de firmas electrónicas que integra con la API de Firma Segura.

## 🏗️ Arquitectura

- **Frontend**: Vue 3 + Vite + TypeScript + Tailwind CSS
- **Backend**: NestJS + TypeScript + PostgreSQL
- **Monorepo**: Workspaces con packages compartidos
- **Docker**: Containerización completa
- **Testing**: TDD con Vitest, Jest y Supertest

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- Docker y Docker Compose
- PostgreSQL (si ejecutas localmente)

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd signature-onboarding
```

2. Instala dependencias:
```bash
npm install
```

3. Configura variables de entorno:
```bash
cp env.example .env
# Edita .env con tus valores
```

4. Ejecuta con Docker:
```bash
npm run dev
```

### Desarrollo Local

```bash
# Backend
npm run dev:api

# Frontend
npm run dev:web
```

## 📁 Estructura del Proyecto

```
signature-onboarding/
├── apps/
│   ├── web/                 # Vue 3 SPA
│   └── api/                 # NestJS API
├── packages/
│   ├── shared-types/        # DTOs y tipos compartidos
│   └── eslint-config/      # Configuración ESLint
├── docker/                  # Dockerfiles
├── docs/                    # Documentación
│   └── terms/              # Términos y condiciones
├── prisma/                 # Esquemas de BD
└── docker-compose.yml      # Orquestación
```

## 🔧 Configuración

### Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgres://app:app@localhost:5432/app

# Servidor
PORT=8080
NODE_ENV=development

# API Firma Segura
FIRMASEGURA_BASE_URL=https://api.dev-firmaseguraec.com
FIRMASEGURA_BEARER=your_token_here

# Límites de archivos (MB)
MAX_IMAGE_MB=5
MAX_PDF_MB=10
MAX_VIDEO_MB=10

# Frontend
VITE_API_URL=http://localhost:8080
```

## 📋 Funcionalidades

### Para Usuarios
- ✅ Solicitud de firma electrónica
- ✅ Carga de documentos
- ✅ Simulación de pago
- ✅ Aceptación de términos y condiciones
- ✅ Consulta de estado de solicitud

### Para Administradores
- ✅ Panel de administración
- ✅ Logs de integración
- ✅ Gestión de catálogos
- ✅ Monitoreo de solicitudes

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🐳 Docker

### Desarrollo
```bash
docker-compose up --build
```

### Producción
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

Una vez ejecutando la aplicación, la documentación de la API está disponible en:
- Swagger UI: http://localhost:8080/api/docs

## 🔒 Seguridad

- Validación de datos en frontend y backend
- Sanitización de inputs
- Rate limiting
- CORS configurado
- Headers de seguridad
- Logs estructurados

## 📊 Monitoreo

- Health checks en todos los servicios
- Logs estructurados con Pino
- Métricas de aplicación
- Alertas de errores

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m '🤖 Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o consultas:
- Email: support@example.com
- Documentación: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**Desarrollado con ❤️ usando Vue 3, NestJS y TypeScript**
