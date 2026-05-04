const express = require('express');
const app = express();

// Esto permite que Express entienda JSON en las peticiones
app.use(express.json());

// Conectamos cada archivo de rutas
app.use('/', require('./routes/saludo'));
app.use('/', require('./routes/calcular'));
app.use('/', require('./routes/tareas'));
app.use('/', require('./routes/password'));
app.use('/', require('./routes/temperatura'));
app.use('/', require('./routes/buscar'));
app.use('/', require('./routes/palabras'));

// Si alguien accede a una ruta que no existe, respondemos con error
app.use((req, res) => {
  res.status(404).json({ estado: 'error', mensaje: 'Ruta no encontrada' });
});

module.exports = app;  // Exportamos para que index.js lo pueda usar