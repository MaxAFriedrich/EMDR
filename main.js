//TODO Makes these into a JSON or ENUM
let dirSet = 0;
let reversedDirection;
let stepChange = 2;
let globTime = parseFloat(new Date().getTime() / 1000);
let ballPosition = parseInt($(window).width() / ($(window).width() / 100)); //
let setCounter = 0;
let firstFailure = true;


/**
 * Function to generate beep tones
 * @param {Number} panVal value for either left or right channel
 * @returns None
 */
function beep(panVal) {
    // audio disabled?
    if ($("#soundSettings").is(":hidden")) {
        return;
    }
    // create the audio context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // create the things ballPossition am using to manipulate the beeps
    let oscillator = audioCtx.createOscillator();
    let panNode = audioCtx.createStereoPanner();

    //set manipulations and stuff to make to sound wave
    panNode.pan.value = panVal;
    oscillator.frequency.value = $("#fIn").text();
    oscillator.type = $("#tIn").val();

    // add in the bits to the audio
    oscillator.connect(panNode);
    panNode.connect(audioCtx.destination);

    // make it work
    oscillator.start();
    let num = 1000 - (Number($("#changeVal").text()) * 300);
    if (num <= 40) {
        num = 100;
    }
    setTimeout(function () {
        oscillator.stop();
    }, num);
};

/**
 * Builds the ui on load
 */
function uiBuilder() {
    // Add movingDiv
    $("body").append("<div id='movingDiv'></div>");
    // Add uiWrapper
    const uiWrapper = document.createElement("div");
    uiWrapper.id = "UI";
    // Add mainSettingsWrapper
    const mainSettingsWrapper = document.createElement("div");
    mainSettingsWrapper.className = "mainSettingsWrapper";
    //Create the main buttons
    const showHideButton = document.createElement("button");
    showHideButton.className = "mainToggles";
    showHideButton.id = "showHide";
    $(showHideButton).append("<svg id='visible' style='display:none;' xmlns='http://www.w3.org/2000/svg' height='24px' viewbox='0 0 24 24'width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none' /><path d='M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z' /></svg><svg id='notVisible' style='display:block;' xmlns='http://www.w3.org/2000/svg' height='24px'viewbox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z' fill='none' /><path d='M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z' /></svg>");
    showHideButton.addEventListener("click", function () {
        $("#settings").toggle();
        $("#visible").toggle();
        $("#notVisible").toggle();
        //? used to fire when box hidden
        ////setCounter = 0;
    });
    $(mainSettingsWrapper).append(showHideButton);
    const stopStartButton = document.createElement("button");
    stopStartButton.className = "mainToggles";
    stopStartButton.id = "stopStart";
    $(stopStartButton).append("<svg id='play' style='display:none;' xmlns='http://www.w3.org/2000/svg' height='24px' viewbox='0 0 24 24'width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none' /><path d='M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z' /></svg><svg id='stop' style='display:block;' xmlns='http://www.w3.org/2000/svg' height='24px' viewbox='0 0 24 24'width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none' /><path d='M16 8v8H8V8h8m2-2H6v12h12V6z' /></svg>");
    stopStartButton.addEventListener("click", function () {
        setCounter = 0;
        globTime = parseFloat(new Date().getTime() / 1000);
        $("#stop").toggle();
        $("#play").toggle();
        firstFailure = !firstFailure;

    });
    $(mainSettingsWrapper).append(stopStartButton);
    // Add main hidable settings ui
    const hidableSettings = document.createElement("div");
    hidableSettings.id = "settings";
    const inpWrapper = document.createElement("div");
    //speed
    inpWrapper.className = "inpWrapper";
    $(inpWrapper).append("<div class='inpItem'><div class='label'>Speed</div><div contenteditable='True' class='inptDiv' id='changeVal'>2</div></div>");
    //sets
    const setDiv = document.createElement("div");
    setDiv.className = "inpItem";
    const setToggle = document.createElement("div");
    setToggle.className = "label";
    setToggle.style = "display: flex; align-items: center;";
    $(setToggle).append("Sets");
    const setButton = document.createElement("button");
    setButton.id = "setButton";
    setButton.style.margin = "0";
    $(setButton).append("<svg style='display:none;' id='autoSet' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z'/></svg><svg id='manualSet' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z'/></svg>");
    setButton.addEventListener("click", function () {
        $("#changeSet").toggle();
        $("#manualSet").toggle();
        $("#autoSet").toggle();
        if ($("#changeSet").text() == "10000000000000000000000000000000000000000000000") { //Manual
            $("#changeSet").text("2");

        } else { // Auto
            $("#changeSet").text("10000000000000000000000000000000000000000000000");
        }
    });
    $(setToggle).append(setButton);
    $(setDiv).append(setToggle);
    $(setDiv).append("<div contenteditable='True' class='inptDiv' id='changeSet'>2</div>");
    $(inpWrapper).append(setDiv);
    //time
    const timeDiv = document.createElement("div");
    timeDiv.className = "inpItem";
    const timeToggle = document.createElement("div");
    timeToggle.className = "label";
    timeToggle.style = "display: flex; align-items: center;";
    $(timeToggle).append("Time (Seconds)");
    const timeButton = document.createElement("button");
    timeButton.id = "timeButton";
    timeButton.style.margin = "0";
    $(timeButton).append("<svg style='display:none;' id='autoTime' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z'/></svg><svg id='manualTime' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z'/></svg>");
    timeButton.addEventListener("click", function () {
        $("#changeTime").toggle();
        $("#manualTime").toggle();
        $("#autoTime").toggle();
        if ($("#changeTime").text() == "10000000000000000000000000000000000000000000000") { //Manual
            $("#changeTime").text("30");

        } else { // Auto
            $("#changeTime").text("10000000000000000000000000000000000000000000000");
        }
    });
    $(timeToggle).append(timeButton);
    $(timeDiv).append(timeToggle);
    $(timeDiv).append("<div contenteditable='True' class='inptDiv' id='changeTime'>30</div>");
    $(inpWrapper).append(timeDiv);
    //ball color
    const ballColorDiv = document.createElement("div");
    ballColorDiv.className = "inpItem";
    const ballColorLabel = document.createElement("div");
    ballColorLabel.className = "label";
    $(ballColorLabel).append("Color");
    $(ballColorDiv).append(ballColorLabel);
    const ballColors = ["red", "orange", "lawngreen", "green", "aqua", "blueviolet", "violet"];
    ballColors.forEach(function (color) {
        const temp = document.createElement("button");
        temp.className = "colorBall";
        temp.style.backgroundColor = color;
        temp.addEventListener("click", function () {
            $("#movingDiv").css("background-color", color);
        });
        $(ballColorDiv).append(temp);
    });
    const ballColorInput = document.createElement("input");
    ballColorInput.type = "color";
    ballColorInput.id = "colorPal";
    ballColorInput.addEventListener("input", () => {
        $("#movingDiv").css("background-color", $("#colorPal").val());
    });
    $(ballColorDiv).append(ballColorInput);
    $(inpWrapper).append(ballColorDiv);
    //background color
    const backgroundColorDiv = document.createElement("div");
    backgroundColorDiv.className = "inpItem";
    const backgroundColorLabel = document.createElement("div");
    backgroundColorLabel.className = "label";
    $(backgroundColorLabel).append("Background");
    $(backgroundColorDiv).append(backgroundColorLabel);
    const backgroundColors = ["black", "grey", "white"];
    backgroundColors.forEach(function (color) {
        const temp = document.createElement("button");
        temp.className = "colorBall";
        temp.style.backgroundColor = color;
        temp.addEventListener("click", function () {
            $("body").css("background-color", color);
        });
        $(backgroundColorDiv).append(temp);
    });
    const backgroundColorInput = document.createElement("input");
    backgroundColorInput.type = "color";
    backgroundColorInput.id = "backgroundPal";
    backgroundColorInput.addEventListener("input", () => {
        $("body").css("background-color", $("#backgroundPal").val());
    });
    $(backgroundColorDiv).append(backgroundColorInput);
    $(inpWrapper).append(backgroundColorDiv);
    //ballSize
    const ballSizeDivWrapper = document.createElement("div");
    ballSizeDivWrapper.className = "inpItem";

    const ballSizeLabel = document.createElement("div");
    ballSizeLabel.className = "label";
    $(ballSizeLabel).append("Size");
    $(ballSizeDivWrapper).append(ballSizeLabel);

    const ballSizeDiv = document.createElement("div");
    ballSizeDiv.style = "display:flex;align-items:center;";


    const ballSizes = [
        ["1em", "75px"],
        ["2em", "100px"],
        ["3em", "175px"]
    ];
    ballSizes.forEach(function (size) {
        const temp = document.createElement("button");
        temp.className = "sizeBall";
        temp.style.width = size[0];
        temp.style.height = size[0];
        temp.addEventListener("click", function () {
            $("#movingDiv").css("height", size[1]);
            $("#movingDiv").css("width", size[1]);
        });
        $(ballSizeDiv).append(temp);
    });
    const ballSizeInput = document.createElement("input");
    ballSizeInput.type = "text";
    ballSizeInput.id = "customBallSize";
    ballSizeInput.placeholder = "300";
    ballSizeInput.addEventListener("input", () => {
        const text = $("#customBallSize").val() + "px";
        $("#movingDiv").css("height", text);
        $("#movingDiv").css("width", text);
    });
    $(ballSizeDiv).append(ballSizeInput);
    $(ballSizeDivWrapper).append(ballSizeDiv);
    $(inpWrapper).append(ballSizeDivWrapper);
    //ballDirection
    const ballDirectionDiv = document.createElement("div");
    ballDirectionDiv.className = "inpItem";
    const ballDirectionLabel = document.createElement("div");
    ballDirectionLabel.className = "label";
    $(ballDirectionLabel).append("Direction");
    $(ballDirectionDiv).append(ballDirectionLabel);
    const ballDirections = [
        ["<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewbox='0 0 24 24' width='24px' fill='#000000'><rect fill='none' height='24' width='24' /><path d='M9,19l1.41-1.41L5.83,13H22V11H5.83l4.59-4.59L9,5l-7,7L9,19z' /></svg>", 0],
        ["<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewbox='0 0 24 24' width='24px' fill='#000000'><rect fill='none' height='24' width='24' /><path d='M19,9h-2v6.59L5.41,4L4,5.41L15.59,17H9v2h10V9z' /></svg>", 1],
        ["<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewbox='0 0 24 24' width='24px' fill='#000000'><rect fill='none' height='24' width='24' /><path d='M15,19v-2H8.41L20,5.41L18.59,4L7,15.59V9H5v10H15z' /></svg>", 2]
    ];
    ballDirections.forEach(function (direction) {
        const temp = document.createElement("button");
        $(temp).append(direction[0]);
        temp.addEventListener("click", function () {
            dirSet = direction[1];
        });
        $(ballDirectionDiv).append(temp);
    });
    $(inpWrapper).append(ballDirectionDiv);
    // sound
    const soundDiv = document.createElement("div");
    soundDiv.className = "inpItem";
    const soundToggle = document.createElement("div");
    soundToggle.className = "label";
    soundToggle.style = "display: flex; align-items: center;";
    $(soundToggle).append("Sound");
    const soundButton = document.createElement("button");
    soundButton.id = "soundButton";
    soundButton.style.margin = "0";
    $(soundButton).append("<svg id='soundOn' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z'/></svg><svg id='soundOff' style='display:none;' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M4.34 2.93L2.93 4.34 7.29 8.7 7 9H3v6h4l5 5v-6.59l4.18 4.18c-.65.49-1.38.88-2.18 1.11v2.06c1.34-.3 2.57-.92 3.61-1.75l2.05 2.05 1.41-1.41L4.34 2.93zM10 15.17L7.83 13H5v-2h2.83l.88-.88L10 11.41v3.76zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8c0-1.77-1.02-3.29-2.5-4.03v1.79l2.48 2.48c.01-.08.02-.16.02-.24z'/></svg>");
    soundButton.addEventListener("click", function () {
        $("#soundOn").toggle();
        $("#soundOff").toggle();
        $("#soundSettings").toggle();

    });
    $(soundToggle).append(soundButton);
    $(soundDiv).append(soundToggle);
    $(soundDiv).append("<div style='display:none;' id='soundSettings'>Freq <div style='display:inline-block; width:60%;' contenteditable='True' class='inptDiv' id='fIn'>500 </div><br>Type <select id='tIn'><option value='sine'>sine</option><option value='square'>square</option><option value='sawtooth'>sawtooth</option><option value='triangle'>triangle</option></select></div>");
    $(inpWrapper).append(soundDiv);


    // info
    $(inpWrapper).append(" <div class='inpItem helpItem'><p>You can find more information and how all this works <a target='_blank' href='https://github.com/MaxAFriedrich/EMDR/wiki'>here</a>. You can <a target='_blank' href='https://gitreports.com/issue/MaxAFriedrich/EMDR'>click here</a> to make a suggestion or report a bug. You can find the github repository <a class='gitEl' target='_blank' href='https://github.com/MaxAFriedrich/EMDR'>here</a>. </p></div>");



    //wrapper appends
    $(hidableSettings).append(inpWrapper);

    $(uiWrapper).append(mainSettingsWrapper);
    $(uiWrapper).append(hidableSettings);
    $("body").append(uiWrapper);
}

async function horizontalDirection() {
    $("#movingDiv").css("right", (ballPosition + "px"));
    $("#movingDiv").css("top", (($(window).height() / 2) + "px"));
    $("#movingDiv").css("left", "");
}
async function leftToRight() {
    let diagAngle = Math.atan($(window).height() / $(window).width());
    sined = Math.sin(diagAngle) * ballPosition;
    cosed = Math.cos(diagAngle) * ballPosition;
    $("#movingDiv").css("right", "");
    $("#movingDiv").css("top", (sined + "px"));
    $("#movingDiv").css("left", (cosed + "px"));
}
async function rightToLeft() {
    let diagAngle = Math.atan($(window).height() / $(window).width());
    sined = Math.sin(diagAngle) * ballPosition;
    cosed = Math.cos(diagAngle) * ballPosition;
    $("#movingDiv").css("left", "");
    $("#movingDiv").css("top", (cosed + "px"));
    $("#movingDiv").css("right", (sined + "px"));
}

// Run when the program first loads
window.onload = function () {
    uiBuilder();
    // run()
    let oppositeDirection = false;
    setInterval(function () {
        let settime = parseInt($("#changeTime").text()) + globTime;
        if ($("#stop").is(":visible") && Number($("#changeSet").text()) > setCounter && settime >= parseFloat(new Date().getTime() / 1000)) {
            stepChange = Number($("#changeVal").text());
            let maxPosition;
            if (dirSet != 0) {
                maxPosition = Math.hypot(($(window).width() - $("#movingDiv").width()), ($(window).height() - $("#movingDiv").width()));
            }
            else {
                maxPosition = $(window).width() - $("#movingDiv").width();
            }
            if (ballPosition >= maxPosition && !oppositeDirection) {
                oppositeDirection = true;
                setCounter++;
                beep(-1);
            }
            else if (ballPosition <= 0 && oppositeDirection) {
                oppositeDirection = false;
                beep(1);
            }
            if (oppositeDirection) {
                ballPosition -= stepChange;
            } else {
                ballPosition += stepChange;
            }
            if (dirSet == 0) {
                horizontalDirection();
            } else if (dirSet == 1) {
                leftToRight();
            } else if (dirSet == 2) {
                rightToLeft();
            }

        } else if (firstFailure) {
            $("#stop").toggle();
            $("#play").toggle();
            firstFailure = false;
        }
    }, stepChange);
};