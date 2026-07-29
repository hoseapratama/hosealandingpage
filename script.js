// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile burger menu =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll reveal animation =====
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Animated stat counters =====
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  let current = 0;
  const duration = 1400;
  const stepTime = Math.max(Math.floor(duration / target), 15);
  const increment = Math.ceil(target / (duration / stepTime));
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, stepTime);
}

// ===== Animated progress bars =====
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      entry.target.style.width = width + '%';
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
progressBars.forEach(bar => progressObserver.observe(bar));

// ===== Contact form (demo submission via mailto) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = contactForm.querySelectorAll('input, textarea');
  const [name, email] = [inputs[0].value, inputs[1].value];
  const subject = inputs[2].value;
  const message = inputs[3].value;

  const mailtoLink = `mailto:hosea.ap2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;
  window.location.href = mailtoLink;
  formNote.textContent = "Opening your email client to send this message...";
  contactForm.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
