//TODO move them so they can dynamically change
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//TODO close the scope and use jquery
let obj = document.getElementById("movingDiv");
let changeValObj = document.getElementById("changeVal");
let changeSetObj = document.getElementById("changeSet");
let timeSetObj = document.getElementById("changeTime");
let soundSettingsObj = document.getElementById("soundSettings");
let colValObj = document.getElementById("colVal");
let backValObj = document.getElementById("backVal");
let body = document.getElementById("body");

//TODo Bool Toggles - remove and get stats off the objects
let sh = true;
let ss = true;
let setsDisp = true;
let timeDisp = true;
let sound = false;
let soundStatus = false;

//TODO Makes these into a JSON or ENUM
let dirSet = 0;
let reversedDirection;
let stepChange = 2;
let globTime = parseFloat(new Date().getTime() / 1000);
let ballPosition = parseInt(windowWidth / (windowWidth / 100)); //




//TODO make this a sleeker solution
let setCounter = 0;


function timeSetter() { //TODO put this in a EventHandler
    let autoSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>';
    let manualSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"/></svg>';
    timeDisp = !timeDisp;
    if (timeDisp == true) { //Manual
        timeSetObj.style.display = "block";
        timeSetObj.innerText = "30";
        document
            .getElementById("timeButton")
            .innerHTML = manualSVG;

    } else if (timeDisp == false) { // Auto
        timeSetObj.style.display = "none";
        timeSetObj.innerText = "10000000000000000000000000000000000000000000000";
        document
            .getElementById("timeButton")
            .innerHTML = autoSVG;
    }
}

function setSetter() { //TODO put this in a EventHandler
    setsDisp = !setsDisp;
    if (setsDisp == true) { //Manual
        changeSetObj.style.display = "block";
        changeSetObj.innerText = "2";
        document
            .getElementById("setButton")
            .innerHTML = manualSVG;
    } else if (setsDisp == false) { // Auto
        changeSetObj.style.display = "none";
        changeSetObj.innerText = "10000000000000000000000000000000000000000000000";
        document
            .getElementById("setButton")
            .innerHTML = autoSVG;
    }
}

function soundOn() { //TODO put this in a EventHandler
    let soundOnSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"/></svg>';
    let soundOffSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/></svg>';
    sound = !sound;
    soundStatus = !soundStatus;
    if (sound) { //on
        soundSettingsObj.style.display = "block";
        document
            .getElementById("soundButton")
            .innerHTML = soundOffSVG;
    } else if (!sound) { // off
        soundSettingsObj.style.display = "none";
        document
            .getElementById("soundButton")
            .innerHTML = soundOnSVG;
    }
}

function direction(content) { //TODO put this in a EventHandler
    if (content == 0) {
        dirSet = 0;

    } else if (content == 1) {
        dirSet = 1;

    } else if (content == 2) {
        dirSet = 2;

    }
}


function showHide() { //TODO put this in a EventHandler
    if (sh == true) {
        document
            .getElementById('settings')
            .style
            .display = 'none';
        sh = false;
        document
            .getElementById("visible")
            .style
            .display = "block";
        document
            .getElementById("notVisible")
            .style
            .display = "none";
    } else if (sh == false) {
        document
            .getElementById('settings')
            .style
            .display = '';
        document
            .getElementById("visible")
            .style
            .display = "none";
        document
            .getElementById("notVisible")
            .style
            .display = "block";
        sh = true;
        setCounter = 0;
    }
}

function stopStart() { //TODO put this in a EventHandler
    setCounter = 0;
    if (ss == true) { //stop
        ss = false;
        document
            .getElementById("stop")
            .style
            .display = "none";
        document
            .getElementById("play")
            .style
            .display = "block";

    } else if (ss == false) { // start
        ss = true;
        globTime = parseFloat(new Date().getTime() / 1000);
        document
            .getElementById("stop")
            .style
            .display = "block";
        document
            .getElementById("play")
            .style
            .display = "none";
    }
}

function ballSize(content) { //TODO put this in a EventHandler
    let out;
    if (content == 0) {
        out = 75;
    } else if (content == 1) {
        out = 100;
    } else if (content == 2) {
        out = 175;
    }
    obj.style.height = out + "px";
    obj.style.width = out + "px";
}

function buttonAction(content) { //Sets ball color
    //TODO put this in a EventHandler
    obj.style.backgroundColor = content;
}

function buttonBakground(content) { //TODO put this in a EventHandler
    body.style.backgroundColor = content;
}


// Good-ish code


/**
 * Function to generate beep tones
 * @param {Number} panVal value for either left or right channel
 * @returns None
 */
function beep(panVal) {
    // create the audio context
    let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

    // audio disabled?
    if (!soundStatus) {
        return;
    }
    // create the things ballPossition am using to manipulate the beeps
    let oscillator = audioCtx.createOscillator();
    let panNode = audioCtx.createStereoPanner();

    //set manipulations and stuff to make to sound wave
    panNode.pan.value = panVal;
    oscillator.frequency.value = $("#fIn").text()
    oscillator.type = $("#tIn").text()

    // add in the bits to the audio
    oscillator.connect(panNode);
    panNode.connect(audioCtx.destination);

    // make it work
    oscillator.start();
    let num = 1000 - (Number(changeValObj.innerText) * 300)
    if (num <= 40) {
        num = 100;
    }
    setTimeout(function() {
        oscillator.stop();
    }, num);
};


// Run when the program first loads
window.onload = function() {
    //TODO move the SVG setup by using jquery
    timeSetObj.style.display = "block";
    document
        .getElementById("timeButton")
        .innerHTML = manualSVG;

    changeSetObj.style.display = "block";
    document
        .getElementById("setButton")
        .innerHTML = manualSVG;
    soundSettingsObj.style.display = "none";
    document
        .getElementById("soundButton")
        .innerHTML = soundOnSVG;

    let diagAngle = Math.atan(windowHeight / windowWidth);
    let diagLen = Math.sqrt(windowWidth ** 2 + windowHeight ** 2);
    setInterval(function() {
        let inptTime = parseInt(timeSetObj.innerText);
        let settime = inptTime + globTime;
        // diag angle calculation
        if (ss == true && settime >= parseFloat(new Date().getTime() / 1000)) {
            stepChange = Number(changeValObj.innerText);
            if (dirSet == 0) {
                let r = parseInt(windowWidth / (windowWidth / 100));
                if (ballPosition >= windowWidth - r) {
                    reversedDirection = false;
                    beep(-1);
                } else if (ballPosition <= r) {
                    beep(1);
                    reversedDirection = true;
                    setCounter++;
                    if (setCounter >= Number(changeSetObj.innerText)) {
                        ss = false;
                        setCounter = 0;
                    }

                }
                obj
                    .style
                    .removeProperty('right');
                obj
                    .style
                    .removeProperty('left');
                obj
                    .style
                    .removeProperty('top');
                obj.style.right = ballPosition + "px";
                t = windowHeight / 2;
                obj.style.top = t + "px";

            } else if (dirSet == 1) {
                size = obj.offsetWidth * 2.2;
                if (ballPosition >= diagLen - size) {
                    reversedDirection = false;
                    beep(-1);
                } else if (ballPosition <= 50) {
                    reversedDirection = true;
                    setCounter++;
                    beep(1);
                    if (setCounter >= Number(changeSetObj.innerText)) {
                        ss = false;
                        setCounter = 0;

                    }
                }
                obj
                    .style
                    .removeProperty('right');
                obj
                    .style
                    .removeProperty('left');
                obj
                    .style
                    .removeProperty('top');

                sined = Math.sin(diagAngle) * ballPosition;
                cosed = Math.cos(diagAngle) * ballPosition;
                obj.style.left = cosed + "px";
                obj.style.top = sined + "px";

            } else if (dirSet == 2) {

                size = obj.offsetWidth * 2.2;
                if (ballPosition >= diagLen - size) {
                    reversedDirection = false;
                    beep(-1);
                } else if (ballPosition <= 50) {
                    reversedDirection = true;
                    setCounter++;
                    beep(1);
                    if (setCounter >= Number(changeSetObj.innerText)) {
                        ss = false;
                        setCounter = 0;

                    }
                }
                obj
                    .style
                    .removeProperty('right');
                obj
                    .style
                    .removeProperty('left');
                obj
                    .style
                    .removeProperty('top');

                sined = Math.sin(diagAngle) * ballPosition;
                cosed = Math.cos(diagAngle) * ballPosition;
                obj.style.right = cosed + "px";
                obj.style.top = sined + "px";

            }
            if (reversedDirection == true) {
                ballPosition = ballPosition + stepChange;
            } else if (reversedDirection == false) {
                ballPosition = ballPosition - stepChange;
            }
        } else {
            document
                .getElementById("stop")
                .style
                .display = "none";
            document
                .getElementById("play")
                .style
                .display = "block";
        }
    }, stepChange);
}