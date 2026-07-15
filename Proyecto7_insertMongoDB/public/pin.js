// Recuperar el usuario guardado
window.onload = function () {

    const usuario = localStorage.getItem("usuario");

    document.getElementById("usuario").value = usuario;

};

async function validarPIN() {

    const usuario =
        document.getElementById("usuario").value;

    const pin =
        document.getElementById("pin").value;

    const respuesta =
        await fetch("http://localhost:3000/usuarios/valid_pin", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                usuario,
                pin

            })

        });

   const datos = await respuesta.json();

console.log(datos);

if (datos.valido == 1) {

    console.log("Redirigiendo...");

    window.location.href = "bienvenido.html";

}
else {

    document.getElementById("respuesta").innerHTML =
        datos.mensaje;

}

}