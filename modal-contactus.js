$('.modal-contactus-wrapper').click(function(){
    $('.modal-contactus-wrapper').fadeOut('20');
    setCookie('gwanakMove','Y',10);
    location.hash = ''
  if(overflowHidden == false) $('body').css('overflow','auto');
});

var overflowHidden = false;


function setCookie(name, value, expiredays) {
   var todayDate = new Date();
   todayDate.setDate(todayDate.getDate() + expiredays);
   document.cookie = name + "=" + value + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name) {
   var start, end;
   var i = 0;
   while (i <= document.cookie.length) {
      start = i;
      end = start + name.length;
      if (document.cookie.substring(start, end) == name) {
         start = end + 1;
         end = document.cookie.indexOf(";", start);
         if (end < start)
            end = document.cookie.length;
         return document.cookie.substring(start, end)
      }
      i++
   }
   return ""
}

function openModal() {
    $('.modal-contactus-wrapper').fadeIn('20');
    if(isMobile == 'android') location.hash = 'modal'
    if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
    }
    else {
      $('body').css('overflow','hidden');
    }
}

$('#menu-btn-contactus').click(function() {
    $('.modal-contactus-wrapper').fadeIn('20');
    if(isMobile == 'android') location.hash = 'modal'
    if($('body').css('overflow') == 'hidden') {
      overflowHidden = true;
    }
    else {
      $('body').css('overflow','hidden');
    }
})


// if(!getCookie('gwanakMove') && window.location.pathname.indexOf('/map') != -1) {
// 	setTimeout(function() {
// 		openModal()
// 	},1000)
// }
