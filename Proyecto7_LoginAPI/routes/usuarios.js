const express = require("express");
const router = express.Router();

const conectar = require("../database/conexion");
const SHA256 = require("crypto-js/sha256");
const { v4: uuidv4 } = require("uuid");


// =======================================
// LOGIN
// =======================================

router.post("/valida_login", async (req, res) => {

    try {

        // Recibir datos
        const { usuario, password } = req.body;

        console.log("=================================");
        console.log("Usuario recibido:", usuario);

        // Convertir contraseña a SHA256
        const passwordHash = SHA256(password).toString();

        // Conectar a MongoDB
        const db = await conectar();

        // Colección usuarios
        const usuarios = db.collection("usuarios");

        // Buscar usuario
        const usuarioEncontrado = await usuarios.findOne({
            usuario: usuario
        });

        console.log("Usuario encontrado:", usuarioEncontrado);

        // Usuario no existe
        if (!usuarioEncontrado) {

            return res.json({
                valido: 0,
                estado: 1,
                mensaje: "Usuario no registrado"
            });

        }

        // Contraseña incorrecta
        if (usuarioEncontrado.password !== passwordHash) {

            return res.json({
                valido: 0,
                estado: 2,
                mensaje: "Contraseña incorrecta"
            });

        }

        // ==========================
        // Login correcto
        // ==========================

        // Generar Token
        const token = uuidv4();

        // Generar PIN de 6 dígitos
        const pin = Math.floor(100000 + Math.random() * 900000);

        // Fechas
        const created_time = new Date();

        const expiration_time = new Date(
            created_time.getTime() + (5 * 60 * 1000)
        );

        // Guardar temporalmente
        const loginTemp = db.collection("login_temp");

        await loginTemp.insertOne({

            usuario: usuario,

            token: token,

            pin: pin,

            created_time: created_time,

            expiration_time: expiration_time

        });

        console.log("=================================");
        console.log("Usuario:", usuario);
        console.log("Token:", token);
        console.log("PIN:", pin);
        console.log("Creado:", created_time);
        console.log("Expira:", expiration_time);
        console.log("=================================");

        return res.json({

            valido: 1,

            estado: 0,

            token: token,

            mensaje: "Credenciales correctas. Continúa con la verificación."

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            valido: 0,

            estado: 3,

            mensaje: "Error del servidor"

        });

    }

});


// =======================================
// VALIDAR PIN (2FA)
// =======================================

router.post("/valid_pin", async (req, res) => {

    try {

        // Recibir datos
        const { usuario, pin } = req.body;

        // Conectarse a MongoDB
        const db = await conectar();

        // Colección temporal
        const loginTemp = db.collection("login_temp");

        // Buscar registro del usuario
        const registro = await loginTemp.findOne({

            usuario: usuario

        });

        // Verificar que exista
        if (!registro) {

            return res.json({

                valido: 0,

                mensaje: "Token no encontrado o expirado."

            });

        }

        console.log("Registro encontrado:");
        console.log(registro);

        // Verificar expiración
        const ahora = new Date();

        if (ahora > registro.expiration_time) {

            return res.json({

                valido: 0,

                mensaje: "El token ha expirado."

            });

        }

        // ====================================
        // PASO 37
        // Comparar PIN
        // ====================================

        if (registro.pin != pin) {

            return res.json({

                valido: 0,

                mensaje: "PIN incorrecto."

            });

        }


        // Eliminar el registro temporal

    await loginTemp.deleteOne({

    _id: registro._id

    });


        // PIN correcto

        return res.json({

            valido: 1,

            mensaje: "Autenticación 2FA correcta."

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            valido: 0,

            mensaje: "Error del servidor."

        });

    }

});

module.exports = router;