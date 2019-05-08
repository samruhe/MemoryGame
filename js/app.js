const allCards = ["./images/blue.png", "./images/blue.png", "./images/fuchsia.png", "./images/fuchsia.png",
                "./images/green.png", "./images/green.png", "./images/orange.png", "./images/orange.png",
                "./images/pink.png", "./images/pink.png", "./images/purple.png", "./images/purple.png",
                "./images/red.png", "./images/red.png", "./images/seagreen.png", "./images/seagreen.png",
                "./images/skyblue.png", "./images/skyblue.png", "./images/yellow.png", "./images/yellow.png",
                "./images/babypink.png", "./images/babypink.png", "./images/babyyellow.png", "./images/babyyellow.png",
                "./images/babypurple.png", "./images/babypurple.png", "./images/coral.png", "./images/coral.png"];

var cards = [];

var flippedVals = [];
var flippedCards = [];
var flippedCells = [];
var matches = 0;
var winMatch = 0;
var moves = 0;
var timer = false;
var startTime = 0;
var finishTime = 0;

function flip(cell) {
    var thisCell = document.getElementById(cell);
    var card = document.getElementById("img" + cell);
    if (flippedCells.length < 2 && thisCell.className != "clicked") {
        if (timer == false) {
            startTime = new Date().getTime();
            timer = true;
        }
        document.getElementById("img" + cell).style.visibility = "visible";
        if (flippedVals.length == 0) {
            flippedVals[0] = card;
            flippedCards[0] = cell;
            flippedCells[0] = thisCell;
        } else {
            flippedVals[1] = card;
            flippedCards[1] = cell;
            flippedCells[1] = thisCell;
        }
        thisCell.className = "clicked"
        compare();
    }
}

async function compare() {
    if (flippedVals.length == 2) {
        if (flippedVals[0].src == flippedVals[1].src) {
            flippedVals[0].style.visibility = "visible";
            flippedVals[1].style.visibility = "visible";
            matches++;
            if (matches == winMatch) {
                winner();
            }
        } else {
            await sleep(750);
            flippedVals[0].style.visibility = "hidden";
            flippedVals[1].style.visibility = "hidden";
            flippedCells[0].className = "";
            flippedCells[1].className = "";
        }
        flippedVals.length = 0;
        flippedCards.length = 0;
        flippedCells.length = 0;
        moves++;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function winner() {
    finishTime = new Date().getTime();
    var totalTime = finishTime - startTime;
    document.getElementById("time").innerHTML = totalTime / 1000;
    document.getElementById("moves").innerHTML = moves;
    document.getElementById("restart").innerHTML = "Play Again";
    
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    
    modal.style.display = "block";
    
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    matches = 0;
    moves = 0;
    timer = false;
}

function assignCard() {
    for (i in cards) {
        cell = parseInt(i) + 1;
        document.getElementById(cell).innerHTML = '<img src="' + cards[i] + '" id="img' + cell + '"></img>';
        document.getElementById("img" + cell).style.visibility = "hidden";
        document.getElementById(cell).className = "";
    }
    document.getElementById("restart").innerHTML = "Restart";
}

function shuffle() {
	var currentIndex = cards.length;
	var temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = cards[currentIndex];
		cards[currentIndex] = cards[randomIndex];
		cards[randomIndex] = temporaryValue;
    }
    assignCard();
}

function restart() {
    document.getElementById("restart").innerHTML = "Restart";
    flippedVals.length = 0;
    flippedCards.length = 0;
    flippedCells.length = 0;
    moves = 0;
    matches = 0;
    timer = false;

    shuffle();
}

window.onload = function() { start(); }

function start() {
    document.getElementById("grid").innerHTML = "";
    var btnDiv = document.getElementById("btn");
    btnDiv.style.display = "none";

    document.getElementById("restart").innerHTML = "Restart";
    flippedVals.length = 0;
    flippedCards.length = 0;
    flippedCells.length = 0;
    moves = 0;
    matches = 0;
    timer = false;

    var levelModal = document.getElementById('levelModal');
    var easyClick = document.getElementById("easy");
    var medClick = document.getElementById("medium");
    var hardClick = document.getElementById("hard");
    
    levelModal.style.display = "block";

    easyClick.onclick = function() {
        levelModal.style.display = "none";
        cards = allCards.slice(0, 12);
        winMatch = 6;
        buildGrid();
        shuffle();
    }

    medClick.onclick = function() {
        levelModal.style.display = "none";
        cards = allCards.slice(0, 20);
        winMatch = 10;
        buildGrid();
        shuffle();
    }

    hardClick.onclick = function() {
        levelModal.style.display = "none";
        cards = allCards.slice(0, 28);
        winMatch = 14;
        buildGrid();
        shuffle();
    }
}

function buildGrid() {
    var grid = document.getElementById("grid");
    for (var i = 1; i <= cards.length; i += 4) {
        grid.innerHTML += '<tr><td id="' + i + '" onclick="flip(id)"></td><td id="' + (i + 1) + '" onclick="flip(id)"></td><td id="' + (i + 2) + '" onclick="flip(id)"></td><td id="' + (i + 3) + '" onclick="flip(id)"></td></tr>';
    }

    var btnDiv = document.getElementById("btn");
    btnDiv.style.display = "block";
}