const express = require('express');
const router = express.Router();  // Router es como un "mini Express" para cada ruta

// POST /saludo → recibe { "nombre": "..." } y responde con un saludo
router.post('/saludo', (req, res) => {
  try {
    // req.body contiene lo que el cliente mandó en el cuerpo de la petición
    const { nombre } = req.body;

    // Validamos que "nombre" exista y no esté vacío
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "nombre" es requerido y debe ser texto.'
      });
    }

    // Todo bien, respondemos con el saludo
    res.json({
      estado: 'ok',
      mensaje: `Hola, ${nombre.trim()}`
    });

  } catch (error) {
    // Si algo falla inesperadamente, respondemos con error 500
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;