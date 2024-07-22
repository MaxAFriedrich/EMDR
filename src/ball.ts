import {UI} from "./ui";
import {beep} from "./audio";

export enum BallDirection {
    horizontal,
    leftToRight,
    rightToLeft
}

export const BallState = {
    dirSet: BallDirection.horizontal,
    stepChange: 2,
    globTime: parseFloat((new Date().getTime() / 1000).toString()),
    ballPosition: UI.window.width() / (UI.window.width() / 100),
    setCounter: 0,
    firstFailure: true,
    isPlaying: true
};


let oppositeDirection = false;

/**
 * moves the ball horizontally; ball.dirSet=0
 */
function horizontalDirection() {
    UI.ball.css("right", `${BallState.ballPosition}px`);
    UI.ball.css("top", `${UI.window.height() / 2}px`);
    UI.ball.css("left", "unset");
}

/**
 * moves the ball diagonally from left to right; ball.dirSet=1
 */
function leftToRight() {
    const diagAngle = Math.atan(UI.window.height() / UI.window.width());
    const sineAns = Math.sin(diagAngle) * BallState.ballPosition;
    const cosAns = Math.cos(diagAngle) * BallState.ballPosition;
    UI.ball.css("right", "unset");
    UI.ball.css("top", `${sineAns}px`);
    UI.ball.css("left", `${cosAns}px`);
}

/**
 * moves the ball diagonally from right to left; ball.dirSet=2
 */
function rightToLeft() {
    const diagAngle = Math.atan(UI.window.height() / UI.window.width());
    const sineAns = Math.sin(diagAngle) * BallState.ballPosition;
    const cosAns = Math.cos(diagAngle) * BallState.ballPosition;
    UI.ball.css("left", "unset");
    UI.ball.css("top", `${sineAns}px`);
    UI.ball.css("right", `${cosAns}px`);
}

function updateBallPosition() {
    const maxPosition = calculateMaxPosition();
    updateDirectionIfNeeded(maxPosition);
    moveBall();
    updateUIAfterMovement();
}

function calculateMaxPosition(): number {
    if (BallState.dirSet != BallDirection.horizontal){
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
        beepBasedOnDirection(-1);
    } else if (BallState.ballPosition <= 0 && oppositeDirection) {
        oppositeDirection = false;
        beepBasedOnDirection(1);
    }
}

function beepBasedOnDirection(direction: number) {
    if (BallState.dirSet === BallDirection.leftToRight) {
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
        case BallDirection.horizontal:
            horizontalDirection();
            break;
        case BallDirection.leftToRight:
            leftToRight();
            break;
        case BallDirection.rightToLeft:
            rightToLeft();
            break;
    }
}

function checkConditions(): boolean {
    const setTime = UI.changeTime.int() + BallState.globTime;
    const setTemp = !UI.changeSet.state || UI.changeSet.int() > BallState.setCounter;
    const timeTemp = !UI.changeTime.state || setTime >= parseFloat((new Date().getTime() / 1000).toString());
    return BallState.isPlaying && setTemp && timeTemp;
}

export function startBallInterval() {
    setInterval(() => {
        if (checkConditions()) {
            BallState.stepChange = UI.changeVal.float();
            updateBallPosition();
        } else {
            UI.play.show();
            UI.stop.hide();
            BallState.firstFailure = false;
            BallState.isPlaying = false;
        }
    }, BallState.stepChange);
}
