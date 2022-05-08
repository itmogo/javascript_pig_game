'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

//initialse function - starting conditions
const init = function () {
  // creating a variable to save score
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // create a state for holding the game
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// switch a player
const switchPlayer = function () {
  // switch to next palyer
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //toggle between current or active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // if condition controls the state of work

    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice); text rolled dice

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1:
    if (dice !== 1) {
      // add dice to current score
      //currentScore = currentScore + dice;
      currentScore += dice;
      //current0El.textContent = currentScore; // change this code

      //setting the current player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next palyer
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // //toggle between current or active player
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // if condition controls the state of work

    //test console
    //console.log('Hold button');
    //1. Add current score to active player'score
    scores[activePlayer] += currentScore;
    //test console
    //console.log(scores[activePlayer]);
    // score [1] = score[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // finish the game
      // set game to false after playing the game with winner
      playing = false;
      // remove / hide the dice when game stops
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// creating the reset game section
btnNew.addEventListener('click', init);
