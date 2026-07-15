const express = require("express");

const app = express();

// Permite recibir JSON
app.use(express.json());

// Importar las rutas
const usuariosRoutes = require("./routes/usuarios");

app.use(express.static("public"));

// Usar las rutas
app.use("/usuarios", usuariosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});