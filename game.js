window.addEventListener("load", start_game, false);

function start_game() {
    //start on the s, once we click on it game starts w everything goes back to normal
    for (var i = 0; i < document.getElementsByClassName("boundary").length; i++) {
        document
            .getElementsByClassName("boundary")
            .item(i)
            .addEventListener("mouseover", colorDivs);
    }
    //score -10 when lose, +5 when win
    //win lose b id status
    //change innerhtml to you lost
    //handle cheating alert
    //after clicking on E, the game should end all conditions should no longer be valid
}

function colorDivs() {
    var boundaries = document.getElementsByClassName("boundary");
    for (var i = 0; i < boundaries.length; i++) {
        boundaries.item(i).style.backgroundColor = "red";
    }
}