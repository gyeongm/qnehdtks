$('.modal-search-wrapper').click(function (e){
    var container = $("#direct-search-modal");
    if(container.has(e.target).length === 0) {
        $('.modal-search-wrapper').fadeOut('20');
        location.hash = ''
        if(overflowHidden == false) $('body').css('overflow','auto');
    }
});

var overflowHidden = false;
var forContract = false;

$('#bldgfind-btn').click(function() {
    forContract = false;
    $('.search-head > span').text('건물찾기');
    ga('send', 'event', {
        eventCategory: '내부 이벤트',
        eventAction: '건물찾기 모달 오픈',
        eventLabel: ''
    });

  $('.modal-search-wrapper').fadeIn('20');

  if(isMobile == 'android') location.hash = 'modal'
  postAPI();
  if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
  }
  else {
      $('body').css('overflow','hidden');
  }
})


$('#menu-btn-search').click(function() {
    forContract = false;
    $('.search-head > span').text('건물찾기');
  $('.modal-search-wrapper').fadeIn('20');
  if(isMobile == 'android') location.hash = 'modal'
  postAPI();
  if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
  }
  else {
      $('body').css('overflow','hidden');
  }
})



$('#mobile-search-btn').click(function() {
    forContract = false;
    $('.search-head > span').text('건물찾기');
  $('.modal-search-wrapper').fadeIn('20');
  if(isMobile == 'android') location.hash = 'modal'
  postAPI();
  if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
  }
  else {
      $('body').css('overflow','hidden');
  }
})

function searchbtnClick() {
    $('#menu-btn-search').click();
}

$('#bldgContract-btn').click(function() {
    if(!user) {
        $("#menu-login").click();
        $(".extraWords").text(' * 계약서 작성 기능은 로그인 후 이용가능합니다.');
    }
    else {
        window.open('/contract')
    }
})


$('#menu-btn-contract').click(function() {
    if(!user) {
        $("#menu-btn-login").click();
        $(".extraWords").text(' * 계약서 작성 기능은 로그인 후 이용가능합니다.');
    }
    else {
        window.open('/contract')
    }
})


$('.search-modal-close').click(function() {
  $('.modal-search-wrapper').fadeOut('20');
  location.hash = ''
  if(overflowHidden == false) $('body').css('overflow','auto');
})

function directSearch(dong,search) {
    $.ajax({
        url: '/search/direct',
        type: 'get',
        data: 'dong='+dong+'&search='+search,
        beforeSend: function() {
            $('#direct-search-result').html('');
            $('.direct-search-loading').show();
        },
        success: function (buildings) {
            $('.direct-search-loading').hide();
            for(var i=0; i<buildings.length; i++) {
                var html='<div class="property-item modal-property-item" onclick="window.open(\'/building/'+buildings[i].id+'\',\'_blank\')">'
                if(buildings[i].thumbnail) {
                    html += '<div class="left-image modal-search-image" style="background-image:url(\'//file.ziptoss.com/bldg/'+buildings[i].thumbnail+'\')"></div><div style="display:inline-block;"><div class="title modal-title">'+buildings[i].danji+'</div><div class="description modal-description"><p>'+buildings[i].sido+' '+buildings[i].sigungu+' '+buildings[i].dong+' '+buildings[i].bonbun+'-'+buildings[i].bubun+'<br>'+buildings[i].buildYear+'년 준공, '+buildings[i].buildingType+'</div></div></div>';
                }
                else {
                    html += '<div class="left-image modal-search-image empty-thumbnail"><img src="/images/ziptosslogo_gr.png"></div><div style="display:inline-block;"><div class="title modal-title">'+buildings[i].danji+'</div><div class="description modal-description"><p>'+buildings[i].sido+' '+buildings[i].sigungu+' '+buildings[i].dong+' '+buildings[i].bonbun+'-'+buildings[i].bubun+'<br>'+buildings[i].buildYear+'년 준공, '+buildings[i].buildingType+'</div></div></div>';
                }


                $('#direct-search-result').append(html);
            }
            if(!buildings[0]) {
                $('#direct-search-result').html('<span style="text-align:center; font-size:14px;">검색결과가 없습니다. 아래 건물등록 기능을 이용하시면 건물을 직접 추가하여 리뷰를 남기실 수 있습니다.</span>')
                $('.bldg-register-search-btn').show();

            }
        }
    })
}



function buildingRegister() {
    $.ajax({
        type: "POST",
        url: '/building/register',
        data: $('#bldg-register-form').serialize(),
        success: function (result) {
            if(result==0) {
                alert('건축물대장에서 건물정보를 조회할 수 없습니다. 고객센터로 문의주세요.');
                $('#bldg-register-loading').hide();
            }
            else {
                if(forContract == true) window.location.href = '/building/contract/'+result.id;
                else {
                   if(userType == '9dong') {
                        if (isMobile == 'android') {
                            tsmart.open("ziptoss.com/9dong?user="+user+"&buildingId="+result.id+"&buildingTitle="+result.danji);
                        } else if (isMobile == 'ios') {
                            window.location="lffactory.tsmart://ziptoss.com/9dong?user="+user+"&buildingId="+result.id+"&buildingTitle="+result.danji;
                        }
                    } else window.location.href = '/building/'+result.id;
                    $('#bldg-register-loading').hide();
                    $('.modal-search-wrapper').fadeOut('20');
                }
            }
        }
    });
}


//여기부터 건물 등록을 위한 스크립트

var mapContainer2 = document.getElementById('bldg-register-map'), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

    //지도를 미리 생성
    var map2 = new daum.maps.Map(mapContainer2, mapOption);
    //주소-좌표 변환 객체를 생성
    var geocoder = new daum.maps.services.Geocoder();
    //마커를 미리 생성
    var marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(37.537187, 127.005476),
        map: map2
    });


    function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2addr(coords, callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2detailaddr(coords, callback);
    }
function fillzero(obj, len) {
  obj= '000000000000000'+obj;
  return obj.substring(obj.length-len);
}


 function postAPI() {



        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {

                $('#bldg-register-loading').show();
                 // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullAddr = data.address; // 최종 주소 변수
                var extraAddr = ''; // 조합형 주소 변수

                // 기본 주소가 도로명 타입일때 조합한다.
                if(data.addressType === 'R'){
                    //법정동명이 있을 경우 추가한다.
                    if(data.bname !== ''){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있을 경우 추가한다.
                    if(data.buildingName !== ''){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
                }

                // 주소 정보를 해당 필드에 넣는다.
                $('input[name="danji"]').val(data.buildingName);
                // 주소로 좌표를 검색
                if(!data.roadAddress) {
                    $('#bldg-register-loading').hide();
                    return alert('도로명주소가 여러개인 지번입니다. 원하는 건물의 도로명주소를 선택해주세요.');
                }
                geocoder.addr2coord(data.roadAddress, function(status, result) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === daum.maps.services.Status.OK) {

                        // 해당 주소에 대한 좌표를 받아서
                        var coords = new daum.maps.LatLng(result.addr[0].lat, result.addr[0].lng);

                        $('input[name="lat"]').val(result.addr[0].lat.toFixed(6));
                        $('input[name="lng"]').val(result.addr[0].lng.toFixed(6));

                        if($('input[name="danji"]').val() == '') $('input[name="danji"]').val(result.addr[0].newAddress.split('|')[0]);

                        var firstAddr = result.addr[0].newAddress.split('|')[0].split(' ')[1];
                        var bonbun = firstAddr.split('-')[0];
                        $('input[name="bonbun"]').val(fillzero(bonbun,4));
                        if(firstAddr.indexOf('-') != -1) var bubun = firstAddr.split('-')[1];
                        else var bubun = 0;
                        $('input[name="bubun"]').val(fillzero(bubun,4));

                        var bun = fillzero(bonbun,4);
                        var ji = fillzero(bubun,4);

                        if(!coords) {
                            $('#bldg-register-loading').hide();
                            return alert('다음 주소 API에서 오류가 발생했습니다. 고객센터로 문의해주세요.');
                        }
                        //행정동 조회
                        searchAddrFromCoords(coords, function(status, result) {
                            if (status === daum.maps.services.Status.OK) {
                                $('input[name="hdong"]').val(result[0].name);
                                $('input[name="sido"]').val(result[0].name1);
                                $('input[name="sigungu"]').val(result[0].name2);
                                buildingRegister();
                            }
                        });


                    }
                });

                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $('.building-register-addr').text(data.roadAddress);
                if(data.jibunAddress) $('.building-register-addr').text(data.jibunAddress);
                $('input[name="dong"]').val(data.bname);

                var roadAddress = data.roadAddress.split(" ");
                $('input[name="bldgBonbun"]').val(roadAddress[roadAddress.length-1].split("-")[0]);
                if(roadAddress[roadAddress.length-1].indexOf("-") != -1) $('input[name="bldgBubun"]').val(roadAddress[roadAddress.length-1].split("-")[1]);
                else $('input[name="bldgBubun"]').val(0);

                var roadName = roadAddress[roadAddress.length-2];
                $('input[name="roadName"]').val(roadName);
                if(roadName.substr(roadName.length-1,1)=='로') $('input[name="isMainSt"]').val(1);

                $('input[name="sigunguCd"]').val(data.bcode.substr(0,5));
                $('input[name="bjdongCd"]').val(data.bcode.substr(5,5));



                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                //element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                //document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            pleaseReadGuide: 3,
            width : '100%',
            height : '100%'
        }).embed(element_wrap, {
            autoClose: false //기본값 true
            });



 }
 var element_wrap = document.getElementById('wrap');
 
