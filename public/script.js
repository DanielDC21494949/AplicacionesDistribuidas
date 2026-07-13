async function login() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch("http://localhost:3000/usuarios/valida_login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            usuario,
            password
        })

    });

    const datos = await respuesta.json();

    if (datos.estado === 1) {

        document.getElementById("respuesta").innerHTML = `
            <p style="color:red;">Usuario no registrado</p>
            <button onclick="location.reload()">Retry</button>
        `;

    } else if (datos.estado === 2) {

        document.getElementById("respuesta").innerHTML = `
            <p style="color:red;">Contraseña incorrecta</p>
            <button onclick="location.reload()">Retry</button>
        `;

    } else if (datos.estado === 0) {

    // Guardar el usuario
    localStorage.setItem("usuario", usuario);

    // Guardar el token
    localStorage.setItem("token", datos.token);

    // Ir a la pantalla del PIN
    window.location.href = "pin.html";

} else {

        document.getElementById("respuesta").innerHTML = `
            <p style="color:red;">Error del servidor</p>
        `;

    }

}