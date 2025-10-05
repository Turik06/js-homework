// 2.3. Используя ассоциативный массив, создайте функцию для перевода заданной строки на необходимый язык. Переводимые слова и фразы ограничены заданным набором (для примера 4 слова).

const dict = {
    ru: {
        "hello": "привет",
        "my": "мой",
        "friend": "друг",
        "dear": "дорогой"
    },
    fr: {
        "hello": "bonjour",
        "my": "mon",
        "friend": "ami",
        "dear": "cher"
    }
};

function translate(str, language) {
    let words = str.split(' '); 
    let translatedWords = []; 

    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase(); 
        translatedWords.push(dict[language]?.[word] || word);
    }

    return translatedWords.join(' ');
}


//Тесты
console.log(translate("hello my friend", "ru")); // привет мой друг
console.log(translate("hello my friend", "fr")); // bonjour mon ami
console.log(translate("hello dear friend", "ru")); // привет дорогой друг
console.log(translate("hello dear friend", "fr")); // bonjour cher ami
console.log(translate("my dear friend", "ru")); // мой дорогой друг