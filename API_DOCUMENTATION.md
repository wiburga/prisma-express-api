# API Documentation - User Management API

**Base URL**: `http://localhost:3000`  
**API Version**: 1.0.0  
**Last Updated**: Enero 2026

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Autenticación](#autenticación)
3. [Códigos de Respuesta](#códigos-de-respuesta)
4. [Rate Limiting](#rate-limiting)
5. [Endpoints](#endpoints)
6. [Ejemplos de Integración](#ejemplos-de-integración)

---

## Introducción

Esta API REST permite gestionar usuarios de manera segura y eficiente. Implementa prácticas RESTful estándar y proporciona respuestas JSON estructuradas.

### Características

- ✅ Endpoints RESTful completos
- ✅ Validación robusta de entrada
- ✅ Manejo centralizado de errores
- ✅ Respuestas JSON consistentes
- ✅ Documentación completa
- ✅ CORS habilitado

### Convenciones

- **Métodos HTTP**: GET, POST, DELETE (próximamente PUT, PATCH)
- **Formato**: JSON
- **Charset**: UTF-8
- **Timestamps**: ISO 8601

---

## Autenticación

**Estado Actual**: Sin autenticación requerida

⚠️ **Próximamente**: JWT token-based authentication

```bash
# En futuras versiones
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/users
```

---

## Códigos de Respuesta

| Código | Significado | Cuándo |
|--------|-----------|--------|
| **200** | OK | Request exitoso (GET, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Datos inválidos enviados |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Email duplicado o violación de constraints |
| **500** | Server Error | Error interno en el servidor |

### Estructura de Error

```json
{
  "error": "Descripción legible del error"
}
```

---

## Rate Limiting

**Próximamente**: Límite de requests por IP/usuario

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Endpoints

### GET /api/users

Obtiene la lista completa de todos los usuarios.

#### Especificación

- **Método**: GET
- **URL**: `/api/users`
- **Parámetros**: Ninguno
- **Autenticación**: No requerida

#### Request

```bash
curl -X GET \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json'
```

#### Response

**Status**: 200 OK

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
    },
    {
      "id": 3,
      "name": "Carlos García",
      "email": "carlos@example.com"
    }
  ],
  "total": 3
}
```

#### Campos de Response

| Campo | Tipo | Descripción |
|-------|------|-----------|
| **data** | Array | Array de objetos User |
| **total** | Int | Cantidad total de usuarios |

#### Posibles Errores

```json
{
  "error": "Error interno del servidor"
}
```

#### Ejemplos Avanzados

**JavaScript/Node.js**:
```javascript
const axios = require('axios');

axios.get('http://localhost:3000/api/users')
  .then(response => {
    console.log('Usuarios:', response.data.data);
    console.log('Total:', response.data.total);
  })
  .catch(error => console.error('Error:', error.message));
```

**Python**:
```python
import requests

response = requests.get('http://localhost:3000/api/users')
data = response.json()
print(f"Usuarios: {data['data']}")
print(f"Total: {data['total']}")
```

**React Hook**:
```typescript
const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    setUsers(data.data);
  };
  
  fetchUsers();
}, []);
```

---

### GET /api/users/:id

Obtiene un usuario específico por su ID.

#### Especificación

- **Método**: GET
- **URL**: `/api/users/:id`
- **Parámetros**:
  - `id` (URL param) - ID del usuario (entero > 0)
- **Autenticación**: No requerida

#### Request

```bash
curl -X GET \
  http://localhost:3000/api/users/1 \
  -H 'Content-Type: application/json'
```

#### Response (Éxito)

**Status**: 200 OK

```json
{
  "data": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

#### Response (No encontrado)

**Status**: 404 Not Found

```json
{
  "error": "Usuario no encontrado"
}
```

#### Validaciones

- `id` debe ser un número entero positivo
- `id` debe existir en la base de datos

#### Ejemplos Avanzados

**TypeScript/Fetch**:
```typescript
async function getUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('Usuario no encontrado');
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Uso
const user = await getUser(1);
```

---

### POST /api/users

Crea un nuevo usuario en la base de datos.

#### Especificación

- **Método**: POST
- **URL**: `/api/users`
- **Content-Type**: application/json
- **Autenticación**: No requerida
- **Rate Limit**: Próximamente

#### Request

```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Carlos García",
    "email": "carlos@example.com"
  }'
```

#### Request Body

```json
{
  "name": "Carlos García",
  "email": "carlos@example.com"
}
```

#### Campos de Request

| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|-----------|-----------|
| **name** | string | Sí | No vacío, max 255 | Nombre completo del usuario |
| **email** | string | Sí | Único, válido | Email del usuario |

#### Response (Éxito)

**Status**: 201 Created

```json
{
  "data": {
    "id": 4,
    "name": "Carlos García",
    "email": "carlos@example.com"
  }
}
```

#### Response (Datos Inválidos)

**Status**: 400 Bad Request

```json
{
  "error": "name y email son requeridos"
}
```

#### Response (Email Duplicado)

**Status**: 409 Conflict

```json
{
  "error": "Email ya está registrado"
}
```

#### Validaciones

- ✅ `name` es requerido (string no vacío)
- ✅ `email` es requerido (string no vacío)
- ✅ `email` debe ser único en la base de datos
- 🔄 Formato de email válido (próxima mejora)
- 🔄 Máximo de caracteres (próxima mejora)

#### Ejemplos Avanzados

**Axios + Async/Await**:
```typescript
async function createUser(name: string, email: string) {
  try {
    const response = await axios.post('http://localhost:3000/api/users', {
      name,
      email,
    });
    
    console.log('Usuario creado:', response.data.data);
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 400) {
      console.error('Datos inválidos:', error.response.data.error);
    } else if (error.response?.status === 409) {
      console.error('Email duplicado:', error.response.data.error);
    }
    throw error;
  }
}

// Uso
await createUser('Juan Pérez', 'juan@example.com');
```

**Validación en Frontend (React)**:
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });
const [error, setError] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  
  // Validar localmente primero
  if (!formData.name.trim()) {
    setError('El nombre es requerido');
    return;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setError('Email inválido');
    return;
  }
  
  try {
    await createUser(formData.name, formData.email);
    setFormData({ name: '', email: '' });
  } catch (err) {
    setError('Error al crear usuario');
  }
};
```

---

### DELETE /api/users/:id

Elimina un usuario de la base de datos.

#### Especificación

- **Método**: DELETE
- **URL**: `/api/users/:id`
- **Parámetros**:
  - `id` (URL param) - ID del usuario a eliminar
- **Autenticación**: No requerida

#### Request

```bash
curl -X DELETE \
  http://localhost:3000/api/users/1 \
  -H 'Content-Type: application/json'
```

#### Response (Éxito)

**Status**: 200 OK

```json
{
  "message": "Usuario eliminado correctamente"
}
```

#### Response (No encontrado)

**Status**: 404 Not Found

```json
{
  "error": "Usuario no encontrado"
}
```

#### Validaciones

- `id` debe ser un número entero positivo
- Usuario debe existir en la base de datos

#### Ejemplo con Confirmación

```typescript
async function deleteUser(userId: number): Promise<boolean> {
  const confirmed = window.confirm(
    '¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.'
  );
  
  if (!confirmed) return false;
  
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}`,
      { method: 'DELETE' }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data.message);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}
```

---

## Ejemplos de Integración

### Cliente JavaScript Completo

```typescript
class UserAPI {
  private baseUrl = 'http://localhost:3000/api';

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    const data = await response.json();
    return data.data;
  }

  async getUserById(id: number): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    
    if (response.status === 404) return null;
    
    const data = await response.json();
    return data.data;
  }

  async createUser(name: string, email: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const data = await response.json();
    return data.data;
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/users/${id}`, {
      method: 'DELETE',
    });

    return response.ok;
  }
}

// Uso
const api = new UserAPI();
const users = await api.getAllUsers();
const newUser = await api.createUser('Juan', 'juan@example.com');
const deleted = await api.deleteUser(newUser.id);
```

### React Hook Custom

```typescript
import { useState, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/users');
      const data = await res.json();
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (name: string, email: string) => {
      try {
        const res = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        });
        const data = await res.json();
        setUsers([...users, data.data]);
        return data.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        throw err;
      }
    },
    [users]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      try {
        await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        throw err;
      }
    },
    [users]
  );

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    deleteUser,
  };
}

// Uso en componente
function UserList() {
  const { users, loading, fetchUsers, createUser, deleteUser } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name} - {user.email}</p>
          <button onClick={() => deleteUser(user.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
```

---

## Changelog

### v1.0.0 - Enero 2026

✅ Endpoints CRUD completos
✅ Documentación detallada
✅ Validación de entrada
✅ Manejo de errores
✅ CORS habilitado

### v1.1.0 (Próximamente)

🔄 Autenticación JWT
🔄 Paginación
🔄 Búsqueda y filtrado
🔄 Rate limiting

---

**Para más información**: Ver [README.md](README.md)
