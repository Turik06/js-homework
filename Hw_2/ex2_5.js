// 2.5. Создайте объект "персонал", содержащий должности и имена. Скопируйте его в объект "персонал 2" и поменяйте в нем имена. Выведите оба объекта, предварительно преобразовав их в строку и используя знаки переноса строки.

const personal = {
    "manager": "Иван",
    "top-manager": "Петр",
    "engineer": "Сергей",
    "direktor": "Елена"
};

const personal2 = {};
const arr_name = ["Николай", "Анна", "Василий", "Мария"];


let personal2Str = ''; 
let personalStr = ''; 

let i = 0;
for (let key in personal) {
    personalStr += key + ': ' + personal[key] + '\n';

    personal2[key] = arr_name[i];
    personal2Str += key + ': ' + personal2[key] + '\n';

    i++;
}

console.log("Персонал 1:\n" + personalStr);
console.log("Персонал 2:\n" + personal2Str);
// Персонал 1:
// manager: Иван
// top-manager: Петр
// engineer: Сергей
// direktor: Елена

// Персонал 2:
// manager: Николай
// top-manager: Анна
// engineer: Василий
// direktor: Мария