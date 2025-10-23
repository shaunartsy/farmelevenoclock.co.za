(function ($) {
  "use strict";

  /*===========================================
        Table of contents
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Popup Sidemenu
    08. Search Box Popup
    09. Magnific Popup
    10. Woocommerce Toggle
    11. Filter Active
    12. Range Slider
    13. Quantity Added
    14. Offer Count Down
    15. Global Toggle
    16. Box Nav Toggler
    17. WOW Js (Scroll Animation) 
    18. Custom Animaiton
    19. Tab Indicator
    20. Testimonial Slider
    00. Right Click Disable
    00. Inspect Element Disable
  =============================================*/


  /*---------- 01. On Load Function ----------*/
  $(window).on('load', function () {
    // Ensure preloader shows for minimum 2.5 seconds for better user experience
    setTimeout(function() {
      $('.preloader').fadeOut(500);
    }, 2500);
  });



  /*---------- 02. Preloader ----------*/
  if ($('.preloader').length > 0) {
    // Fallback: Hide preloader after maximum 5 seconds regardless of load state
    setTimeout(function() {
      if ($('.preloader').is(':visible')) {
        $('.preloader').fadeOut(500);
      }
    }, 5000);
  };


  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();


  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = '';
  var scrollToTopBtn = '.scrollToTop'

  function stickyMenu($targetMenu, $toggleClass) {
    var st = $(window).scrollTop();
    if ($(window).scrollTop() > 600) {
      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);

      } else {
        $targetMenu.addClass($toggleClass);
      };
    } else {
      $targetMenu.removeClass($toggleClass);
    };
    lastScrollTop = st;
  };
  $(window).on("scroll", function () {
    stickyMenu($('.sticky-header'), "active");
    if ($(this).scrollTop() > 400) {
      $(scrollToTopBtn).addClass('show');
    } else {
      $(scrollToTopBtn).removeClass('show');
    }
  });

/*---------- 04.1. Navigation Background on Scroll ----------*/
$(window).on("scroll", function () {
  var scrollTop = $(this).scrollTop();
  if (scrollTop > 50) {
    $('.header-wrapper').addClass('scrolled');
  } else {
    $('.header-wrapper').removeClass('scrolled');
  }
});

/*---------- 04.2. Video Play/Pause Control ----------*/
$(document).ready(function() {
  const video = document.getElementById('background-video');
  const controlBtn = document.getElementById('video-control-btn');
  const playIcon = controlBtn.querySelector('i');
  
  if (video && controlBtn) {
    // Toggle play/pause on button click
    controlBtn.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playIcon.className = 'fas fa-pause';
      } else {
        video.pause();
        playIcon.className = 'fas fa-play';
      }
    });
    
    // Update button icon when video state changes
    video.addEventListener('play', function() {
      playIcon.className = 'fas fa-pause';
    });
    
    video.addEventListener('pause', function() {
      playIcon.className = 'fas fa-play';
    });
  }
});



  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'easeOutIn');

    return false;
  });




  /*---------- 06. Set Background Image ----------*/
  if ($('[data-bg-src]').length > 0) {
    $('[data-bg-src]').each(function () {
      var src = $(this).attr('data-bg-src');
      $(this).css({
        'background-image': 'url(' + src + ')'
      });
    });
  };





  /*---------- 07. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on('click', function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls)
    });
    var sideMenuChild = $sideMenu + ' > div';
    $(sideMenuChild).on('click', function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls)
    });
    $($sideMenuCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  };
  popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');





  /*---------- 08. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on('click', function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on('click', function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox).find('form').on('click', function (e) {
      e.stopPropagation();
      $($searchBox).addClass($toggleCls);
    });
    $($searchCls).on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  };
  popupSarchBox('.popup-search-box', '.searchBoxTggler', '.searchClose', 'show');



  /*----------- 09. Magnific Popup ----------*/
  /* magnificPopup img view */
  $('.popup-image').magnificPopup({
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  /* magnificPopup video view */
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });



  /*----------- 10. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $('#ship-to-different-address-checkbox').on('change', function () {
    if ($(this).is(':checked')) {
      $('#ship-to-different-address').next('.shipping_address').slideDown();
    } else {
      $('#ship-to-different-address').next('.shipping_address').slideUp();
    }
  });

  // Login Toggle
  $('.woocommerce-form-login-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-login').slideToggle();
  })

  // Coupon Toggle
  $('.woocommerce-form-coupon-toggle a').on('click', function (e) {
    e.preventDefault();
    $('.woocommerce-form-coupon').slideToggle();
  })

  // Woocommerce Shipping Method
  $('.shipping-calculator-button').on('click', function (e) {
    e.preventDefault();
    $(this).next('.shipping-calculator-form').slideToggle();
  })

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked').siblings('.payment_box').show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on('change', function () {
      $('.payment_box').slideUp();
      $(this).siblings('.payment_box').slideDown();
    })
  })

  // Woocommerce Rating Toggle
  $('.rating-select .stars a').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $(this).parent().parent().addClass('selected');
      $(this).addClass('active');
    });
  })




  /*----------- 11. Filter Active ----------*/
  $('.filter-active').imagesLoaded(function () {
    var $filter = '.filter-active',
      $filterItem = '.grid-item',
      $filterMenu = '.filter-menu-active';

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: '*',
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem
        }
      });
    }

    if ($($filterMenu).length > 0) {
      // filter items on button click
      $($filterMenu).on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });

      // Menu Active Class 
      $($filterMenu).on('click', 'button', function (event) {
        event.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.active').removeClass('active');
      });
    };
  });



  /*----------- 12. Range Slider ----------*/
  $("#slider-range").slider({
    range: true,
    min: 40,
    max: 300,
    values: [60, 570],
    slide: function (event, ui) {
      $("#minAmount").text("$" + ui.values[0]);
      $("#maxAmount").text("$" + ui.values[1]);
    }
  });
  $("#minAmount").text("$" + $("#slider-range").slider("values", 0));
  $("#maxAmount").text("$" + $("#slider-range").slider("values", 1));



  /*---------- 13. Quantity Added ----------*/
  $('.quantity-plus').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    })
  });

  $('.quantity-minus').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  })




  /*---------- 14. Offer Count Down ----------*/
  $.fn.countdown = function () {
    $(this).each(function () {
      var $counter = $(this),
        countDownDate = new Date($counter.data('offer-date')).getTime(), // Set the date we're counting down to
        dateWrapper = '<span class="number"></span>', // Wrapper Where Date Will Be Print
        exprireCls = 'expired';

      // Finding Function
      function s$(element) {
        return $counter.find(element);
      }

      // Prepend The Wrapper 
      s$('.day').prepend(dateWrapper);
      s$('.hour').prepend(dateWrapper);
      s$('.minute').prepend(dateWrapper);
      s$('.second').prepend(dateWrapper);

      // Update the count down every 1 second
      var counter = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(counter);
          $counter.addClass(exprireCls);
          $counter.find('.message').css('display', 'block');
        } else {
          // Output the result in elements
          s$('.day .number').html(days + ' ')
          s$('.hour .number').html(hours + ' ')
          s$('.minute .number').html(minutes + ' ')
          s$('.second .number').html(seconds + ' ')
        }
      }, 1000);
    })
  }

  if ($('.flash-counter').length) {
    $('.flash-counter').countdown()
  }

  if ($('.deal-counter').length) {
    $('.deal-counter').countdown()
  }


  /*----------- 15. Global Toggle ----------*/
  function toggleGlobal(sBtn, sMenu) {
    sBtn.each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        var cBtn = $(this);
        if (cBtn.hasClass('active')) {
          cBtn.removeClass('active').next(sMenu).removeClass('show').slideUp();
        } else {
          cBtn.addClass('active').next(sMenu).addClass('show').slideDown();
        }
      })
    })
  };


  /*----------- 16. Box Nav Toggler ----------*/
  $.fn.boxNav = function (btn, subParent, subMenu) {
    var $nav = $(this),
      $btn = $(btn),
      $childBtn = $nav.find(subParent);
    // Window Size Check
    if ($(window).width() < 1199.99) {
      toggleGlobal($btn, $nav);
      toggleGlobal($childBtn, subMenu);
    }
  };

  if ($('.vs-box-nav').length > 0) {
    $('.vs-box-nav').boxNav('.box-nav-btn', '.menu-item-has-children > a', 'ul');
  }


  /*----------- 17. WOW Js (Scroll Animation) ----------*/
  new WOW().init();



  /*----------- 18. Custom Animaiton ----------*/
  $('[data-ani-duration]').each(function () {
    var durationTime = $(this).data('ani-duration');
    $(this).css('animation-duration', durationTime);
  });

  $('[data-ani-delay]').each(function () {
    var delayTime = $(this).data('ani-delay');
    $(this).css('animation-delay', delayTime);
  });

  $('[data-ani]').each(function () {
    var animaionName = $(this).data('ani');
    $(this).addClass(animaionName);
    $('.slick-current [data-ani]').addClass('vs-animated');
  });

  $('.vs-carousel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('[data-ani]').removeClass('vs-animated');
    $('.slick-current [data-ani]').addClass('vs-animated');
  });

  // Woocommerce Rating Toggle
  $('.rating-select .stars a').each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $(this).parent().parent().addClass('selected');
      $(this).addClass('active');
    });
  })


/*----------- 19. Tab Indicator ----------*/
  // Indicator
  $.fn.indicator = function () {
    var $menu = $(this),
      $linkBtn = $menu.find('a'),
      $btn = $menu.find('button');
    // Append indicator
    $menu.append('<span class="indicator"></span>');
    var $line = $menu.find('.indicator');
    // Check which type button is Available
    if ($linkBtn.length) {
      var $currentBtn = $linkBtn;
    } else if ($btn.length) {
      var $currentBtn = $btn
    }
    // On Click Button Class Remove
    $currentBtn.on('click', function (e) {
      e.preventDefault();
      $(this).addClass('active');
      $(this).siblings('.active').removeClass('active');
      linePos()
    })
    // Indicator Position
    function linePos() {
      var $btnActive = $menu.find('.active'),
        $height = $btnActive.css('height'),
        $width = $btnActive.css('width'),
        $top = $btnActive.position().top + 'px',
        $left = $btnActive.position().left + 'px';
      $line.css({
        top: $top,
        left: $left,
        width: $width,
        height: $height,
      })
    }

    // if ($menu.hasClass('vs-slider-tab')) {
    //   var linkslide = $menu.data('asnavfor');
    //   $(linkslide).on('afterChange', function (event, slick, currentSlide, nextSlide) {
    //     setTimeout(linePos, 10)
    //   });
    // }
    linePos()
  }

  // Call On Load
  if ($('.filter-menu').length) {
    $('.filter-menu').indicator();
  }

  if ($('.product-tab').length) {
    $('.product-tab').indicator();
  }




  /*----------- 20. Testimonial Slider ----------*/
  $('#testis_4_1').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '#testis_4_2, #testis_4_3',
    responsive: [{
      breakpoint: 1500,
      settings: {
        arrows: false
      }
    }]
  });

  $("#testis_4_2").slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: false,
    speed: 1000,
    slidesToShow: 5,
    vertical: true,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    asNavFor: "#testis_4_1, #testis_4_3",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          vertical: false,
          slidesToShow: 4,
        },
      },
    ],
  });

  $('#testis_4_3').slick({
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '#testis_4_2, #testis_4_1'
  });



   /*---------- 20. Counter Animation ----------*/
   function animateCounter(counter) {
    const targetValue = parseInt(counter.getAttribute("data-counter"));
    const animationDuration = 1000; // Set the desired animation duration in milliseconds
    const startTimestamp = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, 1);

      const currentValue = Math.floor(targetValue * progress);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counter-number");
        animateCounter(counter);
        // observer.unobserve(entry.target);
      }
    });
  }

  const counterObserver = new IntersectionObserver(startCounterAnimation, {
    rootMargin: "0px",
    threshold: 0.2, // Adjust the threshold value as needed (0.2 means 20% visibility)
  });

  const counterBlocks = document.querySelectorAll(".counter-style");
  counterBlocks.forEach((counterBlock) => {
    counterObserver.observe(counterBlock);
  });


  /*----------- 00. Right Click Disable ----------*/
  // window.addEventListener('contextmenu', function (e) {
  //   // do something here... 
  //   e.preventDefault();
  // }, false);


  /*----------- 00. Inspect Element Disable ----------*/
  // document.onkeydown = function (e) {
  //   if (event.keyCode == 123) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
  //     return false;
  //   }
  //   if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
  //     return false;
  //   }
  // }


  /*===========================================
        21. Smooth Scrolling for Anchor Links
  =============================================*/
  
  // Enhanced easing functions for smoother animations
  $.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  };
  
  // Custom easeOutIn for different scroll feel
  $.easing.easeOutIn = function (x, t, b, c, d) {
    if (t < d/2) return c/2 * (1 - Math.pow(1 - 2*t/d, 2)) + b;
    return c/2 * Math.pow(2*t/d - 1, 2) + b + c/2;
  };
  
  // Enhanced smooth scrolling for all anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = $(this.getAttribute('href'));
    if (target.length) {
      var headerHeight = $('.header-wrapper').outerHeight() || 0;
      var offset = headerHeight + 45; // Slightly increased padding for better spacing
      
      // Calculate scroll distance for dynamic duration
      var currentScroll = $(window).scrollTop();
      var targetScroll = target.offset().top - offset;
      var scrollDistance = Math.abs(currentScroll - targetScroll);
      
      // Much faster, more responsive timing
      var duration;
      if (scrollDistance < 300) {
        duration = 300; // Very quick response for short distances
      } else if (scrollDistance < 800) {
        duration = 500; // Faster medium distance
      } else {
        duration = 800; // Faster longer distance
      }
      
      $('html, body').animate({
        scrollTop: targetScroll
      }, duration, 'easeOutIn');
    }
  });
  
  // Enhanced footer links with improved timing
  $('.footer-widget a[href^="#"], .widget_nav_menu a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    
    var target = $(this.getAttribute('href'));
    if (target.length) {
      var headerHeight = $('.header-wrapper').outerHeight() || 0;
      var offset = headerHeight + 55; // Extra padding for footer links
      
      var currentScroll = $(window).scrollTop();
      var targetScroll = target.offset().top - offset;
      var scrollDistance = Math.abs(currentScroll - targetScroll);
      
      // Same speed as main navigation
      var duration;
      if (scrollDistance < 300) {
        duration = 300; // Very quick response for short distances
      } else if (scrollDistance < 800) {
        duration = 500; // Faster medium distance
      } else {
        duration = 800; // Faster longer distance
      }
      
      $('html, body').animate({
        scrollTop: targetScroll
      }, duration, 'easeOutIn');
    }
  });

  // Force dropdown option styling for contact form
  $(document).ready(function() {
    // Apply custom styling to select options
    $('select option').on('mouseenter', function() {
      $(this).css({
        'background-color': '#E24D4D',
        'color': 'white'
      });
    });
    
    $('select option').on('mouseleave', function() {
      $(this).css({
        'background-color': 'white',
        'color': '#333'
      });
    });
    
    // Force styling on dropdown open
    $('select').on('focus', function() {
      $(this).find('option').css({
        'background-color': 'white',
        'color': '#333'
      });
    });
  });


})(jQuery);

