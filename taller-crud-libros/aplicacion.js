// ---------------------------
// ESTADO DE LA APLICACIÓN
// ---------------------------

let libros =
JSON.parse(localStorage.getItem("listaLibros")) || [];

let estaEditando = false;

// ---------------------------
// ELEMENTOS DEL DOM
// ---------------------------

const formulario =
document.getElementById("formulario-crud");

const entradaTitulo =
document.getElementById("titulo");

const entradaAutor =
document.getElementById("autor");

const entradaId =
document.getElementById("id-elemento");

const cuerpoTabla =
document.getElementById("cuerpo-tabla");

const botonGuardar =
document.getElementById("boton-guardar");

const botonCancelar =
document.getElementById("boton-cancelar");

// ---------------------------
// READ
// ---------------------------

function renderizarLibros() {

    cuerpoTabla.innerHTML = "";

    if (libros.length === 0) {

        cuerpoTabla.innerHTML = `
        <tr>
            <td colspan="3" style="text-align:center;">
                No hay libros registrados.
            </td>
        </tr>
        `;

        return;
    }

    libros.forEach(libro => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>
                <button
                class="btn-editar"
                onclick="prepararEdicion('${libro.id}')">
                Editar
                </button>

                <button
                class="btn-eliminar"
                onclick="eliminarLibro('${libro.id}')">
                Eliminar
                </button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);

    });

    localStorage.setItem(
        "listaLibros",
        JSON.stringify(libros)
    );

}

// ---------------------------
// CREATE Y UPDATE
// ---------------------------

formulario.addEventListener(
"submit",
(evento) => {

    evento.preventDefault();

    const valorTitulo =
    entradaTitulo.value.trim();

    const valorAutor =
    entradaAutor.value.trim();

    const idActual =
    entradaId.value;

    if (estaEditando) {

        libros = libros.map(libro =>

            libro.id === idActual

            ? {
                ...libro,
                titulo: valorTitulo,
                autor: valorAutor
              }

            : libro
        );

        estaEditando = false;

        botonGuardar.textContent =
        "Guardar Libro";

        botonCancelar.classList.add(
        "oculto");

    } else {

        const nuevoLibro = {

            id: crypto.randomUUID(),

            titulo: valorTitulo,

            autor: valorAutor

        };

        libros.push(nuevoLibro);

    }

    reiniciarFormulario();

    renderizarLibros();

});

// ---------------------------
// PREPARAR EDICIÓN
// ---------------------------

window.prepararEdicion =
function(id) {

    const libroEncontrado =
    libros.find(libro =>
    libro.id === id);

    if (!libroEncontrado) return;

    entradaTitulo.value =
    libroEncontrado.titulo;

    entradaAutor.value =
    libroEncontrado.autor;

    entradaId.value =
    libroEncontrado.id;

    estaEditando = true;

    botonGuardar.textContent =
    "Actualizar Libro";

    botonCancelar.classList.remove(
    "oculto"
    );

};

// ---------------------------
// DELETE
// ---------------------------

window.eliminarLibro =
function(id) {

    if (
        confirm(
        "¿Está seguro de que desea eliminar este libro?"
        )
    ) {

        libros =
        libros.filter(
        libro => libro.id !== id
        );

        if (
            estaEditando &&
            entradaId.value === id
        ) {
            reiniciarFormulario();
        }

        renderizarLibros();

    }

};

// ---------------------------
// CANCELAR EDICIÓN
// ---------------------------

botonCancelar.addEventListener(
"click",
reiniciarFormulario
);

function reiniciarFormulario() {

    formulario.reset();

    entradaId.value = "";

    estaEditando = false;

    botonGuardar.textContent =
    "Guardar Libro";

    botonCancelar.classList.add(
    "oculto"
    );

}

// ---------------------------
// INICIALIZACIÓN
// ---------------------------

renderizarLibros();