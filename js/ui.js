cells.forEach((cell, index) => {
    cell.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length === 1) {
            const nextCell = cells[index + 1];
            if (nextCell && !nextCell.disabled) {
                nextCell.focus();
            }
        }
    });

    cell.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            const prevCell = cells[index - 1];
            if (prevCell && !prevCell.disabled) {
                prevCell.focus();
            }
        }
    });
});

const keyboardLayout = [
    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї'],
    ['Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є'],
    ['ENTER', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '⌫']
];

const keyboardContainer = document.getElementById('keyboard');

function createKeyboard() {
    keyboardLayout.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.className = 'keyboard-row';
        row.forEach(key => {
            const button = document.createElement('button');
            button.innerText = key;
            button.className = 'key';
            button.dataset.key = key;
            if (key === 'ENTER' || key === '⌫') {
                button.classList.add('wide');
                if (key === '⌫') button.dataset.key = 'BACKSPACE';
            }
            button.addEventListener('click', () => handleKeyPress(key));
            rowElement.appendChild(button);
        });
        keyboardContainer.appendChild(rowElement);
    });
}

function handlePhysicalKeyDown(e) {
    const key = e.key.toUpperCase();
    let virtualKey = key;
    
    if (key === 'BACKSPACE') virtualKey = 'BACKSPACE';
    if (key === 'ENTER') virtualKey = 'ENTER';

    const button = document.querySelector(`.key[data-key="${virtualKey}"]`);
    if (button) {
        button.classList.add('active');
        // Якщо це не системна клавіша, вставимо її через handleKeyPress
        // (оскільки ми вже маємо обробники на інпутах, це може продублювати ввід, 
        // тому тут ми тільки підсвічуємо, а ввід обробляється браузером в інпуті)
    }
}

function handlePhysicalKeyUp(e) {
    const key = e.key.toUpperCase();
    let virtualKey = key;
    
    if (key === 'BACKSPACE') virtualKey = 'BACKSPACE';
    if (key === 'ENTER') virtualKey = 'ENTER';

    const button = document.querySelector(`.key[data-key="${virtualKey}"]`);
    if (button) {
        button.classList.remove('active');
    }
}

window.addEventListener('keydown', handlePhysicalKeyDown);
window.addEventListener('keyup', handlePhysicalKeyUp);

function handleKeyPress(key) {
    const activeCell = document.activeElement;
    const isCell = activeCell && activeCell.classList.contains('cell') && !activeCell.disabled;

    if (key === 'ENTER') {
        // Логіка перевірки слова вже є в gameLogic.js на input
        // Але ми можемо додати ініціацію перевірки тут, якщо потрібно
        const rowCells = document.querySelectorAll(`.row.active-row .cell`);
        const filled = Array.from(rowCells).every(c => c.value.length > 0);
        if (filled) {
            // В gameLogic.js вже є слухач на input, тому зміна останньої клітинки 
            // або виклик checkWord() вручну спрацює.
            // Але оскільки input спрацьовує автоматично, ENTER можна залишити для краси 
            // або додати явний виклик checkWord.
        }
    } else if (key === '⌫') {
        if (isCell) {
            if (activeCell.value === '') {
                const index = Array.from(cells).indexOf(activeCell);
                const prevCell = cells[index - 1];
                if (prevCell && !prevCell.disabled) {
                    prevCell.value = '';
                    prevCell.focus();
                    // Оновлюємо currentWord в gameLogic
                    prevCell.dispatchEvent(new Event('input'));
                }
            } else {
                activeCell.value = '';
                activeCell.dispatchEvent(new Event('input'));
            }
        }
    } else {
        if (isCell) {
            activeCell.value = key;
            activeCell.dispatchEvent(new Event('input'));
            // Фокус автоматично перейде завдяки існуючому слухачу на 'input'
        } else {
            // Якщо фокусу немає, шукаємо першу порожню клітинку в активному рядку
            const emptyCell = document.querySelector('.row.active-row .cell[value=""], .row.active-row .cell:not([value])');
            const activeRowCells = document.querySelectorAll('.row.active-row .cell');
            for (let cell of activeRowCells) {
                if (cell.value === '') {
                    cell.value = key;
                    cell.dispatchEvent(new Event('input'));
                    break;
                }
            }
        }
    }
}

createKeyboard();

// Фокусуємо на першій клітинці при завантаженні
window.addEventListener('load', () => {
    const firstCell = document.querySelector('.row.active-row .cell');
    if (firstCell) {
        firstCell.focus();
    }
});

