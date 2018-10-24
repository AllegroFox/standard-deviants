// const datamuse = require('datamuse');
const thesaurus = require('./thesaurus-scraper');
const randomWords = require('random-words');
// ############ Here begins the code ###############

// let target = process.argv[2];

// Adds random sampling functionality to all arrays
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const buildPool = function (minimumPoolLength) {
  let seed = randomWords(1)[0];
  const lookup = thesaurus.search(seed);
  let bank = [];
  let validationCriteria = element => !element.includes(" ") && !element.includes("-")

  if (lookup.antonyms.length < 1) {
    console.log(`Failed to find an antonym with the seed, ${seed}.  Trying again...`)
    return buildPool(minimumPoolLength);
  } else {
    bank = bank.concat(lookup.synonyms).filter(validationCriteria);
    const antonym = lookup.antonyms.sample();
    const antonymLookup = thesaurus.search(antonym);
    bank = bank.concat(antonymLookup.synonyms).filter(validationCriteria);
    if (bank.length >= minimumPoolLength) {
      return {targets: [
        {word: seed, definition: lookup.definition},
        {word: antonym, definition: antonymLookup.definition}
        ], bank: bank}
    } else {
      console.log(`Failed to find bank with the minimum pool of ${minimumPoolLength} for ${seed} and ${antonym}.  Trying again...`)
      return buildPool(minimumPoolLength);
    }
  }
}



// console.log(buildPool(50));

module.exports = buildPool;
