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