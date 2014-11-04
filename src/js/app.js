$(function(){
  var mySwiper = $('.swiper-container').swiper({
    pagination: '.pagination',
    loop:true,
    grabCursor: true,
    paginationClickable: true,
    autoplay: 4000,
    speed: 700
  });

/*  window.addEventListener('scroll', function(e){
      var distanceY = window.pageYOffset || document.documentElement.scrollTop,
          shrinkOn = 100,
          $logo = $(".logo img");
      if (distanceY > shrinkOn) {
          $logo.addClass("smaller");
      } else {
          if ($logo.hasClass("smaller")) {
          	$logo.removeClass("smaller");
          }
      }
  });
*/
})
