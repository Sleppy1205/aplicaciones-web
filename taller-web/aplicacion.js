// Referencias al DOM

const formularioTareas = document.getElementById('formulario-tareas');
const tituloTarea = document.getElementById('titulo-tarea');
const descripcionTarea = document.getElementById('descripcion-tarea');
const listaTareas = document.getElementById('lista-tareas');
const btnExportarJson = document.getElementById('btn-exportar-json');
const btnExportarXml = document.getElementById('btn-exportar-xml');

// Estado de la aplicación

let coleccionTareas =
JSON.parse(localStorage.getItem('tareasGuardadas')) || [];

// Dibujar tareas

function redibujarInterfaz() {

    listaTareas.innerHTML = '';

    coleccionTareas.forEach((tarea, indice) => {

        const elementoLista = document.createElement('li');

        elementoLista.className = 'elemento-tarea';

        elementoLista.innerHTML = `
        <div>
            <h3>${tarea.titulo}</h3>
            <p>${tarea.descripcion}</p>
            <small style="color:#94a3b8;">
                Código: ${tarea.codigo} |
                Registro: ${tarea.fecha}
            </small>
        </div>

        <button
            class="btn-eliminar"
            onclick="removerTarea(${indice})">
            Eliminar
        </button>
        `;

        listaTareas.appendChild(elementoLista);

    });

}

// Guardar en LocalStorage

function actualizarAlmacenamientoLocal() {

    localStorage.setItem(
        'tareasGuardadas',
        JSON.stringify(coleccionTareas)
    );

}

// Agregar tarea

formularioTareas.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const nuevaTarea = {
        codigo: Date.now().toString(),
        titulo: tituloTarea.value,
        descripcion: descripcionTarea.value,
        fecha: new Date().toLocaleDateString()
    };

    coleccionTareas.push(nuevaTarea);

    actualizarAlmacenamientoLocal();

    redibujarInterfaz();

    formularioTareas.reset();

});

// Eliminar tarea

window.removerTarea = function(indice) {

    coleccionTareas.splice(indice, 1);

    actualizarAlmacenamientoLocal();

    redibujarInterfaz();

};

// Exportar JSON

btnExportarJson.addEventListener('click', () => {

    if (coleccionTareas.length === 0) {
        return alert('No existen tareas para exportar.');
    }

    const textoJson =
        JSON.stringify(coleccionTareas, null, 2);

    console.log(textoJson);

    generarDescarga(
        textoJson,
        'tareas_academicas.json',
        'application/json'
    );

});

// Exportar XML

btnExportarXml.addEventListener('click', () => {

    if (coleccionTareas.length === 0) {
        return alert('No existen tareas para exportar.');
    }

    let textoXml =
`<?xml version="1.0" encoding="UTF-8"?>
<tareas>
`;

    coleccionTareas.forEach(tarea => {

        textoXml += `
<tarea codigo="${tarea.codigo}">
    <titulo>${sanitizarTextoXml(tarea.titulo)}</titulo>
    <descripcion>${sanitizarTextoXml(tarea.descripcion)}</descripcion>
    <fecha>${tarea.fecha}</fecha>
</tarea>
`;

    });

    textoXml += `
</tareas>`;

    console.log(textoXml);

    generarDescarga(
        textoXml,
        'tareas_academicas.xml',
        'application/xml'
    );

});

// Descargas

function generarDescarga(
    contenidoTexto,
    nombreArchivo,
    tipoMime
) {

    const bloqueDatos =
        new Blob([contenidoTexto], {
            type: tipoMime
        });

    const urlDescarga =
        URL.createObjectURL(bloqueDatos);

    const enlaceDescarga =
        document.createElement('a');

    enlaceDescarga.href = urlDescarga;
    enlaceDescarga.download = nombreArchivo;

    enlaceDescarga.click();

    URL.revokeObjectURL(urlDescarga);

}

// Sanitizar XML

function sanitizarTextoXml(textoInseguro) {

    return textoInseguro.replace(
        /[<>&'"]/g,
        (caracter) => {

            switch (caracter) {

                case '<':
                    return '&lt;';

                case '>':
                    return '&gt;';

                case '&':
                    return '&amp;';

                case "'":
                    return '&apos;';

                case '"':
                    return '&quot;';
            }

        }
    );

}

// Cargar interfaz

redibujarInterfaz();