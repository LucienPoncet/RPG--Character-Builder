const game = {

    nbDices: null,

    victory: 0,
    defeat: 0,

    ingame: false,
    
    init: function() {
      const playBtn6 = document.getElementById('play-with-adversary6');
      const playAloneBtn6 = document.getElementById('play-alone6');

      playBtn6.addEventListener('click', game.start6);
      playAloneBtn6.addEventListener('click', game.startAlone6);

      const playBtn8 = document.getElementById('play-with-adversary8');
      const playAloneBtn8 = document.getElementById('play-alone8');

      playBtn8.addEventListener('click', game.start8);
      playAloneBtn8.addEventListener('click', game.startAlone8);

      const playBtn10 = document.getElementById('play-with-adversary10');
      const playAloneBtn10 = document.getElementById('play-alone10');

      playBtn10.addEventListener('click', game.start10);
      playAloneBtn10.addEventListener('click', game.startAlone10);
      
      const playBtn12 = document.getElementById('play-with-adversary12');
      const playAloneBtn12 = document.getElementById('play-alone12');

      playBtn12.addEventListener('click', game.start12);
      playAloneBtn12.addEventListener('click', game.startAlone12);
     
      const playBtn20 = document.getElementById('play-with-adversary20');
      const playAloneBtn20 = document.getElementById('play-alone20');

      playBtn20.addEventListener('click', game.start20);
      playAloneBtn20.addEventListener('click', game.startAlone20);
    },

    begin: function(){
  
      game.boards = document.querySelectorAll('.board');
  
      game.diceNumberInput = document.getElementById('dice-number-input');

      game.diceNumberInput.addEventListener('input', game.changeNumber);
  
      const gameForm = document.getElementById('game-form');

      gameForm.addEventListener('submit', game.play);

      game.changeNumber(); 

    },

    beginAlone: function(){
      
      game.boards = document.querySelectorAll('.board');
  
      game.diceNumberInput = document.getElementById('dice-number-input');

      game.diceNumberInput.addEventListener('input', game.changeNumber);
  
      const gameForm = document.getElementById('game-form');

      gameForm.addEventListener('submit', game.playAlone);

      game.changeNumber();

    },

    start6: function() {

      elementClicked = 6;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      document.getElementById('dealer').classList.remove('hidden');

      game.begin(elementClicked);
    },

    startAlone6: function() {

      elementClicked = 6;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      game.beginAlone(elementClicked);
    },

    start8: function() {

      elementClicked = 8;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      document.getElementById('dealer').classList.remove('hidden');

      game.begin(elementClicked);
    },

    startAlone8: function() {

      elementClicked = 8;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      game.beginAlone(elementClicked);
    },

    start10: function() {

      elementClicked = 10;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      document.getElementById('dealer').classList.remove('hidden');

      game.begin(elementClicked);
    },

    startAlone10: function() {

      elementClicked = 10;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      game.beginAlone(elementClicked);
    },

    start12: function() {

      elementClicked = 12;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      document.getElementById('dealer').classList.remove('hidden');

      game.begin(elementClicked);
    },

    startAlone12: function() {

      elementClicked = 12;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      game.beginAlone(elementClicked);
    },

    start20: function() {

      elementClicked = 20;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      document.getElementById('dealer').classList.remove('hidden');

      game.begin(elementClicked);
    },

    startAlone20: function() {

      elementClicked = 20;

      const allWelcomes = document.querySelectorAll('.welcome');
      for (const welcome of allWelcomes) {
        welcome.classList.add('hidden')
      };

      document.getElementById('app').classList.remove('hidden');

      game.beginAlone(elementClicked);
    },
  
    changeNumber: function() {
      const diceNumberElement = document.getElementById('dice-number');

      game.nbDices = game.diceNumberInput.value;

      diceNumberElement.textContent = game.nbDices;
    },
  
    play: function(event) {

      event.preventDefault();

      if(!game.ingame) {

        game.ingame = true;

        game.reset();

        if (elementClicked == 6) {
          game.playerScore = game.createAll6Dices('player');

          setTimeout(game.dealerPlay, 3000);
  
          game.createCounter();
        } else

        if (elementClicked == 8) {
          game.playerScore = game.createAll8Dices('player');

          setTimeout(game.dealerPlay, 3000);
  
          game.createCounter();
        } else

        if (elementClicked == 10) {
          game.playerScore = game.createAll10Dices('player');

          setTimeout(game.dealerPlay, 3000);
  
          game.createCounter();
        } else

        if (elementClicked == 12) {
          game.playerScore = game.createAll12Dices('player');

          setTimeout(game.dealerPlay, 3000);
  
          game.createCounter();
        } else

        if (elementClicked == 20) {
          game.playerScore = game.createAll20Dices('player');

          setTimeout(game.dealerPlay, 3000);
  
          game.createCounter();
        }
        
      }
    },

    playAlone: function(event) {

      event.preventDefault();

      if(!game.ingame) {

        game.ingame = true;

        game.reset();

        game.createResult();

      }
    },

    createResult: function() {

      if (elementClicked == 6) {
        const score = game.createAll6Dices('player');

        game.displayResult('player', score)

        game.ingame = false;
      } else

      if (elementClicked == 8) {
        const score = game.createAll8Dices('player');

        game.displayResult('player', score)

        game.ingame = false;
      } else

      if (elementClicked == 10) {
        const score = game.createAll10Dices('player');

        game.displayResult('player', score)

        game.ingame = false;
      } else

      if (elementClicked == 12) {
        const score = game.createAll12Dices('player');

        game.displayResult('player', score)

        game.ingame = false;
      } else

      if (elementClicked == 20) {
        const score = game.createAll20Dices('player');

        game.displayResult('player', score)

        game.ingame = false;
      }

    },

    reset: function() {

      for (let boardIndex = 0; boardIndex < game.boards.length; boardIndex++) {

        game.boards[boardIndex].innerHTML = '';
      }

    },

    getRandom: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    createAll6Dices: function(player) {

      let score = 0;

      for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        const diceScore = game.createDice6(player);
        score += diceScore;
      }
      return score;
    },

    createAll8Dices: function(player) {

      let score = 0;

      for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        const diceScore = game.createDice8(player);
        score += diceScore;
      }
      return score;
    },

    createAll10Dices: function(player) {

      let score = 0;

      for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        const diceScore = game.createDice10(player);
        score += diceScore;
      }
      return score;
    },

    createAll12Dices: function(player) {

      let score = 0;

      for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        const diceScore = game.createDice12(player);
        score += diceScore;
      }
      return score;
    },

    createAll20Dices: function(player) {

      let score = 0;

      for (let nbDice = 0; nbDice < Number(game.nbDices); nbDice++) {
        const diceScore = game.createDice20(player);
        score += diceScore;
      }
      return score;
    },

    createDice6: function(player) {

      const dice = document.createElement('div');

      const diceValue = game.getRandom(1, 6);

      const imageOffset = (diceValue - 1) * 100;

      dice.className = 'dice6';

      dice.textContent = '';

      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';

      document.getElementById(player).appendChild(dice);

      return diceValue;
    },

    createDice8: function(player) {

      const dice = document.createElement('div');

      const diceValue = game.getRandom(1, 8);

      const imageOffset = (diceValue - 1) * 100;

      dice.className = 'dice8';

      dice.textContent = '';

      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';

      document.getElementById(player).appendChild(dice);

      return diceValue;
    },

    createDice10: function(player) {

      const dice = document.createElement('div');

      const diceValue = game.getRandom(1, 10);

      const imageOffset = (diceValue - 1) * 100;

      dice.className = 'dice10';

      dice.textContent = '';

      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';

      document.getElementById(player).appendChild(dice);

      return diceValue;
    },

    createDice12: function(player) {

      const dice = document.createElement('div');

      const diceValue = game.getRandom(1, 12);

      const imageOffset = (diceValue - 1) * 100;

      dice.className = 'dice12';

      dice.textContent = '';

      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';

      document.getElementById(player).appendChild(dice);

      return diceValue;
    },

    createDice20: function(player) {

      const dice = document.createElement('div');

      const diceValue = game.getRandom(1, 20);

      const imageOffset = (diceValue - 1) * 100;

      dice.className = 'dice20';

      dice.textContent = '';

      dice.style.backgroundPosition = '-'+ imageOffset + 'px 0';

      document.getElementById(player).appendChild(dice);

      return diceValue;
    },

    dealerPlay: function() {

      if (elementClicked == 6) {
        const dealerScore = game.createAll6Dices('dealer');
        if(dealerScore > game.playerScore) {
          game.defeat++;
        }
  
        else if(dealerScore < game.playerScore) {
          game.victory++;
        }
  
        game.displayResult('player', `${game.playerScore} - ${game.victory} Victoire.s`);
        game.displayResult('dealer', `${dealerScore} - ${game.defeat} Victoire.s`);
  
        game.ingame = false;
      } else if (elementClicked == 8) {
        const dealerScore = game.createAll8Dices('dealer');
        if(dealerScore > game.playerScore) {
          game.defeat++;
        }
  
        else if(dealerScore < game.playerScore) {
          game.victory++;
        }
  
        game.displayResult('player', `${game.playerScore} - ${game.victory} Victoire.s`);
        game.displayResult('dealer', `${dealerScore} - ${game.defeat} Victoire.s`);
  
        game.ingame = false;
      } else if (elementClicked == 10) {
        const dealerScore = game.createAll10Dices('dealer');
        if(dealerScore > game.playerScore) {
          game.defeat++;
        }
  
        else if(dealerScore < game.playerScore) {
          game.victory++;
        }
  
        game.displayResult('player', `${game.playerScore} - ${game.victory} Victoire.s`);
        game.displayResult('dealer', `${dealerScore} - ${game.defeat} Victoire.s`);
  
        game.ingame = false;
      } else if (elementClicked == 12) {
        const dealerScore = game.createAll12Dices('dealer');
        if(dealerScore > game.playerScore) {
          game.defeat++;
        }
  
        else if(dealerScore < game.playerScore) {
          game.victory++;
        }
  
        game.displayResult('player', `${game.playerScore} - ${game.victory} Victoire.s`);
        game.displayResult('dealer', `${dealerScore} - ${game.defeat} Victoire.s`);
  
        game.ingame = false;
      } else if (elementClicked == 20) {
        const dealerScore = game.createAll20Dices('dealer');
        if(dealerScore > game.playerScore) {
          game.defeat++;
        }
  
        else if(dealerScore < game.playerScore) {
          game.victory++;
        }
  
        game.displayResult('player', `${game.playerScore} - ${game.victory} Victoire.s`);
        game.displayResult('dealer', `${dealerScore} - ${game.defeat} Victoire.s`);
  
        game.ingame = false;
      }
    
    },

    displayResult: function(board, counter) {

      const result = document.createElement('div');

      result.className = 'result';

      result.textContent = counter;

      document.getElementById(board).appendChild(result);
    },
  
    createCounter: function() {

      game.counter = 3;

      game.counterElement = document.createElement('div');
      game.counterElement.textContent = game.counter;
      game.counterElement.className = 'counter';
      document.getElementById('app').appendChild(game.counterElement);

      game.counterInterval = setInterval(game.countdown, 1000);
    },

    countdown: function() {

      game.counter--;
  
      game.counterElement.textContent = game.counter;
  
      if (game.counter === 0) {
        game.deleteCounter();
      }
    },
  
    deleteCounter: function() {

      clearInterval(game.counterInterval);

      game.counterElement.remove();
    },
  };

  document.addEventListener('DOMContentLoaded', game.init);
