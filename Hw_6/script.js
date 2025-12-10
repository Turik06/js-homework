const grid = document.getElementById('field');
const cells = [];

function createCell(){
    for(let i =0; i<144; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleClick(cell, i));
        cell.addEventListener("contextmenu", (e) => addFlag(e, cell));
        grid.appendChild (cell);
        cells.push(cell);
    }

}
createCell();

function revealAllMines() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('mine')) {
            cells[i].classList.add('open'); 
        }
    }
}

let firstClick = true;
function handleClick(cell, index) {
    if (cell.classList.contains('open') || cell.classList.contains('flag')){
        return;
    }
    if (firstClick) {
        firstClick = false;
        placeMines(index);
    }

    cell.classList.add('open');
    if (cell.classList.contains('mine')) {
        revealAllMines();
        alert('BOOM YOU LOSE((((');
        grid.style.pointerEvents = 'none'; 
        return;
    }

    const total = countMinesAround(index);
    if (total !== 0) {
        cell.innerHTML = total;
        if (total === 1) cell.style.color = 'blue';
        if (total === 2) cell.style.color = 'green';
        if (total === 3) cell.style.color = 'red';
        if (total === 4) cell.style.color = 'darkblue';
    } else{
        openNeighbors(index);
    }
    
    checkWin();
}

function placeMines(excludeIndex) {
    const minesCount = 20; 
    let minesPlaced = 0;

    while (minesPlaced < minesCount) {
        const index = Math.floor(Math.random() * 144);
        if (index !== excludeIndex && !cells[index].classList.contains('mine')) {
            cells[index].classList.add('mine'); 
            minesPlaced++;
        }
    }
    console.log('Мины расставлены!');
}

function countMinesAround(index) {
    let count = 0;
    const isLeftEdge = (index % 12 === 0); 
    const isRightEdge = (index % 12 === 11); 

    if (index > 0 && !isLeftEdge && cells[index - 1].classList.contains('mine')) count++;
    if (index < 143 && !isRightEdge && cells[index + 1].classList.contains('mine')) count++;
    if (index > 11 && cells[index - 12].classList.contains('mine')) count++;
    if (index < 132 && cells[index + 12].classList.contains('mine')) count++;
    if (index > 11 && !isLeftEdge && cells[index - 1 - 12].classList.contains('mine')) count++;
    if (index > 11 && !isRightEdge && cells[index + 1 - 12].classList.contains('mine')) count++;
    if (index < 132 && !isLeftEdge && cells[index - 1 + 12].classList.contains('mine')) count++;
    if (index < 132 && !isRightEdge && cells[index + 1 + 12].classList.contains('mine')) count++;

    return count;
}

function openNeighbors(index) {
    const isLeftEdge = (index % 12 === 0);
    const isRightEdge = (index % 12 === 11);

    setTimeout(() => {
        if (index > 0 && !isLeftEdge) handleClick(cells[index - 1], index - 1);
        if (index < 143 && !isRightEdge) handleClick(cells[index + 1], index + 1);
        if (index > 11) handleClick(cells[index - 12], index - 12);
        if (index < 132) handleClick(cells[index + 12], index + 12);
        if (index > 11 && !isLeftEdge) handleClick(cells[index - 1 - 12], index - 1 - 12);
        if (index > 11 && !isRightEdge) handleClick(cells[index + 1 - 12], index + 1 - 12);
        if (index < 132 && !isLeftEdge) handleClick(cells[index - 1 + 12], index - 1 + 12);
        if (index < 132 && !isRightEdge) handleClick(cells[index + 1 + 12], index + 1 + 12);
    }, 10);
}

const minesLeftDisplay = document.getElementById('mines-left'); 
let flagsPlaced = 0;
function addFlag(e, cell) {
    e.preventDefault();    
    if (cell.classList.contains('open')) return;
    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
        flagsPlaced--;
    } else {
        if (flagsPlaced < 20) {
            cell.classList.add('flag');
            flagsPlaced++;
        }
    }
    if(minesLeftDisplay) {
        minesLeftDisplay.textContent = 20 - flagsPlaced;
    }
}

function checkWin() {
    let openCount = 0;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('open')) {
            openCount++;
        }
    }
    if (openCount === 124) { 
        setTimeout(() => {
            alert('ПОБЕДА! Вы нашли все мины!');
        }, 100);
        
        grid.style.pointerEvents = 'none'; 
    }
}


let currentIndex = 0; 

document.addEventListener('keydown', (e) => {
    if (cells.length === 0) return;
    cells[currentIndex].classList.remove('active');

    if (e.code === 'ArrowLeft' && currentIndex % 12 !== 0) currentIndex--;
    else if (e.code === 'ArrowRight' && currentIndex % 12 !== 11) currentIndex++;
    else if (e.code === 'ArrowUp' && currentIndex >= 12) currentIndex -= 12;
    else if (e.code === 'ArrowDown' && currentIndex < 132) currentIndex += 12;
    else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (e.ctrlKey) addFlag(e, cells[currentIndex]);
        else handleClick(cells[currentIndex], currentIndex);
    }

    cells[currentIndex].classList.add('active');
});
