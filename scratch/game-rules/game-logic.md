# Game Logic

## Game Flow

### Round Start
Round: Derive The Objective (according to rules fed by Room)
  (eg. Select a word from an intermediate word pool and check its snynonyms with thesaurus API.  If there are > 20, set this word as the Objective.  If not, check again.)

Round: Derive answer bank for The Objective (using API, etc.), create Answer objects for each of them.
  {id: "the answer", status: "unguessed"}

Room: Turn off chat for players

Round: Display The Objective and game rules to players
Room: have the status marquee count down to start (to give players a few seconds to think)
Room: have the status marquee count down to end of input period.

#### Input Period:

When Room receives input from a player:
Room tells Round:
  check input against all guesses
  IF a guess by that player matches the input:
    send rejection feedback to player
  ELSE:
    create a new Guess (player, input),
    check that guess against all answers.
    IF guess matches an answer:
      check all guesses to determine status:
        IF no guesses match answer:
          set answer {status: "unique"}
          tell player to update their guess bank
          calcScore(answer, +, player)
          broadcast updated scoreboard
        IF guess matches ONE other guess
          set answer {status: "popular"}
          tell BOTH players to update their guess bank
          calcScore(answer, -, original guess' player)
          broadcast updated scoreboard
        ELSE:
          tell player to update their guess bank
    ELSE (guess doesn't match an answer):
      set guess {wrong?: true}
      tell player to update their guess bank




#### Scoring Period:

Room: Marquee update to GAME OVER
Room: Broadcast scores, highlight winners
Room: Broadcast answer bank, colour-code for your guesses, guessed-but-not-yours, unguessed

#### Rest period

Room: Enable general chat
Room: Vote on next game (once built)
Room: Set all players' scores to 0
Room: Create a new Round

