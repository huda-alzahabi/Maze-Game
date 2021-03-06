window.addEventListener("load", press_start, false);
var score = 0;
var boundaries;
var outside_game;
var e_box;
var scoretext;
var interval;
let time_array = [];
var elapsedTime = 0;
var last_time = 0;

function press_start() {
    //when right clicking S, reset the game and the best time
    document
        .getElementById("start")
        .addEventListener("contextmenu", deep_reset, true);
    //when clicking S, reset the game
    document.getElementById("start").addEventListener("click", reset_game, true);
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

    //calculating the time for each game played and updating the live time accordingly
    var startTime = Date.now();

    interval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        live_time = document.getElementById("live_timer");
        live = (elapsedTime / 1000).toFixed(2);
        live_time.innerHTML = "Live <br>" + live;
    }, 100);

    //if the user clicks on E, the game ends
    e_box = document.getElementById("end");
    e_box.addEventListener("mouseover", end_game, true);
}

function color_divs() {
    //decrement the score by 10 upon each wall hit
    score -= 10;
    live = "0:00";
    //if the user hits the divs the timer will reset
    live_time.innerHTML = "Live <br>0:00";
    clearInterval(interval);

    //update the score
    scoretext = document.getElementsByClassName("score").item(0);
    scoretext.innerHTML = "Your score:" + score;

    //change color of walls to red
    //boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
    //remove eventlisteners when the user loses, to stop handling userclicks
    outside_game.removeEventListener("mouseleave", cheating_alert, false);
    e_box.removeEventListener("click", end_game, true);
    document.getElementById("status").innerHTML = "You Lose!";
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

    //save the values of the time for each game played in an array
    //get the minimum of these values being the best time
    //get the one before the end of the array being the last time (prev), since the end will be saved for the current time

    time_array.push(live);
    var best_time = Math.min.apply(Math, time_array);
    document.getElementById("best_timer").innerHTML = "Best <br>" + best_time;
    if (time_array.length > 1) last_time = time_array[time_array.length - 2];
    else last_time = "";
    document.getElementById("last_timer").innerHTML = "Last <br>" + last_time;
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
    scoretext.innerHTML = "Your score:" + score;
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

function deep_reset() {
    //reset the game and empty the array, to reset the best time
    time_array.fill(0);
    reset_game();
}