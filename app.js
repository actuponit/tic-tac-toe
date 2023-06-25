const turn = document.querySelector(".turn")
const items = document.querySelectorAll(".item")
const winner = document.querySelector(".winner")
const statusPage = document.querySelector(".winnerPage")

let occupied = []

let pboard = {
    "0" : 0,
    "1" : 0,
    "2" : 0,
    "3" : 0,
    "4" : 0,
    "5" : 0,
    "6" : 0,
    "7" : 0
}

let cboard = {
    "0" : 0,
    "1" : 0,
    "2" : 0,
    "3" : 0,
    "4" : 0,
    "5" : 0,
    "6" : 0,
    "7" : 0
}

current = 'X'
let gameOver = false
items.forEach((item) => {
    item.addEventListener('click', function(e) {
        let index = this.getAttribute('data-val')
        if(occupied.includes(Number(index))) return;
        current = "X"
        this.append(current)
        
        occupied.push(Number(index))
        if (checkWinner(index, pboard)) {
            statusPage.style.display = 'block'
            winner.innerHTML = "Player Wins🎉🎉🎉❕"
            gameOver = true    
        }
        setTimeout(() => {
            computersTurn()        
        }, 1000);
        checkDraw()
    }, {once : true});
}) 



function checkDraw() {
    if(occupied.length === 9 & !gameOver) {
        statusPage.style.display = 'block'
        winner.innerHTML = "TIE❕"
        gameOver = true
    }
}

function computersTurn() {
    if (gameOver) return;
    current = "O"
    
    rand =  compMove(cboard)[1] === 2 ? compMove(cboard)[0] : compMove(pboard)[0]

    let r = -1
    let trail = 0
    
    while(trail < 100){
        r = Math.floor(Math.random()*(rand.length))
        if(!occupied.includes(rand[r])) {
            break
        }
        if(trail === 50) {
            console.log(rand.toString() === compMove(pboard)[0].toString())

            rand = rand.toString() === compMove(cboard)[0].toString() ? compMove(pboard)[0] : compMove(cboard)[0]
        } 
        trail+=1
    }
    
    if (occupied.length === 1 & [0, 2, 6, 8].includes(occupied[0])) {
        rand = [4]
        r = 0
    }

    if (trail > 99) {

        rand = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        while(true) {
            r = Math.floor(Math.random()*9)
            if(!occupied.includes(rand[r]))
            break
        }
    }
    console.log(trail)
    console.log(rand)
    items[rand[r]].append(current)
    occupied.push(rand[r])
    if (checkWinner(rand[r], cboard)) {
        statusPage.style.display = 'block'
        winner.innerHTML = "You Lose😞❕"
        gameOver = true
    }  
}

function checkWinner(val, board) {
    row = Math.floor(val/3)
    col = val%3
    //row
    board[row] += 1
    //column
    board[col+3] += 1
    //right diagonal
    board['6'] = row == col ? board['6']+1 : board['6']
    //left diagonal
    board['7'] = row+col == 2 ? board['7']+1 : board['7']

    if(board[row] >= 3 | board[col+3] >= 3 | board['6'] >= 3 | board['7'] >= 3)
    return true
    else 
    return false
};

//This function takes the notation of a winning position and returns the indeces of the cells for that position
function reverse(key){
    switch (key) {
        case '0':
            return [0, 1, 2]
        case '1':
            return [3, 4, 5]
        case '2':
            return [6, 7, 8]
        case '3':
            return [0, 3, 6]
        case '4':
            return [1, 4, 7]
        case '5':
            return [2, 5, 8]
        case '6':
            return [0, 4, 8]
        case '7':
            return [2, 4, 6]
    }
};

function compMove(board) {
    let key = Object.keys(board)
    let value = Object.values(board)

    let maxVal = 0
    for(i = 0; i<value.length; i++) {
        if(value[i] >= maxVal)
        maxVal = value[i]
    }

    let result = []
    for(i = 0; i<key.length; i++) {
        if(board[key[i]] == maxVal) {
            result = result.concat(reverse(key[i]));
        }
    }
    
    	
    return [result, maxVal]
};