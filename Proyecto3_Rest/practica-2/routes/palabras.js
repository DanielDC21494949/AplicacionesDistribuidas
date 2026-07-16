const express = require('express');
const router = express.Router();

router.post('/contar-palabras', (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto || typeof texto !== 'string') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "texto" es requerido y debe ser una cadena de texto.'
      });
    }

    // split(/\s+/) divide por uno o más espacios en blanco
    // filter(p => p !== '') elimina elementos vacíos
    const palabras = texto.trim().split(/\s+/).filter(p => p !== '');

    // Set elimina duplicados automáticamente
    // .map(p => p.toLowerCase()) hace que "Hola" y "hola" cuenten como la misma
    const palabrasUnicas = new Set(palabras.map(p => p.toLowerCase())).size;

    res.json({
      estado: 'ok',
      totalPalabras: palabras.length,
      totalCaracteres: texto.length,  // Cuenta incluyendo espacios
      palabrasUnicas
    });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;