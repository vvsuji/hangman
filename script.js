/**
 * IIFE -> Immediately Invoked Function Expression
 * - Avoids polluting the global scope
 * - Meaning you don't have to worry about naming variables the same thing in different scripts
 * - You also don't have to worry about *third party* scripts messing with your scripts
 */

const wordList = [
  'word',
  'hello',
  'world',
  'slay',
  'gossip',
  'girl',
  'twiliGht',
  'what',
  'we',
  'do',
  'in',
  'the',
  'shadows',
  'bloodborne',
  'vex',
];

(() => {
  const censoredWordContainer = document.querySelector(
    '.censoredWordContainer',
  );
  const inputEl = document.querySelector('input');

  let answerWord = null;
  let currGuess = null;
})();
