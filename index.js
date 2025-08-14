/**
 * @todo Limit the size of 'primeNumbers'
 */
const primeNumbers = new Set();
const MAX_VALUE = 1_000_000_000_000;
const MAX_NUM_PRIME_NUMBERS = 2000;
const MAX_SAFE_NUM_PRIME_NUMBERS = 1800;

/**
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
 * @param {Array} array 
 */
function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    [array[randomIndex], array[currentIndex]] = [
      array[currentIndex],
      array[randomIndex]
    ];
  }
}

function isPrime(value) {
  if (value < 2) {
    return false;
  }
  if (value === 2 || value === 3) {
    return true;
  }
  if (value <= 1 || value % 2 === 0 || value % 3 === 0) {
    return false;
  }
  if (primeNumbers.has(value)) {
    return true;
  }
  for (let i = 5; i * i <= value; i += 6) {
    if (value % i === 0 || value % (i + 2) === 0) {
      return false;
    }
  }
  primeNumbers.add(value);
  return true;
}

function getLeastPositiveDivisorExceptOne(value) {
  if (value < 0) {
    return getLeastDivisor(-value);
  }
  if (primeNumbers.has(value)) {
    return value;
  }
  if (value === 1) {
    return NaN;
  }
  if (value % 2 === 0) {
    return 2;
  }
  if (value % 3 === 0) {
    return 3;
  }
  for (let i = 5; i * i <= value; i += 6) {
    if (value % i === 0) {
      return i;
    }
    if (value % (i + 2) === 0) {
      return i + 2;
    }
  }
  return value;
}

function displayPrimality() {
  const element = document.getElementById('displayPrimality');
  const value = Number(document.getElementById('inputNumberPrimality').value);
  if (!Number.isInteger(value) || !Number.isFinite(value) || value <= 0) {
    element.innerHTML = `Enter a positive integer.`;
  } else if (value > MAX_VALUE) {
    element.innerHTML = `Enter an integer less than ` +
    `${MAX_VALUE.toExponential()}.`;
  } else {
    const leastDivisor = getLeastPositiveDivisorExceptOne(value);
    if (leastDivisor === NaN || leastDivisor !== value) {
      if (Number.isFinite(leastDivisor)) {
        element.innerHTML =
          value +
          ` &equals; ${leastDivisor} &times; ${value / leastDivisor}` +
          ` <span style="color:tomato">is not</span> a prime number.`;
      } else {
        element.innerHTML =
          value + ' <span style="color:tomato">is not</span> a prime number.';
      }
    } else {
      element.innerHTML = value + ' <span style="color:dodgerblue">is</span> ' +
      'a prime number.';
    }
  }
}

function displayEratosthenesSieve() {
  const value = Number(document.getElementById('inputNumberPrimality').value);
  if (value > MAX_VALUE || value < 0) {
    return;
  }
  const row0Value = (Math.floor(value / 10) - 4) * 10;
  for (let i = 0; i < 10; ++i) {
    document.getElementById(`erat${i}`).innerText = '' + (row0Value + i * 10);
  }
  for (let rowId = 0; rowId < 10; ++rowId) {
    const rowValue = row0Value + rowId * 10;
    for (let columnId = 0; columnId < 10; ++columnId) {
      document.getElementById(`erat${rowId}${columnId}`).innerText = (
        isPrime(rowValue + columnId) ? '🅿️' : '⬜'
      );
    }
  }
  if (primeNumbers.size > MAX_NUM_PRIME_NUMBERS) {
    const array = Array.of(primeNumbers);
    shuffleArray(array);
    primeNumbers.clear();
    primeNumbers = new Set(array.slice(0, MAX_SAFE_NUM_PRIME_NUMBERS));
  }
  document.getElementById('currentValue').innerText = '' + value;
}
