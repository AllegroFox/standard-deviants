# Nav Bar
At the top of the interface, shows game status etc.

Props
- gameType  ("Synonyms", "Rhymes", "Etc.")
- gameState (getReady/inputAnswers/gameResults/restPeriod)
- timeLeft (integer)
- handle ("handle")

Logic:
Game badge depending on gameType

marqueeMessage depending on gameState ("Get Ready!" / "Answer Now!" / "Round Over" / "Preparing Next Round")

display time left on the clock (stretch: when time is low, change colour)

