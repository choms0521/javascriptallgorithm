/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  //   input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/postfixoperation.txt`),
  output: process.stdout,
});

let input = [];

// 중위 표기법 => 후위 표기법!!

function isOperator(value) {
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '(':
    case ')':
      return true;
    default:
      return false;
  }
}

function getPrority(value) {
  switch (value) {
    case '(':
    case ')':
      return 3;
    case '*':
    case '/':
      return 2;
    case '+':
    case '-':
      return 1;
  }
}

function convertToPostFix(operation) {
  const nums = [];
  const operator = [];

  let result = '';

  let i = 0;
  while (i < operation.length) {
    const character = operation[i];
    if (!isOperator(character)) {
      nums.push(character);
      i += 1;
    } else {
      if (character === '(') {
        // const tempString = [];
        // i += 1;
        // while (operation[i] !== ')') {
        //   tempString.push(operation[i]);
        //   i += 1;
        // }
        // nums.push(convertToPostFix(tempString.join('')));
        // i += 1;
      } else {
        if (operator.length === 0) {
          operator.push(character);
          i += 1;
        } else {
          while (operator.length > 0) {
            const top = operator[operator.length - 1];

            const topPriority = getPrority(top);
            const operatorPriority = getPrority(character);

            if (topPriority >= operatorPriority) {
              const calcOperator = operator.pop();
              const B = nums.pop();
              const A = nums.pop();

              nums.push(`${A}${B}${calcOperator}`);
            } else {
              operator.push(character);
              i += 1;
              break;
            }
          }

          if (operator.length === 0) {
            operator.push(character);
            i += 1;
          }
        }
      }
    }
  }

  while (operator.length > 0) {
    const curOperation = operator.pop();
    const B = nums.pop();
    const A = nums.pop();
    nums.push(`${A}${B}${curOperation}`);
  }

  return nums[0];
}

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    operation = input[0];

    const result = convertToPostFix(operation);
    console.log(result);

    process.exit();
  });
