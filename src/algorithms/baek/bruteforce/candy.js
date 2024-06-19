/* eslint-disable */

const fs = require('fs');
const { toASCII } = require('punycode');

const readline = require('readline').createInterface({
  //   input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/candy.txt`),
  output: process.stdout,
});

let input = [];

function calcNum(board) {
  const num = board.length;

  let max = 0;

  //row
  for (let i = 0; i < num; i += 1) {
    let refNum = board[i][0];
    let sameRowNum = 1;
    for (let j = 1; j < num; j += 1) {
      if (refNum === board[i][j]) {
        sameRowNum += 1;
      } else {
        sameRowNum = 1;
        refNum = board[i][j];
      }

      if (sameRowNum > max) {
        max = sameRowNum;
      }
    }
  }

  //column
  for (let i = 0; i < num; i += 1) {
    let refNum = board[0][i];
    let sameColumnNum = 1;
    for (let j = 1; j < num; j += 1) {
      if (refNum === board[j][i]) {
        sameColumnNum += 1;
      } else {
        sameColumnNum = 1;
        refNum = board[i][j];
      }

      if (sameColumnNum > max) {
        max = sameColumnNum;
      }
    }
  }

  return max;
}

let finalMax = 0;

function changeBoard(board) {
  const boardNum = board.length;

  //오른쪽 옆, 아래
  for (let i = 0; i < boardNum; i += 1) {
    for (let j = 0; j < boardNum; j += 1) {
      //오른쪽
      if (j + 1 < boardNum && board[i][j] !== board[i][j + 1]) {
        const original = board[i][j];
        const right = board[i][j + 1];

        board[i][j] = right;
        board[i][j + 1] = original;
        const result = calcNum(board);
        if (result > finalMax) {
          finalMax = result;
        }

        board[i][j] = original;
        board[i][j + 1] = right;
      }

      //아래

      if (i + 1 < boardNum && board[i][j] !== board[i + 1][j]) {
        const original = board[i][j];
        const right = board[i + 1][j];

        board[i][j] = right;
        board[i + 1][j] = original;
        const result = calcNum(board);
        if (result > finalMax) {
          finalMax = result;
        }

        board[i][j] = original;
        board[i + 1][j] = right;
      }
    }
  }
}

readline
  .on('line', (line) => {
    input.push(line.split(''));
  })
  .on('close', () => {
    const N = Number(input[0][0]);
    const board = input.slice(1, input.length);

    changeBoard(board);
    console.log(finalMax);

    process.exit();
  });
