# Archivo CONTRIBUTING.md
# Guía para Contribuyentes

## Cómo Contribuir

Este proyecto agradece las contribuciones de la comunidad. Aquí te explicamos cómo hacerlo correctamente.

## Requisitos

- Node.js 18+
- PostgreSQL 12+
- Git

## Proceso de Contribución

### 1. Fork el Repositorio

```bash
# En GitHub: Click en "Fork" (arriba a la derecha)
```

### 2. Clonar tu Fork

```bash
git clone https://github.com/tu-usuario/prisma-express-api.git
cd prisma-express-api
```

### 3. Crear una Rama de Feature

```bash
# Siempre crear rama nueva para cada feature/fix
git checkout -b feature/nombre-descriptivo

# Ejemplos de nombres buenos:
# - feature/agregar-paginacion
# - fix/validacion-email
# - docs/actualizar-readme
# - refactor/simplificar-controllers
```

### 4. Hacer Cambios

```bash
# Editar archivos, crear nuevos archivos, etc.
# Mantener commits pequeños y descriptivos
```

### 5. Commit y Push

```bash
# Hacer commits descriptivos
git add .
git commit -m "feat: agregar paginación a GET /api/users"

# Mensajes de commit siguiendo Conventional Commits:
# feat: Nueva funcionalidad
# fix: Corrección de bug
# docs: Cambios en documentación
# refactor: Refactorización sin cambio funcional
# test: Agregar tests
# chore: Cambios en build, dependencies, etc.

# Push a tu fork
git push origin feature/nombre-descriptivo
```

### 6. Crear Pull Request

- Ve a GitHub y haz click en "Create Pull Request"
- Describe qué cambios hiciste y por qué
- Reference issues relacionados: "Closes #123"

## Estándares de Código

### TypeScript

- Siempre usa tipos explícitos
- Avoid `any`
- Usa interfaces para objetos complejos

```typescript
// ✅ BIEN
async findById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

// ❌ MAL
async findById(id: any): Promise<any> {
  return prisma.user.findUnique({ where: { id } });
}
```

### Nombres

```typescript
// ✅ BIEN
const allUsers = await userRepository.findAll();
const userWithEmail = users.find(u => u.email === email);

// ❌ MAL
const u = await ur.getAll();
const uw = users.find(u => u.e === e);
```

### Manejo de Errores

```typescript
// ✅ BIEN - Manejo explícito
try {
  const user = await userRepository.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
} catch (err) {
  next(err);
}

// ❌ MAL - Sin manejo
const user = await userRepository.findById(id);
res.json({ data: user });
```

### Comentarios

```typescript
// ✅ BIEN - Explicar el "por qué", no el "qué"
// Filtramos por deletedAt = null porque usamos soft deletes
where: { deletedAt: null }

// ❌ MAL - Comentarios obvios
// Obtener usuario por id
const user = await prisma.user.findUnique({ where: { id } });
```

## Testing

Todos los PRs con código nuevo deben incluir tests:

```bash
npm test

# O para testing específico
npm test -- user.controller.test.ts
```

## Revisión de Código

Un mantenedor revisará tu PR. Posibles comentarios:

- Cambios de estilo o nombres
- Mejoras de performance
- Falta de tests
- Documentación incompleta

Sea receptivo a feedback constructivo.

## Antes de Hacer PR

- [ ] Tu código sigue los estándares de este proyecto
- [ ] Agregaste tests para nuevas funcionalidades
- [ ] Documentación actualizada (README, JSDoc, etc.)
- [ ] Sin conflictos con main
- [ ] Tests pasando: `npm test`
- [ ] Linting ok: `npm run lint` (próxima implementación)

## Preguntas?

- Abre un Issue para discusiones
- Revisa Issues existentes
- Checkea Discussions en GitHub

¡Gracias por contribuir! 🎉
