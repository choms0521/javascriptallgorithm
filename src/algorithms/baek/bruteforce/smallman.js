/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/smallman.txt`),
  output: process.stdout,
});

let input = [];

function calcHeight(refHeights, curHeights, index, N, sum) {
  if (sum > 100) {
    return false;
  }

  if (sum === 100 && index === N) {
    return true;
  }

  if (index === N) {
    return false;
  }

  for (let i = 0; i < refHeights.length; i += 1) {
    if (curHeights.indexOf(refHeights[i]) === -1) {
      curHeights.push(refHeights[i]);
      const result = calcHeight(
        refHeights,
        curHeights,
        index + 1,
        N,
        sum + refHeights[i]
      );
      if (result) {
        return true;
      }
      curHeights.pop();
    }
  }
}

readline
  .on('line', (line) => {
    input.push(Number(line));
  })
  .on('close', () => {
    const heights = input;
    const refHeights = [];
    calcHeight(heights, refHeights, 0, 7, 0);
    const sorted = refHeights.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a === b) {
        return 0;
      } else {
        return -1;
      }
    });
    console.log(sorted.join('\n'));

    process.exit();
  });
