/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  //   input: process.stdin,
  input: fs.createReadStream(`${__dirname}/data/nextpermutation.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const permutation = input[1];

    let descendentStart = 0;

    // 내림 차순 찾기
    for (let i = permutation.length - 1; i > 0; i -= 1) {
      //내림 차순 찾아버림
      if (permutation[i - 1] < permutation[i]) {
        descendentStart = i;
        break;
      }
    }

    if (descendentStart === 0) {
      console.log(-1);
    } else {
      const a = permutation[descendentStart - 1];

      let min = permutation[descendentStart];
      let changeIndex = descendentStart;
      for (let i = descendentStart + 1; i < permutation.length; i += 1) {
        if (permutation[i] > a && permutation[i] < min) {
          min = permutation[i];
          changeIndex = i;
        }
      }

      const b = permutation[changeIndex];

      permutation[descendentStart - 1] = b;
      permutation[changeIndex] = a;

      const temp = permutation.slice(descendentStart, permutation.length);
      temp.sort();
      let finalResult = [...permutation.slice(0, descendentStart), ...temp];
      console.log(finalResult.join(' '));
    }

    process.exit();
  });
