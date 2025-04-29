document.addEventListener("DOMContentLoaded", function() {
    cargarListaAlumnos();
});

function cargarListaAlumnos() {
    const alumnos = [
        "Acerbi, Mateo", "Aguilar, Brian", "Alderete, Gustavo", "Álvarez, Edgardo",
        "Aromando, Alejandro", "Blanco, Lisandro", "Candia, Juan I.", "Caro, Gabriel",
        "Dituro, Juan Francisco", "Farías, Federico", "González, Lautaro", "Lescano, Alan",
        "Monte, Jonatan", "Muñóz, Julio", "Porcel, Conrado", "Porcel, Luciano",
        "Puerta, Michael", "Puerta, Rodolfo", "Raffo, Manuel", "Toledo, Nahuel",
        "Tulián, Alejandro", "Vargas, Gastón", "Vega, Cristian", "Villegas, Tomás"
    ];

    const tabla = document.getElementById("tablaAlumnos");
    tabla.innerHTML = "";

    alumnos.forEach(nombre => {
        let fila = `<tr><td>${nombre}</td><td><input type="checkbox" class="falta"></td></tr>`;
        tabla.innerHTML += fila;
    });
}

function guardarAsistencia() {
    const fecha = document.getElementById("fecha").value;
    const materia = document.getElementById("materia").value;
    const alumnos = document.querySelectorAll("#tablaAlumnos tr");

    let asistencias = JSON.parse(localStorage.getItem("asistencias")) || [];

    alumnos.forEach(row => {
        let nombre = row.cells[0].innerText;
        let falta = row.cells[1].querySelector("input").checked ? "A" : "P";

        asistencias.push({ fecha, materia, nombre, estado: falta });
    });

    localStorage.setItem("asistencias", JSON.stringify(asistencias));

    // Destildar las casillas marcadas
    document.querySelectorAll(".falta").forEach(input => {
        input.checked = false;
    });

    // Mostrar mensaje emergente en el centro de la pantalla
    const mensaje = document.getElementById("mensaje");
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}

