/* eslint-disable */

const fs = require('fs');
const { toASCII } = require('punycode');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/onetwothree1.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;

readline
  .on('line', (line) => {
    input.push(Number(line));
  })
  .on('close', () => {
    const N = input[0];

    const resultArray = Array(11).fill(0);
    resultArray[1] = 1;
    resultArray[2] = 2;
    resultArray[3] = 4;

    for (let i = 4; i <= 11; i += 1) {
      resultArray[i] =
        resultArray[i - 1] + resultArray[i - 2] + resultArray[i - 3];
    }

    const result = [];
    for (let i = 1; i <= N; i += 1) {
      result.push(resultArray[input[i]]);
    }

    console.log(result.join('\n'));
    process.exit();
  });
