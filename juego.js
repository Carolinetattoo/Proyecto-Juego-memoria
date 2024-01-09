//inicio de variables
let untapped = 0;


//Randomizador
let cards =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
cards = cards.sort(() => { 
    return Math.random() -0.5
})
console.log(cards);

//Luego, cuando tengamos el "flip" de las cartas, sustituiré los nºs por las imágenes, y las asociaré al botón