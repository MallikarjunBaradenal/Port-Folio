(function ($) {
    "use strict";

    // ==============================
    // Loader
    // ==============================
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };

    loader();


    // ==============================
    // Initiate WOW.js
    // ==============================
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }


    // ==============================
    // Back to Top Button
    // ==============================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate(
            {
                scrollTop: 0
            },
            1500,
            'easeInOutExpo'
        );

        return false;
    });


    // ==============================
    // Sticky Navbar
    // ==============================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });


    // ==============================
    // Smooth Scrolling
    // ==============================
    $(".navbar-nav a").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();

            var target = $(this.hash);

            if (target.length) {
                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - 45
                    },
                    1500,
                    'easeInOutExpo'
                );
            }

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // ==============================
    // Typed Text
    // ==============================
    if ($('.hero .hero-text h2').length === 1) {

        var typed_strings = $('.hero .hero-text .typed-text').text();

        if (typeof Typed !== 'undefined') {
            new Typed('.hero .hero-text h2', {
                strings: typed_strings.split(', '),
                typeSpeed: 100,
                backSpeed: 20,
                smartBackspace: false,
                loop: true
            });
        }
    }


    // ==============================
    // Skills Progress Bar
    // ==============================
    if ($('.skills').length && typeof $.fn.waypoint !== 'undefined') {

        $('.skills').waypoint(function () {

            $('.progress .progress-bar').each(function () {

                $(this).css(
                    "width",
                    $(this).attr("aria-valuenow") + '%'
                );

            });

        }, {
            offset: '80%'
        });
    }


    // ==============================
    // Testimonials Carousel
    // ==============================
    if ($(".testimonials-carousel").length &&
        typeof $.fn.owlCarousel !== 'undefined') {

        $(".testimonials-carousel").owlCarousel({
            center: true,
            autoplay: true,
            dots: true,
            loop: true,

            responsive: {
                0: {
                    items: 1
                }
            }
        });
    }


    // ==================================================
    // CONTACT FORM
    // ==================================================
    // Uses FormSubmit AJAX so the portfolio can work
    // on Vercel without PHP/backend hosting.
    // ==================================================

    $('#contactForm').on('submit', async function (event) {

        event.preventDefault();

        const form = this;

        const button = $('#sendMessageButton');

        const status = $('#contactStatus');


        // ------------------------------
        // Get form values
        // ------------------------------

        const name = $('#name').val().trim();

        const email = $('#email').val().trim();

        const subject = $('#subject').val().trim();

        const message = $('#message').val().trim();


        // Clear previous message
        status
            .removeClass('success error')
            .text('');


        // ------------------------------
        // Validation
        // ------------------------------

        if (!name || !email || !subject || !message) {

            status
                .addClass('error')
                .text('Please fill in all fields.');

            return;
        }


        // ------------------------------
        // Email validation
        // ------------------------------

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            status
                .addClass('error')
                .text('Please enter a valid email address.');

            return;
        }


        // ------------------------------
        // Disable button
        // ------------------------------

        const originalText = button.text();

        button
            .prop('disabled', true)
            .text('Sending...');


        // ------------------------------
        // Send message
        // ------------------------------

        try {

            const response = await fetch(
                'https://formsubmit.co/ajax/mallikarjunbaradenal5@gmail.com',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        subject: subject,

                        message: message,

                        _subject:
                            'New Portfolio Contact — Mallikarjun Baradenal',

                        _captcha: 'false',

                        _template: 'table',

                        _url:
                            'https://mallikarjun-portfoolio.vercel.app/#contact'
                    })
                }
            );


            // ------------------------------
            // Parse response
            // ------------------------------

            const data =
                await response
                    .json()
                    .catch(() => ({}));


            // ------------------------------
            // Check response
            // ------------------------------

            if (
                !response.ok ||
                data.success === false
            ) {

                throw new Error(
                    data.message ||
                    'Unable to send your message right now.'
                );
            }


            // ------------------------------
            // Success
            // ------------------------------

            status
                .addClass('success')
                .text(
                    'Message sent successfully. Thank you for contacting me!'
                );


            // Clear form
            form.reset();


        } catch (error) {

            console.error(
                'Contact form error:',
                error
            );


            status
                .addClass('error')
                .text(
                    'Unable to send your message right now. Please try again or email me directly.'
                );


        } finally {

            // Enable button again
            button
                .prop('disabled', false)
                .text(originalText);
        }

    });


    // ==============================
    // Portfolio Filter
    // ==============================

    if (
        $('.portfolio-container').length &&
        typeof $.fn.isotope !== 'undefined'
    ) {

        var portfolioIsotope =
            $('.portfolio-container').isotope({

                itemSelector: '.portfolio-item',

                layoutMode: 'fitRows'

            });


        $('#portfolio-filter li').on(
            'click',
            function () {

                $("#portfolio-filter li")
                    .removeClass('filter-active');

                $(this)
                    .addClass('filter-active');

                portfolioIsotope.isotope({

                    filter: $(this).data('filter')

                });

            }
        );
    }


})(jQuery);
