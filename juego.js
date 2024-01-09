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

