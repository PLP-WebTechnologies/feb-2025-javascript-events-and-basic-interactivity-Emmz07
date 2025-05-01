/**
 * Animation utilities
 */

// Animate elements when they come into view
function initScrollAnimations() {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    }
    
    // Function to add animation class to elements in viewport
    function checkViewport() {
      animateElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
          const animationType = element.getAttribute('data-animation') || 'fade-in';
          element.classList.add(animationType);
          element.classList.add('animated');
        }
      });
    }
    
    // Add animated class to elements in viewport on scroll
    window.addEventListener('scroll', checkViewport);
    
    // Initial check for elements in viewport
    checkViewport();
  }
  
  // Add smooth scrolling for anchor links
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Get the target element
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Calculate scroll position
        const offset = 80; // Account for fixed header
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        // Scroll smoothly to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active class for navigation
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
        });
        
        this.classList.add('active');
      });
    });
  }
  
  // Update active navigation link based on scroll position
  function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
          current = '#' + section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Initialize animations on page load
  document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    updateActiveNavOnScroll();
    
    // Add animation classes to section elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('animate-on-scroll');
      section.setAttribute('data-animation', 'fade-in');
    });
  });


/**
 * Event handling functionality
 */

// Main button click event
const mainCta = document.getElementById('main-cta');
const clickMessage = document.getElementById('click-message');
let clickCount = 0;

// Normal click handling
mainCta.addEventListener('click', () => {
  clickCount++;
  
  if (clickCount === 1) {
    clickMessage.textContent = "Nice! You clicked the button.";
  } else if (clickCount < 5) {
    clickMessage.textContent = `You've clicked ${clickCount} times!`;
  } else if (clickCount === 5) {
    clickMessage.textContent = "Wow! You're really enjoying this button!";
  } else if (clickCount === 10) {
    clickMessage.textContent = "Double-click for a surprise!";
  } else {
    clickMessage.textContent = `${clickCount} clicks and counting...`;
  }
  
  // Add a pulse animation to the button
  mainCta.classList.add('pulse');
  setTimeout(() => {
    mainCta.classList.remove('pulse');
  }, 1000);
});

// Double click event (secret feature)
mainCta.addEventListener('dblclick', () => {
  const colors = ['#FF453A', '#FF9F0A', '#FFD60A', '#30D158', '#0A84FF', '#BF5AF2'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  document.documentElement.style.setProperty('--primary', randomColor);
  document.documentElement.style.setProperty('--primary-light', adjustColorBrightness(randomColor, 20));
  document.documentElement.style.setProperty('--primary-dark', adjustColorBrightness(randomColor, -20));
  
  clickMessage.textContent = "Secret activated: Theme color changed!";
  clickMessage.classList.add('shake');
  
  setTimeout(() => {
    clickMessage.classList.remove('shake');
  }, 500);
});

// Key press detection
const keyPressDisplay = document.getElementById('key-press-display');

let keysPressed = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

body.addEventListener('keydown', (event) => {
  const key = event.key;
  keyPressDisplay.textContent = key;
  
  // Add the key to the sequence
  keysPressed.push(key);
  
  // Keep only the last 10 keys
  if (keysPressed.length > 10) {
    keysPressed.shift();
  }
  
  // Check if the Konami code is entered
  if (keysPressed.join(',') === konamiCode.join(',')) {
    activateEasterEgg();
    keysPressed = [];
  }
});

// Color change button
const colorChangeBtn = document.getElementById('color-change-btn');
let colorToggle = false;

colorChangeBtn.addEventListener('click', () => {
  if (!colorToggle) {
    colorChangeBtn.style.backgroundColor = 'var(--accent)';
    colorChangeBtn.textContent = "I Changed!";
  } else {
    colorChangeBtn.style.backgroundColor = 'var(--secondary)';
    colorChangeBtn.textContent = "Change My Color";
  }
  
  colorToggle = !colorToggle;
});

// Hover element
const hoverElement = document.getElementById('hover-element');

hoverElement.addEventListener('mouseenter', () => {
  hoverElement.textContent = "That tickles!";
});

hoverElement.addEventListener('mouseleave', () => {
  hoverElement.textContent = "Hover over me";
});

// Long press detection (another secret feature)
let pressTimer;

mainCta.addEventListener('mousedown', () => {
  pressTimer = setTimeout(() => {
    clickMessage.textContent = "Secret activated: Long press detected!";
    document.body.classList.add('shake');
    
    setTimeout(() => {
      document.body.classList.remove('shake');
    }, 500);
  }, 1500);
});

mainCta.addEventListener('mouseup', () => {
  clearTimeout(pressTimer);
});

mainCta.addEventListener('mouseleave', () => {
  clearTimeout(pressTimer);
});

// Easter egg activation
const easterEgg = document.getElementById('easter-egg');
const closeEasterEgg = document.getElementById('close-easter-egg');

function activateEasterEgg() {
  easterEgg.classList.add('active');
}

closeEasterEgg.addEventListener('click', () => {
  easterEgg.classList.remove('active');
});

// Utility functions
function adjustColorBrightness(hex, percent) {
  // Parse the hex color to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Adjust brightness
  r = clamp(r + (percent / 100) * 255);
  g = clamp(g + (percent / 100) * 255);
  b = clamp(b + (percent / 100) * 255);

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function clamp(value) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

/**
 * Image Gallery functionality
 */

// Gallery elements
const galleryThumbnails = document.querySelectorAll('.gallery-thumbnails img');
const currentImage = document.getElementById('current-image');
const imageCaption = document.querySelector('.image-caption');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Initialize gallery
function initGallery() {
  // Set initial image
  updateActiveImage(0);
  
  // Add click event listeners to thumbnails
  galleryThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      updateActiveImage(index);
    });
  });
  
  // Add click event listeners to navigation buttons
  prevBtn.addEventListener('click', showPreviousImage);
  nextBtn.addEventListener('click', showNextImage);
  
  // Add keyboard navigation for gallery
  document.addEventListener('keydown', (event) => {
    if (isElementInViewport(currentImage)) {
      if (event.key === 'ArrowLeft') {
        showPreviousImage();
      } else if (event.key === 'ArrowRight') {
        showNextImage();
      }
    }
  });
  
  // Add swipe gesture support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  const galleryMain = document.querySelector('.gallery-main');
  
  galleryMain.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  galleryMain.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, show next image
      showNextImage();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, show previous image
      showPreviousImage();
    }
  }
}

// Update the active image
function updateActiveImage(index) {
  // Remove active class from all thumbnails
  galleryThumbnails.forEach(thumbnail => {
    thumbnail.classList.remove('active');
  });
  
  // Add active class to selected thumbnail
  galleryThumbnails[index].classList.add('active');
  
  // Transition effect
  currentImage.style.opacity = 0;
  
  setTimeout(() => {
    // Update main image and caption
    currentImage.src = galleryThumbnails[index].src;
    imageCaption.textContent = galleryThumbnails[index].getAttribute('data-caption');
    
    // Fade in
    currentImage.style.opacity = 1;
  }, 300);
  
  // Update current index
  currentIndex = index;
}

// Show previous image
function showPreviousImage() {
  currentIndex = (currentIndex - 1 + galleryThumbnails.length) % galleryThumbnails.length;
  updateActiveImage(currentIndex);
}

// Show next image
function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryThumbnails.length;
  updateActiveImage(currentIndex);
}

// Auto rotation
let autoRotate;

function startAutoRotation() {
  autoRotate = setInterval(() => {
    if (isElementInViewport(currentImage)) {
      showNextImage();
    }
  }, 5000);
}

function stopAutoRotation() {
  clearInterval(autoRotate);
}

// Start/stop auto rotation based on visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startAutoRotation();
  } else {
    stopAutoRotation();
  }
});

window.addEventListener('scroll', () => {
  if (isElementInViewport(currentImage)) {
    startAutoRotation();
  } else {
    stopAutoRotation();
  }
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  startAutoRotation();
});

/**
 * Main script file
 */

// DOM elements
const body = document.body;
const header = document.querySelector('header');

// Handle header background on scroll
function handleHeaderScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Handle dark/light mode toggle
function initDarkModeToggle() {
  // Check user preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode) {
    body.classList.add('dark-mode');
  }
  
  // Add dark mode toggle if needed
  // const darkModeToggle = document.getElementById('dark-mode-toggle');
  // if (darkModeToggle) {
  //   darkModeToggle.addEventListener('click', () => {
  //     body.classList.toggle('dark-mode');
  //   });
  // }
}

// Add loading animation
function showPageLoadAnimation() {
  body.classList.add('loading');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      body.classList.remove('loading');
    }, 500);
  });
}

// Mobile navigation toggle
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const nav = document.querySelector('nav');
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  handleHeaderScroll();
  initDarkModeToggle();
  showPageLoadAnimation();
  initMobileNav();
  
  // Log a welcome message
  console.log('Welcome to the Interactive JavaScript Experience!');
  console.log('Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A');
});

/**
 * Tabs and Accordion functionality
 */

// Tabs functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// Initialize tabs
function initTabs() {
  // Add click event listeners to tab buttons
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Initialize accordion
function initAccordion() {
  // Add click event listeners to accordion headers
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      
      // Toggle active class on the accordion item
      if (accordionItem.classList.contains('active')) {
        accordionItem.classList.remove('active');
      } else {
        // Close all accordion items first (uncomment for single-open behavior)
        // accordionHeaders.forEach(h => {
        //   h.parentElement.classList.remove('active');
        // });
        
        accordionItem.classList.add('active');
      }
    });
  });
}

// Animation play button
const playAnimationsBtn = document.getElementById('play-animations');
const animationBoxes = document.querySelectorAll('.animation-box');

// Initialize animation demo
function initAnimationDemo() {
  playAnimationsBtn.addEventListener('click', () => {
    // Remove active class from all animation boxes
    animationBoxes.forEach(box => {
      box.classList.remove('active');
    });
    
    // Add active class with a delay for each box
    animationBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add('active');
      }, index * 200);
    });
    
    // Remove active class after animations complete
    setTimeout(() => {
      animationBoxes.forEach(box => {
        box.classList.remove('active');
      });
    }, 2500);
  });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordion();
  initAnimationDemo();
});

/**
 * Form validation functionality
 */

// Contact form validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const messageError = document.getElementById('message-error');
const strengthBar = document.querySelector('.strength-bar');
const strengthValue = document.getElementById('strength-value');
const formSuccess = document.getElementById('form-success');

// Helper function to show error messages
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.add('error');
}

// Helper function to clear error messages
function clearError(input, errorElement) {
  errorElement.textContent = '';
  input.classList.remove('error');
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function getPasswordStrength(password) {
  if (password.length < 8) return { strength: 'weak', color: 'var(--error)' };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&#]/.test(password)) {
    return { strength: 'very-strong', color: 'var(--success)' };
  }
  if (/[A-Z]/.test(password) || /[0-9]/.test(password)) {
    return { strength: 'medium', color: 'var(--warning)' };
  }
  return { strength: 'strong', color: 'var(--secondary)' };
}

// Real-time validation for password strength
passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const { strength, color } = getPasswordStrength(password);

  strengthBar.setAttribute('data-strength', strength);
  strengthBar.querySelector('::before').style.backgroundColor = color;
  strengthValue.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
});

// Form submission validation
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === '') {
    showError(nameInput, nameError, 'Name is required.');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    showError(emailInput, emailError, 'Email is required.');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Validate password
  if (passwordInput.value.trim() === '') {
    showError(passwordInput, passwordError, 'Password is required.');
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  // Validate message
  if (messageInput.value.trim() === '') {
    showError(messageInput, messageError, 'Message is required.');
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  // If all fields are valid, show success message
  if (isValid) {
    formSuccess.textContent = 'Form submitted successfully!';
    contactForm.reset();
    strengthBar.setAttribute('data-strength', 'weak');
    strengthValue.textContent = 'None';
  }
});

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

function setupCounter(element) {
    let counter = 0
    const setCounter = (count) => {
      counter = count
      element.innerHTML = `count is ${counter}`
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
  }
  