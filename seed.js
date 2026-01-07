const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Juan Perez', email: 'juan1@mail.com' },
      { name: 'Maria Lopez', email: 'maria2@mail.com' },
      { name: 'Carlos Gomez', email: 'carlos3@mail.com' },
      { name: 'Ana Torres', email: 'ana4@mail.com' },
      { name: 'Luis Ramirez', email: 'luis5@mail.com' },
      { name: 'Sofia Herrera', email: 'sofia6@mail.com' },
      { name: 'Pedro Castro', email: 'pedro7@mail.com' },
      { name: 'Laura Molina', email: 'laura8@mail.com' },
      { name: 'Diego Rojas', email: 'diego9@mail.com' },
      { name: 'Valentina Ruiz', email: 'valentina10@mail.com' },
      { name: 'Miguel Flores', email: 'miguel11@mail.com' },
      { name: 'Camila Paredes', email: 'camila12@mail.com' },
      { name: 'Andres Vega', email: 'andres13@mail.com' },
      { name: 'Daniela Ortiz', email: 'daniela14@mail.com' },
      { name: 'Jorge Silva', email: 'jorge15@mail.com' },
      { name: 'Paula Mendoza', email: 'paula16@mail.com' },
      { name: 'Ricardo Navarro', email: 'ricardo17@mail.com' },
      { name: 'Natalia Cruz', email: 'natalia18@mail.com' },
      { name: 'Fernando Leon', email: 'fernando19@mail.com' },
      { name: 'Elena Suarez', email: 'elena20@mail.com' },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(() => console.log('✅ Datos insertados'))
  .catch(console.error)
  .finally(() => prisma.$disconnect())
