// 1.9. Проверить, будет ли данное число числом Фибоначчи.
function fibonacci(num) {
    let a = 0;
    let b = 1;

    if (num === a || num === b) return true; 

    while (b < num) {
        let temp = b;
        b = a + b;   
        a = temp;   
        if (b === num) return true;
    }

    return false; 
}

// Тесты
console.log(fibonacci(8));   // true
console.log(fibonacci(9));   // false
console.log(fibonacci(21));  // true
console.log(fibonacci(22));  // false