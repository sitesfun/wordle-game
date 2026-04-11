let currentRow = 1;
let status = 'playing';

function getRandomWordWithLetters(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  
  return [randomWord, randomWord.split('')];
}

const word = getRandomWordWithLetters(WORDS);
console.log("Слово: " + word[0]);


let cells = document.querySelectorAll('.cell');
for (let cell of cells) {
    
}