/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/linkandstart.txt`),
  output: process.stdout,
});

let input = [];

let min = Number.MAX_VALUE;

function calcScore(index, N, selectList, sList) {
  if (index === N) {
    //점수 계산하기
    //A팀
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < N; i += 1) {
      if (selectList[i] === 1) {
        for (let j = 0; j < N; j += 1) {
          if (selectList[j] === 1) {
            sumA += sList[i][j];
          }
        }
      }
    }

    //B팀
    for (let i = 0; i < N; i += 1) {
      if (selectList[i] === 0) {
        for (let j = 0; j < N; j += 1) {
          if (selectList[j] === 0) {
            sumB += sList[i][j];
          }
        }
      }
    }

    const diff = Math.abs(sumA - sumB);

    if (diff < min) {
      min = diff;
    }
    return;
  }

  //A팀 뽑기
  selectList[index] = 1;
  calcScore(index + 1, N, selectList, sList);
  //안 뽑기

  selectList[index] = 0;
  calcScore(index + 1, N, selectList, sList);
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const sList = input.slice(1, input.length);

    const selectList = Array(N).fill(0);
    calcScore(0, N, selectList, sList);
    console.log(min);

    process.exit();
  });
