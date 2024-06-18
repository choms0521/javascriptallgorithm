/* eslint-disable */

const fs = require('fs');
const { toASCII } = require('punycode');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/makeone.txt`),
  output: process.stdout,
});

let input = [];
const max_value = Number.MAX_VALUE;

function calcOperation(value, resultArray) {
  if (resultArray[value]) {
    return resultArray[value];
  }

  let result = max_value;
  if (value % 3 === 0) {
    if (resultArray[value / 3]) {
      const temp = resultArray[value / 3] + 1;
      if (temp < result) {
        result = temp;
      }
    } else {
      const temp = calcOperation(value / 3, resultArray) + 1;
      if (temp < result) {
        result = temp;
      }
    }
  }

  if (value % 2 === 0) {
    if (resultArray[value / 2]) {
      const temp = resultArray[value / 2] + 1;
      if (temp < result) {
        result = temp;
      }
    } else {
      const temp = calcOperation(value / 2, resultArray) + 1;
      if (temp < result) {
        result = temp;
      }
    }
  }

  if (resultArray[value - 1]) {
    const temp = resultArray[value - 1] + 1;
    if (temp < result) {
      result = temp;
    }
  } else {
    const temp = calcOperation(value - 1, resultArray) + 1;
    if (temp < result) {
      result = temp;
    }
  }

  return result;
}

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const N = Number(input[0]);

    const resultArray = Array(1000000).fill(0);
    resultArray[1] = 0;
    resultArray[2] = 1;
    resultArray[3] = 1;

    for (let i = 4; i <= N; i += 1) {
      resultArray[i] = calcOperation(i, resultArray);
    }

    console.log(resultArray[N]);

    process.exit();
  });
