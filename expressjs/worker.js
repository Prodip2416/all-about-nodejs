const { parentPort } = require('worker_threads');

let result = 0;

for (let i = 0; i < 10000000000; i++) {
  result += i;
}

parentPort.postMessage(result);