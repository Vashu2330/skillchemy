document.addEventListener('DOMContentLoaded', () => {
    // Form Submit Events
    const barterForm = document.getElementById('barterForm');
    const signupForm = document.getElementById('signupForm');
    const contactForm = document.getElementById('contactForm');
    const customSubjectsForm = document.getElementById('customSubjectsForm');
    const subjectsList = document.getElementById('subjectsList');

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

    customSubjectsForm.addEventListener('submit', event => {
        event.preventDefault();
        const course = document.getElementById('course').value;
        const customCourse = document.getElementById('customCourse').value || 'N/A';
        const subjects = document.getElementById('subjects').value.split(',');

        subjects.forEach(subject => {
            const li = document.createElement('li');
            li.textContent = `${subject.trim()} (Course: ${customCourse || course})`;
            subjectsList.appendChild(li);
        });

        alert('Subjects added successfully!');
        customSubjectsForm.reset();
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
