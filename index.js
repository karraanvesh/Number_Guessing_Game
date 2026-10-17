/**
 *  The node:readline module is a built-in Node.js utility that lets you read data from a Readable stream
 *  (like standard terminal input or a file) one line at a time. It is most commonly used to build interactive
 *  Command Line Interfaces (CLIs), create command prompts, or process large text files line-by-line without
 *  loading the entire file into memory.
 */
const readline = require("readline/promises");

// Defining from where we read input from and write output to.
// In this case, stdin (standard input) is the keyboard,
// and stdout (standard output) is the monitor/console.
const {stdin : input , stdout : output } = require("process")

/**
 * This function uses Math.random() to generate and return
 * a random number between 1 and 100 (inclusive).
 */
function getRandom() {
    return Math.floor(Math.random() * 100) + 1;
}

async function validateGuessedNumber() {

    /**
     * creating a readline interface 
     */
    const rl = readline.createInterface(
       input , output
    );

    let allowedAttempts;

    // Prompting the user to select the difficulty level of the game.
    let reply = await rl.question('Enter your choice: ');

    // By default, CLI inputs are strings, so we are converting them to numbers.
    reply = Number(reply);

    // Defining the number of allowed attempts based on the selected difficulty level.
    if(reply == 1) {
        allowedAttempts = 10;
        console.log(`Great! You have selected the Easy difficulty level.`);
    } else if(reply == 2) {
        allowedAttempts = 5;
        console.log(`Great! You have selected the Medium difficulty level.`);
    } else {
        allowedAttempts = 3;
        console.log(`Great! You have selected the Hard difficulty level.`);
    }

    console.log(`Let's start the game`);
    const temp = allowedAttempts;

    let result = getRandom(); // calling the getRandom()

    while(true) {

        try {
            // Wait for user input
            let answer = await rl.question('Enter your guess: ');

            answer = Number(answer);

            // Checking whether the user has run out of attempts.
            // If so, displaying a friendly message informing them that
            // they have exhausted all their attempts.
            if(allowedAttempts == 1) {

                console.log(`Apologies , you have used all the ${temp} attempts to guess the number`);
                rl.close();
                break;
            }

            // Comparing the user's input with the randomly generated number.
            // If they match, displaying a success message; otherwise,
            // providing a hint indicating whether the guess is too low or too high.

            if (answer == result) {
                const usedAttempts = temp - allowedAttempts + 1;
                console.log(`Congratulations! You guessed the correct number in ${usedAttempts} attempts.`);

                rl.close(); // closing the readline interface
                break; 
            } else if(answer < result) {
                console.log(`Incorrect! The number is greater than ${answer}.`);
            } else {
                console.log(`Incorrect! The number is less than ${answer}.`);
            }

            allowedAttempts--;
        } catch(error) {
            console.log(error);
        }
    }
}


// displaying the instructions of the game
console.log(`Welcome to the Number Guessing Game!

I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`);

validateGuessedNumber();