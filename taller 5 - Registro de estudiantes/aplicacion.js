const formulario = document.getElementById("formulario");
const listaEstudiantes = document.getElementById("listaEstudiantes");

let estudiantes =
JSON.parse(localStorage.getItem("estudiantesGuardados")) || [];

mostrarEstudiantes();

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const cedula = document.getElementById("cedula").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const facultad = document.getElementById("facultad").value.trim();
    const nivel = document.getElementById("nivel").value.trim();
    const paralelo = document.getElementById("paralelo").value.trim();

    const regexCedula = /^[0-9]{10}$/;
    const regexTelefono = /^09[0-9]{8}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if(!regexCedula.test(cedula)){
        alert("La cédula debe tener 10 números.");
        return;
    }

    if(!regexTexto.test(apellidos)){
        alert("Apellidos inválidos.");
        return;
    }

    if(!regexTexto.test(nombres)){
        alert("Nombres inválidos.");
        return;
    }

    if(!regexTelefono.test(telefono)){
        alert("Teléfono inválido.");
        return;
    }

    if(!regexCorreo.test(correo)){
        alert("Correo inválido.");
        return;
    }

    const estudiante = {
        cedula,
        apellidos,
        nombres,
        direccion,
        telefono,
        correo,
        facultad,
        nivel,
        paralelo
    };

    estudiantes.push(estudiante);

    localStorage.setItem(
        "estudiantesGuardados",
        JSON.stringify(estudiantes)
    );

    mostrarEstudiantes();

    formulario.reset();

});

function mostrarEstudiantes(){

    listaEstudiantes.innerHTML = "";

    estudiantes.forEach((estudiante, indice)=>{

        const li = document.createElement("li");

        li.className = "estudiante";

        li.innerHTML = `
            <strong>${estudiante.nombres} ${estudiante.apellidos}</strong><br>
            Cédula: ${estudiante.cedula}<br>
            Dirección: ${estudiante.direccion}<br>
            Teléfono: ${estudiante.telefono}<br>
            Correo: ${estudiante.correo}<br>
            Facultad: ${estudiante.facultad}<br>
            Nivel: ${estudiante.nivel}<br>
            Paralelo: ${estudiante.paralelo}<br>

            <button class="btnEliminar"
            onclick="eliminarEstudiante(${indice})">
            Eliminar
            </button>
        `;

        listaEstudiantes.appendChild(li);

    });

}

function eliminarEstudiante(indice){

    estudiantes.splice(indice,1);

    localStorage.setItem(
        "estudiantesGuardados",
        JSON.stringify(estudiantes)
    );

    mostrarEstudiantes();

}