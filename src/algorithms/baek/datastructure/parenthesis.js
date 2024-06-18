/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/sequence.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    input = input.map((value) => Number(value));
    const N = Number(input[0]);

    let j = 1;

    const stack = [];
    const result = [];
    let isSuccess = true;
    for (let i = 1; i <= N; i += 1) {
      const curNum = input[i];

      while (j <= curNum) {
        stack.push(j);
        result.push('+');
        j += 1;
      }

      const top = stack[stack.length - 1];

      if (top === curNum) {
        stack.pop();
        result.push('-');
      } else {
        isSuccess = false;
        break;
      }
    }

    if (!isSuccess) {
      console.log('NO');
    } else {
      console.log(result.join('\n'));
    }

    process.exit();
  });
