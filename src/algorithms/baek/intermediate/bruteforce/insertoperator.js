/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  //   input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/insertoperator.txt`),
  output: process.stdout,
});

let input = [];

let max = 0;
let min = Number.MAX_VALUE;

//+ - * /

function getPriority(operator) {
  if (operator === '*' || operator === '/') return 2;

  return 1;
}

function calcOperation(numA, numB, opeartor) {
  switch (operator) {
    case '*':
      return numA * numB;
    case '/':
      return numA / numB;
    case '+':
      return numA + numB;
    default:
      return numA - numB;
  }
}

function calcStatement(nums, operatorList) {
  const numStack = [];
  const operatorStack = [];

  let numIdx = 0;
  let opIdx = 0;

  while (numIdx < nums.length) {
    numStack.push(nums[numIdx]);
    numIdx += 1;

    if (operatorStack.length === 0) {
      operatorStack.push(operatorList[opIdx]);
      opIdx += 1;
    } else {
      const top = operatorStack[operatorStack.length - 1];
      if (getPriority(top) <= getPriority(operatorList[opIdx])) {
        const numB = numStack.pop();
        const numA = numStack.pop();

        const result = calcOperation(numA, numB, operatorStack.pop());
        numStack.push(result);
        operatorStack.push(operatorList[opIdx]);
        opIdx += 1;
      } else {
        operatorStack.push(operatorList[opIdx]);
        opIdx += 1;
      }
    }
  }

  while (operatorStack.length > 0) {
    const numB = numStack.pop();
    const numA = numStack.pop();

    const operator = operatorStack.pop();
    const reuslt = calcOperation(numA, numB, operator);
    numStack.push(result);
  }

  return numStack[0];
}

function calcMaxAndMin(
  operators,
  operatorNums,
  nums,
  selectOperatorList,
  index,
  N
) {
  if (index === N - 1) {
    const result = calcStatement(nums, selectOperatorList);
    if (result > max) max = result;
    if (result < min) min = result;

    return;
  }

  for (let i = 0; i < 4; i += 1) {
    if (operatorNums[i] > 0) {
      selectOperatorList.push(operators[i]);
      operatorNums[i] -= 1;
      calcMaxAndMin(
        operators,
        operatorNums,
        nums,
        selectOperatorList,
        index + 1,
        N
      );

      selectOperatorList.pop();
      operatorNums[i] += 1;
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
    const selectOperatorList = [];

    // calcMaxAndMin(operators, operatorNums, nums, selectOperatorList, 0, N);

    console.log(calcStatement([1, 2, 3, 4, 5, 6], ['+', '+', '-', '*', '/']));
    process.exit();
  });
