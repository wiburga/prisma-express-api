# ARCHITECTURE.md - Arquitectura del Proyecto

## 📐 Patrones y Arquitectura

Este documento explica los patrones arquitectónicos, decisiones de diseño y principios que guían el proyecto.

---

## Índice

1. [Arquitectura por Capas](#arquitectura-por-capas)
2. [Patrones de Diseño](#patrones-de-diseño)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Flujo de Datos](#flujo-de-datos)
5. [Decisiones de Diseño](#decisiones-de-diseño)
6. [Escalabilidad](#escalabilidad)

---

## Arquitectura por Capas

El proyecto implementa una **arquitectura de tres capas**:

### 1. Capa de Presentación (Routes)

**Archivos**: `src/routes/user.routes.ts`

**Responsabilidad**: 
- Definir endpoints HTTP
- Mapear rutas a controladores
- Especificar métodos HTTP (GET, POST, DELETE, etc.)

**Ejemplo**:
```typescript
router.get('/', (req, res, next) => userController.getAll(req, res, next))
router.post('/', (req, res, next) => userController.create(req, res, next))
router.delete('/:id', (req, res, next) => userController.delete(req, res, next))
```

**Principios**:
- ✅ Solo define rutas, no lógica
- ✅ Mapeos 1:1 con métodos de controlador
- ✅ URL semánticas y RESTful

---

### 2. Capa de Controladores (Controllers)

**Archivos**: `src/controllers/user.controller.ts`

**Responsabilidad**:
- Procesar requests HTTP
- Extraer datos del request
- Validar entrada básica
- Orquestar llamadas a repository
- Formatear responses
- Delegar manejo de errores

**Ejemplo**:
```typescript
async create(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Extraer datos
    const { name, email } = req.body

    // 2. Validar entrada
    if (!name || !email) {
      return res.status(400).json({ error: 'Campos requeridos' })
    }

    // 3. Llamar repository
    const user = await userRepository.create({ name, email })

    // 4. Responder
    res.status(201).json({ data: user })
  } catch (err) {
    // 5. Delegar manejo de errores
    next(err)
  }
}
```

**Principios**:
- ✅ Máximo 3-4 responsabilidades por método
- ✅ No conectarse directamente a BD
- ✅ Siempre usar try-catch y next(err)
- ✅ Validación de tipos y contenido

---

### 3. Capa de Datos (Repository)

**Archivos**: `src/repositories/user.repository.ts`

**Responsabilidad**:
- Acceso a base de datos
- Ejecutar queries de Prisma
- Transformar datos si es necesario
- Abstraer detalles de BD

**Ejemplo**:
```typescript
async findAll(): Promise<User[]> {
  return prisma.user.findMany()
}

async create(data: { name: string; email: string }): Promise<User> {
  return prisma.user.create({ data })
}
```

**Principios**:
- ✅ Solo métodos de BD
- ✅ Retornar tipos específicos (User, User[], null)
- ✅ No validar, solo ejecutar queries
- ✅ Logging de operaciones (futuro)

---

## Patrones de Diseño

### 1. Repository Pattern

**Objetivo**: Abstraer detalles de acceso a datos

```
Controller → Repository → Prisma → BD
            ↓
        (Query)
            ↓
        (Resultado)
```

**Beneficio**: 
- Cambiar BD sin afectar controllers
- Testear fácilmente
- Lógica de queries centralizada

**Ejemplo de Extensión**:

```typescript
// Antes: Sin abstracción
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Después: Con Repository Pattern
class UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }
}

app.get('/users', async (req, res) => {
  const users = await userRepository.findAll()
  res.json(users)
})

// Si mañana usamos MongoDB:
class UserRepository {
  async findAll(): Promise<User[]> {
    return await mongoCollection.find({}).toArray()
  }
}

// ¡Controllers no cambian!
```

---

### 2. Singleton Pattern

**Objetivo**: Una sola instancia de Prisma para toda la app

```typescript
// config/prisma.ts
const prisma = new PrismaClient()
export default prisma

// Se usa en todo el proyecto
import prisma from '../config/prisma'
```

**Beneficios**:
- Reutilización de conexión
- Memory efficiency
- Connection pooling automático

---

### 3. Middleware Pattern

**Objetivo**: Procesar requests/responses globalmente

```typescript
// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// Error Handler Middleware
app.use(errorHandler)
```

---

### 4. Dependency Injection (DIY)

**Objetivo**: Inyectar dependencias para testabilidad

Versión básica (actual):
```typescript
// Controllers dependen de singleton
import userRepository from '../repositories/user.repository'
```

Versión avanzada (próxima mejora):
```typescript
class UserController {
  constructor(private userRepository: UserRepository) {}

  async getAll(req: Request, res: Response) {
    const users = await this.userRepository.findAll()
    res.json({ data: users })
  }
}

// Fácil de testear:
const mockRepository = new MockUserRepository()
const controller = new UserController(mockRepository)
```

---

## Estructura de Carpetas

```
src/
├── app.ts                      # Configuración Express, middlewares
├── server.ts                   # Punto de entrada, servidor
│
├── routes/                     # Capa de Presentación
│   └── user.routes.ts         # Definición de endpoints
│
├── controllers/                # Capa de Lógica
│   └── user.controller.ts     # Orquestación de requests
│
├── repositories/               # Capa de Datos
│   └── user.repository.ts     # Acceso a BD
│
├── config/                     # Configuración
│   └── prisma.ts              # Cliente Prisma singleton
│
├── middlewares/                # Middlewares globales
│   └── errorHandler.ts        # Manejo centralizado de errores
│
├── services/                   # (Próxima mejora)
│   └── user.service.ts        # Lógica de negocio compleja
│
├── types/                      # (Próxima mejora)
│   └── index.ts               # Tipos TypeScript
│
└── utils/                      # (Próxima mejora)
    └── validators.ts          # Funciones de validación
```

---

## Flujo de Datos

### Ejemplo: GET /api/users/:id

```
1. REQUEST entra en navegador/cliente
   GET http://localhost:3000/api/users/1
          ↓

2. EXPRESS matchea la ruta
   routes/user.routes.ts detecta GET /:id
          ↓

3. CONTROLLER se ejecuta
   controllers/user.controller.ts.getById()
          ↓

4. VALIDACIÓN de input
   id debe ser number > 0
          ↓

5. REPOSITORY accede BD
   repositories/user.repository.ts.findById(1)
          ↓

6. PRISMA ejecuta query
   SELECT * FROM "User" WHERE id = 1
          ↓

7. BD POSTGRESQL retorna fila
   { id: 1, name: "Juan", email: "juan@mail.com" }
          ↓

8. CONTROLLER formatea response
   { data: { id: 1, ... } }
          ↓

9. EXPRESS envía HTTP response
   Status: 200 OK
   Body: JSON
          ↓

10. CLIENTE recibe response
```

### Manejo de Errores

```
ERROR en cualquier capa
    ↓
throw Error o next(err)
    ↓
errorHandler middleware
    ↓
Log en consola
    ↓
Formato de error: { error: "mensaje" }
    ↓
HTTP Status apropiado
    ↓
Cliente recibe error
```

---

## Decisiones de Diseño

### 1. ¿Por qué Prisma y no SQL directo?

| Aspecto | SQL Directo | Prisma ORM |
|---------|-----------|-----------|
| Seguridad | SQL injection risk | Parameterizado automático |
| Type-safety | Sin tipos | Fully typed ✅ |
| Migraciones | Manual | Automático ✅ |
| Desarrollo | Lento | Rápido ✅ |
| Performance | Un poco más rápido | Negligible |

**Decisión**: Prisma ORM

---

### 2. ¿Por qué tres capas y no dos?

**Dos capas** (Controllers directo a BD):
```typescript
❌ app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})
```

Problema: Controllers tienen lógica de BD, difícil cambiar BD

**Tres capas** (Con Repository):
```typescript
✅ app.get('/users', async (req, res) => {
  const users = await userRepository.findAll()
  res.json(users)
})
```

Beneficio: Fácil cambiar BD, testear, reutilizar

---

### 3. ¿Por qué TypeScript?

```typescript
// ❌ Sin TypeScript - Error en runtime
function getUser(id) {
  return users.find(u => u.id === id) // ¿Qué tipo es id?
}

// ✅ Con TypeScript - Error en desarrollo
function getUser(id: number): User | null {
  return users.find(u => u.id === id)
}
```

TypeScript atrapa errores **antes** de que usuarios los vean.

---

### 4. ¿Manejo de errores centralizado o local?

**Descentralizado**:
```typescript
❌ app.get('/users', async (req, res) => {
  try {
    const users = await userRepository.findAll()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})
```

Repetición de código, inconsistencia

**Centralizado**:
```typescript
✅ app.get('/users', async (req, res, next) => {
  const users = await userRepository.findAll()
  res.json(users)
  // Error automáticamente a errorHandler
})

app.use(errorHandler) // Una sola vez
```

Mantenible, consistente, testeable.

---

## Escalabilidad

### Cómo crecer desde aquí

#### Fase 1: Agregar funcionalidades (Actual)

```
Routes → Controllers → Repository → BD
```

Simplemente agregar más endpoints sin cambiar arquitectura.

---

#### Fase 2: Lógica de negocio compleja

Agregar **Service Layer**:

```
Routes → Controllers → Services → Repository → BD
```

```typescript
// services/user.service.ts
class UserService {
  async createWithValidation(data: CreateUserDto): Promise<User> {
    // Validaciones complejas
    if (await this.emailExists(data.email)) {
      throw new Error('Email duplicado')
    }

    // Lógica de negocio
    const user = await userRepository.create(data)

    // Enviar email de bienvenida
    await emailService.sendWelcome(user.email)

    return user
  }
}
```

---

#### Fase 3: Autenticación y autorización

```typescript
// middlewares/authenticate.ts
app.use(authenticate)

// middlewares/authorize.ts
router.delete('/:id', authorize('ADMIN'), deleteUser)
```

---

#### Fase 4: Testing

```
Unit Tests: Services, Repositories
Integration Tests: Controllers
E2E Tests: Endpoints completos
```

```bash
npm run test        # Todos los tests
npm run test:unit  # Solo unitarios
npm run test:e2e   # Solo E2E
```

---

#### Fase 5: Documentación automática

```typescript
// Swagger/OpenAPI
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista usuarios
 */
```

```bash
npm run docs  # Genera documentación interactiva
```

---

#### Fase 6: Microservicios

Partir en múltiples servicios:

```
API Gateway
├── User Service
├── Email Service
├── Auth Service
└── Notification Service
```

---

## Anti-Patterns a Evitar

### ❌ NO hacer

```typescript
// 1. Lógica en routes
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  // ... más lógica
})

// 2. Hardcodear valores
const API_KEY = 'abc123'

// 3. No validar entrada
app.post('/users', (req, res) => {
  const user = await create(req.body) // ¿Y si vacío?
})

// 4. Ignorar errores
const user = await userRepository.findAll() // ¿Y si falla?

// 5. Conexión a BD en múltiples lugares
const prisma1 = new PrismaClient()
const prisma2 = new PrismaClient() // ❌ DOS conexiones
```

### ✅ HACER

```typescript
// 1. Separar en capas
routes → controllers → services → repositories

// 2. Usar variables de entorno
const API_KEY = process.env.API_KEY

// 3. Validar siempre
if (!name || !email) throw new Error(...)

// 4. Manejo de errores explícito
try {
  const users = await userRepository.findAll()
} catch (err) {
  next(err)
}

// 5. Singleton de Prisma
const prisma = new PrismaClient() // Una sola vez
export default prisma
```

---

## Conclusión

Esta arquitectura es:

✅ **Escalable**: Fácil agregar funcionalidades  
✅ **Mantenible**: Código bien organizado  
✅ **Testeable**: Cada capa se prueba por separado  
✅ **Flexible**: Cambiar implementación sin afectar interfaces  

Para preguntas sobre arquitectura, ver [README.md](README.md).
