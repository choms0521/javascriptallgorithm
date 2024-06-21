/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/password.txt`),
  output: process.stdout,
});

let input = [];

function select(N, M, index, finalArray, refList, selectList, selectNum) {
  if (selectNum === N) {
    const selected = refList.filter((value, index) => selectList[index] === 1);
    const even = selected.filter(
      (value) =>
        value === 'a' ||
        value === 'e' ||
        value === 'i' ||
        value === 'o' ||
        value === 'u'
    );
    const odd = selected.filter(
      (value) =>
        value !== 'a' &&
        value !== 'e' &&
        value !== 'i' &&
        value !== 'o' &&
        value !== 'u'
    );

    if (even.length >= 1 && odd.length >= 2) {
      finalArray.push(selected.join(''));
    }

    return;
  }

  if (index >= M) {
    return;
  }

  //   뽑을 거야 말거야
  // 이번꺼 뽑자
  selectList[index] = 1;
  select(N, M, index + 1, finalArray, refList, selectList, selectNum + 1);

  selectList[index] = 0;
  select(N, M, index + 1, finalArray, refList, selectList, selectNum);
}

readline
  .on('line', (line) => {
    input.push(line.split(' '));
  })
  .on('close', () => {
    const [L, C] = input[0].map((value) => Number(value));
    const passCharList = input[1].sort();

    const finalResult = [];
    const selectList = Array(C).fill(0);
    select(L, C, 0, finalResult, passCharList, selectList, 0);
    console.log(finalResult.join('\n'));

    process.exit();
  });
