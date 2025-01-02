// Wait for DOM Content to Load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website is fully loaded and ready!');

    // Animate Hero Section Text
    const heroHeading = document.querySelector('.hero-content h1');
    const heroParagraph = document.querySelector('.hero-content p');
    const heroButton = document.querySelector('.cta-button');

    heroHeading.style.opacity = 0;
    heroParagraph.style.opacity = 0;
    heroButton.style.opacity = 0;

    setTimeout(() => {
        heroHeading.style.transition = 'opacity 1s ease-in-out';
        heroHeading.style.opacity = 1;
    }, 500);

    setTimeout(() => {
        heroParagraph.style.transition = 'opacity 1s ease-in-out';
        heroParagraph.style.opacity = 1;
    }, 1000);

    setTimeout(() => {
        heroButton.style.transition = 'opacity 1s ease-in-out';
        heroButton.style.opacity = 1;
    }, 1500);

    // Add Hover Effects for Cards
    const cards = document.querySelectorAll('.card, .question-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1)';
            card.style.boxShadow = '0 8px 16px rgba(0, 255, 255, 0.5)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
        });
    });

    // Scroll Animations for Sections
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
