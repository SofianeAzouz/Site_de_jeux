// Fonction principale pour démarrer le jeu
function startGame() {
    let board = []; // Tableau de jeu
    let score = 0; // Score du joueur

    // Initialisation du tableau de jeu avec des valeurs à 0
    function initializeBoard() {
        for (let i = 0; i < 4; i++) {
            board[i] = [];
            for (let j = 0; j < 4; j++) {
                board[i][j] = 0;
            }
        }
    }

    // Ajoute une nouvelle tuile aléatoire (2 ou 4) à une case vide
    function addRandomTile() {
        let availableTiles = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    availableTiles.push({ x: i, y: j });
                }
            }
        }
        if (availableTiles.length > 0) {
            let randomTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
            board[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% chance for 4
        }
    }

    // Affiche le tableau de jeu dans l'interface HTML
    function displayBoard() {
        let gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = ''; // Efface le contenu précédent

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tileValue = board[i][j];
                let tileClass = tileValue === 0 ? 'tile' : `tile tile-${tileValue}`;
                let tileElement = document.createElement('div');
                tileElement.className = tileClass;
                tileElement.textContent = tileValue !== 0 ? tileValue : '';
                gameBoardElement.appendChild(tileElement);
            }
        }
    }

    // Vérifie si le jeu est terminé (aucun mouvement possible)
    function isGameOver() {
        // Vérifie s'il y a encore des cases vides
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    return false; // Il reste des cases vides, le jeu n'est pas terminé
                }
            }
        }
        
        // Vérifie s'il y a des mouvements possibles (tuiles adjacentes avec la même valeur)
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                // Vérifie à droite
                if (j < 3 && board[i][j] === board[i][j + 1]) {
                    return false;
                }
                // Vérifie en bas
                if (i < 3 && board[i][j] === board[i + 1][j]) {
                    return false;
                }
            }
        }

        return true; // Aucun mouvement possible, le jeu est terminé
    }

    // Fonction pour faire pivoter le tableau à 90 degrés dans le sens des aiguilles d'une montre
    function rotateBoardClockwise() {
        let newBoard = [];
        for (let i = 0; i < 4; i++) {
            newBoard[i] = [];
            for (let j = 0; j < 4; j++) {
                newBoard[i][j] = board[3 - j][i];
            }
        }
        board = newBoard;
    }

    // Déplace les tuiles vers la gauche
    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (board[i][j] !== 0) {
                    let k = j;
                    while (k > 0 && board[i][k - 1] === 0) {
                        board[i][k - 1] = board[i][k];
                        board[i][k] = 0;
                        k--;
                        moved = true;
                    }
                    if (k > 0 && board[i][k - 1] === board[i][k]) {
                        board[i][k - 1] *= 2;
                        score += board[i][k - 1];
                        board[i][k] = 0;
                        moved = true;
                    }
                }
            }
        }
        return moved;
    }

    // Déplace les tuiles vers la droite
    function moveRight() {
        rotateBoardClockwise();
        rotateBoardClockwise();
        let moved = moveLeft();
        rotateBoardClockwise();
        rotateBoardClockwise();
        return moved;
    }

    // Déplace les tuiles vers le haut
    function moveUp() {
        rotateBoardClockwise();
        rotateBoardClockwise();
        rotateBoardClockwise();
        let moved = moveLeft();
        rotateBoardClockwise();
        return moved;
    }

    // Déplace les tuiles vers le bas
    function moveDown() {
        rotateBoardClockwise();
        let moved = moveLeft();
        rotateBoardClockwise();
        rotateBoardClockwise();
        rotateBoardClockwise();
        return moved;
    }

    // Gestion des événements clavier pour les mouvements
    document.addEventListener('keydown', function(event) {
        let moved = false;
        if (!isGameOver()) {
            if (event.key === 'ArrowLeft') {
                moved = moveLeft();
            } else if (event.key === 'ArrowRight') {
                moved = moveRight();
            } else if (event.key === 'ArrowUp') {
                moved = moveUp();
            } else if (event.key === 'ArrowDown') {
                moved = moveDown();
            }
            if (moved) {
                addRandomTile();
                displayBoard();
                if (isGameOver()) {
                    showGameOverMessage();
                }
            }
        }
    });

    // Affiche un message de fin de jeu
    function showGameOverMessage() {
        let gameOverMessage = document.getElementById('game-over-message');
        gameOverMessage.style.display = 'block';
    }

    // Initialisation du jeu
    initializeBoard();
    addRandomTile();
    addRandomTile();
    displayBoard();
}

// Démarrer le jeu
startGame();
