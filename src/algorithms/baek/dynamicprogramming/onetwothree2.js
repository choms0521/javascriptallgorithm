/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/onetwothree2.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;
const division_value = 1000000009;
const iteration = 100000;

readline
  .on('line', (line) => {
    input.push(Number(line));
  })
  .on('close', () => {
    const N = input[0];

    const resultArray = [];

    for (let i = 0; i <= iteration; i += 1) {
      resultArray.push([0, 0, 0]);
    }

    resultArray[1][0] = 1;
    resultArray[1][1] = 0;
    resultArray[1][2] = 0;

    resultArray[2][0] = 0;
    resultArray[2][1] = 1;
    resultArray[2][2] = 0;

    resultArray[3][0] = 1;
    resultArray[3][1] = 1;
    resultArray[3][2] = 1;

    for (let i = 4; i <= iteration; i += 1) {
      resultArray[i][0] =
        (resultArray[i - 1][1] + resultArray[i - 1][2]) % division_value;
      resultArray[i][1] =
        (resultArray[i - 2][0] % division_value) +
        (resultArray[i - 2][2] % division_value);
      resultArray[i][2] =
        (resultArray[i - 3][0] % division_value) +
        (resultArray[i - 3][1] % division_value);
    }

    const result = [];
    for (let i = 1; i <= N; i += 1) {
      result.push(
        (resultArray[input[i]][0] +
          resultArray[input[i]][1] +
          resultArray[input[i]][2]) %
          division_value
      );
    }

    console.log(result.join('\n'));
    process.exit();
  });
