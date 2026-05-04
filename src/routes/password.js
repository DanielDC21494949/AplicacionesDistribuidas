const express = require('express');
const router = express.Router();

router.post('/validar-password', (req, res) => {
  try {
    const { password } = req.body;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "password" es requerido.'
      });
    }

    const errores = [];

    // Cada "if" verifica una regla distinta con expresiones regulares (regex)
    if (password.length < 8)
      errores.push('Mínimo 8 caracteres.');

    if (!/[A-Z]/.test(password))
      errores.push('Debe tener al menos una letra mayúscula.');

    if (!/[a-z]/.test(password))
      errores.push('Debe tener al menos una letra minúscula.');

    if (!/[0-9]/.test(password))
      errores.push('Debe tener al menos un número.');

    res.json({
      estado: 'ok',
      esValida: errores.length === 0,  // true si no hay errores
      errores                           // array vacío [] si es válida
    });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;