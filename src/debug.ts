import {Params} from "./query";
import {UI} from "./ui";
import {BallState} from "./ball";


export class Debug {
    static data = {
        log: <string[]>[],
        error: <string[]>[],
        device: "",
        window: "",
        settings: {},
        query: {},
        pageHTML: "",
    }

    static init() {
        if (!Params.debug) return;
        console.log("Debug mode enabled.");

        this.button()

        // Capture all errors and route them through Debug.error
        window.onerror = (message, source, lineno, colno, error) => {
            const errorMessage = `Error: ${message} at ${source}:${lineno}:${colno}`;
            Debug.error(errorMessage);
            if (error) Debug.error(`Stack: ${error.stack}`);
        };
    }

    static collectEnvironment() {
        if (!Params.debug) return;
        this.data.device = navigator.userAgent;
        this.data.window = `Width: ${window.innerWidth}, Height: ${window.innerHeight}`;
        this.data.settings = {
            speed: UI.changeVal.text(),
            sets: {
                enabled: UI.changeSet.state,
                value: UI.changeSet.text(),
            },
            time: {
                enabled: UI.changeTime.state,
                value: UI.changeTime.text(),
            },
            color: UI.ball.css("background-color"),
            background: document.body.style.backgroundColor,
            size: UI.ball.css("height"),
            direction: BallState.dirSet,
            sound: {
                enabled: UI.soundSettings.state,
                frequency: UI.fIn.text(),
                type: UI.tIn.text(),
            }
        };
        this.data.query = Params.stringify();
        this.data.pageHTML = btoa(new XMLSerializer().serializeToString(document))
    }

    static dump() {
        if (!Params.debug) return;
        this.collectEnvironment();
        return JSON.stringify(this.data)
    }

    static log(message: string) {
        if (!Params.debug) return;
        this.data.log.push(`${this.timestamp()} - ${message}`);
        if (this.data.log.length > 100) {
            this.data.log.shift();
        }
        console.log(message);
    }

    static error(message: string) {
        if (!Params.debug) return;
        this.data.error.push(`${this.timestamp()} - ${message}`);
        if (this.data.error.length > 100) {
            this.data.error.shift();
        }
        console.error(message);
    }

    static button() {
        if (!Params.debug) return;
        const button = document.createElement("button");
        button.innerText = "Copy Debug Report";
        button.className = "debug-button";
        button.onclick = () => {
            const report = this.dump();
            navigator.clipboard.writeText(report).then(() => {
                alert("Debug report copied to clipboard.");
            }).catch(err => {
                alert("Failed to copy debug report: " + err);
            });
        };
        UI.settings.element.appendChild(button);
    }

    static timestamp() {
        if (!Params.debug) return;
        return Date.now().toString();
    }
}
