
$(document).ready(function(){

    //preloader
    $(window).on('load',function() {
        preloaderFadeOutTime = 500;
        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            preloader.fadeOut(preloaderFadeOutTime);
        }
        hidePreloader();
    });

    //    $(function() {
    //     "use strict";

    //     var toggles = document.querySelectorAll(".c-hamburger");

    //     for (var i = toggles.length - 1; i >= 0; i--) {
    //         var toggle = toggles[i];
    //         toggleHandler(toggle);
    //     };

    //     function toggleHandler(toggle) {
    //         toggle.addEventListener( "click", function(e) {
    //             e.preventDefault();
    //             (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    //         });
    //     }
    // });

    $('.animated-icon1,.animated-icon3,.animated-icon4').click(function(){
        $(this).toggleClass('open');
    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var nav = $('.nav-menu');    
    fixMenu();
    function fixMenu(){
        var intLimit = 800;
        $(window).scroll(function () {      
            if ($(this).scrollTop() > intLimit) { 
                nav.addClass("menu-outside"); 
            } else { 
                nav.css('top',40 - $(this).scrollTop()+"px");
                nav.removeClass("menu-outside"); 
                
            } 
        }); 
    }

    /* localscroll */
    $('a[href*="#"]').bind('click', function(e) {
        e.preventDefault(); // prevent hard jump, the default behavior

        var target = $(this).attr("href"); // Set the target as variable
        console.log(target);

        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({
            scrollTop: ($(target).offset().top -60)
        }, 600, function() {
            location.hash = target; //attach the hash (#jumptarget) to the pageurl
        });

        return false;
    });
    /* fim local scroll */

    /* hilight menuscroll */
    $(window).scroll(function() {
        var position = $(this).scrollTop();
        $('.page-section').each(function() {
            var target = $(this).offset().top-60;
            var id = $(this).attr('id');

            if (position >= target) {
                $('.navbar-nav').find('a').parent().removeClass('active');
                $('.navbar-nav').find('a[href*=' + id + ']').parent().addClass('active');
            }
        });
    });
    /* hilight menuscroll */

	/* enviar contato */
    $('.loading').fadeOut('fast');
    //$('.loading').fadeIn('fast');
    $('#form-contato').submit(function(e){
        e.preventDefault();
        $.ajax({
            url: $themeUrl+"/send-contato.php",
            type:'post',
            data:$('#form-contato').serialize(),
            success: function(data) { 
                $('#form-contato #sub-contato .value').text(data);
                //ga('send', 'event', 'formulario-site', 'formulario-enviado', 'formulario-enviado'); //rastrear evento analytics
            },
            beforeSend: function() {
                $('.loading').fadeIn('fast');
                $('#form-contato #sub-contato .value').text("Enviando");
                $('#form-contato #sub-contato').attr('disabled','disabled');
            },
            complete: function(){ 
                $('.loading').fadeOut('fast'); 
            }
        });
    });
    $('.mask').click( function(){

        $('#video').get(0).play();       // get(0) gets the original DOM element
        $('.trabalhos .mask-hover').css('opacity', '0');
        $('#video').attr('controls', 'true');
    });
});