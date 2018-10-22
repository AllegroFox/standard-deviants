const datamuse = require('datamuse');
const thesaurus = require('thesaurus-com');

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

let input = process.argv[2];
const getAnswerPool = (input) => {
  datamuse.request(`/words?rel_rhy=${input}`)
  .then((json) => {
  console.log(json);
  console.log(`... Found ${json.length} answers.`);
})};

getAnswerPool(input);

// prompt(`What is a synonym for ${target}?  (We've found ${wordBank.length} of them...)  `)
//   .then((answer) => {
//     if (wordBank.includes(answer.toLowerCase())) {
//       console.log(`Yep, it's in there!`);
//     }
//     else {
//       console.log(`Nope.  What're you on?`);
//     }
//   });