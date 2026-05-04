const express = require('express');
const router = express.Router();

router.post('/calcular', (req, res) => {
  try {
    const { a, b, operacion } = req.body;

    // Validar que llegaron los 3 campos
    if (a === undefined || b === undefined || !operacion) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Se requieren los campos: a, b y operacion.'
      });
    }

    // Validar que a y b son números
    if (typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({
        estado: 'error',
        mensaje: '"a" y "b" deben ser números.'
      });
    }

    // Validar que la operación sea una de las permitidas
    const operacionesValidas = ['suma', 'resta', 'multiplicacion', 'division'];
    if (!operacionesValidas.includes(operacion)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: `Operación inválida. Use: ${operacionesValidas.join(', ')}.`
      });
    }

    // Caso especial: división entre cero
    if (operacion === 'division' && b === 0) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'No se puede dividir entre cero.'
      });
    }

    // Realizamos la operación
    const resultados = {
      suma: a + b,
      resta: a - b,
      multiplicacion: a * b,
      division: a / b
    };

    res.json({
      estado: 'ok',
      resultado: resultados[operacion]
    });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;