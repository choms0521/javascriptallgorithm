/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/partsequence.txt`),
  output: process.stdout,
});

let input = [];

//숫자를 뽑냐 안뽑냐로 구분할 수 있다.

function calcSum(nums, index, N, selectNums, addPartialSums) {
  if (index === N) {
    if (selectNums.length > 0) {
      const sum = selectNums.reduce((accu, value) => accu + value, 0);
      addPartialSums.add(sum);
    }

    return;
  }

  // 뽑는다
  selectNums.push(nums[index]);
  calcSum(nums, index + 1, N, selectNums, addPartialSums);

  //안뽑는다
  selectNums.pop();
  calcSum(nums, index + 1, N, selectNums, addPartialSums);
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const nums = input[1];
    const selectNums = [];
    const addPartialSums = new Set();
    calcSum(nums, 0, N, selectNums, addPartialSums);
    let finalPartialSums = [...addPartialSums].sort((a, b) => a - b);

    let startNum = finalPartialSums[0];

    if (startNum !== 1) {
      console.log(1);
      return;
    }

    for (let i = 0; i < finalPartialSums.length; i += 1) {
      if (startNum !== finalPartialSums[i]) {
        break;
      }

      startNum += 1;
    }

    console.log(startNum);

    process.exit();
  });
