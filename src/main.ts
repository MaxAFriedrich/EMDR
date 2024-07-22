import {UI} from "./ui";

const BallState = {
    dirSet: 0,
    stepChange: 2,
    globTime: parseFloat((new Date().getTime() / 1000).toString()),
    ballPosition: UI.window.width() / (UI.window.width() / 100),
    setCounter: 0,
    firstFailure: true
};


let oppositeDirection = false;

/**
 * Function to generate beep tones
 * @param {Number} panVal value for either left or right channel
 * @returns None
 */

//create audio context a single time
const audioCtx = new window.AudioContext();

function beep(panVal: number) {
    // audio disabled?
    if (!UI.soundSettings.data("bool")) {
        return;
    }

    // create the things ball.ballPosition am using to manipulate the beeps
    const oscillator = audioCtx.createOscillator();
    const panNode = audioCtx.createStereoPanner();

    //set manipulations and stuff to make to sound wave
    panNode.pan.value = panVal;
    oscillator.frequency.value = UI.fIn.int();
    oscillator.type = UI.tIn.text() as OscillatorType;

    // add in the bits to the audio
    oscillator.connect(panNode);
    panNode.connect(audioCtx.destination);

    // make it work
    oscillator.start();
    let num = 1000 - (UI.changeVal.int() * 300);
    if (num <= 40) {
        num = 100;
    }
    setTimeout(function () {
        oscillator.stop();
    }, num);
}

/**
 * moves the ball horizontally; ball.dirSet=0
 */
function horizontalDirection() {
    UI.ball.css("right", (BallState.ballPosition + "px"));
    UI.ball.css("top", ((UI.window.height() / 2) + "px"));
    UI.ball.css("left", "");
}

/**
 * moves the ball diagonally from left to right; ball.dirSet=1
 */
function leftToRight() {
    const diagAngle = Math.atan(UI.window.height() / UI.window.width());
    const sineAns = Math.sin(diagAngle) * BallState.ballPosition;
    const cosAns = Math.cos(diagAngle) * BallState.ballPosition;
    UI.ball.css("right", "");
    UI.ball.css("top", (sineAns + "px"));
    UI.ball.css("left", (cosAns + "px"));
}

/**
 * moves the ball diagonally from right to left; ball.dirSet=2
 */
function rightToLeft() {
    const diagAngle = Math.atan(UI.window.height() / UI.window.width());
    const sineAns = Math.sin(diagAngle) * BallState.ballPosition;
    const cosAns = Math.cos(diagAngle) * BallState.ballPosition;
    UI.ball.css("left", "");
    UI.ball.css("top", (sineAns + "px"));
    UI.ball.css("right", (cosAns + "px"));
}

function updateBallPosition() {
    const maxPosition = calculateMaxPosition();
    updateDirectionIfNeeded(maxPosition);
    moveBall();
    updateUIAfterMovement();
}

function calculateMaxPosition(): number {
    if (BallState.dirSet != 0) {
        const bigBall = UI.ball.width() * 2;
        return Math.hypot(UI.window.width() - bigBall, UI.window.height() - bigBall);
    } else {
        return UI.window.width() - UI.ball.width();
    }
}

function updateDirectionIfNeeded(maxPosition: number) {
    if (BallState.ballPosition >= maxPosition && !oppositeDirection) {
        oppositeDirection = true;
        BallState.setCounter++;
        beepBasedOnDirection(1);
    } else if (BallState.ballPosition <= 0 && oppositeDirection) {
        oppositeDirection = false;
        beepBasedOnDirection(-1);
    }
}

function beepBasedOnDirection(direction: number) {
    if (BallState.dirSet == 1) {
        beep(direction * -1);
    } else {
        beep(direction);
    }
}

function moveBall() {
    if (oppositeDirection) {
        BallState.ballPosition -= BallState.stepChange;
    } else {
        BallState.ballPosition += BallState.stepChange;
    }
}

function updateUIAfterMovement() {
    switch (BallState.dirSet) {
        case 0:
            horizontalDirection();
            break;
        case 1:
            leftToRight();
            break;
        case 2:
            rightToLeft();
            break;
    }
}

function checkConditions(): boolean {
    const setTime = UI.changeTime.int() + BallState.globTime;
    const setTemp = !UI.changeSet.data("bool") || UI.changeSet.int() > BallState.setCounter;
    const timeTemp = !UI.changeTime.data("bool") || setTime >= parseFloat((new Date().getTime() / 1000).toString());
    return UI.stop.data("bool") && setTemp && timeTemp;
}

function main() {
    setInterval(() => {
        if (checkConditions()) {
            BallState.stepChange = UI.changeVal.int();
            updateBallPosition();
        } else {
            UI.play.hide();
            UI.stop.show();
            BallState.firstFailure = false;
            UI.stop.data("bool", false);
        }
    }, BallState.stepChange);
}

main();

