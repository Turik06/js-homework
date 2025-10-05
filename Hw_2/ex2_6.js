// 2.6.  Создайте объект "предметы", со свойством, в котором через запятую перечислены предметы, преподаваемые в университете/школе (перечислите 2-6). Напишите к нему метод, который будет добавлять предмет, если его еще там нет. Используйте для этого преобразование в массив и свойства массивов split, join, push. Создайте метод для удаления предмета, если он уже там есть, с помощью свойства splice.

const subjects = {
    list: "Математика,Физика,Информатика",

    add_subject(subject) {
        let subjectArray = this.list.split(','); 
        if (!subjectArray.includes(subject)) { 
            subjectArray.push(subject); 
            this.list = subjectArray.join(',');
        } else {
            console.log(`${subject} уже есть в списке.`);
        }
    },

   
    remove_subject(subject) {
        let subjectArray = this.list.split(',');
        let index = subjectArray.indexOf(subject);
        if (index !== -1) {
            subjectArray.splice(index, 1);
            this.list = subjectArray.join(',');
        } else {
            console.log(`${subject} нет в списке.`);
        }
    }
};

//Тесты
console.log("Изначальный список:", subjects.list);
subjects.add_subject("Химия");
console.log("Добавления Химии:", subjects.list);
subjects.add_subject("Физика");
console.log("Добавления Физику:", subjects.list);
subjects.remove_subject("Информатика");
console.log("Удаления Информатики:", subjects.list);
subjects.remove_subject("Биология");
console.log("Удаления Биологии:", subjects.list);