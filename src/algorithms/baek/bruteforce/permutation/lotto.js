/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/lotto.txt`),
  output: process.stdout,
});

let input = [];

function select(N, arr, index, insertNums, resultArray) {
  if (insertNums.length === N) {
    resultArray.push([...insertNums]);
    return;
  }

  if (index >= arr.length) {
    return;
  }

  //지금 수를 뽑는다.
  insertNums.push(arr[index]);
  select(N, arr, index + 1, insertNums, resultArray);
  insertNums.pop();

  //안뽑는다
  select(N, arr, index + 1, insertNums, resultArray);
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    let index = 0;

    while (true) {
      const N = input[index][0];

      if (N === 0) {
        break;
      }

      const nums = input[index].slice(1, N + 1);
      const insertNums = [];
      const resultArray = [];
      select(6, nums, 0, insertNums, resultArray);
      index += 1;

      console.log(resultArray.map((value) => value.join(' ')).join('\n'));
      console.log('');
    }

    process.exit();
  });
