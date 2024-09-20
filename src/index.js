module.exports = function check(str, bracketsConfig) {

  const stack = [];

  const brackets = bracketsConfig.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const bracketsNew = {};

  let nextSym = 'A';
  let newKey;
  let NewValue;

  const encodeBrackets = {};
  for (const key in brackets) {
    encodeBrackets[key] = {
      odd: nextSym,
      even: nextSym,
      count: 0,
    };
    newKey = nextSym;
    nextSym = String.fromCharCode(nextSym.charCodeAt(0) + 1);
    NewValue = nextSym; 
    if (key === brackets[key]) {
      encodeBrackets[key] = {
        ...encodeBrackets[key],
        even: nextSym,
      };
    } else {
      encodeBrackets[brackets[key]] = {
        odd: nextSym,
        even: nextSym,
        count: 0,
      };
    }
    bracketsNew[newKey] = NewValue;
    nextSym = String.fromCharCode(nextSym.charCodeAt(0) + 1);
  }

  let strNew = '';
  str.split('').map( c => {
    const item = encodeBrackets[c];
    if(item.count % 2 !== 0) {
      strNew += item.even;
    } else {
      strNew += item.odd;
    }
    item.count += 1;
  });

  for (let i = 0; i < strNew.length; i += 1) {
    const char = strNew[i];
    if (Object.keys(bracketsNew).includes(char)) {
      stack.push(char);
    } else if (Object.values(bracketsNew).includes(char)) {
      const lastBracket = stack.pop();
      if (bracketsNew[lastBracket] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
