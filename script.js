document.addEventListener('DOMContentLoaded', () => {
    const fields = document.querySelectorAll('.field');
    const xText = document.querySelector('.x-text');
    const oText = document.querySelector('.o-text');
    const drawText = document.querySelector('.winner.draw');
    const winnerText = document.querySelector('.winner');
    const restartButton = document.querySelector('.restart');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleFieldClick(clickedFieldEvent) {
        const clickedField = clickedFieldEvent.target;
        const clickedFieldIndex = Array.from(fields).indexOf(clickedField);

        if (gameState[clickedFieldIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedFieldIndex] = currentPlayer;
        clickedField.innerText = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announceWinner(currentPlayer === 'X' ? xText : oText);
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            announceWinner(drawText);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function announceWinner(winner) {
        winnerText.classList.remove('hide');
        winner.classList.remove('hide');
    }

    function restartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        winnerText.classList.add('hide');
        xText.classList.add('hide');
        oText.classList.add('hide');
        drawText.classList.add('hide');
        fields.forEach(field => field.innerText = '');
    }

    fields.forEach(field => field.addEventListener('click', handleFieldClick));
    restartButton.addEventListener('click', restartGame);
});
