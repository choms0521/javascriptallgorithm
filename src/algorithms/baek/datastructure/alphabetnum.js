/* eslint-disable */

const fs = require('fs');
const { toASCII } = require('punycode');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/alphabetnum.txt`),
  output: process.stdout,
});

let input = [];

readline
  .on('line', (line) => {
    input.push(line);
  })
  .on('close', () => {
    const data = input[0];
    const result = Array(26).fill(0);

    for (let i = 0; i < data.length; i += 1) {
      result[data[i].charCodeAt() - 'a'.charCodeAt()] += 1;
    }

    console.log(result.join(' '));

    process.exit();
  });
