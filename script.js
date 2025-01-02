// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfcL3Bfe4kexC9dAu20UOe40c5IjLDO4w",
  authDomain: "skillchemy-d9a1a.firebaseapp.com",
  projectId: "skillchemy-d9a1a",
  storageBucket: "skillchemy-d9a1a.firebasestorage.app",
  messagingSenderId: "1050504846984",
  appId: "1:1050504846984:web:ce8d681433729f9052893d",
  measurementId: "G-5MJ8RGJ9QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for contacting us! We will get back to you soon.');
  this.reset();
});

// Skills Section - Add skills to list
document.getElementById('skill-have').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const skill = this.value.trim();
    if (skill) {
      const li = document.createElement('li');
      li.textContent = skill;
      document.getElementById('skill-have-list').appendChild(li);
      this.value = '';
    }
  }
});

document.getElementById('skill-want').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const skill = this.value.trim();
    if (skill) {
      const li = document.createElement('li');
      li.textContent = skill;
      document.getElementById('skill-want-list').appendChild(li);
      this.value = '';
    }
  }
});

// Find Match Button
function findMatch() {
  alert('Finding matches for you...');
}

// FAQ Section - Toggle answers
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
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
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Sign-up successful!');
      signupForm.reset();
      signupModal.style.display = 'none';
    })
    .catch((error) => {
      alert(error.message);
    });
});