debugger;
var inquirer = require("inquirer");
var colors = require('colors');
var word = require("./Word.js");

var used_words = [];
var used_letters = [];
var guesses_left = 9;
var userLetter = undefined;
var chosenWord = undefined;
var currentWord = undefined;


function pickRandomWord() {
    var posible_words = ["the bridge on the river kwai", "a fistful of dollars", "spartacus", "fantasia", "the birds", "mary poppins", "strangers on a train", "the gold rush", "it's a wonderful life", "the good the bad and the ugly", "gone with the wind", "touch of evil", "frankenstein", "dr. strangelove or how i learned to stop worrying and love the bomb", "vertigo", "lawrence of arabia", "twelve angry men", "seven samurai", "the philadelphia story", "the bride of frankenstein", "king kong", "north by northwest", "a hard day's night", "psycho", "casablanca", "singin' in the rain", "it happened one night", "modern times", "all about eve", "citizen kane", "the wizard of oz"];
    chosenWord = posible_words[Math.floor(Math.random() * posible_words.length)];
    if (posible_words.length === used_words.length) {
        console.log("I'm out of words - Thanks for playing".rainbow);
        catPrintForEndingGame();
    } else if (used_words.indexOf(chosenWord) === -1) {
        used_words.push(chosenWord);
    } else {
        pickRandomWord();
    };
}

function runGame() {
    pickRandomWord();
    currentWord = new word.Word(chosenWord);
    word.addsTheLettersToTheWord(chosenWord, currentWord);
    addsSpaceAndApostropheToTheWord();
    gameLoop();
};

function gameLoop() {
    showUserTheWord(currentWord)
    takeUserLetter();
};

function takeUserLetter() {
    inquirer.prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a letter!",
            validate: function (input) {
                if (input.length === 1 && isNaN(input)) {
                    return true;
                }
                return false;
            }
        }]).then(function (userInput) {
            userLetter = userInput.letter.toLowerCase();
            checkGuess(currentWord, userLetter);
            checkGuessMessege(currentWord, userLetter);
            checkIfAllLettersWereGuessed(currentWord);
        });
};

function showUserTheWord(word) {
    var showWordLetters = [];
    word.letters.forEach(element => {
        showWordLetters.push(element.showLetter());
    });
    var showWord = showWordLetters.join(" ");
    console.log(showWord);
};

function checkGuess(word, letter) {
    word.letters.forEach(element => {
        element.checkLetter(letter);
    });
};

function checkGuessMessege(word, letter) {
    if (used_letters.indexOf(letter) === -1) {
        used_letters.push(letter);
        if (word.word.split("").indexOf(letter) === -1) {
            guesses_left--;
            if (guesses_left !== 0) {
                console.log("Nop".red);
                console.log("You have ".red + guesses_left + " more guesses\n");
            };
        } else {
            console.log("Yasss!\n".green);
        };
    } else {
        console.log("This letter was already used you dumbass\n".yellow);
    };
}

function addsSpaceAndApostropheToTheWord() {
    checkGuess(currentWord, " ");
    checkGuess(currentWord, "'");
};

function checkIfAllLettersWereGuessed(word) {
    var rightLettersInWord = 0;
    word.letters.forEach(element => {
        if (element.beenGuesed) {
            rightLettersInWord++;
        }
    });
    if (rightLettersInWord === word.letters.length) {
        showUserTheWord(currentWord)
        used_letters = [];
        guesses_left = 9;
        console.log("You got it dude!\n");
        runGame()
    } else if (guesses_left === 0) {
        used_letters = [];
        guesses_left = 9;
        checkIfUserUsedAllGuesses()
        runGame();
    } else {
        gameLoop();
    };
};

function checkIfUserUsedAllGuesses() {
    console.log("Oh snap... You lost this round");
    console.log("The word was '" + currentWord.word + "' by the way...\n");
};

function catPrintForEndingGame() {
    console.log(`
☆    ☆  ☆
┈┈┈┈ ╭━━━━━━╮  ☆
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏
┈┈ ╰━┫╳╳╳▕▏╰┻╯▏
☆ ┈┈┈┃╳╳╳╳╲▂▂╱
   ☆ ╰┳┳━━┳┳╯   ☆
   `);
};

runGame();