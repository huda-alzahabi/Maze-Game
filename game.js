window.addEventListener("load", press_start, false);
var score = 0;

function press_start() {
    document.getElementById("start").addEventListener("click", reset_game, false);
    document
        .getElementsByClassName("boundary")
        .item(4)
        .innerHTML("SCORE:", score);
}

function start_game() {
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .addEventListener("mouseover", color_divs);
    }
    document.getElementById("end").addEventListener("click", end_game, false);

    //score -10 when lose, +5 when win
    //win lose b id status
    //change innerhtml to you lost
    //handle cheating alert,onmouseleave  id game
}

function color_divs() {
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
    score -= 10;
}

function reset_game() {
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "#eeeeee";
    }
    score = 0;
    start_game();
}

function end_game() {
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .removeEventListener("mouseover", color_divs);
    }
    document.getElementById("end").removeEventListener("click", end_game, false);
    if (score > 0) document.getElementById("status").innerHTML("You Win");
    else document.getElementById("status").innerHTML("You Lose");
}