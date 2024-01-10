// Me he permitido el lujo de añadir el use strct, no vaya a ser que nos jodan por esto
'use strict';
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
const timeoutCountdown = setTimeout(stopCountdown, 4000);
// Oculto el modal
setTimeout(() => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}, 4000)
// Oculto la cuenta atrás de memorizar y agrego un margen para que no quede raro a la hora de la ocultació
setTimeout(() => {
    document.querySelector('.bar-container').style.display = 'none';
    document.querySelector('main').style.marginBottom = '120px';
}, 14000);
// Asigno los niveles
function easy() {
    const barEasy = document.querySelector('.bar');
    barEasy.classList.add('bar-lv1');
}
document.addEventListener('load', easy());


let untapped = 0;
const totalButtons = 16;

// Randomizador
let cards = {
    1: 'assets/emoji1.jpg',
    2: 'assets/emoji2.jpg',
    3: 'assets/emoji3.jpg',
    4: 'assets/emoji4.jpg',
    5: 'assets/emoji5.jpg',
    6: 'assets/emoji6.jpg',
    7: 'assets/emoji7.jpg',
    8: 'assets/emoji8.jpg',
    9: 'assets/emoji1.jpg',
    10: 'assets/emoji2.jpg',
    11: 'assets/emoji3.jpg',
    12: 'assets/emoji4.jpg',
    13: 'assets/emoji5.jpg',
    14: 'assets/emoji6.jpg',
    15: 'assets/emoji7.jpg',
    16: 'assets/emoji8.jpg',
};

let cardsArray = Object.entries(cards);
cardsArray.sort(() => Math.random() - 0.5);

// Ponemos cada uno de los resultados en cada uno de los botones
let buttonResultsMap = {};
for (let i = 0; i < totalButtons; i++) {
    const buttonId = i + 1;
    const cardEntry = cardsArray[i];
    buttonResultsMap[buttonId] = cardEntry[1];
}


// untap
function untap(buttonId) {
    untapped++;


    const result = buttonResultsMap[buttonId];
    console.log(`Botón ${buttonId} seleccionado`);
    console.log(`Imagen asociada: ${result}`);
}


untap(1);
untap(2);

// Función para dar vuelta a las cartas
function untap(clikedCard) {
    const card = document.getElementById(clikedCard);

    if (!card.classList.contains('flipped')) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(() => {
                compareCards();
            }, 1000);
        }
    }
}

// comparar cartas
function compareCards() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.card === card2.dataset.card) {
        
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");

    } else {
        // Aqui va el clasList remove 
    }

    flippedCards = [];
}
