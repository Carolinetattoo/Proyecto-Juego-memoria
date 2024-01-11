'use strict';

/* Guardamos el nombre en el localstorage */
const form = document.querySelector('#nickNameContainer');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.querySelector('#nickname').value;
    localStorage.setItem('user', username);
});

const ul = document.querySelector('ul#game'); // Reemplaza 'tu-ul' con el ID real de tu ul
const tiempoInicio = 5000; // 3 segundos de tiempo de inicio

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

		li.innerHTML = `
                    <div class="content"> 
                    <img class="front" src="/assets/imagen-reverso.jpg"></img>
                    <div class="back"><img src="${element}" alt="Card"></div>
                    </div>`;

		fragment.append(li);
	});

	ul.appendChild(fragment);
};


// Función para iniciar el juego
function iniciarJuego() {
	setTimeout(() => {
		const cartas = document.querySelectorAll('.card');
		cartas.forEach((carta) => carta.classList.remove('flipped'));
	}, tiempoInicio);
};

ul.addEventListener('click', (e) => {
    const target = e.target;

    // Si el target es un li
    if (target.matches('li')) {
      // Agregar la clase al li
      target.classList.add('flipped'); // Reemplaza 'tu-clase' con el nombre de la clase que deseas agregar
    }
});

shuffleArray(imagenes);
renderizarCartas(imagenes);
iniciarJuego();

