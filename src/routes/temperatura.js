const express = require('express');
const router = express.Router();

// Función auxiliar: convierte entre escalas pasando siempre por Celsius
function convertir(valor, desde, hacia) {
  let celsius;

  // Paso 1: convertir lo que llegó a Celsius
  if (desde === 'C') celsius = valor;
  if (desde === 'F') celsius = (valor - 32) * 5 / 9;
  if (desde === 'K') celsius = valor - 273.15;

  // Paso 2: convertir de Celsius a la escala destino
  if (hacia === 'C') return celsius;
  if (hacia === 'F') return (celsius * 9 / 5) + 32;
  if (hacia === 'K') return celsius + 273.15;
}

router.post('/convertir-temperatura', (req, res) => {
  try {
    const { valor, desde, hacia } = req.body;
    const escalasValidas = ['C', 'F', 'K'];

    if (valor === undefined || !desde || !hacia) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Se requieren los campos: valor, desde y hacia.'
      });
    }

    if (typeof valor !== 'number') {
      return res.status(400).json({
        estado: 'error',
        mensaje: '"valor" debe ser un número.'
      });
    }

    if (!escalasValidas.includes(desde) || !escalasValidas.includes(hacia)) {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'Escalas válidas son: C (Celsius), F (Fahrenheit), K (Kelvin).'
      });
    }

    const valorConvertido = parseFloat(convertir(valor, desde, hacia).toFixed(4));

    res.json({
      estado: 'ok',
      valorOriginal: valor,
      valorConvertido,
      escalaOriginal: desde,
      escalaConvertida: hacia
    });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;