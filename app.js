// Navigation functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger icon
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth scroll with offset for fixed navbar
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 0) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for section animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
  sectionObserver.observe(section);
});

// Animate skill progress bars when visible
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progress = progressBar.getAttribute('data-progress');
      
      // Delay animation slightly for better effect
      setTimeout(() => {
        progressBar.style.width = progress + '%';
      }, 200);
      
      // Unobserve after animation
      skillObserver.unobserve(progressBar);
    }
  });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  const navbarHeight = navbar.offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbarHeight - 50;
    const sectionHeight = section.offsetHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Add subtle parallax effect to hero section
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.5;
  
  if (heroSection && scrolled < window.innerHeight) {
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// Add hover effect for cards
const cards = document.querySelectorAll('.highlight-card, .tool-card, .specialization-chip');

cards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
  });
});

// Initialize animations on page load
window.addEventListener('load', () => {
  // Trigger any initial animations
  document.body.style.opacity = '1';
});

// Add smooth entrance for hero section
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  setTimeout(() => {
    heroContent.style.opacity = '1';
  }, 100);
}

// Console message
console.log('%c👨‍💻 Portfolio designed for Mithilesh Kumar', 'font-size: 14px; color: #007AFF; font-weight: bold;');
console.log('%cLead iOS Developer with 12+ years of experience', 'font-size: 12px; color: #8E8E93;');