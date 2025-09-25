// 2.6.  Создайте объект "предметы", со свойством, в котором через запятую перечислены предметы, преподаваемые в университете/школе (перечислите 2-6). Напишите к нему метод, который будет добавлять предмет, если его еще там нет. Используйте для этого преобразование в массив и свойства массивов split, join, push. Создайте метод для удаления предмета, если он уже там есть, с помощью свойства splice.

const subjects = {
    list: "Математика,Физика,Информатика",

    // Метод для добавления предмета
    addSubject(subject) {
        let subjectArray = this.list.split(','); // Преобразуем строку в массив
        if (!subjectArray.includes(subject)) { // Проверяем, есть ли предмет
            subjectArray.push(subject); // Добавляем предмет
            this.list = subjectArray.join(','); // Преобразуем массив обратно в строку
        } else {
            console.log(`${subject} уже есть в списке.`);
        }
    },

    // Метод для удаления предмета
    removeSubject(subject) {
        let subjectArray = this.list.split(','); // Преобразуем строку в массив
        let index = subjectArray.indexOf(subject); // Находим индекс предмета
        if (index !== -1) {
            subjectArray.splice(index, 1); // Удаляем предмет
            this.list = subjectArray.join(','); // Преобразуем массив обратно в строку
        } else {
            console.log(`${subject} нет в списке.`);
        }
    }
};

// Примеры использования
console.log("Изначальный список:", subjects.list);
subjects.addSubject("Химия");
console.log("После добавления Химии:", subjects.list);
subjects.addSubject("Физика");
console.log("После попытки добавить Физику:", subjects.list);
subjects.removeSubject("Информатика");
console.log("После удаления Информатики:", subjects.list);
subjects.removeSubject("Биология");
console.log("После попытки удалить Биологию:", subjects.list);