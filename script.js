// Enhanced JavaScript for Dynamic & Reactive Portfolio

// Burger Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {gt
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.burger').classList.remove('active');
    });
});

// Sticky Header Shadow & Dynamic Hide/Show
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);

    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
});

// Typing Effect in Hero Section
const heroText = document.querySelector('.hero-text h1');
const phrases = ["Hi, I'm Michael Ekeh.", "Welcome to My Portfolio,", "Let’s Build Something Great!"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
    isEnd = false;
    heroText.innerHTML = currentPhrase.join('');

    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            heroText.innerHTML = currentPhrase.join('');
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop();
            j--;
            heroText.innerHTML = currentPhrase.join('');
        }

        if (j === phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) {
                i = 0;
            }
        }
    }
    const speed = isEnd ? 2000 : isDeleting ? 50 : 100;
    setTimeout(loop, speed);
}
loop();

// Show Scroll-To-Top Button
const scrollBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submission Simulation
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! I’ll get back to you soon.');
    e.target.reset();
});

// Reveal Sections on Scroll
const revealElements = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});
revealElements.forEach(el => observer.observe(el));

// Smooth Scrolling
const navAnchors = document.querySelectorAll('a[href^="#"]');
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const navLinks = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    const themeIcon = document.querySelector('.theme-switch i');
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Load Saved Theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-switch i');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    // Highlight Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 80;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `./#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
