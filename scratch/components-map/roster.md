# Roster
Displays all present in the room in order of score, then alphabetically.

## Props
currentUser
userInRoom [{handle, score}]

## Logic
Render a list of usersInRoom based on score, then alphabetically.  Renders score, avatar, name
Checks on each render if the handle matches currentUser, and makes that stand out (background colour, bold, etc.)