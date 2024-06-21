/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/onetwothree.txt`),
  output: process.stdout,
});

let input = [];

function select(objective, sum) {
  let finalSum = 0;

  if (sum > objective) {
    return 0;
  }
  if (sum === objective) {
    return 1;
  }

  for (let i = 1; i <= 3; i += 1) {
    const result = select(objective, sum + i);
    finalSum += result;
  }

  return finalSum;
}

readline
  .on('line', (line) => {
    input.push(Number(line));
  })
  .on('close', () => {
    const N = input[0];

    for (const num of input.slice(1, input.length)) {
      console.log(select(num, 0));
    }

    process.exit();
  });
