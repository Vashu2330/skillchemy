document.addEventListener('DOMContentLoaded', () => {
    // Form Submit Events
    const barterForm = document.getElementById('barterForm');
    const signupForm = document.getElementById('signupForm');
    const contactForm = document.getElementById('contactForm');

    barterForm.addEventListener('submit', event => {
        event.preventDefault();
        alert('Barter form submitted! We will connect you soon.');
    });

    signupForm.addEventListener('submit', event => {
        event.preventDefault();
        alert('Sign-up successful! Welcome to Skillchemy.');
    });

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        alert('Thank you for reaching out! We will respond shortly.');
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
