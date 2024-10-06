let tiempoRestante = 20; // Tiempo por pregunta (en segundos)
let intervalo; // Para controlar el temporizador
let sonidoTiempo = new Audio('espera.mp3'); // Sonido de cuenta regresiva
let sonidoIncorrecto = new Audio('error.mp3'); // Sonido cuando la respuesta es incorrecta
let sonidoCorrecto = new Audio('correcto.mp3'); // Sonido cuando la respuesta es incorrecta

const questions = [
    {
        question: "¿Qué es el mercado?",
        image: "img/mercado.jpg", // Asegúrate de tener las imágenes
        answers: [
            { text: "Aumento de la oferta de productos", correct: false },
            { text: "Reducción de la demanda", correct: false },
            { text: "El mercado es un sistema, que posibilita el intercambio...", correct: true },
        ]
    },
    {
        question: "Cuales son los tipos de mercado",
        image: "img/mercado.jpg", // Asegúrate de tener las imágenes
        answers: [

            { text: "Mercados populares ejemplo: La Ramada, Mutualista", correct: false },
            { text: "segun  tipo de producto,area geografica,fijar precios,cantidad de productos que se comercien", correct: true },
            { text: "Mercado perfecto e imperfecto", correct: false }
        ]
    },
    {
        question: "Cuando se compran y venden mercancías listas para su consumo o uso,hablamos de",
        image: "img/mercado.jpg", // Asegúrate de tener las imágenes
        answers: [
            { text: "mercado de bienes", correct: true },
            { text: "Mercado de servicios", correct: false },
        ]
    },
    // Más preguntas
];

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function comenzarJuego() {
    document.getElementById('pantalla-inicial').style.display = 'none';
    document.getElementById('pantalla-juego').style.display = 'block';
    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarPregunta() {
    const pregunta = questions[currentQuestion];
    document.getElementById('pregunta-texto').innerText = pregunta.question; // Asigna la pregunta aquí

    document.getElementById('imgBandera').src = pregunta.image;
    document.getElementById('n0').innerText = pregunta.answers[0].text;
    document.getElementById('n1').innerText = pregunta.answers[1].text;
    document.getElementById('n2').innerText = pregunta.answers[2].text;

    // Limpiar clases de respuestas anteriores
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.classList.remove('correct', 'incorrect');
    });

    // Ocultar imagen de respuesta incorrecta al mostrar una nueva pregunta
    document.getElementById('imgIncorrecta').style.display = 'none';
}


function iniciarTemporizador() {
    tiempoRestante = 20; // Reiniciar el tiempo por pregunta
    document.getElementById('tiempo-restante').innerText = tiempoRestante;

    // Reproducir sonido de cuenta regresiva al iniciar el temporizador
    sonidoTiempo.play();

    intervalo = setInterval(() => {
        tiempoRestante--;
        document.getElementById('tiempo-restante').innerText = tiempoRestante;

        // Reproducir sonido cuando queden 19 segundos
        if (tiempoRestante === 19) {
            sonidoTiempo.play();
        }

        // Cuando se acabe el tiempo
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            comprobarRespuesta(-1); // No se seleccionó ninguna opción, marcar como incorrecta
        }
    }, 1000);
}

function comprobarRespuesta(opcionSeleccionada) {
    clearInterval(intervalo); // Detener el temporizador
    const pregunta = questions[currentQuestion];

    // Comprobar respuesta
    if (opcionSeleccionada === -1) {
        incorrectAnswers++;
        sonidoIncorrecto.play();
        document.getElementById('imgIncorrecta').style.display = 'block'; // Mostrar imagen de error
    } else if (pregunta.answers[opcionSeleccionada].correct) {
        correctAnswers++;
        sonidoCorrecto.play();
        document.querySelectorAll('.opcion')[opcionSeleccionada].classList.add('correct'); // Marcar como correcto
        document.getElementById('imgIncorrecta').style.display = 'none'; // Asegúrate de ocultar la imagen de error
    } else {
        incorrectAnswers++;
        sonidoIncorrecto.play();
        document.getElementById('imgIncorrecta').style.display = 'block'; // Mostrar imagen de error
        document.querySelectorAll('.opcion')[opcionSeleccionada].classList.add('incorrect'); // Marcar como incorrecto
    }

    // Esperar un momento antes de avanzar a la siguiente pregunta
    setTimeout(() => {
        // Limpiar las clases de las opciones antes de mostrar la siguiente pregunta
        document.querySelectorAll('.opcion').forEach(opcion => {
            opcion.classList.remove('correct', 'incorrect');
        });

        document.getElementById('imgIncorrecta').style.display = 'none'; // Asegurarse de ocultar la imagen de error
        currentQuestion++;

        // Reiniciar el temporizador para la siguiente pregunta
        iniciarTemporizador();

        if (currentQuestion < questions.length) {
            mostrarPregunta(); // Mostrar la siguiente pregunta
        } else {
            mostrarPantallaFinal(); // Mostrar la pantalla final si se acabaron las preguntas
        }
    }, 1500); // Tiempo de espera para mostrar la respuesta
}


function mostrarImagenIncorrecta() {
    document.getElementById('imgIncorrecta').style.display = 'block'; // Mostrar imagen de respuesta incorrecta
}

function mostrarPantallaFinal() {
    document.getElementById('pantalla-juego').style.display = 'none';
    document.getElementById('pantalla-final').style.display = 'block';
    document.getElementById('numCorrectas').innerText = correctAnswers;
    document.getElementById('numIncorrectas').innerText = incorrectAnswers;
}

function volverAlInicio() {
    document.getElementById('pantalla-final').style.display = 'none';
    document.getElementById('pantalla-inicial').style.display = 'block';
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
}
