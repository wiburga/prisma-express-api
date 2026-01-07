const userService = require('../services/user.service')

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await userService.getById(Number(id))

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
