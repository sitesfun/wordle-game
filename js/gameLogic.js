let currentRow = 1;
let status = 'playing';

function getRandomWordWithLetters(words) {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  
  return [randomWord, randomWord.split('')];
}

const word = getRandomWordWithLetters(WORDS);
console.log("Слово: " + word[0]);
let currentWord = [];

let cells = document.querySelectorAll('.cell');
for (let cell of cells) {
    cell.addEventListener('input', function() {
        if (this.disabled) return;
        currentWord[this.dataset.number - 1] = this.value;
        
        const filledCells = Array.from(document.querySelectorAll(`.row[data-row="${currentRow}"] .cell`))
                                .filter(c => c.value.length > 0);
        
        if (filledCells.length === 5) {
            checkWord();
        }
    });
}

function checkWord() {
    let row = document.querySelector(`.row[data-row="${currentRow}"]`);
    if (!row) return;

    row.classList.remove("active-row");
    row.classList.add("old-row");
    
    for (let cell of row.querySelectorAll('.cell')) {
        cell.disabled = true;
    }

    currentRow++;
    let nextRow = document.querySelector(`.row[data-row="${currentRow}"]`);
    
    if (nextRow) {
        nextRow.classList.add("active-row");
        for (let cell of nextRow.querySelectorAll('.cell')) {
            cell.disabled = false;
        }
        nextRow.querySelector('.cell').focus();
    } else {
        console.log("Гра закінчена!");
    }
    
    let wordToCheck = [...word[1]];
    let inputCells = Array.from(row.querySelectorAll('.cell'));
    let inputLetters = inputCells.map(c => c.value.toUpperCase());
    let results = new Array(5).fill('wrong');
    let availableLetters = [...wordToCheck];

    // Прохід 1 — шукати тільки 'correct'
    for (let i = 0; i < 5; i++) {
        if (inputLetters[i] === wordToCheck[i]) {
            results[i] = 'correct';
            // Видаляємо цю букву з «доступних»
            let letterIndex = availableLetters.indexOf(inputLetters[i]);
            if (letterIndex > -1) {
                availableLetters.splice(letterIndex, 1);
            }
        }
    }

    // Прохід 2 — шукати 'misplaced' і 'wrong'
    for (let i = 0; i < 5; i++) {
        if (results[i] !== 'correct') {
            let letterIndex = availableLetters.indexOf(inputLetters[i]);
            if (letterIndex > -1) {
                results[i] = 'misplaced';
                availableLetters.splice(letterIndex, 1);
            }
        }
    }

    // Візуалізація результатів
    inputCells.forEach((cell, i) => {
        cell.classList.add(results[i]);
    });

    if (results.every(r => r === 'correct')) {
        alert("Вітаємо! Ви вгадали слово!");
        window.location.reload();
    } else if (currentRow >= 6) {
        alert("Гра закінчена! Слово було: " + word[0]);
        window.location.reload();
    }

    currentWord = [];
}
