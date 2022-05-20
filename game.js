window.addEventListener("load", press_start, false);
var score = 0;

function press_start() {
    document.getElementById("start").addEventListener("click", reset_game, false);
}

function start_game() {
    score = 0;
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .addEventListener("mouseover", color_divs);
    }
    document.getElementById("end").addEventListener("click", end_game, true);

    //handle cheating alert,onmouseleave  id game
}

function color_divs() {
    score -= 10;
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
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
    score += 5;
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .removeEventListener("mouseover", color_divs, true);
    }
    //document.getElementById("end").removeEventListener("click", end_game, false);
    if (score > 0) document.getElementById("status").innerHTML = "You Win";
    else document.getElementById("status").innerHTML = "You Lose";
    document.getElementsByClassName("example").item(0).innerHTML =
        "SCORE:" + score;
    console.log(score);
    reset_game();
}