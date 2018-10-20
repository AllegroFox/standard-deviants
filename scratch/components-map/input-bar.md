# Input Bar
Takes user-inputs for guesses.

## Props
inputBarContent ("string")
onKeypress(keypress) (function to update App's inputBarContent state)
gameState (getReady/inputAnswers/gameResults/restPeriod)


## Logic
Changes colour of bar depending on gameState (greyed out when App isn't listening)
Updates field value with inputBarContent
On keypresses, App will hear it and update inputBarContent, which will be sent back down to update the contents of the field.

