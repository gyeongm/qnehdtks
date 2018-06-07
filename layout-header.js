$('#menu-user').mouseover(function() {
    $('.board.userboard').show()
})
$('#menu-user').mouseout(function() {
    $('.board.userboard').hide()
})

function mobileMenuOpen() {
    $('.mobile-menu').css('right','0px');
    $('#blocker').show();
    $('body').css('position','absolute');
    $('body').css('overflow','hidden');
    $('body').css('right','200px');
    $('#mobile-menu-btn').addClass('active');
}

function mobileMenuClose() {
    $('.mobile-menu').css('right','-200px');
    $('#blocker').hide();
    $('body').css('position','absolute');
    $('body').css('overflow','auto');
    $('body').css('right','0px');
    $('#mobile-menu-btn').removeClass('active');
}

$('#mobile-menu-btn').click(function(){
    mobileMenuOpen()
    });

$('#blocker').click(function(){
    mobileMenuClose()
    });

var myElement = document.getElementById('blocker');
var mc = new Hammer(myElement);

// listen to events...
mc.on("swiperight", function(ev) {
    mobileMenuClose();
});

var myElement2 = document.getElementById('mobile-menu');
var mc2 = new Hammer(myElement2);

// listen to events...
mc2.on("swiperight", function(ev) {
    mobileMenuClose();
});
