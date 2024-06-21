/* eslint-disable */

const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  //   input: fs.createReadStream(`${__dirname}/data/tsp.txt`),
  output: process.stdout,
});

let input = [];

function move(start, N, visitNum, index, cost, costMatrix, visited) {
  if (N === visitNum) {
    if (costMatrix[index][start] > 0) {
      return cost + costMatrix[index][start];
    }

    return null;
  }

  let result = null;

  try {
    for (let j = 0; j < N; j += 1) {
      if (visited[j] === 0 && costMatrix[index][j] > 0) {
        visited[j] = 1;
        const tempResult = move(
          start,
          N,
          visitNum + 1,
          j,
          cost + costMatrix[index][j],
          costMatrix,
          visited
        );
        visited[j] = 0;

        if (tempResult) {
          if (!result || tempResult < result) {
            result = tempResult;
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  if (result) {
    return result;
  }

  return null;
}

readline
  .on('line', (line) => {
    input.push(line.split(' ').map((value) => Number(value)));
  })
  .on('close', () => {
    const N = input[0][0];
    const costMatrix = input.slice(1, input.length);

    //비용
    let cost = Number.MAX_VALUE;
    // 시작지점 정하기
    for (let i = 0; i < N; i += 1) {
      const visited = Array(N + 1).fill(0);
      visited[i] = 1;
      //순회하기
      const result = move(i, N, 1, i, 0, costMatrix, visited);
      if (result < cost) {
        cost = result;
      }
    }

    console.log(cost);

    process.exit();
  });
