// Задание 1
function getArrayParams(arr) {
  let min, max, sum, avg;

  min = arr[0];
  max = arr[0];
  sum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    else if (arr[i] < min) {
      min = arr[i];
    }
    sum += arr[i];
  }
  avg = Number((sum / arr.length).toFixed(2));

  return { min: min, max: max, avg: avg };
}

// Задание 2
function worker(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

function makeWork(arrOfArr, func) {
  let max;

  for (let i = 0; i < arrOfArr.length; i++) {
    let newSum = func(arrOfArr[i]);
    if (i === 0) {
      max = newSum;
    }
    if (newSum > max) {
      max = newSum;
    } 
  }
  
  return max;
}

// Задание 3
function worker2(arr) {
  let dist = 0;
  let min = arr[0];
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    else if (arr[i] < min) {
      min = arr[i];
    }
  }

  dist = max - min;
  dist = Math.abs(dist);

  return dist;
}
