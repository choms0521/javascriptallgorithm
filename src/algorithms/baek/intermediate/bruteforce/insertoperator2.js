/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/insertoperator.txt`),
  output: process.stdout,
});

let input = [];

let max = -1000000000;
let min = 1000000000;

function calcResult(nums, operators) {
  const numStack = [];
  let numIdx = 0;
  let operatorIdx = 0;

  while (numIdx < nums.length) {
    if (numStack.length === 0) {
      numStack.push(nums[numIdx]);
      numIdx += 1;
    } else {
      const numA = numStack.pop();
      const numB = nums[numIdx];
      let result = 0;
      const operator = operators[operatorIdx];

      switch (operator) {
        case '+':
          result = numA + numB;
          break;
        case '-':
          result = numA - numB;
          break;
        case '*':
          result = numA * numB;
          break;
        case '/':
          if (numA >= 0) {
            result = parseInt(numA / numB);
          } else {
            result = -parseInt(-numA / numB);
          }
          break;
      }

      numStack.push(result);

      numIdx += 1;
      operatorIdx += 1;
    }
  }

  return numStack[0];
}

function calcSequence(
  operators,
  operatorNums,
  nums,
  selectOperators,
  index,
  N
) {
  if (index === N - 1) {
    const result = calcResult(nums, selectOperators);

    if (result < min) {
      min = result;
    }

    if (result > max) {
      max = result;
    }

    return;
  }

  for (let i = 0; i < 4; i += 1) {
    if (operatorNums[i] > 0) {
      operatorNums[i] -= 1;
      selectOperators.push(operators[i]);
      calcSequence(
        operators,
        operatorNums,
        nums,
        selectOperators,
        index + 1,
        N
      );
      operatorNums[i] += 1;
      selectOperators.pop();
    }
  }
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const nums = input[1];
    const operatorNums = input[2];
    const operators = ['+', '-', '*', '/'];
    const selectOperators = [];
    calcSequence(operators, operatorNums, nums, selectOperators, 0, N);

    console.log(max);
    console.log(min);

    process.exit();
  });
