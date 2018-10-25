
class Player {
  constructor (playerObject) {
    this.clientId = playerObject.clientId;
    this.avatar = playerObject.avatar;
    // this.clientObject = playerObject.clientObject;

    this.handle = playerObject.handle;
    this.score = 0;
  }

  changeScore (amount) {

  }


}

module.exports = Player;