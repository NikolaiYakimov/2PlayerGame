'use strict';
const diceEl = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnReset = document.querySelector('.btn--new');
const btnModalClose = document.querySelector('.close-modal');

const scorePlayer0 = document.getElementById(`score--0`);
const scorePlayer1 = document.getElementById('score--1');
const curScore0Pl = document.getElementById('current--0');
const curScore1Pl = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let activePlayer, score, currentScore, playing;
//Starting condition of the site
const newGame = function () {
  activePlayer = 0;
  score = [0, 0];
  currentScore = 0;
  playing = true;

  curScore0Pl.textContent = 0;
  curScore1Pl.textContent = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
newGame();
//When the player need to switch
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 10) {
      //When one of the 2 players get 100 points ,we set playing to false ,so the game can stop
      playing = false;
      document.querySelector('.h1-modal').textContent = `Player ${
        activePlayer + 1
      } win the game`;
      document.querySelector('.modal').classList.remove('hidden');
      document.querySelector('.overlay').classList.remove('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //turn on winner mode
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnReset.addEventListener('click', newGame);

btnModalClose.addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  newGame();
});

document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  newGame();
});
