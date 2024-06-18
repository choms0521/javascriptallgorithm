/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/purchasecard.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];

    const priceList = input[1];

    const resultArray = Array(N + 1).fill(0);

    resultArray[1] = priceList[0];

    for (let i = 2; i <= N; i += 1) {
      let max = 0;
      for (let j = 0; j < i; j += 1) {
        const result = resultArray[j] + priceList[i - j - 1];
        if (result > max) {
          max = result;
        }
      }
      resultArray[i] = max;
    }

    console.log(resultArray[N]);

    process.exit();
  });
