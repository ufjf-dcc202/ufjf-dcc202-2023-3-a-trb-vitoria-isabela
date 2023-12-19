document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 3;
    let player1Board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    let player2Board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    let currentPlayer = 1;
    let diceValue = 0;

    const renderPlayerBoard = (board, boardId, playerName) => {
        const playerBoard = document.getElementById(boardId);
        playerBoard.innerHTML = ''; // Limpa o conteúdo existente antes de renderizar
    
        const h2 = document.createElement('h2');
        h2.textContent = `Tabuleiro do ${playerName}`;
        playerBoard.appendChild(h2);
        const table = document.createElement('table');
        table.classList.add('player-table'); 
    
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement('tr');
    
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('td');
                if (board[i][j] !== 0) {
                    const img = document.createElement('img');
                    img.src = `img/dado${board[i][j]}.png`;
                    img.alt = `Face ${board[i][j]} do dado`;
                    img.style.width = '60px'; 
                    img.style.height = '60px';
                    cell.appendChild(img);
                }
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', cellClickHandler);
                row.appendChild(cell);
            }
    
            table.appendChild(row);
        }
    
        playerBoard.appendChild(table); // Adiciona a tabela ao elemento do tabuleiro
    
        // Adiciona um label para os totais de coluna abaixo da tabela
        const scoreLabels = document.createElement('div');
        scoreLabels.classList.add('score-labels');
        for (let i = 0; i < boardSize; i++) {
            const scoreLabel = document.createElement('div');
            scoreLabel.textContent = calculateColumnScore(board, i);
            scoreLabels.appendChild(scoreLabel);
        }
        playerBoard.appendChild(scoreLabels);
    };
    
    function calculateColumnScore (board, colIndex) {
        const column = board.map(row => row[colIndex]);
        let score = 0;
    
        for (let value = 1; value <= 6; value++) {
            const count = column.filter(v => v === value).length;
            score += value * count * count;
        }
    
        return score;
    };

    function calculateScore(board) {
        let score = 0;

        for (let i = 0; i < boardSize; i++) {
            score += calculateColumnScore(board, i);
        }

        return score;
    };

    // Modifique a chamada na função renderBoard para passar os nomes dos jogadores
    const renderBoard = () => {
        renderPlayerBoard(player1Board, 'player1-board', 'Beto Carneiro');
        renderPlayerBoard(player2Board, 'player2-board', 'Ratão');
    };
    
    const makeRobotMove = () => {
        let emptyCells = [];
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (player2Board[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
    
        // Define um número aleatório (de 1 a 6) para preencher a célula
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        
        // Procura por uma coluna que já tenha o valor do dado
        const sameValueColumnIndex = player2Board[0].findIndex((col, j) => player2Board.some(row => row[j] === randomNumber));
        
        let chosenCell;
        if (sameValueColumnIndex !== -1) {
            // Se encontrou uma coluna com o valor do dado, escolhe uma célula dessa coluna
            chosenCell = emptyCells.find(cell => cell.col === sameValueColumnIndex);
        }
    
        // Se não encontrou uma coluna com o valor do dado ou a coluna já está completa, escolhe uma célula aleatória
        if (!chosenCell) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            chosenCell = emptyCells[randomIndex];
        }
    
        // Preenche a célula no tabuleiro do jogador 2 (robô) com o número escolhido
        player2Board[chosenCell.row][chosenCell.col] = randomNumber;
    };
    

    const cellClickHandler = (event) => {
        if (diceValue === 0 || currentPlayer === 2) {
            alert('Aguardando a próxima jogada!');
            return;
        }
    
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
    
        const board = currentPlayer === 1 ? player1Board : player2Board;
        const opponentBoard = currentPlayer === 1 ? player2Board : player1Board;
    
        if (board[row][col] === 0) {
            updateBoard(board, opponentBoard, row, col);
            renderBoard(); 
        }
    
        // Verifica se o jogo terminou depois de cada jogada
        if (isBoardFull(player1Board) || isBoardFull(player2Board)) {
            const scorePlayer1 = calculateScore(player1Board);
            const scorePlayer2 = calculateScore(player2Board);
            renderScores(scorePlayer1, scorePlayer2);
            renderWinner(scorePlayer1, scorePlayer2);
            endGame();
        } else {
            renderScores(calculateScore(player1Board), calculateScore(player2Board));
        }
    
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        renderBoard();
    
        if (currentPlayer === 2) {
            setTimeout(() => {
                makeRobotMove();
                currentPlayer = 1;
                renderBoard();
                renderScores(calculateScore(player1Board), calculateScore(player2Board)); // Atualiza os scores
                checkGameEnd(); // Verifica se o jogo terminou após a jogada do robô
            }, 1000);
        } else {
            renderBoard();
            renderScores(calculateScore(player1Board), calculateScore(player2Board)); // Atualiza os scores
            checkGameEnd(); // Verifica se o jogo terminou após a jogada do jogador 1
        }
        resetDice();
    };

    const checkGameEnd = () => {
        if (isBoardFull(player1Board) || isBoardFull(player2Board)) {
            const scorePlayer1 = calculateScore(player1Board);
            const scorePlayer2 = calculateScore(player2Board);
            renderScores(scorePlayer1, scorePlayer2);
            renderWinner(scorePlayer1, scorePlayer2);
            endGame();
        }
    };

    const updateBoard = (board, opponentBoard, row, col) => {
        // Adiciona o valor do dado na coluna do jogador
        board[row][col] = diceValue;
    
        // Remove os dados com o mesmo valor na coluna correspondente do oponente
        for (let i = 0; i < boardSize; i++) {
            if (opponentBoard[i][col] === diceValue) {
                opponentBoard[i][col] = 0;
            }
        }
    
        // Atualiza a pontuação e verifica se o jogo terminou
        if (isBoardFull(player1Board) && isBoardFull(player2Board)) {
            const scorePlayer1 = calculateScore(player1Board);
            const scorePlayer2 = calculateScore(player2Board);
            renderScores(scorePlayer1, scorePlayer2);
            renderWinner(scorePlayer1, scorePlayer2);
            endGame();
        } else {
            renderScores(calculateScore(player1Board), calculateScore(player2Board));
        }
    
        // Reset do valor do dado
        resetDice();
    };

    let diceRolled = false;

    const rollDice = () => {
        if (diceRolled) {
            alert('Você só pode rolar o dado uma vez por turno!');
            return;
        }

        diceValue = Math.floor(Math.random() * 6) + 1;
        renderDiceValue();
        diceRolled = true;
    };

    const resetDice = () => {
        diceValue = 0;
        renderDiceValue();
        diceRolled = false;
    };

    function isBoardFull(board) {
        return board.every(row => row.every(cell => cell !== 0));
    };

    const resetGame = () => {
        // Limpa a mensagem do vencedor
        document.getElementById('winner').textContent = '';

        player1Board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
        player2Board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
        currentPlayer = 1;
        diceValue = 0;
        
        document.getElementById('play-again').style.display = "none";
        initializeGame();
    };
    
    const endGame = () => {
        const scorePlayer1 = calculateScore(player1Board);
        const scorePlayer2 = calculateScore(player2Board);
    
        if (scorePlayer1 > scorePlayer2) {
            console.log(`Beto Carneiro venceu com ${scorePlayer1} pontos!`);
        } else if (scorePlayer1 < scorePlayer2) {
            console.log(`Ratão venceu com ${scorePlayer2} pontos!`);
        } else {
            console.log('Empate!');
        }
        
        document.getElementById('play-again').style.display = "block";
    };

    const renderDiceValue = () => {
        const diceValueElement = document.getElementById('dice-value');
        diceValueElement.textContent = `Dado: ${diceValue}`;
    };

    const renderScores = (scorePlayer1, scorePlayer2) => {
        const scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `Pontuação: <br> Beto Carneiro: ${scorePlayer1} <br> Ratão: ${scorePlayer2}`;
    };
    
    const renderWinner = (scorePlayer1, scorePlayer2) => {
        const winnerElement = document.getElementById('winner');
    
        if (scorePlayer1 > scorePlayer2) {
            winnerElement.textContent = 'Beto Carneiro venceu!';
        } else if (scorePlayer1 < scorePlayer2) {
            winnerElement.textContent = 'Ratão venceu!';
        } else {
            winnerElement.textContent = 'Empate!';
        }
    };

    const initializeGame = () => {
        renderBoard();
        renderScores(calculateScore(player1Board), calculateScore(player2Board));
        document.getElementById('roll-dice-btn').addEventListener('click', () => {
            if (!isBoardFull(player1Board) || !isBoardFull(player2Board)) {
                rollDice();
            }
        });
        document.getElementById('play-again').addEventListener('click', resetGame);
    };

    initializeGame();
});

module.exports = { calculateColumnScore, calculateScore, isBoardFull };
