/* ============================================================
   ElGen.io - JavaScript del portal (script.js)
   ------------------------------------------------------------
   Hace DOS cosas:
     1) NAVEGACIÓN: muestra la sección según la opción del menú
        (esto reemplaza lo que antes hacía PHP).
     2) CONTACTO: valida el formulario y muestra una modal si
        falta algún campo.
   ============================================================ */

// Esperamos a que toda la página esté cargada antes de ejecutar.
document.addEventListener('DOMContentLoaded', function () {

    /* ========================================================
       1) NAVEGACIÓN ENTRE SECCIONES
       --------------------------------------------------------
       Cada enlace con atributo data-page="..." (en el menú o en
       el texto de inicio) muestra la sección con id="page-...".
       ======================================================== */

    // Buscamos TODOS los enlaces que tengan data-page.
    const enlaces = document.querySelectorAll('[data-page]');

    // Función que muestra una sola sección y oculta las demás.
    function mostrarPagina(nombre) {
        // a) Ocultar todas las secciones (quitar la clase "activa").
        document.querySelectorAll('.pagina').forEach(function (seccion) {
            seccion.classList.remove('activa');
        });

        // b) Mostrar la sección elegida.
        const seccionActiva = document.getElementById('page-' + nombre);
        if (seccionActiva) {
            seccionActiva.classList.add('activa');
        }

        // c) Resaltar la opción del menú que corresponde.
        document.querySelectorAll('.nav-menu .nav-link').forEach(function (link) {
            // Si el data-page del enlace coincide, le ponemos "activo".
            if (link.getAttribute('data-page') === nombre) {
                link.classList.add('activo');
            } else {
                link.classList.remove('activo');
            }
        });

        // d) Subimos el scroll al inicio del contenido.
        window.scrollTo(0, 0);
    }

    // A cada enlace le agregamos el evento "click".
    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (evento) {
            evento.preventDefault(); // evita que el enlace "#" salte
            const nombre = this.getAttribute('data-page');
            mostrarPagina(nombre);
        });
    });


    /* ========================================================
       2) VALIDACIÓN DEL FORMULARIO DE CONTACTO
       --------------------------------------------------------
       Si falta un campo -> mostramos la modal con el aviso.
       Si está todo lleno -> limpiamos el formulario.
       ======================================================== */

    const formContacto = document.getElementById('formContacto');

    // Solo ejecutamos esta lógica si existe el formulario.
    if (formContacto) {
        formContacto.addEventListener('submit', function (evento) {
            evento.preventDefault(); // evita que la página se recargue

            // Tomamos los valores de los campos (sin espacios sobrantes).
            const correo   = document.getElementById('correo').value.trim();
            const celular  = document.getElementById('celular').value.trim();
            const consulta = document.getElementById('consulta').value.trim();

            // Lista para guardar los nombres de los campos vacíos.
            const camposFaltantes = [];
            if (correo === '')   camposFaltantes.push('Correo');
            if (celular === '')  camposFaltantes.push('Celular');
            if (consulta === '') camposFaltantes.push('Consulta');

            // ¿Falta algún campo? -> mostramos la modal de aviso.
            if (camposFaltantes.length > 0) {
                const cuerpoModal = document.getElementById('modalAvisoCuerpo');
                cuerpoModal.innerHTML =
                    'Debes completar los siguientes campos: <strong>' +
                    camposFaltantes.join(', ') +
                    '</strong>.';

                // Creamos y mostramos la modal de Bootstrap.
                const modal = new bootstrap.Modal(document.getElementById('modalAviso'));
                modal.show();
                return; // no continuamos
            }

            // Si todo está completo:
            // ===== MODIFICA AQUÍ si luego quieres enviar los datos a otro lado =====
            alert('¡Tu mensaje ha sido enviado correctamente!');

            // Limpiamos los campos del formulario.
            formContacto.reset();
        });
    }

});
