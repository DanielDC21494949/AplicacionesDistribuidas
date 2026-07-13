const app = require('./src/app');  // Importa la configuración de Express

const PORT = 3000;  // Puerto donde correrá el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});