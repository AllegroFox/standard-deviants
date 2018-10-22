// const datamuse = require('datamuse');
const thesaurus = require('./thesaurus-scraper');
const randomWords = require('random-words');

function prompt(question) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;

    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}


// ############ Here begins the code ###############

// let target = process.argv[2];

// Adds random sampling functionality to all arrays
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

/*

Get synonyms/antonyms for seed
  if antonyms < 1
    get new seed
  else
    add synonyms to bank
    get random antonym x from seed
    add synonyms from x
    if bank >= minimum value
      return bank, seed, antonym
    else
      start over
*/

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

console.log(buildPool(80));

/*
}



const buildPool = function (seed, minimumAnswerPool) {
  let wordBankFinal = [];
  let targetOne = seed;
  let targetTwo = "";
  let wordBankOne = thesaurus.search(targetOne);

  while (wordBankFinal.length < minimumAnswerPool) {

    let wordBankFinal = wordBankOne.synonyms;

    if (wordBankOne.antonyms.length > 0) {
      targetTwo = wordBankOne.antonyms.sample();
      let wordBankTwo = thesaurus.search(targetTwo);

      wordBankTwo.synonyms.forEach((synonym) => {
        wordBankFinal.push(synonym);
      });
    } else {
      return `There aren't any antonyms for the seed, "${seed}".`;
    }
  }

  return {
    targets: [targetOne[0], targetTwo],
    bank: wordBankFinal
  }
}

console.log(buildPool(randomWords(1), 30));

// let wordBankOne = thesaurus.search(target).synonyms;
// console.log(wordBankOne);

// prompt(`What is a synonym for ${target}?  (We've found ${wordBankOne.synonyms.length} of them...)  `)
//   .then((answer) => {
//     if (wordBankOne.synonyms.includes(answer.toLowerCase())) {
//       console.log(`Yep, it's in there!`);
//     }
//     else {
//       console.log(`Nope.  What're you on?`);
//     }
//   });


// Collect a pool of correct answers
// Prompt the user
// Check the user's answer against the pool

*/