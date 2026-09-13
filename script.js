/* =========================================
   ÉLANE BEAUTY STUDIO
   JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       PAGE LOADER
    ===================================== */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 500);

    });


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    const header = document.getElementById("header");
    const backTop = document.getElementById("backTop");

    function handleScroll() {

        if (window.scrollY > 70) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("open");
        document.body.classList.toggle("menu-open");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");
            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================
       ANIMATED COUNTERS
    ===================================== */

    const counters =
        document.querySelectorAll("[data-counter]");

    let countersStarted = false;

    function animateCounters() {

        if (countersStarted) return;

        const statsSection =
            document.querySelector(".stats-section");

        if (!statsSection) return;

        const rect =
            statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.85) {

            countersStarted = true;

            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.counter);

                let current = 0;

                const duration = 1800;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    current =
                        Math.floor(target * eased);

                    counter.textContent =
                        current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }

                }

                requestAnimationFrame(updateCounter);

            });

        }

    }

    window.addEventListener(
        "scroll",
        animateCounters
    );

    animateCounters();


    /* =====================================
       FAQ ACCORDION
    ===================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.classList.remove("open");
                }

            });

            item.classList.toggle("open");

        });

    });


    /* =====================================
       BOOKING FORM → WHATSAPP
    ===================================== */

    const bookingForm =
        document.getElementById("bookingForm");


    /*
        IMPORTANT:
        Replace this number with your salon
        WhatsApp number.

        Format:
        Country code + number

        Example:
        919876543210

        DO NOT use + or spaces.
    */

    const whatsappNumber = "919876543210";


    bookingForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const date =
            document.getElementById("date").value;

        const time =
            document.getElementById("time").value;

        const stylist =
            document.getElementById("stylist").value;

        const message =
            document.getElementById("message").value.trim();


        if (
            !name ||
            !phone ||
            !service ||
            !date ||
            !time
        ) {

            alert(
                "Please fill in all required booking details."
            );

            return;

        }


        /* Convert date into a nicer format */

        const formattedDate =
            new Date(date + "T00:00:00")
                .toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );


        /*
            WhatsApp booking message
        */

        const whatsappMessage =
`Hello ÉLANE Beauty Studio! ✨

I would like to book an appointment.

━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━

Name: ${name}

Phone: ${phone}

Service: ${service}

Preferred Date: ${formattedDate}

Preferred Time: ${time}

Preferred Stylist: ${stylist || "No preference"}

Additional Request:
${message || "None"}

━━━━━━━━━━━━━━━━

Please confirm my appointment.

Thank you! 💗`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    });


    /* =====================================
       PREVENT PAST DATES
    ===================================== */

    const dateInput =
        document.getElementById("date");

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    dateInput.min =
        `${year}-${month}-${day}`;


    /* =====================================
       BACK TO TOP
    ===================================== */

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================
       IMAGE TILT EFFECT
       SUBTLE PREMIUM EFFECT
    ===================================== */

    const tiltCards =
        document.querySelectorAll(
            ".service-card, .team-card, .package-card"
        );


    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -3;

                const rotateY =
                    ((x / rect.width) - 0.5) * 3;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


});