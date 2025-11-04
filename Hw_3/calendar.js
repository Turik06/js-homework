const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const today = now.getDate();

const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

const firstDay = new Date(year, month, 1);
const lastDay = new Date(year, month + 1, 0);

let firstDayOfWeek = firstDay.getDay();
firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

const daysInMonth = lastDay.getDate();

const calendarBody = document.getElementById('calendarBody');
calendarBody.innerHTML = '';

let date = 1;


for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        if (i === 0 && j < firstDayOfWeek) {
            cell.classList.add('empty');
        } else if (date > daysInMonth) {
            cell.classList.add('empty');
        } else {
            cell.textContent = date;
            if (date === today) {
                cell.classList.add('today');
            }
            
            date++;
        }

        row.append(cell);
    }

    calendarBody.append(row);

    if (date > daysInMonth) {
        break;
    }
}
