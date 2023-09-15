const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d'); //llama al metodo getContext() del objeto canvas, que devuelve un objeto que representa un contexto de dibujo en el lienzo
let puntaje = 0;
let numIntentos = 0;
let fecha = new Date();
//el usuarioId es el id del usuario que está logueado
let usuarioId = localStorage.getItem('idUsuario');


ctx.canvas.width = 120;
ctx.canvas.height = 160;
ctx.scale(20, 20);

const bodyParts = [  //valores que se usan para dibujar el ahorcado en el canvas
    [4, 2, 1, 1],  //cabeza
    [4, 3, 1, 2],  //cuerpo
    [3, 5, 1, 1],  //brazo izquierdo
    [5, 5, 1, 1],  //brazo derecho
    [3, 3, 1, 1],  //pierna izquierda
    [5, 3, 1, 1]  //pierna derecha
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
};

const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if (mistakes === bodyParts.length) endGame();

    puntaje = puntaje - 1;
};

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    guardarDatos();
};

const correctLetter = letter => {
    const { children } = wordContainer;
    let letterGuessed = false; // Variable para rastrear si se ha adivinado alguna letra

    for (let i = 0; i < children.length; i++) {
        const letterElement = children[i];
        if (letterElement.innerHTML === letter.toUpperCase() && letterElement.classList.contains('hidden')) {
            letterElement.classList.remove('hidden');
            hits++;
            letterGuessed = true; // La letra fue adivinada correctamente
        }
    }

    if (letterGuessed) {
        // Verifica si todas las letras han sido adivinadas correctamente
        if (hits === selectedWord.length) {
            endGame(); // Si todas las letras han sido adivinadas, termina el juego
        }
    } else {
        // Si no se adivinó ninguna letra, se considera una letra incorrecta
        wrongLetter();
    }

    puntaje = puntaje + 2;
};

const letterInput = letter => {
    if (selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);

    numIntentos++;
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
};

const selectRandomWord = async () => {
    try {
        const response = await fetch('http://localhost:3030/palabra/random');
        if (response.ok) {
            const palabraAleatoria = await response.json();
            const palabraSinEspacios = palabraAleatoria.palabra.replace(/\s/g, ''); // Elimina espacios
            const palabraSinCaracteresEspeciales = palabraSinEspacios.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/g, ''); // Elimina caracteres especiales

            selectedWord = palabraSinCaracteresEspeciales.toUpperCase().split('');

            // Imprime cada letra individual en la consola
            console.log('Palabra seleccionada:');
            selectedWord.forEach(letra => {
                console.log(letra);
            });

            drawWord();
            startGame();
        } else {
            console.error('Error al obtener una palabra aleatoria');
        }
    } catch (error) {
        console.error('Error de red', error);
    }
};

async function guardarDatos() {
    try {
        const response = await fetch('http://localhost:3030/ahorcado/guardarPuntaje', {
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

const drawHangMan = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas
    ctx.fillStyle = '#d95d39'; //color de las partes del cuerpo
    ctx.fillRect(0, 7, 4, 1); //dibuja la base
    ctx.fillRect(1, 0, 1, 8); //dibuja el palo
    ctx.fillRect(2, 0, 3, 1); //dibuja la viga
    ctx.fillRect(4, 1, 1, 1); //dibuja la cuerda
};

const startGame = () => {  //setear variables y llamar a funciones
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';
    drawWord();
    drawHangMan();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', selectRandomWord);