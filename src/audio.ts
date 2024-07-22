/**
 * Function to generate beep tones
 * @param {Number} panVal value for either left or right channel
 * @returns None
 */
import {UI} from "./ui";


//create audio context a single time
const audioCtx = new window.AudioContext();

export function beep(panVal: number) {
    // audio disabled?
    if (!UI.soundSettings.state) {
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
