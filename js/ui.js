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
    const container = document.querySelector('#board');

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