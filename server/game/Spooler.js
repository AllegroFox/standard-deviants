// const RoundSyn = require('./Round-syn.js');
// const RoundRhy = require('./Round-rhy.js');
const Round = require('./Round.js');

// Adds random sampling functionality to all arrays
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

class Spooler {

  constructor () {
    this.spool = [];
  }

  async spinUp() {

  }

}

module.exports = Spooler;