/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/suffix.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const info = input[0];

    const suffixList = [];

    for (let i = 0; i < info.length; i += 1) {
      const sliced = info.slice(i, info.length);
      suffixList.push(sliced);
    }
    suffixList.sort();
    console.log(suffixList.join('\n'));
  });
/*


*/
