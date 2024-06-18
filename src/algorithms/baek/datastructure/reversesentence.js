/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/reversesentence.txt`),
  output: process.stdout,
});

const input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const N = Number(input[0]);

    const result = [];
    for (let i = 1; i <= N; i += 1) {
      const stack = [];
      const tempResult = [];
      for (let j = 0; j < input[i].length; j += 1) {
        const character = input[i][j];
        if (character != ' ') {
          stack.push(character);
        } else {
          while (stack.length !== 0) {
            tempResult.push(stack[stack.length - 1]);
            stack.pop();
          }
          tempResult.push(character);
        }
      }
      if (stack.length > 0) {
        while (stack.length !== 0) {
          tempResult.push(stack[stack.length - 1]);
          stack.pop();
        }
      }

      result.push(tempResult);
    }

    const finalResult = result.map((value) => value.join(''));

    console.log(finalResult.join('\n'));
    process.exit();
  });
