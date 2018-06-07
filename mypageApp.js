$('#update-btn').click(function(){
    $('#mypage-form').serialize();
    $.ajax({
        url : '/users/update',
        type : 'post',
        data : $('#mypage-form').serialize(),
        success : function(data){
            if(data == 'authfailed') {
                alert('인증 번호나 휴대폰 번호가 잘못되었습니다.')
            }
            else if(data == 'passwordisntsame') {
                alert('기존 비밀번호와 다릅니다')
            }
            else if(data == 'cannotfinduser') {
                alert('유저를 찾을 수 없습니다. 다시 로그인 해주세요')
            }
            else {
                alert('회원 정보 수정이 완료되었습니다')
                window.location.reload();
            }
        }
    })
})

$('#update-phone-btn').click(function(){
    $.ajax({
        url : '/users/updatephone',
        type : 'post',
        data : 'phone=' + $('#phone-input').val() + '&authNum=' + $('#authNum').val(),
        success : function(data){
            if(data) {
                alert('연락처 수정이 완료되었습니다')
                window.location.reload();
            }
            else {
                alert('번호를 다시 확인해주세요.')
            }
        }
    })
})

var phoneUpdate = 0;

$('#phone-auth-btn').click(function(){
    if(phoneUpdate == 0) {
        $('#phone-input').removeAttr("disabled");
        $(this).val('인증');
        $(this).parent().append('<input type="text" id="authNum" name="authNum" placeholder="인증번호">')
        phoneUpdate = 1;
    }
    else {
        $.ajax({
            url : '/users/auth',
            type : 'post',
            data : 'phone=' + $('#phone-input').val(),
            success : function(data) {
                console.log(data)
                if(data == '0') return alert('이미 이 휴대폰 번호로 가입된 아이디가 있습니다.')
                else if(data == '7') return alert('이미 이 휴대폰 번호로 가입 후 탈퇴한 아이디가 있습니다.')
                else return alert('인증번호가 전송되었습니다.')
            }
        })
    }
})

function gotoMap() {
    if(history.length == 1 && document.referrer.indexOf('ziptoss') != -1) {
        window.open("about:blank","_self").close();
    }
    else if(history.length > 1) history.back();
    else location.href = '/map';
}

function propertyUserDelete(id) {
    $.ajax({
        url : '/property/userDelete',
        type : 'post',
        data : 'id=' + id,
        success : function(data) {
            if(data == '1') alert('완료')
            else alert('실패')
        }
    })
}

function propertyUserShow(id) {
    $.ajax({
        url : '/property/userShow',
        type : 'post',
        data : 'id=' + id,
        success : function(data) {
            if(data == '1') alert('완료')
            else alert('실패')
        }
    })
}
