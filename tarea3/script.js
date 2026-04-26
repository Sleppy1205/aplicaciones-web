// Seleccionamos el formulario por su ID
const formulario = document.getElementById("formulario");

// Escuchamos cuando el usuario hace clic en "Guardar"
formulario.addEventListener("submit", function(e) {

    // Evita que la página se recargue
    e.preventDefault();

    // ===== OBTENER LOS DATOS =====
    let cedula = document.getElementById("cedula").value;
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;

    // ===== CREAR UNA FILA NUEVA =====
    let fila = document.createElement("tr");

    // Insertamos los datos dentro de la fila
    fila.innerHTML = `
        <td>${cedula}</td>
        <td>${nombre}</td>
        <td>${direccion}</td>
        <td>${telefono}</td>
        <td>${correo}</td>
    `;

    // ===== AGREGAR LA FILA A LA TABLA =====
    document.getElementById("tablaClientes").appendChild(fila);

    // ===== LIMPIAR EL FORMULARIO =====
    formulario.reset();
});