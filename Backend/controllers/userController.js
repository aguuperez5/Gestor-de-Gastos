const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'secretoSuperSecreto', // 👈 Cambialo por algo más seguro en producción
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login' });
  }
};
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'El email ya está registrado.' });

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await db.User.create({ email, password_hash });
    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};