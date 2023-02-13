const datamuse = require('datamuse');
const thesaurus = require('./thesaurus-scraper');
const randomWords = require('random-words');
// ############ Here begins the code ###############

// let target = process.argv[2];

// Adds random sampling functionality to all arrays
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

// Gets a rhyming answer pool for the seed and returns a bank of answer-building objects, each stamped with a seed step number.
async function getAnswerPool (seed, step) {
  const bank = datamuse.request(`words?rel_rhy=${seed}&max=1000`)
    .then((results) => {
      const filteredPool = results.reduce((acc, next) => {
        if (!next.word.includes(" ")) {
          const answer = {
            answer: next.word,
            numSyllables: next.numSyllables,
            seed: step
          };
          return acc.concat(answer);
        } else {
          return acc;
        }
      }, []);
      // console.log(filteredPool);
      return filteredPool;
    })
  return bank;
};

function getPronunciation (word) {
  const pronunciation = datamuse.request(`words?sp=${word}&qe=sp&md=r&ipa=1&max=1`)
    .then((results) => {
      // return results.tags;
      return `Pronounced: ${results[0].tags[2].slice(9)}`;
    })
  return pronunciation;
}

// Builds the final answer-pool building object with both seeds and their pools.
async function buildPool (halfMinimumPoolLength) {
  let finalPool = {};
  finalPool.targets = [];
  let seed = randomWords(1)[0];
  let firstPool = await getAnswerPool(seed, 0);
  // console.log("First Pool:")
  // console.log(firstPool);

  while (firstPool.length < halfMinimumPoolLength) {
    console.log(`Failed to find a large enough rhyme pool with seed, ${seed}.  Trying again...`)
    seed = randomWords(1)[0];
    firstPool = await getAnswerPool(seed, 0);
  }

  let pronunciation = await getPronunciation(seed);
  finalPool.targets.push({ word: seed, definition: pronunciation });
  finalPool.bank = firstPool;

  seed = randomWords(1)[0];
  let secondPool = await getAnswerPool(seed, 1);

  while (secondPool.length < halfMinimumPoolLength) {
    console.log(`Failed to find a large enough rhyme pool with seed, ${seed}.  Trying again...`)
    seed = randomWords(1)[0];
    secondPool = await getAnswerPool(seed, 1);
  }

  pronunciation = await getPronunciation(seed);
  finalPool.targets.push({ word: seed, definition: pronunciation });
  // finalPool.bank += secondPool;
  finalPool.bank = finalPool.bank.concat(secondPool);


  return finalPool;

}

async function tryIt () {
  const bob = await buildPool(100);
  // const bob = await getPronunciation("giraffe");
  console.log(`Bank's length = ${bob.bank.length}`);
  console.log(bob);
}
// tryIt();
// getPronunciation();



module.exports = buildPool;
