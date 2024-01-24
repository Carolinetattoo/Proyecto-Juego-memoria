const ul = document.querySelector('ul#game'); // Reemplaza 'tu-ul' con el ID real de tu ul
let tiempoInicio = null; // 8 segundos de tiempo de inicio
const flipTime = 1000; // para que cuando fallemos, se sigan viendo durante un segundo las cartas antes de girarlo.

// Array de imágenes
const imagenes = [
	  './assets/emoji1.png',
    './assets/emoji2.png',
    './assets/emoji3.png',
    './assets/emoji4.png',
    './assets/emoji5.png',
    './assets/emoji6.png',
    './assets/emoji7.png',
    './assets/emoji8.png',
    './assets/emoji1.png',
    './assets/emoji2.png',
    './assets/emoji3.png',
    './assets/emoji4.png',
    './assets/emoji5.png',
    './assets/emoji6.png',
    './assets/emoji7.png',
    './assets/emoji8.png',
];

// Función para desordenar el array
function shuffleArray(array) {
	return array.sort(() => Math.random() - 0.5);
}

// Función para renderizar las cartas en el tablero
function renderizarCartas(array) {
	ul.innerHTML = ''; // Limpiar el contenido del ul

	const fragment = document.createDocumentFragment(); // Crear un fragmento para agregar los li

	array.forEach((element, index) => {
		const li = document.createElement('li');
		li.classList.add('card', 'flipped'); // Añadir las clases 'card' y 'flipped' al li
		li.id = index; // Asignar una ID autoincrementada

		li.innerHTML = `<div class="content"> 
                      <div class="front"><img src="assets/imagen-reverso.jpg"></div>
                      <div class="back"><img src="${element}" alt="Card"></div>
                    </div>`;

		fragment.append(li);
	});

	ul.appendChild(fragment);
}

let block = false;
let clickedCards = [];

//Función para darle la vuelta a una carta
function voltearCarta(carta) {
  if (!block && !carta.classList.contains('flipped') && clickedCards.length < 2) {
      carta.classList.add('flipped');
      clickedCards.push(carta);

      if (clickedCards.length === 2) {
        block = true;
          setTimeout(() => checkMatch(), flipTime);
      }
  }
};


// Función para comprobar si las cartas coinciden
let scorePositive = 0; 
let scoreNegative = 0;
let valueTotalScore = 0;
let movementValue = 0;
let success = 0;
let nickname = null;
let scores = null;
let acierto = null;
let fallo = null;
const modalCountdown = document.querySelector('.modal-countdown');
const modal = document.querySelector('.modal');
const modalFinal = document.querySelector('.modal-final');
const barContainer = document.querySelector('.bar-container');
const modalP = document.querySelector('.countdown');
const barTimeOut = document.querySelector('.bar');

function checkMatch() {
  const [card1, card2] = clickedCards;
  const content1 = card1.querySelector('.back img').src;
  const content2 = card2.querySelector('.back img').src;

  if (content1 === content2) {
      card1.classList.add('matched');
      card2.classList.add('matched');

      // Animación de aciertos
      card1.classList.toggle('accept');
      card2.classList.toggle('accept');
      setTimeout(() => {
        card1.classList.remove('accept');
        card2.classList.remove('accept');
      },1000);

      scoreNegative = 0;
      scorePositive++;
      success++;

      if (scorePositive === 1){
        valueTotalScore += acierto;
        movementValue++;
      }else if (scorePositive === 2){
        valueTotalScore += acierto * 1.25;
        movementValue++;
      } else {
        valueTotalScore += acierto * 1.5;
        movementValue++;
      }

      if(success === 8) {

        const totalScoreModal = document.querySelector('.total-score');
        modal.classList.remove('hide');
        barContainer.classList.remove('hide');
        modalFinal.classList.remove('hide');
        barTimeOut.classList.remove('bar-lv1');
        barTimeOut.classList.remove('bar-lv2');
        barTimeOut.classList.remove('bar-lv3');
        modalP.innerText = null;
        totalScoreModal.innerText = valueTotalScore;
        
        // Después de actualizar la puntuación del juego, llama a updateRanking
        updateRanking(nickname, valueTotalScore);

        // Después de actualizar el ranking, llama a displayRanking para mostrar los cambios
        displayRanking(nickname, valueTotalScore);

        success = 0;
        scorePositive = 0;
        valueTotalScore = 0;
        movementValue = 0;
      }

  } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      scorePositive = 0;
      scoreNegative ++; 
      if (scoreNegative === 1){
        valueTotalScore -= fallo;
        movementValue++;
      }else if (scoreNegative === 2){
        valueTotalScore -= fallo * 2;
        movementValue++;
      }else {
        valueTotalScore -= fallo * 3;
        movementValue++;
      }
  
  }

  clickedCards = [];
  block = false;

  scoreValue.innerHTML = valueTotalScore;
  movesValue.innerHTML = movementValue;
  
};

// Event listener para gestionar el clic en las cartas
ul.addEventListener('click', (event) => {
  const target = event.target.closest('.card');
  if (target) {
      voltearCarta(target);
  }
});

// Modal para iniciar el juego
function startGame() {
  nickname = document.querySelector('#nickname').value;
  const nick = document.querySelector('#nickNameContainer');
  if (nickname.trim() === '') {
    const errorNick = document.createElement('p');
    errorNick.classList.add('error-color');
    errorNick.innerText = '* Por favor, introduce un Nick.';
    nick.appendChild(errorNick);
  } else {
    // Oculto ingreso de nick + nivel y muestro cuenta atrás para empezar
    const index1 = document.querySelector('.index1');
    index1.classList.add('hide');
    modalFinal.classList.add('hide');
    modalCountdown.classList.remove('hide');
    // Cuenta atrás del modal
    let counter = 4;
    const countdown = setInterval(() => {
      counter--;
      modalP.innerText = counter;
    }, 1000);
    // Paro la cuenta atrás del modal
    function stopCountdown() {
        clearInterval(countdown);
    }
    setTimeout(stopCountdown, 4000);
    // Oculto el modal y muestro los emojis de las cartas
    setTimeout(() => {
      modalCountdown.classList.add('hide');
      modal.classList.add('hide');
    }, 4000);

    // Función para iniciar el juego
    function iniciarJuego() {
      setTimeout(() => {
        const cartas = document.querySelectorAll('.card');
        cartas.forEach((carta) => carta.classList.remove('flipped'));
      }, tiempoInicio);
    };

    shuffleArray(imagenes);
    renderizarCartas(imagenes);
    iniciarJuego();

    setTimeout(() => {
      document.querySelector('h1').style.marginBottom = '120px';
      barContainer.classList.add('hide');
    }, tiempoInicio);

  };
};
// Asigno los niveles
const buttons = document.querySelectorAll('.level');
buttons[0].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv1');
  tiempoInicio = 10000;
  acierto = 100;
  fallo = 10;
  startGame();
});
buttons[3].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv1');
  tiempoInicio = 10000;
  acierto = 100;
  fallo = 10;
  startGame();
});
buttons[1].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv2');
  tiempoInicio = 7000;
  acierto = 200;
  fallo = 20;
  startGame();
});
buttons[4].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv2');
  tiempoInicio = 7000;
  acierto = 200;
  fallo = 20;
  startGame();
});
buttons[2].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv3');
  tiempoInicio = 5000;
  acierto = 300;
  fallo = 30;
  startGame();
});
buttons[5].addEventListener('click', () => {
  barTimeOut.classList.add('bar-lv3');
  tiempoInicio = 5000;
  acierto = 300;
  fallo = 30;
  startGame();
});

//Función del ranking
function updateRanking(nickname, score) {
  scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ nickname, valueTotalScore });
  localStorage.setItem('scores', JSON.stringify(scores));
};

function displayRanking() {
  const scoreList = document.getElementById('scoreList');
  scoreList.innerText = '';

  scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.sort((a, b) => b.valueTotalScore - a.valueTotalScore); // Ordenar por puntuación descendente

  scores.slice(0, 5).forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.nickname}: ${entry.valueTotalScore} puntos`;
      scoreList.appendChild(listItem);
  });
};