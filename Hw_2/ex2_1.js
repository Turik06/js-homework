// 2.1. Используя методы строк at, split и toUpperCase, создайте функцию,  которая преобразует строку вида "background-color" (kebab-case) в "backgroundColor" (snake-case),  т.е. удаляет знак "-" и преобразует последующую букву в заглавную. 

function deleteTire(word) {
  let parts = word.split('-'); 
  for (let i = 1; i < parts.length; i++) {
   
    parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
  }
  return parts.join(''); 
}
console.log(deleteTire("background-color")); // backgroundColor
console.log(deleteTire("северо-запад")); // североЗапад
console.log(deleteTire("красно-белый")); // красноБелый