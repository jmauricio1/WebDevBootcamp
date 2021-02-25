
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//The game won't start unless a button is pressed AND started is false
$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    level++;

    var randomNumber = Math.ceil(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    $("h1").text("Level " + level);
}

$(".btn").on("click", function(event){
    var userChosenColor = event.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

//Checks to see if the last thing entered into the clickedPattern matches to the
//current index in the game pattern array
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //Won't move on to the next sequence until the click pattern
        //is the same length as the current game pattern AND the colors
        //from user are exactly the same as the colors in game pattern
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            }, 1500);
        }
    }
    else{
        playSound("wrong");

        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },
        200);

        startOver();
    }
}

//Instead of using a case switch, we just take in the argument
//and find the audio file that way
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100); 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}