// 1.5. Найти все делители натурального числа N.
function natural_number(N) {
    let divisors = [];
    for (let i = 1; i <= Math.sqrt(N); i++) {
        if (N % i === 0) {
            divisors.push(i);
            if (N / i !== i) 
                divisors.push(N / i); 
        }
    }
    return divisors.sort((a, b) => a - b);
}

// Тесты
console.log(natural_number(36));  // [1, 2, 3, 4, 6, 9, 12, 18, 36]
console.log(natural_number(100)); // [1, 2, 4, 5, 10, 20, 25, 50, 100]
console.log(natural_number(555)); // [1, 3, 5, 15, 37, 111, 185, 555]
