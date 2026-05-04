const express = require('express');
const router = express.Router();

router.post('/buscar', (req, res) => {
  try {
    const { array, elemento } = req.body;

    if (!Array.isArray(array) || elemento === undefined) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Se requiere "array" (debe ser un arreglo) y "elemento".'
      });
    }

    // indexOf devuelve -1 si no lo encuentra, o la posición si lo encuentra
    const indice = array.indexOf(elemento);

    res.json({
      estado: 'ok',
      encontrado: indice !== -1,
      indice,                      // -1 si no está
      tipoElemento: typeof elemento // "string", "number", "boolean", etc.
    });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;