// 1.2. Составить программу, проверяющую, будет ли простым данное натуральное число.
function prime_number(num){
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i<=num ** 0.5; i+=2){
    if(num%i==0){
      return false
    }
  }
  return true;
}

// Тесты
console.log(prime_number(1)); // false
console.log(prime_number(547)); // true
console.log(prime_number(100)); // false
console.log(prime_number(100003)); // true
console.log(prime_number(564444)); // false