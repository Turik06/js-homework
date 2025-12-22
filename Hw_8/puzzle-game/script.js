const sourceBoard = document.getElementById('source-board');
const targetBoard = document.getElementById('target-board');
const shuffleBtn = document.getElementById('shuffle-button');

const cols = 9;
const rows = 6;
const tileSize = 50;
const imageName = 'bob.jpg'; 

let tiles = [];

function initGame() {
    sourceBoard.innerHTML = '';
    targetBoard.innerHTML = '';
    tiles = [];
    createSlots();
    createTiles();
    shuffleAndPlaceTiles();
}

function createSlots() {
    for (let i = 0; i < rows * cols; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.index = i; 
        targetBoard.appendChild(slot);
    }
}

function createTiles() {
    for (let i = 0; i < rows * cols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        
        const x = (i % cols) * tileSize;
        const y = Math.floor(i / cols) * tileSize;
        
        tile.style.backgroundImage = `url('${imageName}')`;
        tile.style.backgroundSize = `${cols * tileSize}px ${rows * tileSize}px`;
        tile.style.backgroundPosition = `-${x}px -${y}px`;
        tile.dataset.correctIndex = i;
        
        tile.addEventListener('mousedown', startDrag);
        tile.ondragstart = function() { return false; };

        tiles.push(tile);
    }
}

function shuffleAndPlaceTiles() {
    tiles.sort(() => Math.random() - 0.5);
    tiles.forEach(tile => {
        tile.style.position = 'static';
        sourceBoard.appendChild(tile);
    });
}

function startDrag(event) {
    if (event.button !== 0) return;
    const tile = event.target; 
    
    const shiftX = event.clientX - tile.getBoundingClientRect().left;
    const shiftY = event.clientY - tile.getBoundingClientRect().top;

    document.body.append(tile);
    tile.style.position = 'absolute';
    tile.style.zIndex = 1000;
    tile.style.pointerEvents = 'none';

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        tile.style.left = pageX - shiftX + 'px';
        tile.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function onMouseUp(event) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const tileRect = tile.getBoundingClientRect();
        const centerX = tileRect.left + tileRect.width / 2;
        const centerY = tileRect.top + tileRect.height / 2;

        const elemBelow = document.elementFromPoint(centerX, centerY);

        tile.style.pointerEvents = 'auto';

        if (!elemBelow) {
            returnToSource(tile);
            return;
        }

        const slot = elemBelow.closest('.slot');
        
        if (slot && slot.children.length === 0) {
            slot.appendChild(tile);
            resetTileStyles(tile); 
            checkWin();
        } else {
            returnToSource(tile);
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function returnToSource(tile) {
    sourceBoard.appendChild(tile);
    resetTileStyles(tile);
}

function resetTileStyles(tile) {
    tile.style.position = 'static';
    tile.style.zIndex = 'auto';
    tile.style.left = '';
    tile.style.top = '';
    tile.style.pointerEvents = 'auto';
}

function checkWin() {
    const slots = document.querySelectorAll('.slot');
    let correctCount = 0;
    let filledCount = 0;

    slots.forEach(slot => {
        const tile = slot.firstChild;
        if (tile) {
            filledCount++;
            if (tile.dataset.correctIndex === slot.dataset.index) {
                correctCount++;
            }
        }
    });

    if (filledCount === rows * cols && correctCount === rows * cols) {
        setTimeout(() => alert('Победа!'), 100);
    }
}

shuffleBtn.addEventListener('click', initGame);

window.onload = initGame;