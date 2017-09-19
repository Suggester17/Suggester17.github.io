requirejs.config({
  baseURL: './public/js',
  paths: {
    jquery: 'libs/jquery',
    ready: 'libs/ready',
    slick: 'libs/slick',
    readmore: 'libs/readmore',
    magnificpopup: 'libs/jquery.magnific-popup'
  }
});

define (["jquery", "ready", "slick", "readmore", "magnificpopup"], function($) {
  "use strict";

  var IndexPage ={
  	init: function(){
  		this.slider();
  		this.read();
  		this.carousel();
      this.popup();
  	},
  	slider:function(){
  		$(".benefits__slider").slick({
  			slidesToShow: 3,
  			responsive: [
			    {
			      breakpoint: 1000,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,
			        dots: true
			      }
			    },
			    {
			      breakpoint: 768,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        dots: true
			      }
			    }
			  ]
    	});
  	},
  	read: function(){
      var heightLogos = 3*$('.small-logos-row').outerHeight();
          $('article').readmore({
            collapsedHeight: heightLogos,
            speed: 500,
            moreLink: '<a href="#">See all stores</a>',
            lessLink: '<a href="#">Close</a>'
          });
      $( window ).resize(function() {
          var heightLogos = 3*$('.small-logos-row').outerHeight();
      		$('article').readmore({
        		collapsedHeight: heightLogos,
        		speed: 500,
        		moreLink: '<a href="#">See all stores</a>',
      			lessLink: '<a href="#">Close</a>'
      		});
      });
  	},
  	carousel:function(){
  		$('.feedback__carousel').slick({
  			dots: true,
			infinite: true,
			speed: 300,
			fade: true,
			cssEase: 'linear'
  		});
  	},
    popup: function() {
      $('.footer__feedback_link').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
          beforeOpen: function() {
            if($(window).width() < 700) {
              this.st.focus = false;
            } else {
              this.st.focus = '#name';
            }
          }
        }
      });
    }
  };

  IndexPage.init();
});



  
 