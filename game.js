window.addEventListener("load", press_start, false);
var score = 0;

function press_start() {
    //when clicking S, reset the game
    document.getElementById("start").addEventListener("click", reset_game, true);
}

function start_game() {
    //detect the mouse moves, if it hit one of the walls, change the walls's colors to red
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .addEventListener("mouseover", color_divs, true);
    }

    //if the user after starting the game tried to go to the end outside the game, he's considered cheating
    document
        .getElementById("game")
        .addEventListener("mouseleave", cheating_alert, false);

    //if the user clicks on E, the game ends
    document.getElementById("end").addEventListener("click", end_game, true);
}

function color_divs() {
    //decrement the score by 10 upon each wall hit
    score -= 10;

    //update the score
    document.getElementsByClassName("example").item(0).innerHTML =
        "SCORE:" + score;

    //change color of walls to red
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
}

function reset_game() {
    //return the score back to 0
    score = 0;

    //return the original colors of the walls
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "#eeeeee";
    }
    start_game();
}

function end_game() {
    //increment the score if the user reached the end
    score += 5;

    //check if the score is positive, and tell the user that he won, otherwise he lost
    if (score > 0) document.getElementById("status").innerHTML = "You Win";
    else document.getElementById("status").innerHTML = "You Lose";

    //update the final score
    document.getElementsByClassName("example").item(0).innerHTML =
        "SCORE:" + score;

    //remove eventlisteners when game ends, to stop handling userclicks
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .removeEventListener("mouseover", color_divs, true);
    }
    document
        .getElementById("game")
        .removeEventListener("mouseleave", cheating_alert, false);
    reset_game();
}

function cheating_alert() {
    window.alert("Caught you cheating!");
}