function prompt(question) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;

    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}

// const user = {};

// prompt("What's your name? ")
//   .then((name) => {
//     console.log(`User's name is ${name}`);
//     user.name = name;
//     return prompt("What's your age? ");
//   })

// Collect a pool of correct answers
// Prompt the user
// Check the user's answer against the pool