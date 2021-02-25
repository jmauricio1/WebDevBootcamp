$(document).keydown(function(event){
    $("h1").text(event.key);

    //console.log(event.originalEvent.key);
});