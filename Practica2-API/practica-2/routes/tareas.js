const express = require('express');
const router = express.Router();

// Array en memoria que funciona como "base de datos temporal"
// Se reinicia cada vez que reinicias el servidor
let tareas = [];
let contadorId = 1;  // Para asignar IDs únicos automáticamente

// ─── CREAR TAREA ─── POST /tareas
router.post('/tareas', (req, res) => {
  try {
    const { titulo } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      return res.status(400).json({
        estado: 'error',
        mensaje: 'El campo "titulo" es requerido.'
      });
    }

    const nuevaTarea = {
      id: contadorId++,       // Asigna ID y luego incrementa el contador
      titulo: titulo.trim(),
      completada: false        // Por defecto, la tarea no está completada
    };

    tareas.push(nuevaTarea);  // Guardamos en el array

    res.status(201).json({ estado: 'ok', tarea: nuevaTarea });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

// ─── LISTAR TAREAS ─── GET /tareas
router.get('/tareas', (req, res) => {
  try {
    res.json({ estado: 'ok', total: tareas.length, tareas });
  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

// ─── ACTUALIZAR TAREA ─── PUT /tareas/:id
// El ":id" en la URL es un parámetro dinámico, ej: /tareas/1, /tareas/2
router.put('/tareas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);  // Convertimos el ID de texto a número
    const { titulo, completada } = req.body;

    // Buscamos la tarea en el array
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ estado: 'error', mensaje: 'Tarea no encontrada.' });
    }

    // Solo actualizamos los campos que llegaron
    if (titulo !== undefined) tareas[index].titulo = titulo.trim();
    if (completada !== undefined) tareas[index].completada = completada;

    res.json({ estado: 'ok', tarea: tareas[index] });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

// ─── ELIMINAR TAREA ─── DELETE /tareas/:id
router.delete('/tareas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ estado: 'error', mensaje: 'Tarea no encontrada.' });
    }

    tareas.splice(index, 1);  // Elimina 1 elemento en la posición "index"

    res.json({ estado: 'ok', mensaje: `Tarea ${id} eliminada correctamente.` });

  } catch (error) {
    res.status(500).json({ estado: 'error', mensaje: 'Error interno del servidor.' });
  }
});

module.exports = router;