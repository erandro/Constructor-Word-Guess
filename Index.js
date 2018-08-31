var inquirer = require("inquirer");
var word = require("./Word.js");

var posible_words = ["one", "five", "seven", "twenty two", "eighty four"];
var used_words = [];
var userLetter = undefined;
var chosenWord = undefined;
var currentWord = undefined;
runGame();

function pickRandomWord() {
    chosenWord = posible_words[Math.floor(Math.random() * posible_words.length)];
    if (posible_words.length === used_words.length) {
        console.log("I'm out of words - Thanks for playing");
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
    addsSpaceToTheWord();
    gmaeLoop();
};
function gmaeLoop() {
    showUserTheWord(currentWord)
    takeUserLetter();
    //gmaeLoop();
};
function takeUserLetter() {
    inquirer.prompt([
        {
            type: "input",
            name: "letter",
            message: "Guess a letter!",
            validate: function (input) {
                var done = this.async();
                setTimeout(function () {
                    if (input.length !== 1) {
                        done('You need to provide a letter');
                        return;
                    }
                    done(null, true);
                }, 100);
            }
        }]).then(function (userInput) {
            userLetter = userInput.letter.toLowerCase();
            checkGuess(currentWord, userLetter);
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
function addsSpaceToTheWord() {
    checkGuess(currentWord, " ");
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
        console.log("boom!");
        //chosenWord = undefined;
        //currentWord = undefined;
        runGame()
    } else {
        gmaeLoop();
    };
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