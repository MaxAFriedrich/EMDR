class WrappedElement {
    element: HTMLElement
    state: boolean


    constructor(id?: string, state?: boolean, element?: HTMLElement) {
        this.state = state
        if (element) {
            this.element = element
        } else {
            this.element = document.getElementById(id)
        }
    }

    private _value(value?: string) {
        if (this.element instanceof HTMLInputElement) {
            if (value) {
                this.element.value = value
            } else {
                return this.element.value
            }
        } else {
            if (value) {
                this.element.innerText = value
            } else {
                return this.element.innerText
            }
        }
    }

    private _isShown(): boolean {
        return this.element.style.display !== "none"
    }

    event(eventCallback: (e: Event) => void) {
        if (this.element instanceof HTMLInputElement) {
            this.element.oninput = eventCallback
        } else {
            this.element.onclick = eventCallback
        }
    }

    text(text?: string) {
        if (text) {
            this._value(text)
        } else {
            return this._value()
        }
    }

    int(int?: number) {
        if (int) {
            this._value(int.toString())
        } else {
            return parseInt(this._value())
        }
    }

    float(float?: number) {
        if (float) {
            this._value(float.toString())
        } else {
            return parseFloat(this._value())
        }
    }

    css(key: string, value?: string) {
        if (value) {
            this.element.style.setProperty(key, value)
        } else {
            return this.element.style.getPropertyValue(key)
        }
    }

    width() {
        return this.element.clientWidth
    }

    hide() {
        this.element.style.display = "none"
    }

    show() {
        this.element.style.display = ""
    }

    toggle() {
        this.element.style.display = this._isShown() ? "none" : ""
    }

}

class ElementClass {
    className: string
    elements: Array<WrappedElement>

    constructor(className: string) {
        this.className = className
        this.elements = Array.from(document.getElementsByClassName(className)).map(e => {
            return new WrappedElement(undefined, undefined, e as HTMLElement)
        })
    }

    event(eventCallback: (e: Event) => void) {
        this.elements.forEach(e => e.event(eventCallback))
    }
}

class Window {
    height() {
        return window.innerHeight
    }

    width() {
        return window.innerWidth
    }
}

export const UI = {
    settings: new WrappedElement("settings"),
    visible: new WrappedElement("visible"),
    notVisible: new WrappedElement("notVisible"),
    soundSettings: new WrappedElement("soundSettings", false),
    soundButton: new WrappedElement("soundButton"),
    soundOn: new WrappedElement("soundOn"),
    soundOff: new WrappedElement("soundOff"),
    fIn: new WrappedElement("fIn"),
    tIn: new WrappedElement("tIn"),
    changeVal: new WrappedElement("changeVal"),
    ball: new WrappedElement("ball"),
    changeTime: new WrappedElement("changeTime", true),
    changeSet: new WrappedElement("changeSet", true),
    stopStart: new WrappedElement("stopStart"),
    stop: new WrappedElement("stop"),
    play: new WrappedElement("play"),
    showHide: new WrappedElement("showHide"),
    setButton: new WrappedElement("setButton"),
    manualSet: new WrappedElement("manualSet"),
    autoSet: new WrappedElement("autoSet"),
    timeButton: new WrappedElement("timeButton"),
    manualTime: new WrappedElement("manualTime"),
    autoTime: new WrappedElement("autoTime"),
    colorBall: new ElementClass("colorBall"),
    colorPal: new WrappedElement("colorPal"),
    backgroundColors: new ElementClass("backgroundColor"),
    backgroundPal: new WrappedElement("backgroundPal"),
    sizeBall: new ElementClass("sizeBall"),
    customBallSize: new WrappedElement("customBallSize"),
    ballDirection: new ElementClass("ballDirection"),

    window: new Window(),
}
