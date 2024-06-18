/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/yosepus.txt`),
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
    const [N, M] = input[0];

    const queue = [];
    for (let i = 1; i <= N; i += 1) {
      queue.push(i);
    }

    const result = [];

    while (queue.length > 0) {
      for (let j = 0; j < M - 1; j += 1) {
        queue.push(queue.shift());
      }

      result.push(queue.shift());
    }

    console.log(`<${result.join(', ')}>`);

    process.exit();
  });
/*


*/
