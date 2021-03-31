window.addEventListener('scroll', (e) => {
    const target = document.querySelectorAll('.scroll');

    //console.log(target.style);
    //target.style.backgroundColor = "#ffcc00";

    /*
    var scrolled = window.pageYOffset;
    var rate = scrolled * -2;
    target.style.transform = 'translate3d(0px, ' + rate + 'px , 0px)';
    */

    
    var index = 0, length = target.length;
    for(index; index < length; index++){
        var pos = window.pageYOffset * target[index].dataset.rate;

        target[index].style.transform = 'translate3d(0px, ' + pos + 'px , 0px)';
    }
});