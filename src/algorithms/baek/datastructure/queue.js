/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  // input: fs.createReadStream(`${__dirname}/data/queue.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(
      line.split(' ').map((value) => {
        if (!isNaN(value)) {
          return Number(value);
        }
        return value;
      })
    );
  })
  .on('close', () => {
    const N = Number(input[0]);
    const queue = [];
    const result = [];
    for (let i = 1; i <= N; i += 1) {
      const order = input[i][0];

      switch (order) {
        case 'push':
          queue.push(input[i][1]);
          break;

        case 'front':
          if (queue.length === 0) {
            result.push(-1);
          } else {
            result.push(queue[0]);
          }
          break;
        case 'back':
          if (queue.length === 0) {
            result.push(-1);
          } else {
            result.push(queue[queue.length - 1]);
          }
          break;
        case 'size':
          result.push(queue.length);
          break;

        case 'empty':
          if (queue.length === 0) {
            result.push(1);
          } else {
            result.push(0);
          }
          break;
        case 'pop':
          if (queue.length === 0) {
            result.push(-1);
          } else {
            const first = queue.shift(queue);
            result.push(first);
          }
      }
    }

    console.log(result.join('\n'));

    process.exit();
  });
