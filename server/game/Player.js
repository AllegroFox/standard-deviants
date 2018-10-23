/*
    type: "postLogin",
    id: uuidv4(),
    avatar: "Default",
    clientObject: ws
*/

class Player {
  constructor (playerObject) {
    this.id = playerObject.id;
    this.avatar = playerObject.avatar;
    // this.clientObject = playerObject.clientObject;

    this.handle = "";
    this.score = 0;
  }

  changeScore (amount) {

  }


}

module.exports = Player;