// 2.5. Создайте объект "персонал", содержащий должности и имена. Скопируйте его в объект "персонал 2" и поменяйте в нем имена. Выведите оба объекта, предварительно преобразовав их в строку и используя знаки переноса строки.

const personal = {
    manager: "Иван",
    "top-manager": "Петр",
    engineer: "Сергей",
    direktor: "Елена"
};

const personal2 = { ...personal };


personal2.manager = "Николай";
personal2["top-manager"] = "Анна";
personal2.engineer = "Василий";
personal2.direktor = "Мария";

const personalStr = Object.entries(personal)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

const personal2Str = Object.entries(personal2)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');


//Тесты
console.log("Персонал 1:\n" + personalStr);
console.log("Персонал 2:\n" + personal2Str);