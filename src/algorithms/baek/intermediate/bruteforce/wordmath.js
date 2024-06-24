/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  // input: fs.createReadStream(`${__dirname}/data/wordmath.txt`),
  output: process.stdout,
});

let input = [];

const refArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const selectArr = Array(10).fill(0);

function permuation(arr, index, tempArr, N) {
  if (index === N) {
    arr.push([...tempArr]);
    return;
  }

  for (let i = 0; i < N; i += 1) {
    if (selectArr[i] === 0) {
      tempArr.push(refArr[i]);
      selectArr[i] = 1;

      permuation(arr, index + 1, tempArr, N);
      tempArr.pop();
      selectArr[i] = 0;
    }
  }
}

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const permutations = [];
    const tempArr = [];
    permuation(permutations, 0, tempArr, 10);

    const wordMatcher = {};
    let startIdx = 0;

    const N = Number(input[0]);
    let max = 0;

    for (let k = 0; k < permutations.length; k += 1) {
      let sum = 0;

      for (let i = 0; i < N; i += 1) {
        const wordLength = input[i + 1].length;
        for (let j = 0; j < wordLength; j += 1) {
          let index = wordMatcher[input[i + 1][j]];
          if (!index) {
            wordMatcher[input[i + 1][j]] = startIdx;
            index = startIdx;
            startIdx += 1;
          }

          sum += Math.pow(10, wordLength - j - 1) * permutations[k][index];
        }
      }

      if (sum > max) {
        max = sum;
      }
    }

    console.log(max);

    process.exit();
  });
