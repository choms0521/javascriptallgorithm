/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  //   input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/sumdivision.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;
const division_value = 1000000000;
const iteration = 200;

let finalValue = 1;
readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const [N, K] = input[0];

    const resultArray = [];

    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= K; j += 1) {
        if (j === 1) {
          resultArray[i][j] = 1;
        } else {
          resultArray[i][j] = 0;
        }
      }
    }

    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= i; j += 1) {
        resultArray[i][j];
      }
    }

    process.exit();
  });
