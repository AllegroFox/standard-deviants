# Roster
Displays all present in the room in order of score, then alphabetically.

## Props
handle
userInRoom [{handle, score}]

## Logic
Render a list of usersInRoom based on score, then alphabetically.  Renders score, avatar, name
Checks on each render if the handle matches handle, and makes that stand out (background colour, bold, etc.)