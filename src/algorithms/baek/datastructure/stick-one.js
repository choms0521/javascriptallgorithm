/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/stick-one.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const info = input[0];
    const stack = [];
    let result = 0;
    let i = 0;
    while (i < info.length) {
      if (info[i] === '(' && info[i + 1] === ')') {
        result += stack.length;
        i += 2;
      } else if (info[i] === '(') {
        stack.push('(');
        i += 1;
      } else {
        result += 1;
        stack.pop();
        i += 1;
      }
    }

    console.log(result);
  });
/*


*/
