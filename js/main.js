$(function () {
    //Loading Screen:
    $('#loading').fadeOut(1000,function(){
        $('body').css('overflow','auto');
    });

    //hide navbar in scrolldown and show in scroll top...
    let lastScrollTop = 0;
    let navBar = $('.navbar');

    $(window).scroll(function () {
        let scroll = $(this).scrollTop();

        if (scroll > lastScrollTop) {
            navBar.css('backgroundColor', '#333333').addClass('hide');
        } else {
            navBar.removeClass('hide');
        }
        lastScrollTop = scroll
    });

    //Smooth scrolling on click to nav
    $('.navbar-nav a.nav-link').on('click', function (e) {
        e.preventDefault();

        let aHref = $(this).attr('href');
        
        $('body,html').animate({
            scrollTop: $(aHref).offset().top
        }, 500);
    })

    $(window).scroll(function () {
        let currentScrollPos = $(document).scrollTop();

        //Iterate through all links
        $('.navbar-nav a.nav-link').each(function () {

            let curLink = $(this);
            let currLinkSection = $(curLink.attr('href'));

            if (currLinkSection.offset().top <= currentScrollPos && currLinkSection.offset().top + currLinkSection.height() > currentScrollPos) {
                //Remove class active in all nav
                $('.navbar-nav nav-item').removeClass("active");
                //Add class active
                curLink.parent().addClass("active");
            }
            else {
                curLink.parent().removeClass("active");
            }
        })

    });

    // Animated Typing h1 text
    const texts = ['Designer', 'Developer'];
    let textIndex = 0;
    let letterIndex = 0;
    let text = '';
    let letter = '';

    (function type() {

        if (textIndex === texts.length) {
            textIndex = 0;
        }
        text = texts[textIndex];

        letter = text.slice(0, ++letterIndex);

        $('header .typing').text(letter);

        if (letter.length === text.length) {
            textIndex++;
            letterIndex = 0;

        }

        setTimeout(type, 300)

    }());

    // Portfolio shuflle"
    $('.portfolio ul li').on("click", function () {
        var name = $(this).data('class');

        $(this).addClass('active').siblings().removeClass('active');

        if (name === 'all') {

            $('.shuffle-images .col-md-4').show(1000);

        } else {

            $('.shuffle-images .col-md-4').not(name).hide(1000);
            $('.shuffle-images .col-md-4').filter(name).show(1000)
        }
    });

    //Portifolio PupUp Window

    $('.shuffle-images .col-md-4.imgpop').on('click', function () {
        let imageNum = $(this).find('img').data('number');
        let imgSrc = $(this).find('img').attr('src');
        $('.modal.images').modal('show');
        $('#popup-img').attr('src', imgSrc);
        $('.modal.images span.activeBage').text(imageNum);
    });

    $('.modal.images i.fa-caret-right').on('click', function () {

        alert($(this).parent())
    });

    $('.shuffle-images .col-md-4.link').on('click', function () {
        let imgSrc = $(this).find('img').attr('src');
        $('.modal.links').modal('show');
        $('#linkImg').attr('src', imgSrc);
    });

    //Blog Section
    var imgHeight = $('.blog-card img').height();
    $('.blog-card iframe').height(imgHeight);

    //Statistics Counter 

    let scrollCount = 1;
    let counterTop = $('.statistics').offset().top;

    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= (counterTop - 500)) {
            timerId = setTimeout(function () {

                var maxCounts = [],
                    maxDivides = [],
                    counts = [];

                $('.num').each(function (index, el) {

                    maxCount = $(this).attr('data-count-val');
                    maxCount = parseInt(maxCount);
                    maxCounts.push(maxCount);

                    maxDivide = $(this).attr('data-count-addition');
                    maxDivide = parseInt(maxDivide);
                    maxDivides.push(maxDivide);

                    count = $(this).attr('data-count-start');
                    count = parseInt(count);
                    counts.push(count);

                    function countUp() {

                        counts[index] += maxDivides[index];

                        $('.num').eq(index).text(counts[index].toLocaleString());

                        if (counts[index] > maxCounts[index]) {
                            $('.num').eq(index).text(maxCounts[index].toLocaleString());
                        }
                    }
                    setInterval(function () {

                        if (counts[index] < maxCounts[index]) {
                            countUp();
                        }
                    });
                });
                scrollCount = 2;
            })
            if (scrollCount == 2) {
                clearTimeout(timerId);
            }
        }
    });

    //Scroll Top Button:
    let aboutOffset = $('#about').offset().top;
    let btnTop = $('#btn-top');

    $(window).scroll(function () {
        let wScroll = $(window).scrollTop();

        if (wScroll > aboutOffset - 30) {
            btnTop.fadeIn(500)
        } else {
            btnTop.fadeOut(500)
        }
    });

    btnTop.on('click',function(){
        $('html,body').animate({scrollTop:'0'},1000)
    })

    //Colors Option:
    let optionContainer = $('#optionContainer');
    let optionBoxWidth =  $('#optionContainer .option-box').outerWidth(true);
    let optionIcon = $('#optionContainer .option-icon')
    let colorItems = $('#optionContainer span.color-item');

    colorItems.eq(0).css('backgroundColor','#ff305b');
    colorItems.eq(1).css('backgroundColor','teal');
    colorItems.eq(2).css('backgroundColor','lightgreen');
    colorItems.eq(3).css('backgroundColor','lightgray');
    colorItems.eq(4).css('backgroundColor','lightblue');

    colorItems.on('click',function(){
        let currItem = $(this).data('class');
        let linkHref = $('link[href*="Theme"]');
        linkHref.attr('href',currItem);
    });
    
    optionContainer.offset({left: -optionBoxWidth});

    optionIcon.on('click',function(){

        if(optionContainer.offset().left < 0){
        optionContainer.animate({left:'0'} , 1000);
        }else{
            optionContainer.animate({left:-optionBoxWidth} , 1000);
        }

    });
    



});