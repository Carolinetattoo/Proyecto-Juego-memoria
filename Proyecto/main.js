const ul = document.querySelector('ul#game'); // Reemplaza 'tu-ul' con el ID real de tu ul
const tiempoInicio = 10000; // 8 segundos de tiempo de inicio
const flipTime = 1000; // para que cuando fallemos, se sigan viendo durante un segundo las cartas antes de girarlo.



// Array de imágenes
const imagenes = [
	  'assets/emoji1.png',
    'assets/emoji2.png',
    'assets/emoji3.png',
    'assets/emoji4.png',
    'assets/emoji5.png',
    'assets/emoji6.png',
    'assets/emoji7.png',
    'assets/emoji8.png',
    'assets/emoji1.png',
    'assets/emoji2.png',
    'assets/emoji3.png',
    'assets/emoji4.png',
    'assets/emoji5.png',
    'assets/emoji6.png',
    'assets/emoji7.png',
    'assets/emoji8.png',
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
let clickedCards = []




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
}


// Función para comprobar si las cartas coinciden
let scorePositive = 0; 
const bonutsThreshold = 2; // establecemos el tope para los bonus en puntuación, tanto positivos como negativos, en más de 2 consecutivos.
let scoreNegative = 0;
let valueTotalScore = 0;
let movementValue = 0;
let success = 0;
let nickname = null;
let scores = null;
const miSection = document.getElementById('miSeccion')

function checkMatch() {
  const [card1, card2] = clickedCards;
  const content1 = card1.querySelector('.back img').src;
  const content2 = card2.querySelector('.back img').src;
 

  if (content1 === content2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      scorePositive++;
      success++;


      if (scorePositive === 1){
        valueTotalScore +=100;
        movementValue++;
        
      }else if (scorePositive ===2){
        valueTotalScore +=125;
        movementValue++;
      } else {
        valueTotalScore +=150;
        movementValue++;
      }
      if(success === 8) {

        const totalScoreModal = document.querySelector('.total-score');
        const modalResumen = document.querySelector('.modal-resumen');
        modalResumen.style.display = 'flex';
        totalScoreModal.innerText = valueTotalScore;
        




        // Después de actualizar la puntuación del juego, llama a updateRanking
          updateRanking(nickname, valueTotalScore);

      // Después de actualizar el ranking, llama a displayRanking para mostrar los cambios
           displayRanking(nickname, valueTotalScore);
      }

      
  } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      scorePositive = 0;
      scoreNegative ++; 
        if (scoreNegative ===1){
          valueTotalScore -=10;
          movementValue++;
        }else if (scoreNegative ===2){
          valueTotalScore -=20;
          movementValue++;
        }else {
          valueTotalScore -=30;
          movementValue++;
        }
  
  }
 

  clickedCards = [];
  block = false;

  
  scoreValue.innerHTML = valueTotalScore
  movesValue.innerHTML = movementValue
  
  
}

displayRanking()


// Event listener para gestionar el clic en las cartas
ul.addEventListener('click', (event) => {
  const target = event.target.closest('.card');
  if (target) {
      voltearCarta(target);
  }
});



//Modal Retry
function retryGame(){
  valueTotalScore = 0;
  movementValue = 0;
  updateRanking()
  startGame()
nick = document.querySelector('#nickNameContainer');
const modalRetry = document.querySelector('.modalRetry');
miSection.style.display="none";
document.querySelector('.bar-container').style.display = 'block';
setTimeout(() => {
  document.querySelector('h1').style.marginBottom = '120px';
  barEasy.classList.add('bar-lv2');
  document.querySelector('.bar-container').style.display = 'none';
}, 10000);

const levelEasy = document.querySelector('.level1');
levelEasy.addEventListener('click', easy());


}
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
    const modalCountdown = document.querySelector('.modal-countdown');
    index1.style.display = 'none';
    modalCountdown.style.display = 'block';
    // Cuenta atrás del modal
    let counter = 4;
    const countdown = setInterval(() => {
      const modalP = document.querySelector('.countdown');
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
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
    }, 4000);
    // Asigno los niveles
    function easy() {
      const barEasy = document.querySelector('.bar');
      barEasy.classList.add('bar-lv1');
    }
    const levelEasy = document.querySelector('.level1');
    levelEasy.addEventListener('click', easy());

  // Función para iniciar el juego
  function iniciarJuego() {
    setTimeout(() => {
      const cartas = document.querySelectorAll('.card');
      cartas.forEach((carta) => carta.classList.remove('flipped'));
    }, tiempoInicio);

  }
  shuffleArray(imagenes);
  renderizarCartas(imagenes);
  iniciarJuego();

  setTimeout(() => {
    document.querySelector('h1').style.marginBottom = '120px';
    document.querySelector('.bar-container').style.display = 'none';
  }, 10000);

  }
}



//Función del ranking

function updateRanking(nickname, score) {
  scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ nickname, valueTotalScore });
  localStorage.setItem('scores', JSON.stringify(scores));
}

function displayRanking() {
  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = '';

  scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.sort((a, b) => b.valueTotalScore - a.valueTotalScore); // Ordenar por puntuación descendente

  scores.slice(0, 5).forEach(entry => {
      const listItem = document.createElement('li');
      listItem.textContent = `${entry.nickname}: ${entry.valueTotalScore} puntos`;
      scoreList.appendChild(listItem);
  });
};