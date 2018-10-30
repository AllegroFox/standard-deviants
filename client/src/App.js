import React, { Component } from 'react';
import './App.css';
import './gameRoom.css';
import NavBar from './Navbar';
import InputBar from './InputBar';
import Prompt from './Prompt';
import GuessBank from './GuessBank';
import Roster from './Roster';
import SystemUpdates from './SystemUpdates';
import RulesModal from './RulesModalNew';
// import RulesModal from './RulesModal';
import ResultsModal from './ResultsModal';
// import ResultsModal from './ScoreModal';
import NewPlayerModal from './NewPlayerModal';
import LeaderBoardModal from './LeaderBoard'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { gameType   : "Syllynyms",
                   gameStateMessage  : "Get Ready!",
                   gameState  : "",
                   timeLeft   : 0,
                   handle     : "Hello World!",
                   clientId   : "",
                   guesses    : [],
                   scoreBoard: [{name:"AllegroFox", score: 12},
                                {name:"StandardGiraffe", score: 14},
                                {name:"CurlicubePanda", score: 9}],
                   systemUpdates   : ["some", "system", "messages"],
                   prompt     : {objective: [{word: "word",
                                              hint: "hint" }, {word: "word", hint: "hint"}],
                                 rules: "Some rules",
                                 gameModule: "Rhyme Shotgun",
                                 scoring: "",
                                 inputBar: "",
                                 promptBanner: "" },
                   guessBarContent: "",
                   guessBarColor: {"backgroundColor": "white"},
                   resultsModalOn: false,
                   rulesModalOn: false,
                   finalResults: {},
                   leaderBoard: [{topScoringSynonyms: [null, {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: false,
                                                        gameModule:'?',
                                                        createdAt:'?'}],
                                  topScoringRhymes: [{word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'}],
                                  topPlayerSynonyms: {handle: '?',
                                                      score: '?',
                                                      gameModule: '?'},
                                  topPlayerRhymes: {handle: '?',
                                                      score: '?',
                                                      gameModule: '?'}
                                  },
                                  {topScoringSynonyms: [{word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'}],
                                  topScoringRhymes: [{word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'},
                                                        {word:'?',
                                                        handle:'?',
                                                        pointValue: '?',
                                                        gameModule:'?',
                                                        createdAt:'?'}],
                                  topPlayerSynonyms: {handle: '?',
                                                      score: '?',
                                                      gameModule: '?'},
                                  topPlayerRhymes: {handle: '?',
                                                      score: '?',
                                                      gameModule: '?'}
                                  }]
                  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.socket = null;
  }

  componentDidMount() {

    // Connection is attempted.
    // this.socket = new WebSocket("ws://localhost:3001");
    this.socket = new WebSocket("ws://"+document.location.hostname+":3001");

    // Successful connection is reported to the client.
    this.socket.onopen = function (event) {
      console.log("The server welcomes you.");
    };

    this.socket.onmessage = event => {
        const message = JSON.parse(event.data);

        switch(message.type) {

          case "incomingGetReady":
            this.setState({finalResults: {}});

            break;

          case "incomingResults":
            let finalResults = message.content
            console.log(finalResults);

            this.setState({finalResults: finalResults})
            break;

          case "incomingLogin":

            console.log(`Type: ${message.type}; "${message.content}"`);

            break;

          case "incomingNewPlayer":
            console.log(`Type: ${message.type}; "${message.content.message}"`);

            break;

          case "incomingGuess":

            console.log(`Type: ${message.type}; "${message.content}"`);

            let guess = message.content;
            let newGuess = [...this.state.guesses, guess];

            this.setState({guesses: newGuess});

            break;

          case "incomingGuessState":

            console.log(message.content.message);

            let guessWord = message.content.guess;
            let guessState = message.content.status;

            let foundGuessIndex = this.state.guesses.findIndex(guessObj => (guessObj.guess === guessWord));



            let modifiedGuess = {
              ...this.state.guesses[foundGuessIndex],
              guess: guessWord,
              status: guessState
            };

            let newGuesses = [
              ...this.state.guesses.slice(0, foundGuessIndex),
              modifiedGuess,
              ...this.state.guesses.slice(foundGuessIndex + 1)
            ];

            this.setState({guesses: newGuesses});


            break;

          case "incomingTimeLeft":

            let updatedTimer = message.content.timeLeft;
            console.log(updatedTimer);
            this.setState({timeLeft: updatedTimer});

            break;

          case "incomingGameState":
            console.log(`Type: ${message.type}; "${message.content}"`);
            let updatedStateMessage = message.content.stateMessage;
            let updatedState = message.content.state;
            this.setState({gameStateMessage: updatedStateMessage, gameState: updatedState});
            break;

          case "incomingGuessZero":
            this.setState({guesses: []});
            break;

          case "incomingPrompt":

            console.log(`Type: ${message.type}; "${message.content}"`);

            let newPrompt = message.content;

            this.setState({prompt: newPrompt});

            break;

          case "incomingScoreboard":

            console.log(`Type: ${message.type}; "${message.content}"`);
            let updatedScoreboard = message.content;

            this.setState({scoreBoard: updatedScoreboard});

            break;

          case "incomingLeaderboard":

            let updatedLeaderBoard = message.content;

            this.setState({leaderBoard: updatedLeaderBoard});

            break;

          // Received when a player first connects and is initialized as an object within the game room.
          case "incomingPlayerInitialization":
            this.setState({
              clientId: message.content.clientId,
              handle: message.content.handle
            });
            console.log(message.content.message);
            break;

          default:
            console.log(message);
            throw new Error("Unknown message type: " + message.type);
            break;
        }
      }
    };

  handleChange(event) {
    this.setState({guessBarContent: event.target.value});
  }

  handleSubmit(event) {
    if (event.key === 'Enter' && this.state.gameState === "getGuessing") {

      let foundGuess = this.state.guesses.find(guessObj => (guessObj.guess === this.state.guessBarContent.trim().toLowerCase()));

      if (foundGuess) {
        this.setState({guessBarColor: {"backgroundColor": "tomato"}, guessBarContent: ""});

        setTimeout(() => { this.setState({guessBarColor: {"backgroundColor": "white"}}) } , 90)
      } else {
        const guess = { guess: this.state.guessBarContent.trim().toLowerCase() };

        this.sendMessage(guess, "postGuess");
        this.setState({guessBarContent: ""});
      }
    }
  }

  handleNameChange(event) {
    if (event.key === 'Enter') {
      const newHandle = {
        handle: event.target.value
      }
      this.sendMessage(newHandle, "postUpdateHandle");
    }
  }

  // Formats a message package with type and id, and then sends it on to the server.
  sendMessage (messageObject, messageType) {
    const message = {
      content: messageObject,
      clientId: this.clientId,
      type: messageType
    }
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div className="game-window container-fluid">
        <RulesModal prompt={this.state.prompt} gameState={this.state.gameState}/>
        <ResultsModal finalResults={this.state.finalResults} gameState={this.state.gameState}/>
        <NewPlayerModal handleNameChange={this.handleNameChange} gameState={this.state.gameState}/>
        <NavBar gameType={this.state.gameType} gameStateMessage={this.state.gameStateMessage} timeLeft={this.state.timeLeft} handle={this.state.handle} handleNameChange={this.handleNameChange} inputValue={this.state.handleBarContent} gameModule={this.state.prompt.gameModule}/>
        <div className="row">
          <div className="col-md-8">
            <Prompt prompt={this.state.prompt} gameModule={this.state.prompt.gameModule}/>
            <GuessBank guesses={this.state.guesses}/>
            <InputBar
              value={this.state.guessBarContent}
              backgroundColor={this.state.guessBarColor}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              placeholder={this.state.prompt.inputBar}
              />
          </div>
          <div className="col-md-4">
            <Roster players={this.state.scoreBoard} me={this.state.clientId}/>
            <LeaderBoardModal leaderBoard={this.state.leaderBoard}/>
          </div>
          <footer className="fixed-bottom">
            <span>Standard-Deviants 2018</span>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;

// <RulesModal prompt={this.state.prompt}/>
// <ScoreModal finalResults={this.state.finalResults}/>
// <NewPlayerModal handleNameChange={this.handleNameChange}/>
