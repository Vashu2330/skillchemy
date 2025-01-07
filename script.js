// Global variables to store skills
let skillsHave = [];
let skillsWant = [];

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handling for contact form
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for contacting us! We will get back to you soon.');
  this.reset();
});

// Add skills to "Skills You Have" list
document.getElementById('skill-have').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const skill = this.value.trim();
    if (skill) {
      skillsHave.push(skill);
      const li = document.createElement('li');
      li.textContent = skill;
      document.getElementById('skill-have-list').appendChild(li);
      this.value = '';
    }
  }
});

// Add skills to "Skills You Want" list
document.getElementById('skill-want').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const skill = this.value.trim();
    if (skill) {
      skillsWant.push(skill);
      const li = document.createElement('li');
      li.textContent = skill;
      document.getElementById('skill-want-list').appendChild(li);
      this.value = '';
    }
  }
});

// Sign-Up Modal Functionality
const signupModal = document.getElementById('signup-modal');
const signupBtn = document.querySelector('.btn-signup');
const closeBtn = document.querySelector('.close');

// Open Sign-Up Modal
signupBtn.addEventListener('click', () => {
  signupModal.style.display = 'block';
});

// Close Modal
closeBtn.addEventListener('click', () => {
  signupModal.style.display = 'none';
});

// Close Modal When Clicking Outside
window.addEventListener('click', (e) => {
  if (e.target === signupModal) signupModal.style.display = 'none';
});

// Sign-Up Form Submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm.querySelector('input[type="email"]').value;
  const password = signupForm.querySelector('input[type="password"]').value;

  // Here you can add your MongoDB logic to handle user registration
  alert('Sign-up successful!');
  signupForm.reset();
  signupModal.style.display = 'none';
});

// FAQ Toggle Functionality
document.querySelectorAll('.faq-item h3').forEach((faqQuestion) => {
  faqQuestion.addEventListener('click', () => {
    const faqItem = faqQuestion.parentElement;
    const faqAnswer = faqItem.querySelector('p');

    // Toggle the active class
    faqItem.classList.toggle('active');

    // Toggle the visibility of the answer
    if (faqItem.classList.contains('active')) {
      faqAnswer.style.display = 'block';
    } else {
      faqAnswer.style.display = 'none';
    }
  });
});

// Find Match Functionality
function findMatch() {
  if (skillsHave.length === 0 || skillsWant.length === 0) {
    alert('Please add your skills before finding a match.');
    return;
  }

  // Example of displaying matches (replace with actual data from your backend)
  const exampleMatches = [
    {
      email: 'user1@example.com',
      skillsHave: ['Graphic Design', 'Photography'],
      skillsWant: ['Web Development', 'Cooking']
    },
    {
      email: 'user2@example.com',
      skillsHave: ['Cooking', 'Music Production'],
      skillsWant: ['Graphic Design', 'Photography']
    }
  ];

  const matchesContainer = document.getElementById('matches-container');
  matchesContainer.innerHTML = ''; // Clear previous matches

  if (exampleMatches.length > 0) {
    exampleMatches.forEach((match) => {
      const matchDiv = document.createElement('div');
      matchDiv.classList.add('match-card');
      matchDiv.innerHTML = `
        <p><strong>Email:</strong> ${match.email}</p>
        <p><strong>Skills They Have:</strong> ${match.skillsHave.join(', ')}</p>
        <p><strong>Skills They Want:</strong> ${match.skillsWant.join(', ')}</p>
      `;
      matchesContainer.appendChild(matchDiv);
    });
  } else {
    matchesContainer.innerHTML = '<p>No matches found.</p>';
  }
}

// Example of integrating with a backend API (replace with your actual API endpoint)
async function fetchMatches() {
  try {
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        skillsHave,
        skillsWant
      })
    });
    const data = await response.json();
    return data.matches; // Assuming the API returns an array of matches
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

// Example of updating the matches section with real data
async function updateMatches() {
  const matches = await fetchMatches();
  const matchesContainer = document.getElementById('matches-container');
  matchesContainer.innerHTML = ''; // Clear previous matches

  if (matches.length > 0) {
    matches.forEach((match) => {
      const matchDiv = document.createElement('div');
      matchDiv.classList.add('match-card');
      matchDiv.innerHTML = `
        <p><strong>Email:</strong> ${match.email}</p>
        <p><strong>Skills They Have:</strong> ${match.skillsHave.join(', ')}</p>
        <p><strong>Skills They Want:</strong> ${match.skillsWant.join(', ')}</p>
      `;
      matchesContainer.appendChild(matchDiv);
    });
  } else {
    matchesContainer.innerHTML = '<p>No matches found.</p>';
  }
}

// Call updateMatches() when the page loads or when the user clicks "Find a Match"
document.addEventListener('DOMContentLoaded', () => {
  // Example: Fetch matches when the page loads
  updateMatches();
});