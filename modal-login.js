
var overflowHidden = false;
$('input[name="authNum"]').hide();
$('input[name="fb-authNum"]').hide();



$('#menu-login').click(function() {
    $('.modal-login-wrapper').fadeIn('20');
    if(isMobile == 'android') location.hash = 'modal'
    if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
    }
    else {
      $('body').css('overflow','hidden');
    }
})


$('#menu-btn-login').click(function() {
    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '로그인 모달 오픈',
        eventLabel: ""
    });
    if(isMobile == 'android') location.hash = 'modal'
    $('.modal-login-wrapper').fadeIn('20');
    if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
    }
    else {
      $('body').css('overflow','hidden');
    }
})

$('#menu-btn-logout').click(function() {

    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '로그아웃 클릭',
        eventLabel: ""
    });

    $.ajax({
        url : '/users/logout',
        type : 'get',
        data : 'm=true',
        success : function(data) {
            console.log(data)
            if(data==1) window.location.reload()
            else $(".extraWords").text('다시 한번 시도해 주십시오');
        }
    })
})

$('.login-modal-close').click(function() {
  $('.modal-login-wrapper').fadeOut('20');
  if(overflowHidden == false) $('body').css('overflow','auto');
  location.hash = ''
})

$('.modal-login-wrapper').click(function (e){
    var container = $("#login-modal");
    if(container.has(e.target).length === 0) {
        location.hash = ''
        $('.modal-login-wrapper').fadeOut('20');
        if(overflowHidden == false) $('body').css('overflow','auto');
    }
});


$('.tabs').on('click', 'li a', function(e){
  e.preventDefault();
  $(".extraWords").text('');
  var $tab = $(this),
       href = $tab.attr('href');

   $('.active').removeClass('active');
   $tab.addClass('active');

   $('.show')
      .removeClass('show')
      .addClass('hide')
      .hide();

    $(href)
      .removeClass('hide')
      .addClass('show')
      .hide()
      .fadeIn(550);
});


$('a.find-password').on('click', function(e){
  e.preventDefault();
  $('.show')
      .removeClass('show')
      .addClass('hide')
      .hide();

    $('#find-password')
      .removeClass('hide')
      .addClass('show')
      .hide()
      .fadeIn(550);
});


$('a.find-id').on('click', function(e){
  e.preventDefault();
  $('.show')
      .removeClass('show')
      .addClass('hide')
      .hide();

    $('#find-id')
      .removeClass('hide')
      .addClass('show')
      .hide()
      .fadeIn(550);
});


$("#login-btn").click(function()
{
    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '로그인 클릭',
        eventLabel: ""
    });

	var formData = $("#login-form").serialize();
	$.ajax({
 		type : "POST",
 		url : "/users/login",
 		cache : false,
 		data : formData,
 		success: function(data) {
 		    if(data==1) {
 		        window.location = window.location.pathname
            }
 		    else $(".extraWords").text('아이디 또는 비밀번호가 정확하지 않습니다.');
 		}
	});
});


$("#find-password-btn").click(function()
{

	var formData = $("#find-password-form").serialize();
	$.ajax({
 		type : "POST",
 		url : "/users/findPassword",
 		cache : false,
 		data : formData,
 		success: function(data) {
 		    if(data==1) {

                $('a[href="#login"]').click();
                $(".extraWords").text('문자메세지로 임시비밀번호가 전송되었습니다.');
            }
 		    else $(".extraWords").text('아이디 또는 휴대폰번호가 정확하지 않습니다.');
 		}
	});
});

$("#find-id-btn").click(function()
{

	var formData = $("#find-id-form").serialize();
	$.ajax({
 		type : "POST",
 		url : "/users/findId",
 		cache : false,
 		data : formData,
 		success: function(data) {
 		    if(data==1) {

                $('a[href="#login"]').click();
                $(".extraWords").text('문자메세지로 아이디 앞 3자리가 전송되었습니다.');
            }
 		    else if(data==9) $(".extraWords").text('페이스북 아이디로 로그인 해보세요.');
 		    else $(".extraWords").text('가입된 휴대폰번호가 없습니다.');
 		}
	});
});

$("#register-btn").click(function()
{
    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '회원가입 클릭',
        eventLabel: ""
    });

	var formData = $("#register-form").serialize();
	var id = $("#register-form").find("input[name='userId']").val();
    if (!id) {
        $(".extraWords").text('사용하실 아이디를 입력해주세요.')
        return;
    }
    var pw = $("#register-form").find("input[name='password']").val();
    if (!pw) {
        $(".extraWords").text('사용하실 비밀번호를 입력해주세요.')
        return;
    }

    var phone = $('#register-phone').val();
    if (!phone) {
        $(".extraWords").text('핸드폰 번호를 입력해주세요.')
        return;
    }

    if ($("input:checkbox[name='agree']").is(":checked") == false) {
        $(".extraWords").text('이용약관 및 개인정보취급방침에 동의해주세요.')
        return;
    }
	$.ajax({
 		type : "POST",
 		url : "/users/register",
 		cache : false,
 		data : formData,
 		success: function(data) {
 		    if(data==true) {
 		        $(".extraWords").text('회원가입이 완료되었습니다. 감사합니다.');
 		        fbq('track', 'CompleteRegistration');
 		        ga('send', 'event', {
                    eventCategory: '내부 이벤트',
                    eventAction: '회원 가입',
                    eventLabel: $('#register-phone').val()
                });
 		        window.location = window.location.pathname
 		    }
                else if(data == 2) $(".extraWords").text('문자인증 오류입니다. 문자로 안내받으신 인증번호를 잘못 입력하셨거나, 휴대폰 번호가 일치하지 않습니다.');
                else if(data == 3) $(".extraWords").text('아이디는 3자리 이상 사용해주세요.');
 		    else $(".extraWords").text('아이디가 이미 사용중입니다. 다른 아이디로 가입해주세요.');
 		}
	});
});



$("#fb-register-btn").click(function()
{
    if ($("input:checkbox[name='agree']").is(":checked") == false) {
        $(".extraWords").text('이용약관 및 개인정보취급방침에 동의해주세요.')
        return;
    }

    var phone = $('#fb-phone').val();
    if (!phone) {
        $(".extraWords").text('핸드폰 번호를 입력해주세요.')
        return;
    }

    $.ajax({
        type : "POST",
        url : "/users/fbregister",
        cache : false,
        data : 'phone=' + $('#fb-phone').val() + '&authNum=' + $('input[name="fb-authNum"]').val(),
        success: function(data) {
            if(data==true) {
                $(".extraWords").text('회원가입이 완료되었습니다. 감사합니다');
                ga('send', 'event', {
                    eventCategory: '내부 이벤트',
                    eventAction: '회원 가입',
                    eventLabel: $('#fb-phone').val()
                });
                window.location.href = window.location.href.split(window.location.hash)[0];
            }
            else if(data == 2) $(".extraWords").text('문자인증 오류입니다. 문자로 안내받으신 인증번호를 잘못 입력하셨거나, 휴대폰 번호가 일치하지 않습니다.');
            else if(data == 3) $(".extraWords").text('페이스북 연동에 실패했습니다. 페이스북 로그인을 다시 시도해보시고, 로그인에 필요한 권한을 승인해주세요.');
            else {
                $(".extraWords").text('잘못된 경로로 접근하셨습니다 다시 시도해주세요');
                window.location.href = window.location.href.split(window.location.hash)[0];
            }

        }
    });
});

$('#register-auth-btn').click(function(){
    if($('#register-phone').val()) {
        $('input[name="authNum"]').show();
        if($('#phone-auth-check').val() == '1') return $(".extraWords").text('이미 문자로 인증번호가 발송되었습니다.');
        $.ajax({
            type : "POST",
            url : "/users/auth",
            cache : false,
            data : 'phone=' + $('#register-phone').val(),
            success: function(data) {
                if(data=='0') return $(".extraWords").text('최근 3개월 내에 이 휴대폰 번호로 가입된 아이디가 있습니다. 아이디가 기억나지 않으신다면 아이디 찾기 기능을 이용해주세요.')
                else if(data=='7') return $(".extraWords").text('해당 휴대폰 번호는 최근 3개월 내에 탈퇴한 이력이 있습니다. 탈퇴 후 3개월간 재가입이 불가능한 점 양해 부탁드립니다.')
                $('#phone-auth-check').val('1');
                $(".extraWords").text('인증번호가 카카오톡으로 발송되었습니다. (카카오톡 미가입 번호는 문자로 발송)')
            }
        });
    }
    else $(".extraWords").text('휴대폰 번호를 입력하셔야 인증이 가능합니다.');
})

$('#fb-auth-btn').click(function(){
    if($('#fb-phone').val()) {
        $('input[name="fb-authNum"]').show();
        if($('#phone-auth-check').val() == '1') return $(".extraWords").text('이미 문자로 인증번호가 발송되었습니다.');
        $.ajax({
            type : "POST",
            url : "/users/auth",
            cache : false,
            data : 'phone=' + $('#fb-phone').val(),
            success: function(data) {
                if(data=='0') return $(".extraWords").text('최근 3개월 내에 이 휴대폰 번호로 가입된 아이디가 있습니다. 아이디가 기억나지 않으신다면 아이디 찾기 기능을 이용해주세요.')
                else if(data=='7') return $(".extraWords").text('해당 휴대폰 번호는 최근 3개월 내에 탈퇴한 이력이 있습니다. 탈퇴 후 3개월간 재가입이 불가능한 점 양해 부탁드립니다.')
                $('#phone-auth-check').val('1');
                $(".extraWords").text('인증번호가 카카오톡으로 발송되었습니다. (카카오톡 미가입 번호는 문자로 발송)')
            }
        });
    }
    else $(".extraWords").text('휴대폰 번호를 입력하셔야 인증이 가능합니다.');
})

if(location.hash == '#fbl') {
    $('#menu-login').click()
    $('a[href="#register"]').attr('href','#fb-register');
    $('a[href="#fb-register"]').click()
    $('#fb-register').show();
}

function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) return unescape(y);
    }
}

if(getCookie('code')) {
    $('input[name="inviteCode"]').val(getCookie('code'));
    $('input[name="inviteAgree"]').click();
    $('input[name="inviteCode"]').show()
    $('.invite').css('display','block');
}

$('input[name="inviteAgree"]').click(function() {
    if($(this).is(":checked") == true) {
        $('input[name="inviteCode"]').show()
        $('.invite').css('display','block');
    } else {
        $('input[name="inviteCode"]').hide()
        $('.invite').css('display','none');
    }
})

if(isMobile) {
    window.addEventListener("popstate", function(){
        if(location.hash == '')
            allModalClose()
    }, false);
}

function allModalClose() {
    $('.modal-wrapper').fadeOut('20');
    $('body').css('overflow','auto');
}
