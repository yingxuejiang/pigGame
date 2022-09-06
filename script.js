'user strict';
//select elments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activeplayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
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

//rolling dice funcitionility
//step 1, generate a random dice
//step, display the dice img
// step 3, check the dice==1? if is,switch player
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      //add dice the current score
      currentScore += dice;
      //display current score
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

//holding functionility
//check the activeplayer
//step2: add the currentScore to score,and display the score
//step3: check whenter the score is over 100; if not, change player; if it is , win the game
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    if (scores[activeplayer] < 100) {
      switchPlayer();
    }
    //winGame
    else {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    }
  }
});

//switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0; //(dynamic,very useful in A or B case, must keep in mind)
  currentScore = 0;
  //change the display
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//resesting the game(euqal initiate the game)
btnNew.addEventListener('click', function () {
  init();
});
