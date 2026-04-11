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
