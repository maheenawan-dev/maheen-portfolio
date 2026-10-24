/* =========================================================
   ELEMENTS
========================================================= */

const body = document.body;

const themeToggle =
    document.getElementById("theme-toggle");

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");

const mobileLinks =
    document.querySelectorAll(".mobile-nav-link");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section");

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");

const heroScene =
    document.querySelector(".hero-3d-scene");


/* =========================================================
   THEME
========================================================= */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    body.classList.add("dark-theme");

    themeToggle.textContent = "☀";

} else {

    themeToggle.textContent = "☾";

}


/* =========================================================
   THEME TOGGLE
========================================================= */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark-theme");


    const isDark =
        body.classList.contains("dark-theme");


    if (isDark) {

        themeToggle.textContent = "☀";

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "☾";

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    }

});


/* =========================================================
   MOBILE MENU
========================================================= */

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");


    const isOpen =
        mobileMenu.classList.contains("open");


    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );


    if (isOpen) {

        menuToggle.textContent = "✕";

        body.classList.add("no-scroll");

    } else {

        menuToggle.textContent = "☰";

        body.classList.remove("no-scroll");

    }

});


/* =========================================================
   MOBILE LINK CLICK
========================================================= */

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("no-scroll");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   3D MOUSE TILT
========================================================= */

if (heroScene) {

    heroScene.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroScene.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 8;

            const rotateX =
                ((centerY - y) / centerY) * 8;


            heroScene.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    heroScene.addEventListener(
        "mouseleave",
        () => {

            heroScene.style.transform =
                "rotateX(0deg) rotateY(0deg)";

        }
    );

}

/* =========================================================
   EXPERIENCE DOCUMENTS MODAL
========================================================= */

const docsModal = document.getElementById("docs-modal");
const docsTitle = document.getElementById("docs-title");
const docsImage = document.getElementById("docs-image");
const docsOpen = document.getElementById("docs-open");
const docsClose = document.getElementById("docs-close");
const docsTabs = document.querySelectorAll(".docs-tab");
const docsBackdrop = document.querySelector(".docs-backdrop");
const docItems = document.querySelectorAll(".experience-item.has-docs");

let currentDocs = {};

function showDoc(type) {

    const src = currentDocs[type];

    docsImage.src = src;
    docsImage.alt = type === "certificate"
        ? "Certificate"
        : "Recommendation Letter";
    docsOpen.href = src;

    docsTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.doc === type);
    });

}

function openDocs(item) {

    currentDocs = {
        certificate: item.dataset.certificate,
        letter: item.dataset.letter
    };

    docsTitle.textContent = item.dataset.title;

    showDoc("certificate");

    docsModal.classList.add("open");
    docsModal.setAttribute("aria-hidden", "false");
    body.classList.add("no-scroll");

}

function closeDocs() {

    docsModal.classList.remove("open");
    docsModal.setAttribute("aria-hidden", "true");
    body.classList.remove("no-scroll");

}

docItems.forEach((item) => {

    item.addEventListener("click", () => openDocs(item));

    item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDocs(item);
        }
    });

});

docsTabs.forEach((tab) => {
    tab.addEventListener("click", () => showDoc(tab.dataset.doc));
});

docsClose.addEventListener("click", closeDocs);
docsBackdrop.addEventListener("click", closeDocs);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeDocs();
    }
});

/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (window.innerWidth < 800) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 2.5;

            const rotateX =
                ((centerY - y) / centerY) * 2.5;


            card.style.transform =
                `translateY(-12px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;

        }


        formMessage.textContent =
            `Thanks ${name}! Your message is ready to be sent.`;


        contactForm.reset();

    }
);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 1000) {

            mobileMenu.classList.remove("open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            body.classList.remove("no-scroll");

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "Maheen Irfan Portfolio loaded successfully ✨"
);