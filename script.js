/**
 * IIFE -> Immediately Invoked Function Expression
 * - Avoids polluting the global scope
 * - Meaning you don't have to worry about naming variables the same thing in different scripts
 * - You also don't have to worry about *third party* scripts messing with your scripts
 */

// Constant for number of lives user starts each game with.
const INITIAL_LIVES = 6;

(() => {
  // DEFINE GLOBAL VARIABLES

  // List of valid words that we choose from to determine the answerWord.
  // Using a set so we can easily remove a word from the possibility list each time its used
  const wordList = new Set([
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
  ]);
  const censoredWordContainer = document.querySelector(
    '.censoredWordContainer',
  );
  const lettersDivArr = document.querySelectorAll('.letter');
  const restartBtn = document.querySelector('#restartBtn');
  const livesDisplay = document.querySelector('#livesDisplay');
  const statusBox = document.querySelector('.statusBox');

  // The chosen word for this game, only set initially in startGame & not modified.
  let answerWord = '';

  // An array of characters that is used to keep track the current guess;
  // initialized with underscores and filled in with the correct characters
  // as they're guessed. (for example, if answerWord = 'hello', currentGuess = ['_', '_', '_'. '_'. '_'])
  let currentGuess = [];

  // Lives is used to determine which parts of fiddlesticks to show depending on how
  // many lives (guesses) you have left before you lose the game.
  // You can pick how many lives you want the player to have, its initialized here:
  let currLives = INITIAL_LIVES;

  // END GLOBAL VARIABLES

  /**
   * Function called to start (or restart) the game.
   * This will pick a word at random, display the censored version onto the page,
   * and compare user input against that chosen word. Also (when we have it), reset
   * the hangman graphic to show all limbs again.
   */
  function startGame() {
    // Reset lives
    updateLives(INITIAL_LIVES);

    // Pick a word
    answerWord = Array.from(wordList.values())[
      Math.floor(Math.random() * wordList.size)
    ];
    console.log(`DEV CHEAT: answerWord is ${answerWord}`);

    // Remove it from possibilities set
    wordList.delete(answerWord);

    // This line creates a new array that's the same size as the length of the answerWord,
    // then fills it with underscores to represent unguessed letters.
    updateCurrentGuess(new Array(answerWord.length).fill('_'));

    // Add event listener to each letter & remove any correct/incorrect classes from before
    lettersDivArr.forEach((letter) => {
      letter.addEventListener('click', handleLetterClick);
      letter.classList.remove('correct');
      letter.classList.remove('incorrect');
    });

    // Remove status class on wordContainer
    censoredWordContainer.classList.remove('correct');
    censoredWordContainer.classList.remove('incorrect');

    // clear status box
    statusBox.innerText = '';
  }

  /**
   * Function to update the remaining lives left both in memory and on the DOM.
   *
   * This is mainly to ensure that our internal currLives and the DOM representation stay in sync
   */
  function updateLives(newVal) {
    currLives = newVal;

    livesDisplay.innerText = currLives;
  }

  /**
   * Function to update the currentGuess both in memory and on the DOM.
   *
   * This is mainly to ensure that our internal currGuess and the DOM representation stay in sync
   */
  function updateCurrentGuess(newCurrentGuess) {
    currentGuess = newCurrentGuess;
    censoredWordContainer.innerText = currentGuess.join('');
  }

  /**
   * When the game is lost we will display "YOU LOSE!", set all
   * keys as incorrect, & show what the word was (in red)
   */
  function loseGame() {
    statusBox.innerText = 'YOU LOSE!';
    statusBox.classList.add('incorrect');

    lettersDivArr.forEach((letter) => {
      letter.classList.add('incorrect');
      letter.removeEventListener('click', handleLetterClick);
    });

    // Show the correct answer but mark it red
    updateCurrentGuess(answerWord.split(''));
    censoredWordContainer.classList.add('incorrect');
  }

  /**
   * When the game is won we will display "YOU WON!", set
   * all keys as correct, & color the word green
   */
  function winGame() {
    statusBox.innerText = 'YOU WIN!';
    statusBox.classList.add('correct');

    lettersDivArr.forEach((letter) => {
      letter.classList.add('correct');
      letter.removeEventListener('click', handleLetterClick);
    });

    // Mark the word green
    censoredWordContainer.classList.add('correct');
  }

  /**
   * This function handles a keypress and checks whether
   * that pressed key matches any letters in the answerWord.
   *
   * If it does,
   */
  function checkValidity(target, key) {
    // If it was an incorrect guess, mark the key as such and return early.
    if (!answerWord.includes(key)) {
      target.classList.add('incorrect');
      // Decrement lives and handle lose condition
      updateLives(currLives - 1);
      if (currLives === 0) loseGame();
      return;
    }

    target.classList.add('correct');

    // Check validity:
    // We have two strings, answerWord and key.
    // There might be multiple instances of key in answerWord,
    // (think key = "i" and answerWord is "twilight"), so we
    // need to replace the underscores in currentGuess for
    // each of those instances.

    // Split answerWord into an array
    const answerChars = answerWord.split('');
    // Loop through that array and store the index where
    // the currently guessed letter matches one in the answerWord.
    answerChars.forEach((letter, i) => {
      if (letter === key) currentGuess[i] = letter;
    });

    // Now that we've updated those indicies in currentGuess, we can write to the DOM
    censoredWordContainer.innerText = currentGuess.join('');

    // Check for win condition by checking if there are any underscores left in currentGuess
    if (!currentGuess.find((letter) => letter === '_')) winGame();
  }

  function handleLetterClick(e) {
    let target = e.target;
    let key = e.target.dataset.letter;

    checkValidity(target, key);
  }

  startGame();
  restartBtn.addEventListener('click', startGame);
})();
