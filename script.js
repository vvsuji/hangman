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
  const lettersArr = document.querySelectorAll('.letter');
  // const inputEl = document.querySelector('input');

  let answerWord = '';
  const incompArr = [];

  /**
   * This will pick a word at random, display the censored version onto the page,
   * and compare user input against that chosen word. Also (when we have it), reset
   * the hangman graphic to show all limbs again.
   */
  function startGame() {
    // Pick a word
    answerWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(answerWord);

    // Now that we have the word we need to display a censored version of it on the screen
    for (let i = 0; i < answerWord.length; ++i) {
      // Append to the DOM a span that contains an underscore
      const underscoreSpan = document.createElement('span');
      incompArr.push('_');
      underscoreSpan.innerText = '_';
      censoredWordContainer.appendChild(underscoreSpan);
    }

    lettersArr.forEach((letter) => {
      letter.addEventListener('click', handleLetterClick);
    });

    // Set input maxLength
    // inputEl.maxLength = answerWord.length;
    // Add eventListener
  }

  /**
   * Check if value entered matches hidden word selected (or whatever the fuck)
   *
   * Check if answerWord & key have any letters in common. If so, which?
   */
  function checkValidity(target, key) {
    /**
     * Unreadable af but JS flex below
     * This is the first time I've ever used the comma operator :o
     *
     * const indexesArr = answerChars.reduce(
     *  (acc, curr, i) => (curr === key ? (acc.push(i), acc) : acc),
     *  [],
     * );
     *
     */

    if (!answerWord.includes(key)) {
      target.classList.add('incorrect');
      return;
    }

    // We have two strings, answerWord and key.
    // We need to loop for each instance of key in answerWord
    // To make this easier let's turn answerWord into an array
    const answerChars = answerWord.split('');
    while (answerChars.includes(key)) {
      target.classList.add('correct');

      // Find index of letter and replace dash in array with letter
      const index = answerChars.indexOf(key);
      answerChars.splice(index, 1);
      incompArr.splice(index, 1, key);
      censoredWordContainer.children[index].innerText = incompArr[index];
    }
  }

  function handleLetterClick(e) {
    let target = e.target;
    let key = e.target.dataset.letter;

    checkValidity(target, key);
  }

  // inputEl.addEventListener('keypress', handleClick);
  startGame();
})();
