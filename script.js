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

  /**
   * This will pick a word at random, display the censored version onto the page,
   * and compare user input against that chosen word. Also (when we have it), reset
   * the hangman graphic to show all limbs again.
   */
  function startGame() {
    // Pick a word
    answerWord = wordList[Math.floor(Math.random() * wordList.length)];

    // Now that we have the word we need to display a censored version of it on the screen
    for (let i = 0; i < randomWord.length; ++i) {
      // Append to the DOM a span that contains an underscore
      const underscoreSpan = document.createElement('span');
      underscoreSpan.innerText = '_';
      censoredWordContainer.appendChild(underscoreSpan);
    }
  }

  function handleKeypress(e) {
    inputArray.push(e.key.toLowerCase());

    checkValidity();
  }

  inputEl.addEventListener('keypress', handleKeypress);
  startGame();
})();
