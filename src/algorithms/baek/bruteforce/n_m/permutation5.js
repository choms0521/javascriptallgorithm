/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/permutation2.txt`),
  output: process.stdout,
});

let input = [];

const finalResult = [];
const usedResult = [];
const checkNumList = Array(8).fill(-1);

function permutation(N, M, index, numList) {
  if (index === M) {
    finalResult.push(usedResult.join(' '));
    return;
  }

  for (let i = 0; i < N; i += 1) {
    if (checkNumList[i] === -1) {
      usedResult.push(numList[i]);
      checkNumList[i] = 1;
      permutation(N, M, index + 1, numList);
      usedResult.pop();
      checkNumList[i] = -1;
    }
  }
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const [N, M] = input[0];
    input[1].sort();

    permutation(N, M, 0, input[1]);
    console.log(finalResult.join('\n'));

    process.exit();
  });
