const Player = require('./Player.js');
const RoundRhymes = require('./Round-rhymes.js');
const RoundSynonyms = require('./Round-synonyms.js');
const Database = require('../database-functions.js');


class Room {

  constructor(messager, database) {
    this.messager = messager;
    this.database = database;
    this.gameModes = [RoundRhymes, RoundSynonyms];

    this.players = [{handle: "Aaron the Aamazing", score: -5}, {handle: "Philbert", score: 5}];
    this.round = null;
    this.roundNumber = 0;
    this.marqueeText = "";
    this.gameState = "";

    this.startNewRound = this.startNewRound.bind(this);
    this.startEndRound = this.startEndRound.bind(this);
    this.startGetReady = this.startGetReady.bind(this);
  }

  // #############################
  // #############################
  //  Round Lifecycle Controllers
  // #############################
  // #############################

  async startGetReady() {
    // const gameModeForRound = this.gameModes.sample;
    // console.log(`Today's game mode: ${JSON.parse(gameModeForRound)}`);
    this.round = new this.gameModes[Math.floor(Math.random() * this.gameModes.length)](this.messager);
    this.roundNumber++;
    await this.round.generateAnswerPool();
    this.zeroScoreboard();
    this.zeroGuesses();
    this.broadcastPrompt();
    this.messager.broadcastMessage(this.messager.parcelMessage(
      null, null, "incomingGetReady"));

    this.marqueeText = `Get ready for Round ${this.roundNumber}!`;
    this.gameState = "getReady";
    this.broadcastGameState();
    this.countDownFrom(7, this.startNewRound);
  }

  // Instantiate a new round and have it generate an answer pool.
  // In the future, it might be fed a rules module.
  startNewRound() {
    this.marqueeText = `Round ${this.roundNumber}: ${this.round.marqueeForGetGuessing}`;
    this.gameState = "getGuessing";
    this.broadcastGameState();
    this.countDownFrom(this.round.guessingPeriod, this.startEndRound);
  }

  startEndRound() {
    const roundResults = this.roundEndResults();

    this.messager.broadcastMessage(this.messager.parcelMessage(
      roundResults, null, "incomingResults"));
    this.marqueeText = `Round ${this.roundNumber}: ${this.round.marqueeForGetResults}`;
    this.gameState = "getResults";
    this.broadcastGameState();
    this.persistScoringGuesses(this.findScoringAnswersByPlayer());
    this.persistRoundWinnerStats(this.findGuessesByWinner());
    this.findGuessesByWinner();
    this.zeroScoreboard();
    this.zeroGuesses();
    this.countDownFrom(15, this.startGetReady);
  }

  // #########################
  // #########################
  //  Round Lifecycle Helpers
  // #########################
  // #########################

  // Returns an array of all guesses by the winner of the round with point value and player handle and score attached.
  findGuessesByWinner() {
    let roundEndResults = this.roundEndResults();
    let guessesByWinner = [];
    let winnerProfile = roundEndResults.finalScoreboard[0]
    let winnerClientId = this.players.find( player => player.handle === winnerProfile.handle ).clientId;
    this.round.guesses.forEach(guess => {
      if (guess.player === winnerClientId) {
        guessesByWinner.push(guess)
      }
    });
    const winnerStats = {
      handle: winnerProfile.handle,
      score: winnerProfile.score,
      guesses: guessesByWinner
    }
    return winnerStats;
  }

  // Returns an array of scoring answers from the round with point value and player handle attached.
  findScoringAnswersByPlayer() {

    let uniqueAnswers = [];
    let taggedUniqueAnswers = [];
    this.round.answerBank.reduce((acc, next) => {
      if (next.status === "unique") {
        acc.push(next);
      }
      return acc;
    }, uniqueAnswers);

    uniqueAnswers.forEach(answer => {
      this.round.guesses.forEach(guess => {
        if (answer.id === guess.guess) {
          const taggedAnswer = {
            word: answer.id,
            clientId: guess.player,
            pointValue: answer.pointValue
          }
          taggedUniqueAnswers.push(taggedAnswer);
        }
      })
    })

    const namedUniqueAnswers = [];
    taggedUniqueAnswers.forEach(answer => {
      this.players.forEach(player => {
        if (answer.clientId === player.clientId) {
          const namedAnswer = {
            handle: player.handle,
            word: answer.word,
            pointValue: answer.pointValue
          }
          namedUniqueAnswers.push(namedAnswer);
        }
      });
    });

    return namedUniqueAnswers;
  }

  countDownFrom(seconds, callback) {
    let timeLeft = (seconds * 1000);

    const startTimer = setInterval(() => {
        this.broadcastTimer(timeLeft / 1000);
        timeLeft -= 1000;
        if (timeLeft < 0) {
          stopTimer()
        }
      }, 1000);

    const stopTimer = () => {
      clearInterval(startTimer);
      callback();
    }
  }

  broadcastTimer(secondsLeft) {
    this.messager.broadcastMessage(
      this.messager.parcelMessage({timeLeft: secondsLeft}, null, "incomingTimeLeft"));
  }

  // Packages the round statistics.
  roundEndResults() {
    const roundStats = {};
    roundStats.answerBank = [];

    // Pop in the objectives/defintions.
    roundStats.answerBank[0] = {
      target: this.round.objective[0].word,
      definition: this.round.objective[0].hint
    };
    roundStats.answerBank[1] = {
      target: this.round.objective[1].word,
      definition: this.round.objective[1].hint
    };

    // Sort through the answer bank and sort the answers according to their initial seed.  This is my first ever array.reduce!  Whoop whoop. -D
    roundStats.answerBank[0].bank = [];
    roundStats.answerBank[1].bank = [];
    roundStats.answerBank = this.round.answerBank.reduce( (acc, next) => {
      (next.seed === 0) && acc[0].bank.push(next);
      (next.seed === 1) && acc[1].bank.push(next);
      return acc;
    }, roundStats.answerBank);

    // Finally, tack on the final scoreboard.
    const finalScoreboard = this.players.map((player) => { return {
        handle: player.handle,
        score: player.score
      }
    }).sort(function (a, b) {
      return b.score - a.score;
    });

    roundStats.finalScoreboard = finalScoreboard;

    return roundStats;
  }

  // Broadcasts the objectives of the current round.  If a target is given, instead sends the objectives to just that target.
  broadcastPrompt(target) {
    const content = {
      gameModule: this.round.gameModule,
      objective: this.round.objective,
      rules: this.round.rules.rules,
      scoring: this.round.rules.scoring
    }

    target ?
      this.messager.sendClientMessage(
        this.messager.parcelMessage(
          content, target, "incomingPrompt")
        )

      : this.messager.broadcastMessage(
        this.messager.parcelMessage(
          content, null, "incomingPrompt")
      );
  }

  broadcastScoreboard() {
    let content = this.players.map((player) => { return {
        name: player.handle,
        score: player.score
      }
    }).sort(function (a, b) {
      return b.score - a.score;
    });

    this.messager.broadcastMessage(
      this.messager.parcelMessage(content, null, "incomingScoreboard")
    );
  }

  broadcastGameState() {
    this.messager.broadcastMessage(
      this.messager.parcelMessage(
        {stateMessage: this.marqueeText, state: this.gameState}, null, "incomingGameState"));
  }

  // Mutates the score of the identified player
  updateScoreByPlayer(clientId, scoreChange) {
    const result = this.players.find(player => clientId === player.clientId);
    result.score += scoreChange;
    this.broadcastScoreboard();
  }

  zeroScoreboard() {
    this.players.forEach((player) => {
      player.score = 0
    })
    this.broadcastScoreboard();
  }

  zeroGuesses() {
    this.messager.broadcastMessage(
      this.messager.parcelMessage(
        null, null, "incomingGuessZero"));
  }

  // #################################
  // #################################
  //  Player-Game Interaction Helpers
  // #################################
  // #################################

  // When a guess message is received from a player...
  playerGuess(guessObject) {
    // ... tell ROUND to build it into a guess object, check its status, and spit out the results.
    const guess = this.round.checkGuess(guessObject);

    // Check the status of the results and...
    switch (guess.status) {
      case "wrong":
        // ...send the guesser the news that their guess was wrong.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "No, you boob!!!",
            guess: guess.guess,
            status: "wrong"
          }, guessObject.clientId, "incomingGuess")
        );
        break;

      case "unique":
        // ...send the guesser the news that their guess was a hit.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, and you were the first one!!!",
            guess: guess.guess,
            status: "unique"
          }, guessObject.clientId, "incomingGuess")
        );
        // DONE? Change [logic] current player's score by guess.pointValue
        this.updateScoreByPlayer(guessObject.clientId, guess.pointValue);
        break;

      case "demotedToPopular":
        // ...send the current guesser their status---it's already been guessed.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, but it's been guessed before.",
            guess: guess.guess,
            status: "popular"
          }, guessObject.clientId, "incomingGuess")
        );
        // ... Also send the first player (who thinks their guess is unique) the bad news.
        const playerToUpdate = (this.round.findGuess(guess));
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "Bad news, bub. Someone just guessed your unique successful guess.",
            guess: guess.guess,
            status: "popular"
          }, playerToUpdate.player, "incomingGuessState")
        );
        // DONE? Change playerToUpdate.score by guess.pointValue
        this.updateScoreByPlayer(playerToUpdate.player, guess.pointValue);
        break;

      case "popular":
        // ...send the player the bad news that their guess is old news.
        this.messager.sendClientMessage(
          this.messager.parcelMessage({
            message: "You got it, but it's been guessed before.",
            guess: guess.guess,
            status: "popular"
          }, guessObject.clientId, "incomingGuess")
        );
        break;
    }
  }

  // #################################
  // #################################
  //  Player-Room Interaction Helpers
  // #################################
  // #################################

  // When a new client joins...
  playerJoined(protoPlayerObject) {
    // ... instantiate them as a new player object using information sent from the server
    const newPlayer = new Player(protoPlayerObject);
    this.players.push(newPlayer);

    // ... send the player a package with their credentials
    this.messager.sendClientMessage(this.messager.parcelMessage({
      message: "Hello from deep in the game!",
      clientId: newPlayer.clientId,
      handle: newPlayer.handle
    }, newPlayer.clientId, "incomingPlayerInitialization"));
    this.broadcastPrompt(newPlayer.clientId);
    this.messager.sendClientMessage(this.messager.parcelMessage({
      // gameStateMessage: "Welcome to the game!", gameState: "getHandle"
      stateMessage: this.marqueeText, state: this.gameState
    }, newPlayer.clientId, "incomingGameState"));

    // ... send everyone else an alert with the new player's credentials.
    this.messager.broadcastMessage(this.messager.parcelMessage({message: `A new player has joined!`}, newPlayer.clientId, "incomingNewPlayer"), true);
    this.broadcastScoreboard();
  }

  // When a player closes their connection, remove their player object from the collection, then update the scoreboard.
  playerLeft(departedPlayerClientId) {
    // Adapted from Stack Overflow: https://stackoverflow.com/questions/4755005/how-to-get-the-index-of-an-object-inside-an-array-of-objects
    // Finds the index of the player object in the players array, based on the clientId inside it.
    function getIndex(playersArray, clientId) {
      const index = playersArray.map(function(e) { return e.clientId; }).indexOf(clientId);
      return index;
    }

    this.players.splice(getIndex(this.players, departedPlayerClientId), 1);
    this.broadcastScoreboard();
  }

  updateHandle(updateObject) {
    // Find the player object associated with the update request, then mutate the record accordingly.
    const result = this.players.filter(targetPlayer => (
      targetPlayer.clientId === updateObject.clientId))[0];
    result.handle = updateObject.content.handle;

    // Send the updated details to the player:
    this.messager.sendClientMessage(this.messager.parcelMessage({
      message: "Your handle has been updated!",
      clientId: result.clientId,
      handle: result.handle
    }, updateObject.clientId, "incomingPlayerInitialization"));

    // Broadcast the scoreb0oard so that players see the updated name.
    this.broadcastScoreboard();
  }
  // #####################
  // #####################
  //  Database Persisters
  // #####################
  // #####################

  persistScoringGuesses(guessArray) {
    guessArray.forEach(guess => {
      let answerToPersist = {
        type: "persistAnswer",
        word: guess.word,
        handle: guess.handle,
        pointValue: guess.pointValue,
        createdAt: new Date()
      }
      this.database.addData(answerToPersist);
    })
  }

  persistRoundWinnerStats(winnerStats) {
    winnerStats.type = "persistStatistics";
    winnerStats.createdAt = new Date();
    this.database.addData(winnerStats);
  }


}

module.exports = Room;