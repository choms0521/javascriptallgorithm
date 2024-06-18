/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/asecendnumber.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const nums = input[1];
    const result = Array(N).fill(-1);
    const stack = [];

    for (let i = N - 2; i >= 0; i -= 1) {
      const curNum = nums[i + 1];

      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (curNum > top) {
          stack.pop();
        } else {
          break;
        }
      }

      stack.push(curNum);

      const refNumber = nums[i];
      while (stack.length > 0) {
        const top = stack[stack.length - 1];
        if (refNumber < top) {
          result[i] = top;
          break;
        } else {
          stack.pop();
        }
      }
    }

    console.log(result.join(' '));

    process.exit();
  });
/*3,5,2,7
5


*/
