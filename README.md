# User Management API

**Versión:** 1.0.0  
**Estado:** Production Ready  
**Última actualización:** Enero 2026

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Arquitectura](#arquitectura)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Configuración del Entorno](#configuración-del-entorno)
6. [Base de Datos](#base-de-datos)
7. [Endpoints de la API](#endpoints-de-la-api)
8. [Buenas Prácticas Aplicadas](#buenas-prácticas-aplicadas)
9. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
10. [Próximas Mejoras](#próximas-mejoras)

---

## 📱 Descripción del Proyecto

### Objetivo

**User Management API** es una aplicación backend robusta construida con Node.js y Express.js que proporciona un sistema completo de gestión de usuarios. La API implementa operaciones CRUD (Create, Read, Update, Delete) sobre un modelo de usuario persistente en una base de datos PostgreSQL.

### Problema que Resuelve

- ✅ **Gestión centralizada de usuarios**: Proporciona un único punto de acceso para gestionar datos de usuarios
- ✅ **Persistencia de datos**: Almacenamiento confiable en PostgreSQL con Prisma ORM
- ✅ **Escalabilidad**: Arquitectura por capas que permite crecimiento y mantenimiento
- ✅ **API RESTful**: Interfaz estándar para integración con múltiples clientes (web, mobile, terceros)
- ✅ **Manejo de errores robusto**: Sistema centralizado de manejo de excepciones

### Casos de Uso

- Plataforma SaaS multi-usuario
- Sistema de administración de clientes
- Dashboard administrativo con gestión de usuarios
- API de backend para aplicaciones web/mobile
- Sistema de CRM básico

---

## 🏗️ Arquitectura

### Patrón de Arquitectura: MVC + Repository

El proyecto implementa una arquitectura **por capas** que separa responsabilidades de manera clara:

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Frontend)                    │
│                   (Next.js Dashboard)                    │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 ROUTE LAYER (Routes)                     │
│              src/routes/user.routes.ts                   │
│         Define endpoints y map a controllers             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            CONTROLLER LAYER (Controllers)                │
│          src/controllers/user.controller.ts              │
│   Handle HTTP requests y responses, validación básica   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER                        │
│           (Services - Próximas mejoras)                  │
│      Lógica de negocio, validaciones complejas           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          REPOSITORY LAYER (Repositories)                 │
│          src/repositories/user.repository.ts             │
│   Acceso a datos, queries, operaciones de BD             │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  DATA LAYER                              │
│            PostgreSQL + Prisma Client                    │
│           Base de datos persistente                      │
└─────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Request entra en Routes** → Define qué endpoint se está llamando
2. **Controller procesa la request** → Extrae datos, valida formato
3. **Repository accede a BD** → Ejecuta operaciones con Prisma ORM
4. **Response vuelve al cliente** → JSON con datos o errores

### Beneficios de esta Arquitectura

| Aspecto | Beneficio |
|--------|-----------|
| **Separación de responsabilidades** | Cada capa tiene un propósito específico y bien definido |
| **Testabilidad** | Fácil crear tests unitarios para cada capa |
| **Mantenibilidad** | Cambios en BD no afectan controllers |
| **Escalabilidad** | Fácil agregar nuevas funcionalidades sin tocar código existente |
| **Reutilización** | Métodos del repository pueden usarse en múltiples controllers |

---

## 🛠️ Tecnologías Utilizadas

### Backend Core

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Node.js** | 18+ | Runtime de JavaScript servidor |
| **Express.js** | ^5.2.1 | Framework web minimalista y flexible |
| **TypeScript** | ^5.2.2 | Tipado estático para mayor seguridad |

### Base de Datos

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **PostgreSQL** | 12+ | Base de datos relacional robusta |
| **Prisma ORM** | ^5.22.0 | ORM type-safe para acceso a datos |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-----------|----------|
| **ts-node-dev** | Ejecutar TypeScript directamente en desarrollo con hot reload |
| **ts-node** | Ejecutar TypeScript (scripts, migrations) |
| **dotenv** | Gestión de variables de entorno |

### Frontend (Opcional)

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Next.js** | ^14.0 | Framework React fullstack |
| **React** | ^18.2.0 | Librería de UI |
| **Tailwind CSS** | ^3.3.0 | Framework CSS utilitario |
| **Axios** | ^1.6.0 | Cliente HTTP para consumir API |

### Por qué estas tecnologías

- **Node.js + Express**: Combinación ligera, rápida, con gran comunidad
- **TypeScript**: Previene errores en tiempo de desarrollo
- **Prisma**: ORM moderna con excelente developer experience y migraciones automáticas
- **PostgreSQL**: Base de datos confiable, ACID-compliant, open source
- **Next.js**: Frontend moderno integrado fácilmente con backend

---

## 📁 Estructura del Proyecto

```
prisma-express-api/
│
├── src/                                    # Código fuente principal
│   ├── app.ts                             # Configuración de Express
│   ├── server.ts                          # Punto de entrada
│   │
│   ├── routes/                            # ROUTE LAYER
│   │   └── user.routes.ts                 # Definición de endpoints
│   │
│   ├── controllers/                       # CONTROLLER LAYER
│   │   └── user.controller.ts             # Lógica de requests/responses
│   │
│   ├── repositories/                      # REPOSITORY LAYER
│   │   └── user.repository.ts             # Acceso a datos
│   │
│   ├── config/                            # Configuración
│   │   └── prisma.ts                      # Cliente Prisma singleton
│   │
│   └── middlewares/                       # Middlewares
│       └── errorHandler.ts                # Manejo centralizado de errores
│
├── prisma/                                 # Prisma ORM
│   ├── schema.prisma                      # Esquema de BD
│   └── migrations/                        # Histórico de migraciones
│
├── frontend/                               # Frontend (Next.js)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── package.json
│
├── .env                                    # Variables de entorno (NO COMMITAR)
├── .gitignore                              # Archivos ignorados por git
├── package.json                            # Dependencias del proyecto
├── tsconfig.json                           # Configuración TypeScript
├── seed.ts                                 # Script para poblar BD
└── README.md                               # Esta documentación

```

### Explicación de Carpetas

| Carpeta | Descripción |
|---------|-----------|
| **src/** | Contiene todo el código fuente TypeScript |
| **src/routes/** | Define las rutas REST y mapea a controllers |
| **src/controllers/** | Maneja requests HTTP y responses |
| **src/repositories/** | Abstrae acceso a datos (patrón Repository) |
| **src/config/** | Configuración de servicios externos (Prisma, BD) |
| **src/middlewares/** | Middlewares como manejo de errores |
| **prisma/** | Archivos de Prisma ORM |
| **prisma/migrations/** | Histórico de cambios en esquema de BD |
| **frontend/** | Aplicación Next.js de dashboard (opcional) |

---

## ⚙️ Configuración del Entorno

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **npm** 9+ (incluido con Node.js)
- **PostgreSQL** 12+ ([Descargar](https://www.postgresql.org/download/))
- **Git** ([Descargar](https://git-scm.com/))

Verifica las versiones:

```bash
node --version      # v18.0.0 o superior
npm --version       # 9.0.0 o superior
psql --version      # PostgreSQL 12 o superior
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/prisma_db"

# Server
PORT=3000
NODE_ENV=development
```

**⚠️ Importante:**
- Nunca commits `.env` a Git
- Usa `.env.example` como plantilla
- Las credenciales deben ser seguras en producción

### Instalación Paso a Paso

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/prisma-express-api.git
cd prisma-express-api
```

#### 2. Instalar Dependencias

```bash
npm install
```

#### 3. Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env con tus credenciales
nano .env
```

#### 4. Crear Base de Datos

```bash
# En PostgreSQL (psql)
CREATE DATABASE prisma_db;
```

O usando comando SQL:

```bash
psql -U postgres -c "CREATE DATABASE prisma_db;"
```

#### 5. Ejecutar Migraciones

```bash
# Crea la tabla User en PostgreSQL
npx prisma migrate dev --name init
```

#### 6. Poblar Base de Datos (Opcional)

```bash
# Inserta datos de prueba
npx ts-node seed.ts
```

#### 7. Verificar Instalación

```bash
npm run dev
```

Deberías ver:
```
🚀 Servidor iniciado en http://localhost:3000
```

---

## 🗄️ Base de Datos

### Esquema User

El modelo `User` es el núcleo del proyecto:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

### Explicación de Campos

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-----------|
| **id** | Int | PK, autoincrement | Identificador único |
| **name** | String | Required | Nombre completo del usuario |
| **email** | String | Required, Unique | Email único del usuario |

### Relaciones con Prisma

Aunque actualmente User no tiene relaciones, el proyecto está listo para escalarse:

```prisma
// Ejemplo: Agregar relación con Posts (futura mejora)
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]   // Relación uno a muchos
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User    @relation(fields: [userId], references: [id])
}
```

### Migraciones

Las migraciones registran cambios en el esquema:

```bash
# Crear una nueva migración
npx prisma migrate dev --name add_users_table

# Ver estado de migraciones
npx prisma migrate status

# Revertir última migración (dev solamente)
npx prisma migrate resolve --rolled-back <migration_name>
```

### Visualizar Base de Datos

```bash
# Abre Prisma Studio (interfaz gráfica)
npx prisma studio
```

Accede a `http://localhost:5555` para ver y editar datos visualmente.

---

## 🔌 Endpoints de la API

### Información General

- **Base URL**: `http://localhost:3000`
- **Protocolo**: REST
- **Content-Type**: `application/json`
- **Autenticación**: Ninguna (próxima mejora)

### 1. Obtener Todos los Usuarios

**GET** `/api/users`

Retorna lista de todos los usuarios.

**Request:**
```bash
curl -X GET http://localhost:3000/api/users
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "email": "juan@example.com"
    },
    {
      "id": 2,
      "name": "María López",
      "email": "maria@example.com"
    }
  ],
  "total": 2
}
```

**Posibles Errores:**
- `500 Internal Server Error` - Error en la base de datos

---

### 2. Obtener Usuario por ID

**GET** `/api/users/:id`

Retorna un usuario específico por su ID.

**Request:**
```bash
curl -X GET http://localhost:3000/api/users/1
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Response (404 Not Found):**
```json
{
  "error": "Usuario no encontrado"
}
```

**Validaciones:**
- ID debe ser un número > 0
- ID debe existir en la base de datos

---

### 3. Crear Nuevo Usuario

**POST** `/api/users`

Crea un nuevo usuario en la base de datos.

**Request:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos García",
    "email": "carlos@example.com"
  }'
```

**Request Body:**
```json
{
  "name": "Carlos García",
  "email": "carlos@example.com"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 3,
    "name": "Carlos García",
    "email": "carlos@example.com"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "name y email son requeridos"
}
```

**Validaciones:**
- `name` es requerido (string no vacío)
- `email` es requerido (string no vacío)
- `email` debe ser único en la base de datos
- Formato de email válido (implementar en futuro)

---

### 4. Eliminar Usuario

**DELETE** `/api/users/:id`

Elimina un usuario de la base de datos.

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

**Response (200 OK):**
```json
{
  "message": "Usuario eliminado correctamente"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Usuario no encontrado"
}
```

**Validaciones:**
- ID debe ser un número > 0
- Usuario debe existir

---

### Resumen de Endpoints

| Método | Endpoint | Descripción | Status |
|--------|----------|-----------|--------|
| GET | `/api/users` | Listar todos los usuarios | ✅ Implementado |
| GET | `/api/users/:id` | Obtener usuario por ID | ✅ Implementado |
| POST | `/api/users` | Crear nuevo usuario | ✅ Implementado |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ Implementado |
| PUT | `/api/users/:id` | Actualizar usuario | 🔄 Próxima mejora |
| PATCH | `/api/users/:id` | Actualizar parcialmente | 🔄 Próxima mejora |

---

## ✅ Buenas Prácticas Aplicadas

### 1. Separación de Responsabilidades

Cada capa tiene una responsabilidad única y bien definida:

```typescript
// ❌ MAL: Todo en un archivo
app.get('/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// ✅ BIEN: Separado en capas
// routes/user.routes.ts
router.get('/', (req, res, next) => userController.getAll(req, res, next))

// controllers/user.controller.ts
async getAll(req: Request, res: Response, next: NextFunction) {
  const users = await userRepository.findAll();
  res.json({ data: users });
}

// repositories/user.repository.ts
async findAll(): Promise<User[]> {
  return prisma.user.findMany();
}
```

### 2. Tipado Estático con TypeScript

Previene errores en tiempo de desarrollo:

```typescript
// ✅ BIEN: Tipos explícitos
async findById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

// ❌ MAL: Sin tipos
async findById(id) {
  return prisma.user.findUnique({ where: { id } });
}
```

### 3. Manejo Centralizado de Errores

Middleware que captura todos los errores:

```typescript
// middlewares/errorHandler.ts
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const status = err?.status || 500;
  const message = err?.message || 'Error interno del servidor';
  res.status(status).json({ error: message });
}

// app.ts
app.use(errorHandler); // Siempre al final
```

### 4. Validación de Input

Validación en controller antes de llegar a repository:

```typescript
async create(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email } = req.body;

    // Validación
    if (!name || !email) {
      return res.status(400).json({ error: 'Campos requeridos' });
    }

    const user = await userRepository.create({ name, email });
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}
```

### 5. Uso de Patrones Establecidos

- **Repository Pattern**: Abstrae acceso a datos
- **MVC Pattern**: Estructura clara de proyecto
- **Try-Catch**: Manejo de promesas
- **Singleton**: Una sola instancia de Prisma

```typescript
// config/prisma.ts (Singleton)
const prisma = new PrismaClient();
export default prisma;
```

### 6. Code Cleanup & Readability

- Nombres descriptivos de funciones
- Comentarios cuando es necesario
- Estructura consistente
- Sin código muerto

```typescript
// ✅ BIEN
const user = await userRepository.findById(userId);

// ❌ MAL
const u = await ur.fi(uid);
```

### 7. Documentación en Código

JSDoc para funciones públicas:

```typescript
/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise<User[]>} Array de usuarios
 * @throws {Error} Si hay error en la BD
 */
async findAll(): Promise<User[]> {
  return prisma.user.findMany();
}
```

### 8. CORS Habilitado

Permite que el frontend acceda a la API:

```typescript
// app.ts
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

### 9. Variables de Entorno

Nunca hardcodea valores sensibles:

```typescript
// ✅ BIEN
const port = process.env.PORT || 3000;

// ❌ MAL
const port = 3000; // Qué si cambia?
```

### 10. Testing Listo

Estructura facilita tests unitarios:

```typescript
// test/repositories/user.repository.test.ts
describe('UserRepository', () => {
  it('should find all users', async () => {
    const users = await userRepository.findAll();
    expect(users).toBeDefined();
  });
});
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales reales

# 3. Crear/sincronizar base de datos
npx prisma migrate dev --name init

# 4. Poblar datos de prueba (opcional)
npx ts-node seed.ts

# 5. Iniciar servidor (con hot reload)
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### Producción

```bash
# 1. Instalar dependencias
npm ci --production

# 2. Compilar TypeScript a JavaScript
npm run build

# 3. Ejecutar migraciones
npx prisma migrate deploy

# 4. Iniciar servidor (versión compilada)
npm start
```

### Debugging

```bash
# Abrir Prisma Studio (UI para ver/editar BD)
npx prisma studio

# Ver logs de migraciones
npx prisma migrate status

# Generar cliente Prisma nuevamente
npx prisma generate
```

### Comandos Disponibles

```bash
# npm run dev
# Inicia servidor en desarrollo con hot reload usando ts-node-dev

# npm run build
# Compila TypeScript a JavaScript en carpeta dist/

# npm start
# Ejecuta la versión compilada en producción

# npm test
# Ejecuta tests (próxima implementación)
```

### Verificar que todo funciona

```bash
# Terminal 1: Backend
npm run dev

# Terminal 2: Probar endpoints
curl http://localhost:3000/api/users

# Terminal 3 (opcional): Frontend
cd frontend
npm run dev
```

Accede a:
- **API**: http://localhost:3000
- **Dashboard**: http://localhost:3001 (si frontend está ejecutándose)
- **Prisma Studio**: http://localhost:5555 (con `npx prisma studio`)

---

## 🔮 Próximas Mejoras

### Autenticación & Seguridad

```typescript
// Implementar JWT (JSON Web Tokens)
import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: '24h' }
);
```

**Beneficios**: Proteger endpoints, auditoría, multi-dispositivo.

### Autorización & Roles

```typescript
// Agregar roles a usuarios
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  role  Role    @default(USER)  // ADMIN, USER, GUEST
}

enum Role {
  ADMIN
  USER
  GUEST
}

// Middleware para verificar rol
app.delete('/api/users/:id', requireRole('ADMIN'), deleteUser);
```

### Validación con Zod

```typescript
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
});

// En controller
const result = CreateUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() });
}
```

### Paginación

```typescript
// GET /api/users?page=1&limit=10
async findAll(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip, take: limit }),
    prisma.user.count(),
  ]);

  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
}
```

### Búsqueda y Filtrado

```typescript
// GET /api/users?search=juan&role=ADMIN
async findAll(query: { search?: string; role?: Role }) {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        query.search ? {
          OR: [
            { name: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
          ],
        } : {},
        query.role ? { role: query.role } : {},
      ],
    },
  });
  
  return users;
}
```

### Soft Deletes

```typescript
// Usuarios no se eliminan, se marcan como eliminados
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  deletedAt DateTime?
}

// En queries, filtrar automáticamente
const users = await prisma.user.findMany({
  where: { deletedAt: null },
});
```

### Logging Avanzado

```typescript
// Winston o Pino para logs estructurados
import pino from 'pino';

const logger = pino();

logger.info({ userId: 1 }, 'User created successfully');
logger.error({ error }, 'Failed to create user');
```

### Tests Unitarios & E2E

```bash
npm install --save-dev jest @types/jest

# jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

# test/controllers/user.controller.test.ts
describe('UserController', () => {
  it('should create a user', async () => {
    const result = await userController.create(mockReq, mockRes);
    expect(result).toBeDefined();
  });
});
```

### Dockerización

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/prisma_db
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=prisma_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

### Caché con Redis

```typescript
import redis from 'redis';

const client = redis.createClient();

// Caché de usuarios
async findById(id: number): Promise<User | null> {
  const cached = await client.get(`user:${id}`);
  if (cached) return JSON.parse(cached);
  
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    await client.setEx(`user:${id}`, 3600, JSON.stringify(user));
  }
  
  return user;
}
```

### Monitoreo & Observabilidad

```typescript
// New Relic, Datadog, Grafana
import newrelic from 'newrelic';

app.use(newrelic.middleware.express);

// Métricas personalizadas
newrelic.recordMetric('Users/Created', 1);
```

### WebSockets para Actualizaciones en Tiempo Real

```typescript
import { Server } from 'socket.io';

const io = new Server(server, {
  cors: { origin: 'http://localhost:3001' },
});

io.on('connection', (socket) => {
  socket.on('user:created', (user) => {
    io.emit('users:updated', user);
  });
});
```

---

## 📚 Recursos Adicionales

- [Documentación Express.js](https://expressjs.com/)
- [Documentación Prisma](https://www.prisma.io/docs/)
- [PostgreSQL Official](https://www.postgresql.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📄 Licencia

MIT - Libre para uso comercial y personal

---

## 👤 Autor

**Desarrollador Backend** - Enero 2026

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## ❓ Soporte

¿Preguntas o issues? Abre un issue en el repositorio.

---

**Última actualización:** Enero 6, 2026  
**Versión**: 1.0.0  
**Estado**: ✅ Production Ready
