const ul = document.querySelector('ul#game'); // Reemplaza 'tu-ul' con el ID real de tu ul
const tiempoInicio = 5000; // 3 segundos de tiempo de inicio

// Array de imágenes
const imagenes = [
	'assets/emoji1.jpg',
    'assets/emoji2.jpg',
    'assets/emoji3.jpg',
    'assets/emoji4.jpg',
    'assets/emoji5.jpg',
    'assets/emoji6.jpg',
    'assets/emoji7.jpg',
    'assets/emoji8.jpg',
    'assets/emoji1.jpg',
    'assets/emoji2.jpg',
    'assets/emoji3.jpg',
    'assets/emoji4.jpg',
    'assets/emoji5.jpg',
    'assets/emoji6.jpg',
    'assets/emoji7.jpg',
    'assets/emoji8.jpg',
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
                      <div class="front">❔</div>
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
