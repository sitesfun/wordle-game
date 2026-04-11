let state = {
    board: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ],
    currentRow: 0,
    currentCol: 0,
    error: null
};

function getGameState() {
    return state;
}

function renderBoard() {
    const state = getGameState();
    const container = document.querySelector('.GameBoard');

    container.innerHTML = '';

    state.board.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach((cell, colIndex) => {
            const input = document.createElement('input');
            input.classList.add('cell');
            input.value = cell;
            input.readOnly = true;

            // підсвітка активної клітинки
            if (rowIndex === state.currentRow && colIndex === state.currentCol) {
                input.classList.add('active');
            }

            rowDiv.appendChild(input);
        });

        container.appendChild(rowDiv);
    });
};

document.addEventListener('keydown', (e) => {
    const state = getGameState();

    // букви
    if (/^[a-zA-Zа-яА-Я]$/.test(e.key)) {
        if (state.currentCol < 5) {
            state.board[state.currentRow][state.currentCol] = e.key.toUpperCase();
            state.currentCol++;
        }
    }

    // backspace
    if (e.key === 'Backspace') {
        if (state.currentCol > 0) {
            state.currentCol--;
            state.board[state.currentRow][state.currentCol] = '';
        }
    }

    // enter
    if (e.key === 'Enter') {
        if (state.currentCol === 5) {
            state.currentRow++;
            state.currentCol = 0;
        } else {
            state.error = 'Введи 5 букв!';
        }
    }

    renderBoard();
    showError();
});

function showError() {
    const state = getGameState();
    const errorDiv = document.querySelector('#error');

    if (state.error) {
        errorDiv.textContent = state.error;
    } else {
        errorDiv.textContent = '';
    }
}