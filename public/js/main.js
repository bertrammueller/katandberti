(function ($) { // encapsulate jQuery
    $("document").ready(function ($) {
        console.log("READY")
        $('#personalised').height($(window).height() - $('#header').height());
        $('#marriage').height($(window).height() - $('#header').height());
    });

    $('a[href^="#"]').on('click', function (event) {
        console.log("Triggered")
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - $('#header').height()
            }, 1000);
        }
    });

    var start = null
    var prevProgress = 0.0
    var duration = 2000
    var waitTime = 1000
    var verticalDist = $('#personalised').height() / 2 - $('#angle-down').height()
    var butterfly = $('#butterfly')
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
    function step(timestamp) {
        // Refresh values every time in case user resizes browser window
        var xTarget = $('#angle-down').position().left - $('#angle-down').width() - butterfly.width() + 10
        var yTarget = $('#angle-down').position().top + $('#angle-down').height() / 2 - 10
        var xStart = butterfly.position().left
        var yStart = yTarget - Math.cos(Math.PI) * verticalDist
        if (start === null) start = timestamp
        var progress = Math.min((timestamp - start) / duration, 1.0)
        if (progress === 1.0) {
            butterfly.css({
                left: xTarget,
                top: yTarget
            })
        }
        if (progress >= prevProgress + 0.05) {
            prevProgress = progress
            butterfly.css({
                left: xStart + progress * (xTarget - xStart),
                top: yStart + Math.cos(progress * Math.PI) * verticalDist,
                transform: 'rotate(' + (Math.random() * 30 - 20 + 50 * (1 - progress)) + 'deg)'
            })
        }
        requestAnimationFrame(step)
    }
    setTimeout(() => {
        console.log("Starting the butterfly")
        requestAnimationFrame(step)
    }, waitTime)


})(jQuery)