// Space-themed Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTwinklingStars();
    initTypewriter();
    initScrollAnimations();
    initContactForm();
    initCosmicEffects();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 27, 58, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 27, 58, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
}

// Twinkling stars background system
function initTwinklingStars() {
    createStarsBackground();
}

function createStarsBackground() {
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);
    
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        createTwinklingStar(starsContainer);
    }
}

function createTwinklingStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random star size
    const sizeType = Math.random();
    if (sizeType > 0.8) {
        star.classList.add('large');
    } else if (sizeType > 0.5) {
        star.classList.add('medium');
    } else {
        star.classList.add('small');
    }
    
    // Random animation duration and delay
    const duration = 2 + Math.random() * 6; // 2-8 seconds
    const delay = Math.random() * 4; // 0-4 seconds
    
    // Choose animation type randomly
    const animationType = Math.random();
    let animationName = 'twinkle';
    if (animationType > 0.66) {
        animationName = 'twinkle-delay';
    } else if (animationType > 0.33) {
        animationName = 'twinkle-slow';
    }
    
    star.style.cssText = `
        left: ${x}%;
        top: ${y}%;
        animation: ${animationName} ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(star);
}

// Typewriter effect for hero section
function initTypewriter() {
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    
    if (heroName) {
        const nameText = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        
        typeText(heroName, nameText, 100, () => {
            // After name is typed, show subtitle
            if (heroSubtitle) {
                heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    }
}

function typeText(element, text, speed, callback) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('skill-category')) {
                    animateSkillCategory(entry.target);
                } else if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-content,
        .timeline-item,
        .experience-card,
        .skill-category,
        .project-card,
        .contact-content
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS animations
    addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .section-header,
        .about-content,
        .timeline-item,
        .experience-card,
        .skill-category,
        .project-card,
        .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .skill-category.animate-in {
            animation: skillGlow 0.8s ease-out;
        }
        
        @keyframes skillGlow {
            0% {
                box-shadow: 0 0 0 rgba(99, 102, 241, 0);
            }
            50% {
                box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
            }
            100% {
                box-shadow: 0 0 0 rgba(99, 102, 241, 0);
            }
        }
        
        @keyframes projectReveal {
            0% {
                opacity: 0;
                transform: translateY(30px) rotateX(45deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
    `;
    document.head.appendChild(style);
}

function animateTimelineItem(item) {
    const icon = item.querySelector('.timeline-icon');
    const info = item.querySelector('.timeline-info');
    
    if (icon) {
        setTimeout(() => {
            icon.style.animation = 'pulse-glow 0.6s ease-out';
        }, 200);
    }
    
    if (info) {
        setTimeout(() => {
            info.style.transform = 'translateY(0) scale(1)';
            info.style.opacity = '1';
        }, 300);
    }
}

function animateSkillCategory(category) {
    const skillItems = category.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeInUp 0.4s ease-out forwards';
            item.style.animationDelay = `${index * 0.1}s`;
        }, 200);
    });
}

function animateProjectCard(card) {
    card.style.animation = 'projectReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
        setTimeout(() => {
            overlay.style.transition = 'opacity 0.3s ease';
        }, 800);
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(contactForm);
        });
        
        // Add floating label effect
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(addFloatingLabelEffect);
    }
}

function addFloatingLabelEffect(input) {
    const label = input.previousElementSibling;
    
    if (label && label.classList.contains('form-label')) {
        input.addEventListener('focus', () => {
            label.style.transform = 'translateY(-20px) scale(0.9)';
            label.style.color = 'var(--space-accent)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = 'var(--space-text-secondary)';
            }
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showFormSuccess();
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showFormSuccess() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(6, 182, 212, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        ">
            Message sent successfully! ✨
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cosmic effects and interactions
function initCosmicEffects() {
    addMouseTrackingEffect();
    addCosmicCursor();
    initBreathingAnimation();
}

function addMouseTrackingEffect() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Move orb rings based on mouse position
        const orbRings = document.querySelectorAll('.orb-ring');
        orbRings.forEach((ring, index) => {
            const intensity = (index + 1) * 0.3;
            ring.style.transform = `translate(-50%, -50%) translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
        });
    });
}

function addCosmicCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

function initBreathingAnimation() {
    const cosmicOrb = document.querySelector('.cosmic-orb');
    const icons = document.querySelectorAll('.timeline-icon, .card-icon');
    
    if (cosmicOrb) {
        setInterval(() => {
            cosmicOrb.style.animation = 'breathe 4s ease-in-out infinite';
        }, 4000);
    }
    
    // Add random pulse to icons
    icons.forEach(icon => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                icon.style.animation = 'pulse-glow 1s ease-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1000);
            }
        }, 3000);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional effects on window load
window.addEventListener('load', () => {
    // Add subtle animations to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize project card hover effects
    initProjectCardEffects();
});

function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
}

// Performance optimization
const debouncedScroll = debounce(() => {
    // Scroll-based animations
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Preload animations and optimize performance
requestAnimationFrame(() => {
    document.body.style.visibility = 'visible';
});document.querySelectorAll(".live-demo").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // Replace with your two demo links
      window.open("https://github.com/aryansri9936/mern-books-backend", "_blank");
      window.open("https://github.com/aryansri9936/mern-books-client", "_blank");
    });
  });
