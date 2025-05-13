'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    isSuper: false
}
var gBoard

function init() {
    console.log('hello')

    // console.log(gameVictorious())

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    // checkVictory(gBoard)

    renderBoard(gBoard, '.board-container')

    // console.log(gameVictorious())

    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            // board[1][8] = CHERRY

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
            // board[1][8] = CHERRY
        }
    }

    charry(board)

    return board
}

function charry(board) {

    const charry = [
        [1, 8],
        [1, 1],
        [8, 1],
        [8, 8],
    ]

    for (var k = 0; k < charry.length; k++) {
        // console.log(k)
        board[charry[k][0]][charry[k][1]] = CHERRY
    }

}

function updateScore(diff) {
    // TODO: update model 
    gGame.score += diff

    // TODO: update dom
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score

    // console.log('Updated score:', gGame.score)

    if (checkVictory()) {
        // console.log('Victory achieved!')
        gameVictory()
    }
}

// checkVictory()

function checkVictory() {
    var foodCount = 0

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]

            if (cell === FOOD) {
                foodCount++
            }

        }

    }
    // console.log('Food count:', foodCount)
    return foodCount === 1
}

function gameVictory() {
    console.log('Victory')
    gGame.isOn = false
    clearInterval(gGhostsInterval)

    var elGameover = document.querySelector('.gameover h3')
    elGameover.innerText = 'VICTORY'
    elGameover.style.display = 'block'
    elGameover.style.color = 'gold'

    var elBtnGameOver = document.querySelector('.gameover button')
    elBtnGameOver.style.display = 'block'


}


function gameOver() {
    console.log('Game Over')
    // alert('GAME OVER!')
    // // TODO
    var elGameover = document.querySelector('.gameover h3')
    // console.log(elGameover)
    elGameover.style.display = 'block'

    var elBtnGameOver = document.querySelector('.gameover button')
    elBtnGameOver.style.display = 'block'


    gGame.isOn = false
    clearInterval(gGhostsInterval)
}

function onRestart() {
    console.log('Restarting game...')

    gGhosts = []

    var elGameover = document.querySelector('.gameover h3')
    elGameover.style.display = 'none'
    elGameover.innerText = 'GAME OVER'

    var elBtnGameOver = document.querySelector('.gameover button')
    elBtnGameOver.style.display = 'none'


    gGame.score = 0
    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score

    init()

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}