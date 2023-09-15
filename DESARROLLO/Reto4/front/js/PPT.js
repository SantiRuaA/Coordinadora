const seccionBatalla = document.getElementById('campo-batalla');
const msjBatalla = document.getElementById('msj-batalla');
const imgAtaqueJugador = document.getElementById('img-ataque-jugador');
const imgAtaquePc = document.getElementById('img-ataque-pc');
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijeras = document.getElementById('btn-tijeras');

let opcionJugador;
let opcionPc;
let imgJugador;
let imgPc;
let numIntentos = 0;
let puntaje = 0;
let fecha = new Date();
//el usuarioId es el id del usuario que está logueado
let usuarioId = localStorage.getItem('idUsuario');



const imagenes = [
    {
        name: "Piedra",
        url: "../assets/Piedra.PNG"
    },
    {
        name: "Papel",
        url: "../assets/Papel.PNG"
    },
    {
        name: "Tijeras",
        url: "../assets/Tijeras.PNG"
    }
];


function obtenerJugador() {
    const nombre = localStorage.getItem('nombre');
    mensajeJugador.innerHTML = `Jugador: ${nombre}`;
}


function iniciar() {
    obtenerJugador();
    btnGuardar.addEventListener('click', guardarDatos);
    seccionBatalla.style.display = 'none';
};

btnPiedra.addEventListener('click', function () {
    opcionJugador = "Piedra";
    opPc();
});

btnPapel.addEventListener('click', function () {
    opcionJugador = "Papel";
    opPc();
});

btnTijeras.addEventListener('click', function () {
    opcionJugador = "Tijeras";
    opPc();
})


function opPc() {
    var aleaorio = nAleatorio();

    if (aleaorio == 0) {
        opcionPc = "Piedra";
    } else if (aleaorio == 1) {
        opcionPc = "Papel";
    } else if (aleaorio == 2) {
        opcionPc = "Tijeras"
    };

    numIntentos++;

    mensajeNumIntentos.innerHTML = `Número de intentos: ${numIntentos}`;

    batalla();

};

async function guardarDatos() {
    try {
        const response = await fetch('http://localhost:3030/ppt/guardarPuntaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                puntaje,
                numIntentos,
                fecha,
                usuarioId,
            }),
        });

        if (response.ok) {
            // Puntaje guardado exitosamente
            console.log('Puntaje guardado correctamente');
        } else {
            console.error('Error al guardar el puntaje');
        }
    } catch (error) {
        console.error('Error de red al guardar el puntaje:', error);
    }
}


function batalla() {
    if (opcionJugador == opcionPc) {
        msjBatalla.innerHTML = "Empate";
    } else if (opcionJugador == "Piedra" && opcionPc == "Tijeras") {
        msjBatalla.innerHTML = "Ganaste!";
    } else if (opcionJugador == "Papel" && opcionPc == "Piedra") {
        msjBatalla.innerHTML = "Ganaste!";
    } else if (opcionJugador == "Tijeras" && opcionPc == "Papel") {
        msjBatalla.innerHTML = "Ganaste!";
    } else {
        msjBatalla.innerHTML = "Perdiste :(";
    };

    addImagenes();

    if (msjBatalla.innerHTML == "Ganaste!") {
        puntaje = puntaje + 2;
    } else if (msjBatalla.innerHTML == "Empate") {
        puntaje = puntaje;
    } else {
        puntaje = puntaje - 1;
    }

    mensajePuntaje.innerHTML = `Puntaje: ${puntaje}`;

}


function nAleatorio() {
    let n = Math.floor(Math.random() * 3);
    return n;
}


function addImagenes() {
    for (let i = 0; i < imagenes.length; i++) {
        if (opcionJugador == imagenes[i].name) {
            imgJugador = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgJugador} alt="">`;
            imgAtaqueJugador.innerHTML = inserta;
        };

        if (opcionPc == imagenes[i].name) {
            imgPc = imagenes[i].url;
            var inserta = `<img class="img-batalla" src=${imgPc} alt="">`;
            imgAtaquePc.innerHTML = inserta;
        };

    };


    seccionBatalla.style.display = 'flex';

};


window.addEventListener('load', iniciar);