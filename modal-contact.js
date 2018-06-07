$('.modal-bldgget-wrapper').click(function (e){
    var container = $("#bldgget-modal");
    if(container.has(e.target).length === 0) {
        $('.modal-bldgget-wrapper').fadeOut('20');
        if(overflowHidden == false) $('body').css('overflow','auto');
    }
});

var overflowHidden = false;

$('#bldgget-btn').click(function() {
    $('.modal-bldgget-wrapper').fadeIn('20');

    if($('body').css('overflow') == 'hidden') {
        overflowHidden = true;
    }
    else {
        $('body').css('overflow','hidden');
    }
})

$('#menu-btn-bldgget').click(function() {
    $('.modal-bldgget-wrapper').fadeIn('20');

    if($('body').css('overflow') == 'hidden') {
        overflowHidden = true;
    }
    else {
        $('body').css('overflow','hidden');
    }
})

$('.bldgget-modal-close').click(function() {
    $('.modal-bldgget-wrapper').fadeOut('20');
    if(overflowHidden == false) $('body').css('overflow','auto');
})

$('#bldg-sms-form > textarea').click(function() {
    if(!user) alert('회원만 문자를 보내실 수 있습니다.');
    else if(!userPhone) alert('마이페이지에서 휴대폰 인증을 받아주세요.');
})

$("#bldgget-submit").click(function() {
    var formData = $("#bldgget-form").serialize();

    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '구해주세요 전송 클릭',
        eventLabel: ''
    });

    if(user) {
        if(userPhone) {
            if(confirm('집토스로 문의가 전달되며 회원님의 연락처도 함께 전달됩니다. 문자를 보내시겠습니까?')) {
                $.ajax({
                    type : "POST",
                    url : "/building/bldgget",
                    cache : false,
                    data : formData,
                    success: function(data) {
                        if(data==1) {
                            alert('문자 전송이 완료되었습니다.');
                            $('.modal-bldgget-wrapper').fadeOut('20');
                            if(overflowHidden == false) $('body').css('overflow','auto');
                        }
                        else alert('문자 전송에 실패하였습니다. 같은 오류가 계속 발생하면 1666-8430 으로 문의주세요.');
                    }
                });
            }
        }
        else {
            alert('마이페이지에서 휴대폰 인증을 받아주세요. 인증을 받은 후에도 오류가 발생하면 새로고침 해보세요.');
        }

    }
});

$("#bldgget-modal input").click(function(){
    if(!user)
        alert('로그인한 회원만 요청을 보내실 수 있습니다.')
})
