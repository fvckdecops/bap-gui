
/*
  [JS Index]

  ---

  Template:  Ner - Personal Portfolio Template.
  Template URL: http://nero-per.bitballoon.com
  Author:  design_grid
  Version: 1.0
*/


$(function () {

  "use strict";

  var wind = $(window);


  /* smooth scroll
  -------------------------------------------------------*/
  $.scrollIt({

    easing: 'swing',      // the easing function for animation
    scrollTime: 900,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null,    // function(pageIndex) that is called when page is changed
    topOffset: -63

  });


  /* navbar scrolling background and change logo
  -------------------------------------------------------*/
  wind.on("scroll",function () {

      var bodyScroll = wind.scrollTop(),
          navbar = $(".navbar");

      if(bodyScroll > 150){

          navbar.addClass("nav-scroll");
          $('.navbar-brand img').attr('src','/assets/img/logo.png');


      }else{

          navbar.removeClass("nav-scroll");
          $('.navbar-brand img').attr('src','/assets/img/logo.png');

      }

  });


  /* sections background image from data background
  -------------------------------------------------------*/
  $( ".cover-bg" ).each(function() {
    var attr = $(this).attr('data-image-src');

    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background-image', 'url('+attr+')');
    }

  });


  /* typejs
  -------------------------------------------------------*/
  $('.header .caption h2 span').typed({
    strings: ["Front End Dev.", "BackEnd Dev."],
    loop: true,
    startDelay: 1000,
    backDelay: 2000
  });


  /* progress bar
  -------------------------------------------------------*/
  wind.on('scroll', function () {
      $(".bar span").each(function () {
          var bottom_of_object =
          $(this).offset().top + $(this).outerHeight();
          var bottom_of_window =
          $(window).scrollTop() + $(window).height();
          var myVal = $(this).attr('data-width');
          if(bottom_of_window > bottom_of_object) {
            $(this).css({
              width : myVal
            });
          }
      });
  });


  /* Owl Caroursel testimonial
  -------------------------------------------------------*/
  $('.testimonial .owl-carousel').owlCarousel({
    loop:true,
    autoplay:true,
    items:1,
    margin:30,
    dots: false,
    nav: true,
    navText:['<span> <i class="jam jam-angle-left"></i> </span>',
        '<span> <i class="jam jam-angle-right"></i> </span>'],
  });

});


$(window).on("load",function (){

  /* Preloader
  -------------------------------------------------------*/
  $("#preloader").fadeOut(500);


  /* isotope
  -------------------------------------------------------*/
  var $gallery = $('.gallery').isotope({});
  $('.gallery').isotope({

      // options
      itemSelector: '.item-img',
      transitionDuration: '0.5s',

  });


  $(".gallery .single-image").fancybox({
    'transitionIn'  : 'elastic',
    'transitionOut' : 'elastic',
    'speedIn'   : 600,
    'speedOut'    : 200,
    'overlayShow' : false
  });


  /* filter items on button click
  -------------------------------------------------------*/
  $('.filtering').on( 'click', 'button', function() {

      var filterValue = $(this).attr('data-filter');

      $gallery.isotope({ filter: filterValue });

      });

  $('.filtering').on( 'click', 'button', function() {

      $(this).addClass('active').siblings().removeClass('active');

  });

})
