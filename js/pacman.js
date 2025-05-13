'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST)
        if (gGame.isSuper) {
            console.log('super pacmen')
            updateScore(10)

            for (var i = 0; i < gGhosts.length; i++) {
                console.log(gGhosts[i])
                if (ghost[i].location.i === nextLocation.i &&
                    ghost[i].location.j === nextLocation.j) {
                    // console.log(gGhosts.splice(i, 1))
                    gGhosts.splice(i, 1)
                    console.log(gGhosts)
                    break
                }
            }

        } else {
            return gameOver()
        }

    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)

    if (nextCell === CHERRY) {
        updateScore(5)
        superPacmen()

    }


    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}

function superPacmen() {
    console.log('active super pacman')
    gGame.isSuper = true

    updateGhost()

    setTimeout(function () {
        dectiveSuperPacmen()
    }, 20000)


}


function dectiveSuperPacmen() {
    console.log('stop super pacman')
    gGame.isSuper = false

    updateGhost()
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i -= 1
            break;

        case 'ArrowDown':
            nextLocation.i += 1
            break;

        case 'ArrowLeft':
            nextLocation.j -= 1
            break;

        case 'ArrowRight':
            nextLocation.j += 1
            break;
    }
    // TODO: figure out nextLocation
    return nextLocation
}