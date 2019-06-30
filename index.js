
class Button {
    constructor(colorName, soundFile, value) {
        this.colorName = colorName,
            this.soundFile = soundFile,
            this.value = value
    }

    play() {
        this.playSound();
        this.playAnimation();
    }

    playSound() {
        var audio = new Audio(this.soundFile);
        audio.play();
        this.playAnimation();
    }
    playAnimation() {
        var color = this.colorName;
        $('#' + color).addClass('pressed');
        setTimeout(function () {
            $('#' + color).removeClass("pressed")
        }, 100);
    }
}

// variable initialization
var btnRed, btnBlue, btnGreen, btnYellow, soundPath, randomNumber, clickCount, hits, score;
var randomNumberArray = [];
var userArray = [];

// variable assignation
soundPath = 'sounds/';

btnGreen = new Button('green', soundPath + 'green.mp3', 1);
btnRed = new Button('red', soundPath + 'red.mp3', 2);
btnYellow = new Button('yellow', soundPath + 'yellow.mp3', 3);
btnBlue = new Button('blue', soundPath + 'blue.mp3', 4);

// start the game
function newGame() {
    $('#level-title').css('color', '#FEF2BF').text('Press A Key to Start');
    score = 0;
    $('#score').text(score);
    hits = 0;
    clickCount = 0;
    randomNumberArray = [];
    userArray = [];
    newTurn();
}


function newTurn() {
    hits = 0;
    clickCount = 0;
    userArray = [];
    // add current turn number to the array
    randomNumberArray.push(_randomNumber());

    var i = 0, howManyTimes = randomNumberArray.length;
    function selectColor() {
        switch (randomNumberArray[i]) {
            case 1:
                btnGreen.play();
                break;
            case 2:
                btnRed.play();
                break;
            case 3:
                btnYellow.play();
                break;
            case 4:
                btnBlue.play();
                break;
            default:
                break;
        }
        i++;
        if (i < howManyTimes) {
            setTimeout(selectColor, 500);
        }
    }

    selectColor();

}

//every time the user click a button, compare the array with the user click value
function checkResult() {

    if (userArray[clickCount] === randomNumberArray[clickCount]) {
        hits++;
        if (hits === randomNumberArray.length) {
            score++;
            $('#score').text(score);
            setTimeout(newTurn, 1500);
        } else {
            clickCount++;
        }
    } else {
        $('#level-title').text('You lose!').css('color', 'red');
    }
}

//generate a random number
function _randomNumber() {
    return Math.floor(Math.random() * 4 + 1); //random number betweeen 1 and 4;
}

//if the user press the key a, start the game
$(document).on('keydown', function (e) {
    if (e.key == 'a') {
        newGame();
    }
})

$('#red').on('click', function () {
    btnRed.play();
    userArray.push(btnRed.value);
    checkResult();
})

$('#blue').on('click', function () {
    btnBlue.play();
    userArray.push(btnBlue.value);
    checkResult();
})

$('#green').on('click', function () {
    btnGreen.play();
    userArray.push(btnGreen.value);
    checkResult();
})

$('#yellow').on('click', function () {
    btnYellow.play();
    userArray.push(btnYellow.value);
    checkResult();
})

