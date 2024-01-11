const ul = document.querySelector('ul#game'); // Reemplaza 'tu-ul' con el ID real de tu ul
const tiempoInicio = 5000; // 3 segundos de tiempo de inicio
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


function checkMatch() {
  const [card1, card2] = clickedCards;
  const content1 = card1.querySelector('.back img').src;
  const content2 = card2.querySelector('.back img').src;
 

  if (content1 === content2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      scorePositive++;
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





// Event listener para gestionar el clic en las cartas
ul.addEventListener('click', (event) => {
  const target = event.target.closest('.card');
  if (target) {
      voltearCarta(target);
  }
});


