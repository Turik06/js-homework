const table = document.getElementById('multiplicationTable');

const headerRow = document.createElement('tr');

const cornerCell = document.createElement('th');
cornerCell.textContent = '×';
headerRow.append(cornerCell);


for (let i = 1; i <= 10; i++) {
    const th = document.createElement('th');
    th.textContent = i;
    headerRow.append(th);
}

table.append(headerRow);

for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');
    
    const headerCell = document.createElement('th');
    headerCell.textContent = i;
    row.append(headerCell);
 
    for (let j = 1; j <= 10; j++) {
        const cell = document.createElement('td');
        cell.textContent = i * j;
        row.append(cell);
    }
    
    table.append(row);
}
