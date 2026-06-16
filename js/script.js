
document.addEventListener('DOMContentLoaded', function () {

    const enlaces = document.querySelectorAll('[data-page]');
    
    function mostrarPagina(nombre) {
        document.querySelectorAll('.pagina').forEach(function (seccion) {
            seccion.classList.remove('activa');
        });

        const seccionActiva = document.getElementById('page-' + nombre);
        if (seccionActiva) {
            seccionActiva.classList.add('activa');
        }
        document.querySelectorAll('.nav-menu .nav-link').forEach(function (link) {
            if (link.getAttribute('data-page') === nombre) {
                link.classList.add('activo');
            } else {
                link.classList.remove('activo');
            }
        });

        window.scrollTo(0, 0);
    }

    enlaces.forEach(function (enlace) {
        enlace.addEventListener('click', function (evento) {
            evento.preventDefault(); 
            const nombre = this.getAttribute('data-page');
            mostrarPagina(nombre);
        });
    });

    const formContacto = document.getElementById('formContacto');

    if (formContacto) {
        formContacto.addEventListener('submit', function (evento) {
            evento.preventDefault(); 
            const correo   = document.getElementById('correo').value.trim();
            const celular  = document.getElementById('celular').value.trim();
            const consulta = document.getElementById('consulta').value.trim();

            const camposFaltantes = [];
            if (correo === '')   camposFaltantes.push('Correo');
            if (celular === '')  camposFaltantes.push('Celular');
            if (consulta === '') camposFaltantes.push('Consulta');

            if (camposFaltantes.length > 0) {
                const cuerpoModal = document.getElementById('modalAvisoCuerpo');
                cuerpoModal.innerHTML =
                    'Debes completar los siguientes campos: <strong>' +
                    camposFaltantes.join(', ') +
                    '</strong>.';

                const modal = new bootstrap.Modal(document.getElementById('modalAviso'));
                modal.show();
                return; 
            }

            alert('¡Tu mensaje ha sido enviado correctamente!');

            formContacto.reset();
        });
    }

});
