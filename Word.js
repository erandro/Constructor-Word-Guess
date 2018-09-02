var letter = require(`./Letter.js`);

function addsTheLettersToTheWord(theWord, theLetters) {
    var allLettersOfTheWord = [];
    characterOfWord = theWord.split("");
    characterOfWord.forEach(element => {
        var aCharacter = new letter.Letter(element);
        allLettersOfTheWord.push(aCharacter);
    });
    theLetters.letters = allLettersOfTheWord;
};

function Word(theWord) {
    this.word = theWord;
};

module.exports = {
    Word,
    addsTheLettersToTheWord
};