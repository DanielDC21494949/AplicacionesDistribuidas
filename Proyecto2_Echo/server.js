const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;


function respuestaOK(data){
    return { success: true, data: data };
}

function respuestaError(msg){
    return { success: false, error: msg };
}

// mascaracteres
app.post('/mascaracteres', (req,res)=>{
    const { cadena1, cadena2 } = req.body;

    if(!cadena1 || !cadena2)
        return res.json(respuestaError("Faltan parámetros"));

    const resultado = (cadena1.length >= cadena2.length)
        ? cadena1 : cadena2;

    res.json(respuestaOK(resultado));
});

// menoscaracteres
app.post('/menoscaracteres', (req,res)=>{
    const { cadena1, cadena2 } = req.body;

    if(!cadena1 || !cadena2)
        return res.json(respuestaError("Faltan parámetros"));

    const resultado = (cadena1.length <= cadena2.length)
        ? cadena1 : cadena2;

    res.json(respuestaOK(resultado));
});

// numcaracteres
app.post('/numcaracteres', (req,res)=>{
    const { cadena } = req.body;

    if(!cadena)
        return res.json(respuestaError("Falta la cadena"));

    res.json(respuestaOK(cadena.length));
});

// palindroma
app.post('/palindroma', (req,res)=>{
    const { cadena } = req.body;

    if(!cadena)
        return res.json(respuestaError("Falta la cadena"));

    const limpia = cadena.replace(/\s/g,'').toLowerCase();
    const invertida = limpia.split('').reverse().join('');

    res.json(respuestaOK(limpia === invertida));
});

// concat
app.post('/concat', (req,res)=>{
    const { cadena1, cadena2 } = req.body;

    if(!cadena1 || !cadena2)
        return res.json(respuestaError("Faltan parámetros"));

    res.json(respuestaOK(cadena1 + cadena2));
});

// applysha256
app.post('/applysha256', (req,res)=>{
    const { cadena } = req.body;

    if(!cadena)
        return res.json(respuestaError("Falta la cadena"));

    const hash = crypto.createHash('sha256')
                       .update(cadena)
                       .digest('hex');

    res.json(respuestaOK({
        original: cadena,
        encriptada: hash
    }));
});

// verifysha256
app.post('/verifysha256', (req,res)=>{
    const { cadenaNormal, cadenaEncriptada } = req.body;

    if(!cadenaNormal || !cadenaEncriptada)
        return res.json(respuestaError("Faltan parámetros"));

    const hash = crypto.createHash('sha256')
                       .update(cadenaNormal)
                       .digest('hex');

    res.json(respuestaOK(hash === cadenaEncriptada));
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});