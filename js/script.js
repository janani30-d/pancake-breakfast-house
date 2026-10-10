/* =========================================================
   PANCAKE & BREAKFAST HOUSE
   PART 4 — COMPLETE JAVASCRIPT

   Works with:

   #menuToggle
   #mainNav
   #rtlToggle
   #darkModeToggle

   .nav-dropdown
   .nav-dropdown-toggle
   .nav-dropdown-menu

========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const html = document.documentElement;
    const body = document.body;

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const darkModeToggle =
        document.getElementById("darkModeToggle");


    /* =====================================================
       DROPDOWN ELEMENTS
    ====================================================== */

    const dropdowns =
        document.querySelectorAll(".nav-dropdown");


    /* =====================================================
       SAFETY CHECK
    ====================================================== */

    if (!mainNav) {
        return;
    }


    /* =====================================================
       01. HAMBURGER MENU
    ====================================================== */

    function openMobileMenu() {

        mainNav.classList.add("is-open");

        if (menuToggle) {

            menuToggle.classList.add("is-active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");
            }
        }
    }


    function closeMobileMenu() {

        mainNav.classList.remove("is-open");

        if (menuToggle) {

            menuToggle.classList.remove("is-active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");
            }
        }

        closeAllDropdowns();
    }


    function toggleMobileMenu() {

        const isOpen =
            mainNav.classList.contains("is-open");

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleMobileMenu();
            }
        );
    }


    /* =====================================================
       02. DROPDOWN FUNCTIONS
    ====================================================== */

    function closeDropdown(dropdown) {

        if (!dropdown) {
            return;
        }

        dropdown.classList.remove("is-open");

        const button =
            dropdown.querySelector(
                ".nav-dropdown-toggle"
            );

        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    function openDropdown(dropdown) {

        if (!dropdown) {
            return;
        }

        dropdown.classList.add("is-open");

        const button =
            dropdown.querySelector(
                ".nav-dropdown-toggle"
            );

        if (button) {

            button.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    function closeAllDropdowns(
        exceptDropdown = null
    ) {

        dropdowns.forEach(function (dropdown) {

            if (dropdown !== exceptDropdown) {

                closeDropdown(dropdown);
            }

        });
    }


    /* =====================================================
       03. DROPDOWN CLICK
    ====================================================== */

    dropdowns.forEach(function (dropdown) {

        const toggle =
            dropdown.querySelector(
                ".nav-dropdown-toggle"
            );


        if (!toggle) {
            return;
        }


        toggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "is-open"
                    );


                /* -----------------------------------------
                   CLOSE OTHER DROPDOWNS
                ----------------------------------------- */

                closeAllDropdowns(dropdown);


                /* -----------------------------------------
                   TOGGLE CURRENT DROPDOWN
                ----------------------------------------- */

                if (isOpen) {

                    closeDropdown(dropdown);

                } else {

                    openDropdown(dropdown);
                }
            }
        );
    });


    /* =====================================================
       04. DROPDOWN LINK CLICK
    ====================================================== */

    const dropdownLinks =
        document.querySelectorAll(
            ".nav-dropdown-menu a"
        );


    dropdownLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                   Allow the browser to navigate normally.
                   Just close the menu visually.
                */

                closeAllDropdowns();

                closeMobileMenu();
            }
        );
    });


    /* =====================================================
       05. NORMAL NAVIGATION LINK

       Clicking About / Catering / Locations / Contact
       closes the hamburger menu.
    ====================================================== */

    const normalNavLinks =
        document.querySelectorAll(
            ".main-nav > .nav-link"
        );


    normalNavLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeAllDropdowns();

                closeMobileMenu();
            }
        );
    });


    /* =====================================================
       06. CLICK OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuToggle =
                menuToggle &&
                menuToggle.contains(event.target);


            /* -----------------------------------------
               CLOSE DROPDOWNS
            ----------------------------------------- */

            if (!clickedInsideNav) {

                closeAllDropdowns();
            }


            /* -----------------------------------------
               CLOSE MOBILE MENU
            ----------------------------------------- */

            if (
                !clickedInsideNav &&
                !clickedMenuToggle
            ) {

                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       07. ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeAllDropdowns();

            closeMobileMenu();


            if (menuToggle) {

                menuToggle.focus();
            }
        }
    );


    /* =====================================================
       08. DARK MODE
    ====================================================== */

    function updateDarkModeButton() {

        if (!darkModeToggle) {
            return;
        }


        const icon =
            darkModeToggle.querySelector("i");


        const darkMode =
            body.classList.contains(
                "dark-mode"
            );


        if (darkMode) {

            darkModeToggle.setAttribute(
                "aria-label",
                "Disable dark mode"
            );

            darkModeToggle.setAttribute(
                "title",
                "Light Mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );
            }

        } else {

            darkModeToggle.setAttribute(
                "aria-label",
                "Enable dark mode"
            );

            darkModeToggle.setAttribute(
                "title",
                "Dark Mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-sun"
                );

                icon.classList.add(
                    "fa-moon"
                );
            }
        }
    }


    function enableDarkMode() {

        body.classList.add(
            "dark-mode"
        );

        localStorage.setItem(
            "pancakeDarkMode",
            "enabled"
        );

        updateDarkModeButton();
    }


    function disableDarkMode() {

        body.classList.remove(
            "dark-mode"
        );

        localStorage.setItem(
            "pancakeDarkMode",
            "disabled"
        );

        updateDarkModeButton();
    }


    function toggleDarkMode() {

        const isDark =
            body.classList.contains(
                "dark-mode"
            );


        if (isDark) {

            disableDarkMode();

        } else {

            enableDarkMode();
        }
    }


    if (darkModeToggle) {

        darkModeToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleDarkMode();
            }
        );
    }


    /* =====================================================
       09. LOAD DARK MODE
    ====================================================== */

    const savedDarkMode =
        localStorage.getItem(
            "pancakeDarkMode"
        );


    if (savedDarkMode === "enabled") {

        body.classList.add(
            "dark-mode"
        );

    } else if (savedDarkMode === "disabled") {

        body.classList.remove(
            "dark-mode"
        );
    }


    updateDarkModeButton();


    /* =====================================================
       10. RTL MODE
    ====================================================== */

    function updateRTLButton() {

        if (!rtlToggle) {
            return;
        }


        const rtlEnabled =
            html.getAttribute("dir") === "rtl";


        const icon =
            rtlToggle.querySelector("i");


        if (rtlEnabled) {

            rtlToggle.setAttribute(
                "aria-label",
                "Switch to LTR mode"
            );

            rtlToggle.setAttribute(
                "title",
                "LTR Mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-right-left"
                );

                icon.classList.add(
                    "fa-left-right"
                );
            }

        } else {

            rtlToggle.setAttribute(
                "aria-label",
                "Switch to RTL mode"
            );

            rtlToggle.setAttribute(
                "title",
                "RTL Mode"
            );


            if (icon) {

                icon.classList.remove(
                    "fa-left-right"
                );

                icon.classList.add(
                    "fa-right-left"
                );
            }
        }
    }


    function enableRTL() {

        html.setAttribute(
            "dir",
            "rtl"
        );

        localStorage.setItem(
            "pancakeDirection",
            "rtl"
        );

        updateRTLButton();
    }


    function disableRTL() {

        html.setAttribute(
            "dir",
            "ltr"
        );

        localStorage.setItem(
            "pancakeDirection",
            "ltr"
        );

        updateRTLButton();
    }


    function toggleRTL() {

        const isRTL =
            html.getAttribute("dir") === "rtl";


        if (isRTL) {

            disableRTL();

        } else {

            enableRTL();
        }
    }


    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                toggleRTL();
            }
        );
    }


    /* =====================================================
       11. LOAD RTL MODE
    ====================================================== */

    const savedDirection =
        localStorage.getItem(
            "pancakeDirection"
        );


    if (savedDirection === "rtl") {

        html.setAttribute(
            "dir",
            "rtl"
        );

    } else if (savedDirection === "ltr") {

        html.setAttribute(
            "dir",
            "ltr"
        );
    }


    updateRTLButton();


    /* =====================================================
       12. CLOSE MOBILE MENU WHEN DESKTOP RETURNS
    ====================================================== */

    function handleResponsiveState() {

        if (
            window.innerWidth >= 1200
        ) {

            closeMobileMenu();

        }
    }


    window.addEventListener(
        "resize",
        handleResponsiveState
    );


    /* =====================================================
       13. PREVENT BODY SCROLL WHEN MENU IS OPEN
       
       Optional but useful for mobile.
    ====================================================== */

    function updateBodyMenuState() {

        if (
            window.innerWidth < 1200 &&
            mainNav.classList.contains("is-open")
        ) {

            body.classList.add(
                "mobile-menu-open"
            );

        } else {

            body.classList.remove(
                "mobile-menu-open"
            );
        }
    }


    const originalOpenMobileMenu =
        openMobileMenu;


    const originalCloseMobileMenu =
        closeMobileMenu;


    /* =====================================================
       14. UPDATE BODY STATE
    ====================================================== */

    const observer =
        new MutationObserver(function () {

            updateBodyMenuState();

        });


    observer.observe(
        mainNav,
        {
            attributes: true,
            attributeFilter: ["class"]
        }
    );


    updateBodyMenuState();


    /* =====================================================
       15. INITIAL ARIA STATE
    ====================================================== */

    dropdowns.forEach(function (dropdown) {

        const button =
            dropdown.querySelector(
                ".nav-dropdown-toggle"
            );


        if (button) {

            button.setAttribute(
                "aria-expanded",
                dropdown.classList.contains(
                    "is-open"
                )
                    ? "true"
                    : "false"
            );
        }
    });


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            mainNav.classList.contains(
                "is-open"
            )
                ? "true"
                : "false"
        );
    }


    /* =====================================================
       16. INITIAL RESPONSIVE STATE
    ====================================================== */

    handleResponsiveState();


    /* =====================================================
       17. DEBUG MESSAGE
       
       Remove later if not needed.
    ====================================================== */

    console.log(
        "Pancake & Breakfast House navigation loaded."
    );

});
















/********HOME-1******/

/* =========================================================
   HOME 1 — HERO SLIDER
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HERO ELEMENTS
    ===================================================== */

    const heroSlider = document.getElementById("home1HeroSlider");
    const heroSlides = document.querySelectorAll(".home1-hero-slide");
    const heroDots = document.querySelectorAll(".home1-hero-dot");

    if (!heroSlider || heroSlides.length === 0) {
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentSlide = 0;

    const slideInterval = 5000;

    let autoSlide;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showHeroSlide(index) {

        /* Keep index inside valid range */

        if (index >= heroSlides.length) {
            index = 0;
        }

        if (index < 0) {
            index = heroSlides.length - 1;
        }


        /* Remove active state from all slides */

        heroSlides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        /* Remove active state from all dots */

        heroDots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        /* Activate selected slide */

        heroSlides[index].classList.add("active");


        /* Activate corresponding dot */

        if (heroDots[index]) {
            heroDots[index].classList.add("active");
        }


        /* Update current slide */

        currentSlide = index;
    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextHeroSlide() {

        const nextIndex =
            (currentSlide + 1) % heroSlides.length;

        showHeroSlide(nextIndex);
    }


    /* =====================================================
       START AUTO SLIDER
    ===================================================== */

    function startHeroSlider() {

        stopHeroSlider();

        autoSlide = setInterval(function () {
            nextHeroSlide();
        }, slideInterval);
    }


    /* =====================================================
       STOP AUTO SLIDER
    ===================================================== */

    function stopHeroSlider() {

        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }


    /* =====================================================
       DOT CLICK
    ===================================================== */

    heroDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showHeroSlide(index);

            /* Restart timer after manual selection */

            startHeroSlider();
        });

    });


    /* =====================================================
       PAUSE WHILE HOVERING
    ===================================================== */

    heroSlider.addEventListener("mouseenter", function () {
        stopHeroSlider();
    });


    heroSlider.addEventListener("mouseleave", function () {
        startHeroSlider();
    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    heroDots.forEach(function (dot, index) {

        dot.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                showHeroSlide(index);

                startHeroSlider();
            }

        });

    });


    /* =====================================================
       INITIALIZE
    ===================================================== */

    showHeroSlide(0);

    startHeroSlider();

});




/* =========================================================
   SECTION 08 — CUSTOMER TESTIMONIALS
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const testimonialSlider = document.getElementById(
        "home1TestimonialsSlider"
    );

    const testimonialSlides = document.querySelectorAll(
        ".home1-testimonial-slide"
    );

    const testimonialDots = document.querySelectorAll(
        ".home1-testimonial-dot"
    );

    if (
        !testimonialSlider ||
        !testimonialSlides.length ||
        !testimonialDots.length
    ) {
        return;
    }


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentTestimonial = 0;

    let testimonialTimer = null;

    const testimonialInterval = 5000;

    let isTestimonialPaused = false;


    /* =====================================================
       SHOW TESTIMONIAL
    ===================================================== */

    function showTestimonial(index) {

        if (index < 0) {
            index = testimonialSlides.length - 1;
        }

        if (index >= testimonialSlides.length) {
            index = 0;
        }

        currentTestimonial = index;


        /* -------------------------------------------------
           SLIDES
        ------------------------------------------------- */

        testimonialSlides.forEach(function (slide, slideIndex) {

            const isActive = slideIndex === currentTestimonial;

            slide.classList.toggle(
                "active",
                isActive
            );

            slide.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );

        });


        /* -------------------------------------------------
           DOTS
        ------------------------------------------------- */

        testimonialDots.forEach(function (dot, dotIndex) {

            const isActive = dotIndex === currentTestimonial;

            dot.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                dot.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                dot.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    /* =====================================================
       NEXT TESTIMONIAL
    ===================================================== */

    function nextTestimonial() {

        showTestimonial(
            currentTestimonial + 1
        );

    }


    /* =====================================================
       START AUTO SLIDER
    ===================================================== */

    function startTestimonialSlider() {

        stopTestimonialSlider();

        if (isTestimonialPaused) {
            return;
        }

        testimonialTimer = setInterval(
            nextTestimonial,
            testimonialInterval
        );

    }


    /* =====================================================
       STOP AUTO SLIDER
    ===================================================== */

    function stopTestimonialSlider() {

        if (testimonialTimer !== null) {

            clearInterval(
                testimonialTimer
            );

            testimonialTimer = null;

        }

    }


    /* =====================================================
       DOT CLICK
    ===================================================== */

    testimonialDots.forEach(function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const slideIndex = Number(
                    dot.getAttribute("data-slide")
                );

                if (
                    Number.isNaN(slideIndex) ||
                    slideIndex < 0 ||
                    slideIndex >= testimonialSlides.length
                ) {
                    return;
                }

                showTestimonial(slideIndex);

                startTestimonialSlider();

            }
        );

    });


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    testimonialSlider.addEventListener(
        "mouseenter",
        function () {

            isTestimonialPaused = true;

            stopTestimonialSlider();

        }
    );


    /* =====================================================
       RESUME AFTER HOVER
    ===================================================== */

    testimonialSlider.addEventListener(
        "mouseleave",
        function () {

            isTestimonialPaused = false;

            startTestimonialSlider();

        }
    );


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    testimonialDots.forEach(function (dot) {

        dot.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    showTestimonial(
                        currentTestimonial + 1
                    );

                    startTestimonialSlider();

                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    showTestimonial(
                        currentTestimonial - 1
                    );

                    startTestimonialSlider();

                }

            }
        );

    });


    /* =====================================================
       PAUSE WHEN TAB IS NOT ACTIVE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopTestimonialSlider();

            } else {

                startTestimonialSlider();

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    function handleReducedMotion() {

        if (prefersReducedMotion.matches) {

            stopTestimonialSlider();

        } else {

            startTestimonialSlider();

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    showTestimonial(0);

    handleReducedMotion();


    /* =====================================================
       WATCH REDUCED-MOTION CHANGES
    ===================================================== */

    if (
        typeof prefersReducedMotion.addEventListener ===
        "function"
    ) {

        prefersReducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );

    }

});













/********HOME-2*****/

/* =========================================================
   HOME 2 — SECTION 01
   HERO SLIDER
   PART 4 — JAVASCRIPT

   3 SLIDES
   NUMBER NAVIGATION
   NO PREV / NEXT BUTTONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.getElementById("home2Hero");
    const slider = document.getElementById("home2HeroSlider");
    const navigation = document.getElementById("home2HeroNavigation");

    if (!hero || !slider || !navigation) {
        return;
    }


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const slides = Array.from(
        slider.querySelectorAll(".home2-hero-slide")
    );

    const numbers = Array.from(
        navigation.querySelectorAll(".home2-hero-number")
    );


    /* =====================================================
       BASIC CHECK
    ====================================================== */

    if (!slides.length || !numbers.length) {
        return;
    }


    /* =====================================================
       SETTINGS
    ====================================================== */

    const AUTO_SLIDE_DELAY = 5000;

    let currentSlide = 0;
    let autoSlideTimer = null;
    let isHovered = false;


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* =====================================================
       SHOW SLIDE
    ====================================================== */

    function showSlide(index) {

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentSlide = index;


        /* -----------------------------------------------
           UPDATE SLIDES
        ------------------------------------------------ */

        slides.forEach(function (slide, slideIndex) {

            const isActive = slideIndex === currentSlide;

            slide.classList.toggle("active", isActive);

            slide.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );

        });


        /* -----------------------------------------------
           UPDATE NUMBER NAVIGATION
        ------------------------------------------------ */

        numbers.forEach(function (number, numberIndex) {

            const isActive = numberIndex === currentSlide;

            number.classList.toggle("active", isActive);

            number.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

    }


    /* =====================================================
       NEXT SLIDE
    ====================================================== */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* =====================================================
       PREVIOUS SLIDE
    ====================================================== */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* =====================================================
       START AUTO SLIDER
    ====================================================== */

    function startAutoSlide() {

        if (prefersReducedMotion.matches) {
            return;
        }

        stopAutoSlide();

        autoSlideTimer = window.setInterval(function () {

            if (!isHovered && !document.hidden) {
                nextSlide();
            }

        }, AUTO_SLIDE_DELAY);

    }


    /* =====================================================
       STOP AUTO SLIDER
    ====================================================== */

    function stopAutoSlide() {

        if (autoSlideTimer !== null) {

            window.clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    /* =====================================================
       RESTART AUTO SLIDER
    ====================================================== */

    function restartAutoSlide() {

        stopAutoSlide();

        if (!prefersReducedMotion.matches) {
            startAutoSlide();
        }

    }


    /* =====================================================
       NUMBER CLICK
    ====================================================== */

    numbers.forEach(function (number, index) {

        number.addEventListener("click", function () {

            showSlide(index);

            restartAutoSlide();

        });


        /* -----------------------------------------------
           KEYBOARD NAVIGATION
        ------------------------------------------------ */

        number.addEventListener("keydown", function (event) {

            if (event.key === "ArrowRight") {

                event.preventDefault();

                nextSlide();

                restartAutoSlide();

                numbers[currentSlide].focus();

            }


            else if (event.key === "ArrowLeft") {

                event.preventDefault();

                previousSlide();

                restartAutoSlide();

                numbers[currentSlide].focus();

            }


            else if (event.key === "Home") {

                event.preventDefault();

                showSlide(0);

                restartAutoSlide();

                numbers[0].focus();

            }


            else if (event.key === "End") {

                event.preventDefault();

                showSlide(slides.length - 1);

                restartAutoSlide();

                numbers[slides.length - 1].focus();

            }

        });

    });


    /* =====================================================
       PAUSE ON HOVER
    ====================================================== */

    hero.addEventListener("mouseenter", function () {

        isHovered = true;

        stopAutoSlide();

    });


    /* =====================================================
       RESUME AFTER HOVER
    ====================================================== */

    hero.addEventListener("mouseleave", function () {

        isHovered = false;

        startAutoSlide();

    });


    /* =====================================================
       PAUSE WHEN TAB IS HIDDEN
    ====================================================== */

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {

            stopAutoSlide();

        } else if (!isHovered) {

            startAutoSlide();

        }

    });


    /* =====================================================
       REDUCED MOTION CHANGE
    ====================================================== */

    if (typeof prefersReducedMotion.addEventListener === "function") {

        prefersReducedMotion.addEventListener(
            "change",
            function () {

                if (prefersReducedMotion.matches) {

                    stopAutoSlide();

                } else if (!isHovered) {

                    startAutoSlide();

                }

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    showSlide(0);

    startAutoSlide();

});






/* ============================================================
   HOME 2 — SECTION 08
   GUEST STORIES SLIDER
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const guestSection = document.getElementById("home2GuestStories");
    const guestSlider = document.getElementById("home2GuestSlider");
    const guestNavigation = document.getElementById("home2GuestNavigation");

    if (!guestSection || !guestSlider || !guestNavigation) {
        return;
    }


    /* ========================================================
       ELEMENTS
    ======================================================== */

    const guestSlides = Array.from(
        guestSlider.querySelectorAll(".home2-guest-slide")
    );

    const guestNumbers = Array.from(
        guestNavigation.querySelectorAll(".home2-guest-number")
    );


    if (!guestSlides.length || !guestNumbers.length) {
        return;
    }


    /* ========================================================
       SETTINGS
    ======================================================== */

    const AUTO_SLIDE_DELAY = 5000;

    let currentGuestSlide = 0;
    let guestAutoSlideTimer = null;
    let isGuestHovered = false;


    /* ========================================================
       REDUCED MOTION
    ======================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* ========================================================
       SHOW SLIDE
    ======================================================== */

    function showGuestSlide(index) {

        if (index < 0) {
            index = guestSlides.length - 1;
        }

        if (index >= guestSlides.length) {
            index = 0;
        }

        currentGuestSlide = index;


        /* -----------------------------------------------
           SLIDES
        ------------------------------------------------ */

        guestSlides.forEach(function (slide, slideIndex) {

            const isActive = slideIndex === currentGuestSlide;

            slide.classList.toggle(
                "active",
                isActive
            );

            slide.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );

        });


        /* -----------------------------------------------
           NUMBER NAVIGATION
        ------------------------------------------------ */

        guestNumbers.forEach(function (number, numberIndex) {

            const isActive =
                numberIndex === currentGuestSlide;

            number.classList.toggle(
                "active",
                isActive
            );

            number.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

    }


    /* ========================================================
       NEXT SLIDE
    ======================================================== */

    function nextGuestSlide() {

        showGuestSlide(
            currentGuestSlide + 1
        );

    }


    /* ========================================================
       PREVIOUS SLIDE
       Used only for keyboard navigation.
       There are NO visible previous/next buttons.
    ======================================================== */

    function previousGuestSlide() {

        showGuestSlide(
            currentGuestSlide - 1
        );

    }


    /* ========================================================
       STOP AUTO SLIDE
    ======================================================== */

    function stopGuestAutoSlide() {

        if (guestAutoSlideTimer !== null) {

            window.clearInterval(
                guestAutoSlideTimer
            );

            guestAutoSlideTimer = null;

        }

    }


    /* ========================================================
       START AUTO SLIDE
    ======================================================== */

    function startGuestAutoSlide() {

        if (prefersReducedMotion.matches) {
            return;
        }

        stopGuestAutoSlide();


        guestAutoSlideTimer = window.setInterval(
            function () {

                if (
                    !isGuestHovered &&
                    !document.hidden
                ) {

                    nextGuestSlide();

                }

            },
            AUTO_SLIDE_DELAY
        );

    }


    /* ========================================================
       RESTART AUTO SLIDE
    ======================================================== */

    function restartGuestAutoSlide() {

        stopGuestAutoSlide();

        if (!prefersReducedMotion.matches) {
            startGuestAutoSlide();
        }

    }


    /* ========================================================
       NUMBER NAVIGATION
    ======================================================== */

    guestNumbers.forEach(function (number, index) {


        /* -----------------------------------------------
           CLICK
        ------------------------------------------------ */

        number.addEventListener(
            "click",
            function () {

                showGuestSlide(index);

                restartGuestAutoSlide();

            }
        );


        /* -----------------------------------------------
           KEYBOARD
        ------------------------------------------------ */

        number.addEventListener(
            "keydown",
            function (event) {


                /* ---------------------------------------
                   RIGHT ARROW
                ---------------------------------------- */

                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    nextGuestSlide();

                    restartGuestAutoSlide();

                    guestNumbers[
                        currentGuestSlide
                    ].focus();

                }


                /* ---------------------------------------
                   LEFT ARROW
                ---------------------------------------- */

                else if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    previousGuestSlide();

                    restartGuestAutoSlide();

                    guestNumbers[
                        currentGuestSlide
                    ].focus();

                }


                /* ---------------------------------------
                   HOME
                ---------------------------------------- */

                else if (event.key === "Home") {

                    event.preventDefault();

                    showGuestSlide(0);

                    restartGuestAutoSlide();

                    guestNumbers[0].focus();

                }


                /* ---------------------------------------
                   END
                ---------------------------------------- */

                else if (event.key === "End") {

                    event.preventDefault();

                    showGuestSlide(
                        guestSlides.length - 1
                    );

                    restartGuestAutoSlide();

                    guestNumbers[
                        guestSlides.length - 1
                    ].focus();

                }

            }
        );

    });


    /* ========================================================
       PAUSE ON HOVER
    ======================================================== */

    guestSection.addEventListener(
        "mouseenter",
        function () {

            isGuestHovered = true;

            stopGuestAutoSlide();

        }
    );


    /* ========================================================
       RESUME AFTER HOVER
    ======================================================== */

    guestSection.addEventListener(
        "mouseleave",
        function () {

            isGuestHovered = false;

            startGuestAutoSlide();

        }
    );


    /* ========================================================
       VISIBILITY CHANGE
       Stop slider when browser tab is hidden.
    ======================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopGuestAutoSlide();

            } else if (!isGuestHovered) {

                startGuestAutoSlide();

            }

        }
    );


    /* ========================================================
       REDUCED MOTION CHANGE
    ======================================================== */

    if (
        typeof prefersReducedMotion.addEventListener ===
        "function"
    ) {

        prefersReducedMotion.addEventListener(
            "change",
            function () {

                if (prefersReducedMotion.matches) {

                    stopGuestAutoSlide();

                } else if (!isGuestHovered) {

                    startGuestAutoSlide();

                }

            }
        );

    }


    /* ========================================================
       INITIAL SLIDE
    ======================================================== */

    showGuestSlide(0);


    /* ========================================================
       START SLIDER
    ======================================================== */

    startGuestAutoSlide();

});









/* =========================================================
   SECTION 06 — CATERING FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cateringFaq = document.querySelector("#cateringFaq");

    // Stop if the FAQ section does not exist on this page
    if (!cateringFaq) return;

    const faqItems = cateringFaq.querySelectorAll(
        ".catering-faq-item"
    );

    if (!faqItems.length) return;


    /* =====================================================
       OPEN / CLOSE FAQ ITEMS
    ===================================================== */

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".catering-faq-question"
        );

        const answer = item.querySelector(
            ".catering-faq-answer"
        );

        if (!question || !answer) return;


        // Sync the initial state from the HTML
        const initiallyOpen =
            question.getAttribute("aria-expanded") === "true";

        item.classList.toggle("active", initiallyOpen);
        question.setAttribute(
            "aria-expanded",
            String(initiallyOpen)
        );

        answer.hidden = !initiallyOpen;


        // Handle question click
        question.addEventListener("click", function () {

            const isOpen =
                question.getAttribute("aria-expanded") === "true";


            // Close every FAQ item first
            faqItems.forEach(function (otherItem) {

                const otherQuestion = otherItem.querySelector(
                    ".catering-faq-question"
                );

                const otherAnswer = otherItem.querySelector(
                    ".catering-faq-answer"
                );

                if (!otherQuestion || !otherAnswer) return;

                otherItem.classList.remove("active");

                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherAnswer.hidden = true;

            });


            // Open the clicked item if it was previously closed
            if (!isOpen) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.hidden = false;

            }

        });

    });

});







/* =========================================================
   LOCATION PAGE — SECTION 03
   INTERACTIVE BRANCH SELECTOR + GOOGLE MAP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const locationMap = document.querySelector("#locationMap");

    if (!locationMap) return;

    const branchCards = locationMap.querySelectorAll(
        ".location-map-branch"
    );

    const googleMap = locationMap.querySelector(
        "#locationGoogleMap"
    );

    if (!branchCards.length || !googleMap) return;


    /* =====================================================
       BRANCH MAP LOCATIONS

       Replace these sample locations with your real
       restaurant branch addresses when available.
    ===================================================== */

    const branchLocations = {

        downtown: {
            name: "Downtown",
            address: "Downtown Branch Address, City"
        },

        riverside: {
            name: "Riverside",
            address: "Riverside Branch Address, City"
        },

        garden: {
            name: "Garden",
            address: "Garden Branch Address, City"
        }

    };


    /* =====================================================
       UPDATE GOOGLE MAP
    ===================================================== */

    function updateGoogleMap(branchKey) {

        const branch = branchLocations[branchKey];

        if (!branch) return;

        const mapURL =
            "https://maps.google.com/maps?q=" +
            encodeURIComponent(branch.address) +
            "&z=14&output=embed";

        googleMap.src = mapURL;

        googleMap.title =
            "Google Maps showing " + branch.name + " branch";
    }


    /* =====================================================
       SELECT BRANCH
    ===================================================== */

    function selectBranch(selectedCard) {

        const branchKey = selectedCard.dataset.location;

        if (!branchLocations[branchKey]) return;

        branchCards.forEach(function (card) {

            const isActive = card === selectedCard;

            card.classList.toggle("is-active", isActive);

            card.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );

        });

        updateGoogleMap(branchKey);
    }


    /* =====================================================
       CLICK + KEYBOARD EVENTS
    ===================================================== */

    branchCards.forEach(function (card) {

        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        card.addEventListener("click", function (event) {

            // Keep the individual directions links working.
            if (event.target.closest("a")) return;

            selectBranch(card);

        });

        card.addEventListener("keydown", function (event) {

            if (event.target.closest("a")) return;

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                selectBranch(card);
            }

        });

    });


    /* =====================================================
       INITIAL BRANCH
    ===================================================== */

    const initialBranch = locationMap.querySelector(
        '.location-map-branch[data-location="downtown"]'
    );

    if (initialBranch) {
        selectBranch(initialBranch);
    }

});












/* =========================================
   SCROLL TO TOP BUTTON
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    function toggleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    }

    window.addEventListener("scroll", toggleScrollTopButton, {
        passive: true
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleScrollTopButton();
});
