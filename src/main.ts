import {BallDirection, BallState, startBallInterval} from "./ball";
import {UI} from "./ui";
import {Params} from "./query";
import {Debug} from "./debug";

function setEvents() {
    UI.showHide.event(() => {
        UI.settings.toggle()
        UI.visible.toggle()
        UI.notVisible.toggle()
    })

    UI.stopStart.event(() => {
        BallState.setCounter = 0
        BallState.globTime = parseFloat((new Date().getTime() / 1000).toString())
        UI.stop.toggle()
        UI.play.toggle()
        BallState.isPlaying = !BallState.isPlaying
    })

    UI.setButton.event(() => {
        UI.changeSet.state = !UI.changeSet.state
        UI.changeSet.toggle()
        UI.manualSet.toggle()
        UI.autoSet.toggle()
    })

    UI.timeButton.event(() => {
        UI.changeTime.state = !UI.changeTime.state
        UI.changeTime.toggle()
        UI.manualTime.toggle()
        UI.autoTime.toggle()
    })

    UI.colorBall.event((e) => {
        const newColor = (e.target as HTMLElement).style.backgroundColor
        UI.ball.css("background-color", newColor)
    })

    UI.colorPal.event(() => {
        UI.ball.css("background-color", UI.colorPal.text())
    })

    UI.backgroundColors.event((e) => {
        document.body.style.backgroundColor = (e.target as HTMLElement).style.backgroundColor
    })

    UI.backgroundPal.event(() => {
        document.body.style.backgroundColor = UI.backgroundPal.text()
    })

    function changeSize(size: string) {
        UI.ball.css("width", size)
        UI.ball.css("height", size)
    }

    UI.sizeBall.event((e) => {
        const newSize = (e.target as HTMLElement).style.width
        switch (newSize) {
            case "2em":
                changeSize("75px");
                break
            case "2.5em":
                changeSize("100px");
                break
            case "3em":
                changeSize("175px");
                break
        }
    })

    UI.customBallSize.event(() => {
        const newSize = UI.customBallSize.text()
        changeSize(`${newSize}px`)
    })

    UI.ballDirection.event((e) => {
        function getParentButton(e: EventTarget): EventTarget {
            return (e as HTMLElement).tagName === "BUTTON" ? e : getParentButton((e as HTMLElement).parentElement)
        }

        BallState.dirSet = parseInt((getParentButton(e.target) as HTMLElement).attributes.getNamedItem("data-direction").value) as BallDirection
    })

    UI.soundButton.event(() => {
        UI.soundSettings.state = !UI.soundSettings.state
        UI.soundSettings.toggle()
        UI.soundOn.toggle()
        UI.soundOff.toggle()
    })
}

function main() {
    Params.loadParams()
    Debug.init()

    startBallInterval()
    setEvents()
}

main()

