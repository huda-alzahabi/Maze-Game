window.addEventListener("load", press_start, false);
var score = 0;

function press_start() {
    document.getElementById("start").addEventListener("click", reset_game, true);
}

function start_game() {
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .addEventListener("mouseover", color_divs, true);
    }
    document.getElementById("end").addEventListener("click", end_game, true);
    document
        .getElementById("game")
        .addEventListener("mouseleave", cheating_alert, false);
}

function color_divs() {
    score -= 10;
    document.getElementsByClassName("example").item(0).innerHTML =
        "SCORE:" + score;
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
}

function reset_game() {
    score = 0;
    document.getElementById("end").removeEventListener("click", end_game, true);
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "#eeeeee";
    }
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
    if (score > 0) document.getElementById("status").innerHTML = "You Win";
    else document.getElementById("status").innerHTML = "You Lose";
    document.getElementsByClassName("example").item(0).innerHTML =
        "SCORE:" + score;
    reset_game();
}

function cheating_alert() {
    window.alert("Caught you cheating!");
}