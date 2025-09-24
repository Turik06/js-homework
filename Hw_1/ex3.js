// 1.11. Найти все различные пифагоровы тройки из интервала от N до М.
function pythagoreanTriples(N, M) {
    let res = [];
    for (let a = N; a <= M; a++) {
        for (let b = a + 1; b <= M; b++) {
            for (let c = b + 1; c <= M; c++) {
                if (a * a + b * b === c * c) {
                    res.push([a, b, c]);
                }
            }
        }
    }
    return res;
}


// Тесты
console.log(pythagoreanTriples(1,20));
// [
//   [ 3, 4, 5 ],
//   [ 5, 12, 13 ],
//   [ 6, 8, 10 ],
//   [ 8, 15, 17 ],
//   [ 9, 12, 15 ],
//   [ 12, 16, 20 ]
// ]
console.log(pythagoreanTriples(5,30));
// [
//   [ 5, 12, 13 ],
//   [ 6, 8, 10 ],
//   [ 7, 24, 25 ],
//   [ 8, 15, 17 ],
//   [ 9, 12, 15 ],
//   [ 10, 24, 26 ],
//   [ 12, 16, 20 ],
//   [ 15, 20, 25 ],
//   [ 18, 24, 30 ],
//   [ 20, 21, 29 ]
// ]
console.log(pythagoreanTriples(1,10));
// [ [ 3, 4, 5 ], [ 6, 8, 10 ] ]