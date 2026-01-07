import prisma from './src/config/prisma'

async function main() {
  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: [
      { name: 'Juan Perez', email: 'juan@mail.com' },
      { name: 'Maria Lopez', email: 'maria@mail.com' },
      { name: 'Carlos Gomez', email: 'carlos@mail.com' },
      { name: 'Ana Torres', email: 'ana@mail.com' },
      { name: 'Luis Ramirez', email: 'luis@mail.com' },
    ],
  })

  console.log('✅ Base de datos poblada con usuarios de prueba')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
