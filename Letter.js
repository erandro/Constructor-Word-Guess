function Letter(value) {
    this.value = value;
    this.beenGuesed = false;
    this.checkLetter = function (checkedLetter) {
        if (checkedLetter === value) {
            this.beenGuesed = true;
        };
    };
    this.showLetter = function () {
        if (this.beenGuesed) {
            return value;
        } else {
            return "_";
        };
    };
};

module.exports = {
    Letter
};