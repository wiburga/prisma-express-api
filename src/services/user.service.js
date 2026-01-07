const prisma = require('../config/prisma')


exports.getById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  })
}
