class Room {

  constructor () {
    this.hello = "You found me."
  }

  clientNotifier (content) {
    return {
      content: content,
      type: "incomingScoreBoard"
    }
  }



}

module.exports = Room;