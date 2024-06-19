/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  // input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/remotecon.txt`),
  output: process.stdout,
});

let input = [];

let min = Number.MAX_VALUE;

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const N = Number(input[0]);
    const M = Number(input[1]);
    const nums = input[2].split(' ').map((value) => Number(value));

    for (let i = 0; i < 1000000; i += 1) {
      let refValue = i;
      let isSuccess = true;
      let digitNum = 0;

      while (true) {
        const curNum = refValue % 10;
        if (nums.indexOf(curNum) !== -1) {
          isSuccess = false;
          break;
        }

        refValue /= 10;
        refValue = parseInt(refValue, 10);
        digitNum += 1;

        if (refValue === 0) break;
      }

      if (isSuccess) {
        let result = Math.abs(i - N) + digitNum;

        if (result < min) {
          min = result;
        }
      }
    }

    if (N == 100) {
      console.log(0);
    } else if (min === 0) {
      console.log(Math.abs(N - 100));
    } else {
      console.log(min);
    }

    process.exit();
  });
