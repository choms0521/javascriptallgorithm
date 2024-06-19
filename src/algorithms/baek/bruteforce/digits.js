/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/digits.txt`),
  output: process.stdout,
});

let input = [];

function calcDigits(number) {
  let temp = number;
  let digitNum = 1;
  while (true) {
    temp /= 10;
    temp = parseInt(temp, 10);
    if (temp === 0) break;
    digitNum += 1;
  }

  return digitNum;
}

readline
  .on('line', (line) => {
    input.push(Number(line));
  })
  .on('close', () => {
    const N = Number(input[0]);

    const digitNum = calcDigits(N);

    let calcNumber = 0;
    let finalDigtNum = 0;
    for (let i = 1; i < digitNum; i += 1) {
      const curNum = Math.pow(10, i) - Math.pow(10, i - 1);
      calcNumber += curNum;
      finalDigtNum += i * curNum;
    }

    const curNum = N - Math.pow(10, digitNum - 1) + 1;
    calcNumber += curNum;
    finalDigtNum += digitNum * curNum;

    console.log(finalDigtNum);

    process.exit();
    ``;
  });
