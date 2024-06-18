/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/increasesequenceone.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;
const division_value = 1000000009;
const iteration = 1000;

let finalValue = 1;
readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const sequence = input[1];
    const resultArray = Array(N + 1).fill(1);

    for (let i = N - 2; i >= 0; i -= 1) {
      let max = 1;
      for (let j = 1; i + j <= N; j += 1) {
        if (sequence[i + j] > sequence[i]) {
          const temp = resultArray[i + j] + 1;
          if (temp > max) {
            max = temp;
          }
        }
      }
      resultArray[i] = max;
      if (max > finalValue) {
        finalValue = max;
      }
    }

    console.log(finalValue);

    process.exit();
  });
