document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('field');
    const minesLeftDisplay = document.getElementById('mines-left'); 
    const cells = [];
    let flagsPlaced = 0;
    let firstClick = true;
    let currentIndex = 0; 
    
    grid.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;

        const index = cells.indexOf(cell);
        handleClick(cell, index);
    });

    grid.addEventListener('contextmenu', (e) => {
        e.preventDefault(); 
        const cell = e.target.closest('.cell');
        if (!cell) return;

        addFlag(cell);
    });

    document.addEventListener('mine.start', () => {
        console.log('Игра началась! Первое поле открыто.');
    });

    document.addEventListener('mine.step', (e) => {
        const { x, y, index } = e.detail;
        console.log(`Ход игрока: индекс ${index} (x: ${x}, y: ${y})`);
    });

    document.addEventListener('mine.end', (e) => {
        const { result } = e.detail;
        
        grid.style.pointerEvents = 'none'; 

        setTimeout(() => {
            if (result === 'win') {
                alert('ПОБЕДА! Вы нашли все мины!');
            } else {
                revealAllMines();
                alert('BOOM YOU LOSE((((');
            }
        }, 100);
    });

    function createCell(){
        for(let i = 0; i < 144; i++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            grid.appendChild(cell);
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

    function handleClick(cell, index) {
        if (cell.classList.contains('open') || cell.classList.contains('flag')){
            return;
        }
        const stepEvent = new CustomEvent('mine.step', {
            detail: {
                index: index,
                x: index % 12,
                y: Math.floor(index / 12)
            }
        });
        document.dispatchEvent(stepEvent);

        if (firstClick) {
            firstClick = false;
            placeMines(index);
            const startEvent = new CustomEvent('mine.start');
            document.dispatchEvent(startEvent);
        }

        cell.classList.add('open');
        
        if (cell.classList.contains('mine')) {
            const endEvent = new CustomEvent('mine.end', {
                detail: { result: 'lose' }
            });
            document.dispatchEvent(endEvent);
            return;
        }

        const total = countMinesAround(index);
        if (total !== 0) {
            cell.innerHTML = total;
            if (total === 1) cell.style.color = 'blue';
            if (total === 2) cell.style.color = 'green';
            if (total === 3) cell.style.color = 'red';
            if (total === 4) cell.style.color = 'darkblue';
        } else {
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

    function addFlag(cell) {
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
            const endEvent = new CustomEvent('mine.end', {
                detail: { result: 'win' }
            });
            document.dispatchEvent(endEvent);
        }
    }
    document.addEventListener('keydown', (e) => {
        if (cells.length === 0) return;
        cells[currentIndex].classList.remove('active');
        if (e.code === 'ArrowLeft' && currentIndex % 12 !== 0) currentIndex--;
        else if (e.code === 'ArrowRight' && currentIndex % 12 !== 11) currentIndex++;
        else if (e.code === 'ArrowUp' && currentIndex >= 12) currentIndex -= 12;
        else if (e.code === 'ArrowDown' && currentIndex < 132) currentIndex += 12;
        else if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault(); 
            if (e.ctrlKey) addFlag(cells[currentIndex]);
            else handleClick(cells[currentIndex], currentIndex);
        }

        cells[currentIndex].classList.add('active');
    });
});