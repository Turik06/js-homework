// 1.4. Написать программу, которая выводит на экран первые N простых чисел.

function firstNprime(N) {
  const primes = [];
  let num = 2;

  while (primes.length < N) {
    let isPrime = true;

    for (let div = 2; div <= num ** 0.5; div++) {
      if (num % div === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(num);
    }

    num++;
  }

  return primes;
}

//Тесты
console.log(firstNprime(5));   // [2, 3, 5, 7, 11]
console.log(firstNprime(10));  // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
console.log(firstNprime(1));   // [2]