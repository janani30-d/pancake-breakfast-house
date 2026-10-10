/* =========================================================
   PANCAKE & BREAKFAST HOUSE
   GLOBAL RTL + DARK MODE SETTINGS
   Works across all pages
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       STORAGE KEYS
       Must match the existing main website script
    ===================================================== */

    const RTL_KEY = "pancakeDirection";
    const DARK_KEY = "pancakeDarkMode";

    /* =====================================================
       BUTTON SELECTORS
    ===================================================== */

    const RTL_SELECTOR = [
        "#rtlToggle",
        "#loginRtlToggle",
        "#registerRtlToggle"
    ].join(",");

    const DARK_SELECTOR = [
        "#darkModeToggle",
        "#loginDarkToggle",
        "#registerDarkToggle"
    ].join(",");

    /* =====================================================
       APPLY RTL MODE
    ===================================================== */

    function applyRTL(enabled) {
        const html = document.documentElement;

        html.setAttribute("dir", enabled ? "rtl" : "ltr");
        html.classList.toggle("rtl-mode", enabled);

        document.body.classList.toggle("rtl-mode", enabled);

        document.querySelectorAll(RTL_SELECTOR).forEach(function (button) {
            button.setAttribute("aria-pressed", String(enabled));

            button.setAttribute(
                "aria-label",
                enabled
                    ? "Switch to LTR mode"
                    : "Switch to RTL mode"
            );

            button.setAttribute(
                "title",
                enabled ? "LTR Mode" : "RTL Mode"
            );

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-right-left", !enabled);
                icon.classList.toggle("fa-left-right", enabled);
            }
        });
    }

    /* =====================================================
       APPLY DARK MODE
    ===================================================== */

    function applyDarkMode(enabled) {
        document.body.classList.toggle("dark-mode", enabled);

        document.documentElement.classList.toggle(
            "dark-mode",
            enabled
        );

        document.querySelectorAll(DARK_SELECTOR).forEach(function (button) {
            button.setAttribute("aria-pressed", String(enabled));

            button.setAttribute(
                "aria-label",
                enabled ? "Disable dark mode" : "Enable dark mode"
            );

            button.setAttribute(
                "title",
                enabled ? "Light Mode" : "Dark Mode"
            );

            /* Font Awesome icons */
            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-moon", !enabled);
                icon.classList.toggle("fa-sun", enabled);
            }

            /* Login and Register SVG icons */
            const moon = button.querySelector(".login-moon-icon");
            const sun = button.querySelector(".login-sun-icon");

            if (moon) {
                moon.style.display = enabled ? "none" : "block";
            }

            if (sun) {
                sun.style.display = enabled ? "block" : "none";
            }
        });
    }

    /* =====================================================
       LOAD SAVED SETTINGS
    ===================================================== */

    function loadSettings() {
        const savedDirection = localStorage.getItem(RTL_KEY);
        const savedDarkMode = localStorage.getItem(DARK_KEY);

        applyRTL(savedDirection === "rtl");
        applyDarkMode(savedDarkMode === "enabled");
    }

    /* =====================================================
       CONNECT BUTTONS
       Event delegation also works if buttons are added later.
    ===================================================== */

    document.addEventListener("click", function (event) {
        const rtlButton = event.target.closest(RTL_SELECTOR);
        const darkButton = event.target.closest(DARK_SELECTOR);

        if (rtlButton) {
            event.preventDefault();

            const enabled =
                document.documentElement.getAttribute("dir") !== "rtl";

            localStorage.setItem(
                RTL_KEY,
                enabled ? "rtl" : "ltr"
            );

            applyRTL(enabled);
        }

        if (darkButton) {
            event.preventDefault();

            const enabled =
                !document.body.classList.contains("dark-mode");

            localStorage.setItem(
                DARK_KEY,
                enabled ? "enabled" : "disabled"
            );

            applyDarkMode(enabled);
        }
    });

    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", loadSettings);
    } else {
        loadSettings();
    }

})();