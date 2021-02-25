var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var level = 0;

//console.log(randomColor);

$(document).keydown(function(event){
    randomChosenColor = buttonColors[nextSequence()];
    $("h1").text("Level " + level);
});

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.ceil(Math.random() * 3);
    gamePattern.push(buttonColors[randomNumber]);
    setTimeout(function(){
        playSound(buttonColors[randomNumber]);
        $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
    }, 1500);

    level++;
    $("h1").text("Level " + level);

    return randomNumber;
}

function playSound(name){
    switch (name){
        case "red":
            var redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;
        case "blue":
            var blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;
        case "green":
            var greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;
        case "yellow":
            var yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;
        default:
    }
}

$(".btn").on("click", function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);
    //console.log(event.target.id);

    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(name){
    $("#" + name).addClass("pressed");
    setTimeout(function(){
        $("#" + name).removeClass("pressed");
    }, 100); 
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("correct");
        nextSequence();
    }
    else{
        console.log("wrong");
    }
}