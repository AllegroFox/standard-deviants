// const RoundSyn = require('./Round-syn.js');
// const RoundRhy = require('./Round-rhy.js');
const Round = require('./Round.js');

// Adds random sampling functionality to all arrays
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

class Spooler {

  constructor (desiredBufferSize) {
    this.desiredBufferSize = desiredBufferSize;
    this.spool = [];
  }

  async spinUp() {
    while (this.spool.length < this.desiredBufferSize) {
      const bufferRound = new Round;
      bufferRound.generateAnswerpool();
      this.spool = this.spool.concat(newRound)
    }
      console.log("Spooler: The buffer's full.  Waiting for the next call.")
    }
  }

}

module.exports = Spooler;