document.addEventListener("DOMContentLoaded", function() {
    const tablaFaltas = document.getElementById("tablaFaltas");
    const asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

    let asistenciasAgrupadas = {};

    asistencias.forEach(registro => {
        if (registro.estado === "A") {
            if (!asistenciasAgrupadas[registro.nombre]) {
                asistenciasAgrupadas[registro.nombre] = [];
            }
            asistenciasAgrupadas[registro.nombre].push({
                fecha: registro.fecha,
                materia: registro.materia
            });
        }
    });

    // Ordenar los alumnos alfabéticamente
    let alumnosOrdenados = Object.keys(asistenciasAgrupadas).sort();

    alumnosOrdenados.forEach(alumno => {
        let filaAlumno = `<tr><td><strong>${alumno}</strong></td><td colspan="2"></td></tr>`;
        tablaFaltas.innerHTML += filaAlumno;

        asistenciasAgrupadas[alumno].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        asistenciasAgrupadas[alumno].forEach(registro => {
            let fila = `<tr>
                <td></td>
                <td>${registro.fecha}</td>
                <td>${registro.materia}</td>
            </tr>`;
            tablaFaltas.innerHTML += fila;
        });
    });
});

