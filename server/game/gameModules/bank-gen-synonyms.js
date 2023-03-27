const datamuse = require('datamuse');
// const thesaurus = require('./thesaurus-scraper');  // Obsolete, alas.
const randomWords = require('random-words');


// ############ Here begins the code ###############

const thesaurusSearch = async function(seed) {
  const rawSynonyms = await datamuse.request(
    `words?rel_syn=${seed}&max=200`
  );

  return rawSynonyms.map((hit) => {
    return hit['word'];
  }).filter((word) => {
    return !(word.includes(' ')) && !(word.includes('-')) && !(word.match(/\d/))
  });
}

const buildPool = async function(minimumPoolLength) {
  const seeds = randomWords(2);

  const banks = await Promise.all(
    seeds.map(async (seed, index) => {
      const synonyms = await thesaurusSearch(seed)

      return synonyms.map((word) => {
        return { answer: word, seed: index }
      })
    })
  );

  const bank = banks.flat();

  if (bank.length < minimumPoolLength) { return buildPool(minimumPoolLength); }

  return {
    targets: [
      { word: seeds[0], definition: `(${banks[0].length} Answers)` },
      { word: seeds[1], definition: `(${banks[1].length} Answers)` },
    ],
    bank: bank
  }
}

module.exports = buildPool;
