import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfcL3Bfe4kexC9dAu20UOe40c5IjLDO4w",
  authDomain: "skillchemy-d9a1a.firebaseapp.com",
  projectId: "skillchemy-d9a1a",
  storageBucket: "skillchemy-d9a1a.appspot.com",
  messagingSenderId: "1050504846984",
  appId: "1:1050504846984:web:ce8d681433729f9052893d",
  measurementId: "G-5MJ8RGJ9QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Store user data in Firestore
      const usersRef = collection(db, 'users');
      addDoc(usersRef, {
        uid: user.uid,
        email: user.email,
        skillsHave: [],
        skillsWant: []
      }).then(() => {
        alert('Sign-up successful!');
        signupForm.reset();
        signupModal.style.display = 'none';
      }).catch((error) => {
        alert('Error saving user data: ' + error.message);
      });
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Find Match Functionality
function findMatch() {
  const user = auth.currentUser;
  if (!user) {
    alert('Please sign in to find matches.');
    return;
  }

  if (skillsHave.length === 0 || skillsWant.length === 0) {
    alert('Please add your skills before finding a match.');
    return;
  }

  // Update user's skills in Firestore
  const userRef = doc(db, 'users', user.uid);
  updateDoc(userRef, {
    skillsHave: skillsHave,
    skillsWant: skillsWant
  }).then(() => {
    // Query Firestore for matches
    const usersRef = collection(db, 'users');
    const q = query(usersRef, 
      where('skillsHave', 'array-contains-any', skillsWant),
      where('skillsWant', 'array-contains-any', skillsHave),
      where('uid', '!=', user.uid) // Exclude the current user
    );

    getDocs(q).then((querySnapshot) => {
      const matchesContainer = document.getElementById('matches-container');
      matchesContainer.innerHTML = ''; // Clear previous matches

      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          const matchUser = doc.data();
          const matchDiv = document.createElement('div');
          matchDiv.innerHTML = `
            <p><strong>Email:</strong> ${matchUser.email}</p>
            <p><strong>Skills They Have:</strong> ${matchUser.skillsHave.join(', ')}</p>
            <p><strong>Skills They Want:</strong> ${matchUser.skillsWant.join(', ')}</p>
          `;
          matchesContainer.appendChild(matchDiv);
        });
      } else {
        matchesContainer.innerHTML = '<p>No matches found.</p>';
      }
    }).catch((error) => {
      alert('Error finding matches: ' + error.message);
    });
  }).catch((error) => {
    alert('Error updating skills: ' + error.message);
  });
}

// Check if user is signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user.email);
  } else {
    console.log('No user is signed in.');
  }
});