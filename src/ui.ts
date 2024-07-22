export class WrappedElement {
    element: HTMLElement

    constructor(element: HTMLElement) {
        this.element = element
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

    data(key: string, value?: string|boolean) {
        if (value) {
            this.element.dataset[key] = value as string
        } else {
            return this.element.dataset[key]
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
}

function id(id: string) {
    return new WrappedElement(document.getElementById(id))
}

class WrappedWindow {
    height() {
        return window.innerHeight
    }

    width() {
        return window.innerWidth
    }
}

export const UI = {
    soundSettings: id("soundSettings"),
    fIn: id("fIn"),
    tIn: id("tIn"),
    changeVal: id("changeVal"),
    ball: id("movingDiv"),
    changeTime: id("changeTime"),
    changeSet: id("changeSet"),
    stop: id("stop"),
    play: id("play"),
    window: new WrappedWindow(),
}
