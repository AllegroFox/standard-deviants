const datamuse = require('datamuse');
const randomWords = require('random-words');
// const thesaurus = require('thesaurus-com');

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

// let input = process.argv[2];
let input = randomWords(1)[0];
const getAnswerPool = (input, minimumPool) => {
  datamuse.request(`words?rel_rhy=${input}&max=1000&md=r&ipa=1`)
  .then((results) => {
  if (results.length >= minimumPool) {
    console.log(`... Found ${results.length} rhymes for ${input}.`);
    console.log(results);
    return JSON.stringify(results);
  } else {
    console.log(`Only found ${results.length} rhymes for ${input}.  Retrying...`)
    getAnswerPool(randomWords(1)[0], minimumPool);
  }

})};

getAnswerPool(input, 100);

// prompt(`What is a synonym for ${target}?  (We've found ${wordBank.length} of them...)  `)
//   .then((answer) => {
//     if (wordBank.includes(answer.toLowerCase())) {
//       console.log(`Yep, it's in there!`);
//     }
//     else {
//       console.log(`Nope.  What're you on?`);
//     }
//   });
