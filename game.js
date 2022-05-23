window.addEventListener("load", press_start, false);
var score = 0;
var boundaries;
var outside_game;
var e_box;
var scoretext;
var interval;

function press_start() {
    //when clicking S, reset the game
    document
        .getElementById("start")
        .addEventListener("mouseover", reset_game, true);
}

function start_game() {
    //detect the mouse moves, if it hit one of the walls, change the walls's colors to red
    boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).addEventListener("mouseover", color_divs, true);
    }

    //if the user after starting the game tried to go to the end outside the game, he's considered cheating
    outside_game = document.getElementById("game");
    outside_game.addEventListener("mouseleave", cheating_alert, false);

    var startTime = Date.now();

    interval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        document.getElementById("live_timer").innerHTML =
            "Live <br>" + (elapsedTime / 1000).toFixed(2);
    }, 100);

    //if the user clicks on E, the game ends
    e_box = document.getElementById("end");
    e_box.addEventListener("mouseover", end_game, true);
}

function color_divs() {
    //decrement the score by 10 upon each wall hit
    score -= 10;
    clearInterval(interval);

    //update the score
    //scoretext = document.getElementsByClassName("example").item(0);
    scoretext.innerHTML = "SCORE:" + score;

    //change color of walls to red
    //boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
}

function reset_game() {
    //initial score before game starts or after reset back to 0
    score = 0;
    scoretext = document.getElementsByClassName("score").item(0);
    scoretext.innerHTML = "Your score:" + score;

    //return the original colors of the walls
    boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "#eeeeee";
    }
    start_game();
}

function end_game() {
    //increment the score if the user reached the end
    score += 5;
    clearInterval(interval);

    //check if the score is positive, and tell the user that he won, otherwise he lost
    if (score > 0) document.getElementById("status").innerHTML = "You Win!";
    else if (score < 0) {
        document.getElementById("status").innerHTML = "You Lose!";
    } else
        document.getElementById("status").innerHTML =
        'Begin by moving your mouse over the "S".';

    //remove eventlisteners when game ends, to stop handling userclicks
    remover();

    //update the final score
    scoretext.innerHTML = "SCORE:" + score;
}

function cheating_alert() {
    //alert the user when he's caught cheating
    window.alert("Caught you cheating!");
    clearInterval(interval);

    //remove all eventlisteners because he cheated, he should restart the game to play
    remover();
}

//called to remove eventlisteners
function remover() {
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).removeEventListener("mouseover", color_divs, true);
    }
    outside_game.removeEventListener("mouseleave", cheating_alert, false);
    boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "#eeeeee";
    }
    e_box.removeEventListener("click", end_game, true);
}