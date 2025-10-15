# Diseño de la Solución — “Signature Onboarding App”

## 0) Resumen ejecutivo
- **Objetivo:** aplicación full-stack (Vue 3 + NestJS) que:
  - Registra una solicitud de firma en la API externa (`POST /collector/request`).
  - Consulta el estado por `referenceTransaction` (`GET /gateway/request/status`).
  - Muestra **Términos y Condiciones** actuales o fallback local.
- **Alcance:** UI moderna, pago simulado, T&C genéricos, monorepo, docker, TDD, clean code.
- **API externa (ambiente dev):** `https://api.dev-firmaseguraec.com`

## 1) Historias de usuario
1. Cliente solicita su firma electrónica con sus datos y documentos.
2. Simulación de pago para completar flujo.
3. Lectura y aceptación de TyC antes de enviar.
4. Consulta de estado de solicitud.
5. Logs e incidencias para soporte.

## 2) Arquitectura & Stack
- **Front-end:** Vue 3 + Vite + TypeScript.
- **Back-end:** NestJS modular (DTOs, validators).
- **DB:** Postgres o SQLite dev.
- **Infra:** Docker Compose (monorepo).
- **Testing:** Vitest/Jest + Supertest + Playwright.

Diagrama:
```
[Vue 3 SPA] → [NestJS API Gateway]
                    │
                    ├─ Postgres
                    └─ Firma Segura API (ext.)
```

## 3) Modelo de datos
**signature_requests:** id, reference_transaction, payload, status, validation_status, observations, timestamps.
**catalogs:** provincias, ciudades, periods, applicationType.

## 4) Integración API
- Header: `Authorization: Bearer <token>`
- Endpoints:  
  - `POST /collector/request`  
  - `GET /gateway/request/status`  
  - `GET /manager/terms-and-conditions/current`

Validaciones: fingerCode (10 chars, ≥1 mayúscula, ≥6 dígitos), celular +5939..., archivos ≤5/10 MB.

## 5) Flujo UI
1. Datos personales  
2. Documentos  
3. Pago simulado  
4. TyC  
5. Confirmación y estado

## 6) Endpoints internos
- `POST /api/requests`
- `GET /api/requests/:ref/status`
- `GET /api/terms`
- `GET /api/catalogs`

## 7) Estructura monorepo
```
signature-onboarding/
├─ apps/web (Vue 3)
├─ apps/api (NestJS)
├─ packages/shared-types
├─ docker/
├─ docs/terms/
└─ docker-compose.yml
```

## 8) Variables
- `PORT`, `DATABASE_URL`, `FIRMASEGURA_BASE_URL`, `FIRMASEGURA_BEARER`
- `MAX_IMAGE_MB`, `MAX_PDF_MB`, `MAX_VIDEO_MB`, `VITE_API_URL`

## 9) Docker Compose (extracto)
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: app
    volumes:
      - db_data:/var/lib/postgresql/data
  api:
    build: ./apps/api
    env_file: .env
    depends_on: [db]
  web:
    build: ./apps/web
    environment:
      - VITE_API_URL=http://localhost:8080
    depends_on: [api]
volumes:
  db_data:
```

## 10) Buenas prácticas
- Validación doble (front/back).
- Sanitización, logs estructurados, timeouts, reintentos, circuit breaker.
- Secrets por entorno, no en repo.

## 11) TDD
Unit (DTO, validaciones), integración (mock API), e2e (flujo completo).

## 12) Código ejemplo (NestJS)
```ts
export class CreateSignatureRequestDto {
  @IsString() @Length(10,10)
  @Matches(/^(?=(?:.*[A-Z]){1,})(?=(?:.*\d){6,})[A-Z0-9]+$/)
  fingerCode!: string;
  @IsEmail() emailAddress!: string;
  @Matches(/^\+5939\d{8}$/) cellphoneNumber!: string;
}
```

## 13) Vue Composable
```ts
export async function fetchStatus(reference: string) {
  const r = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${reference}/status`);
  if (!r.ok) throw new Error('Status fetch failed');
  return r.json();
}
```

## 14) Despliegue
- Dev: Docker local.  
- Prod: NGINX HTTPS, body-limit, monitoreo.

## 15) Roadmap
- Pasarela real, panel operador, i18n, carga chunked.
