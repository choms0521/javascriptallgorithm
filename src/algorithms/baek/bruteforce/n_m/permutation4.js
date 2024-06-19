/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/permutation.txt`),
  output: process.stdout,
});

let input = [];

const finalResult = [];
const usedResult = [];

function permutation(N, M, index, prev) {
  if (index === M) {
    finalResult.push(usedResult.join(' '));
    return;
  }

  for (let i = prev; i <= N; i += 1) {
    usedResult.push(i);
    permutation(N, M, index + 1, i);
    usedResult.pop();
  }
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const [N, M] = input[0];

    permutation(N, M, 0, 1);
    console.log(finalResult.join('\n'));

    process.exit();
  });
