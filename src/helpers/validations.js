import countryOptions from '../data/countries.json';

export const validateName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

export const validateEmail = (email) => {
  return (email.match(/@/g) || []).length === 1;
};

export const validateCountry = (country) => {
  return countryOptions.includes(country);
};

export const validatePhone = (phone) => {
  const plusCount = (phone.match(/\+/g) || []).length;
  return (phone.startsWith('+') && phone.length > 5 && plusCount === 1 &&
    /^[+][0-9]+$/.test(phone)
  );
};













function sortByLength (array) {
  // Return an array containing the same strings,
  // ordered from shortest to longest
  return array.sort((a, b) => a.length - b.length)
}



function reverseLetter(str) {
  return str.replace(/[0-9,?]/g, '').split('').reverse().join('');
}

[].sort()

function removeUrlAnchor(url){
  let urlArr = url.split("");
  return urlArr.includes('#')
    ? urlArr.slice(0, urlArr.indexOf('#')).join('')
    : url;
}


// function removeUrlAnchor(url){
//   let urlArr = url.split('');
//   return !urlArr.includes('#') ? url : urlArr.slice(0, urlArr.indexOf('#')).join('');
// }

function gimme (triplet) {
  const midIdx = [...triplet].sort((a, b) => a - b)[1];
  return triplet.indexOf(midIdx);
}


function parse( data ) {

  let count = 0;
  let returnArr = [];
  data.split('').map(char => {
    char === 'i'
      ? count += 1
    : char === 'd'
      ? count -= 1
    : char === 's'
      ? count = count * count
    : char === 'o'
      ? returnArr.push(count)
    : '';

  });
  return returnArr; // your code here  
}



function sumDigits(number) {
  const digArr = number.toString().replace('-', '').split('');
  return digArr.reduce((a, n) => a + (+n), 0);
}

function findOdd(A) {
  const arr = [];
  [...new Set(A)].forEach(n => arr.push(A.filter(c => c === n)));
  const res = arr.sort((a, b) => a.length - b.length);
  return res.filter(l => l.length % 2 !== 0)[0][0];
}


function moveZeros(arr) {
  const zeros = arr.filter(n => n === 0);
  const noZeros = arr.filter(n => n !== 0);
  return noZeros.concat(zeros);
}


function isPangram(string){
  return !'abcdefghijklmnopqrstuvwxyz'.split('').map(c => string.toLowerCase().replaceAll(' ','').replace('.', '').includes(c)).includes(false);
}


function count(string) {
  const returnObj = {};
  string.split('').map(c => {
    returnObj[c] = Object.keys(returnObj).includes(c) ? returnObj[c] += 1 : 1;
  });
  return returnObj;
}



function high(x){
  const abc = ' abcdefghijklmnopqrstuvwxyz';
  const res = x.split(' ').map(w => {
    let word = { name: w, count: 0};
    w.split('').map(c => word.count += abc.indexOf(c));
    return word;
  })
  return res.sort((a, b) => b.count - a.count)[0].name;
}
