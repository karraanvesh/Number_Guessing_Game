const readline = require("readline/promises");
const {stdin : input , stdout : output } = require("process")

async function validateGuessedNumber() {
    const rl = readline.createInterface(
       input , output
    );

    let allowedAttempts;

    let reply = await rl.question('Enter your choice: ');

    reply = Number(reply);

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

    let result = 87;

    while(true) {

        try {
            // Wait for user input
            let answer = await rl.question('Enter your guess: ');

            answer = Number(answer);

            if(allowedAttempts == 1) {

                console.log(`Apologies , you have used all the ${temp} attempts to guess the number`);
                rl.close();
                break;
            }

            if (answer == result) {
                const usedAttempts = temp - allowedAttempts + 1;
                console.log(`Congratulations! You guessed the correct number in ${usedAttempts} attempts.`);

                rl.close();
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

console.log(`Welcome to the Number Guessing Game!

I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`);

validateGuessedNumber();