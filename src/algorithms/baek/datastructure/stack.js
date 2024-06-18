/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/stack.txt`),
  output: process.stdout,
});

const input = [];

readline
  .on('line', (line) => {
    input.push(
      line.split(' ').map((value) => {
        if (!isNaN(value)) {
          return parseInt(value, 10);
        }

        return value;
      })
    );
  })
  .on('close', () => {
    const N = input[0][0];
    const stack = [];
    const result = [];
    for (let i = 1; i < input.length; i += 1) {
      const order = input[i][0];
      switch (order) {
        case 'push':
          stack.push(input[i][1]);
          break;

        case 'pop':
          if (stack.length > 0) {
            result.push(stack[stack.length - 1]);
            stack.pop();
          } else {
            result.push(-1);
          }

          break;

        case 'size':
          result.push(stack.length);
          break;

        case 'empty':
          if (stack.length > 0) {
            result.push(0);
          } else {
            result.push(1);
          }
          break;

        case 'top':
          if (stack.length > 0) {
            result.push(stack[stack.length - 1]);
          } else {
            result.push(-1);
          }

          break;
      }

      //   console.log(stack);
    }

    console.log(result.join('\n'));

    process.exit();
  });
