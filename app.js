// Space Portfolio Interactive System
class SpacePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.createStarfield();
        this.createFloatingDebris();
        this.createCodeFragments();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupSkillsSystem();
        this.setupQuiz();
        this.setupContactForm();
        this.setupInteractiveElements();
        this.setupMouseFollower();
        this.startAnimationLoop();
        this.createShootingStars();
        this.setupEasterEggs();
    }

    // Create Starfield
    createStarfield() {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;
        
        const starCount = 800;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = Math.random() * 200 + '%';
            star.style.top = Math.random() * 200 + '%';
            
            // Random size and brightness
            const size = Math.random() < 0.8 ? 1 : Math.random() < 0.9 ? 2 : 3;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.opacity = 0.3 + Math.random() * 0.7;
            
            // Random animation delay
            star.style.animationDelay = Math.random() * 3 + 's';
            
            starfield.appendChild(star);
        }
    }

    // Create Floating Debris
    createFloatingDebris() {
        const debrisContainer = document.getElementById('debris');
        if (!debrisContainer) return;
        
        const debrisCount = 50;
        
        for (let i = 0; i < debrisCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'debris-particle';
            
            // Random starting position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            debrisContainer.appendChild(particle);
        }
    }

    // Create Code Fragments
    createCodeFragments() {
        const container = document.getElementById('codeFragments');
        if (!container) return;
        
        const codeSnippets = [
            'function()',
            'const app',
            '{...state}',
            'async/await',
            'React.jsx',
            'MongoDB',
            'Node.js',
            'Express',
            'API call',
            'CSS Grid',
            'JavaScript',
            'Full-Stack'
        ];

        setInterval(() => {
            if (Math.random() < 0.3) {
                const fragment = document.createElement('div');
                fragment.className = 'code-fragment';
                fragment.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                
                // Random starting position
                fragment.style.left = Math.random() * 100 + 'vw';
                fragment.style.top = '100vh';
                
                container.appendChild(fragment);
                
                // Remove after animation
                setTimeout(() => {
                    fragment.remove();
                }, 15000);
            }
        }, 2000);
    }

    // Setup Navigation - Fixed
    setupNavigation() {
        const navSatellites = document.querySelectorAll('.nav-satellite');
        const scrollPortal = document.getElementById('scrollPortal');
        
        navSatellites.forEach(satellite => {
            satellite.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = satellite.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                
                console.log('Navigation clicked:', targetId, targetSection); // Debug log
                
                if (targetSection) {
                    // Add visual feedback
                    satellite.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        satellite.style.transform = '';
                    }, 200);
                    
                    // Smooth scroll to target
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Alternative method for browsers that don't support smooth scroll
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll portal functionality - Fixed
        if (scrollPortal) {
            scrollPortal.addEventListener('click', (e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }

    // Setup Scroll Effects
    setupScrollEffects() {
        const fuelLevel = document.getElementById('fuelLevel');
        const sections = document.querySelectorAll('.space-section');
        
        // Update fuel bar based on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            
            if (fuelLevel) {
                fuelLevel.style.height = scrollPercent + '%';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const nebula = document.querySelector('.nebula-layer');
            const dust = document.querySelector('.cosmic-dust');
            
            if (nebula) {
                nebula.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
            }
            if (dust) {
                dust.style.transform = `translate3d(0, ${scrolled * 0.05}px, 0)`;
            }
        });
    }

    // Setup Skills Solar System - Fixed
    setupSkillsSystem() {
        const skillPlanets = document.querySelectorAll('.skill-planet');
        const skillDetails = document.getElementById('skillDetails');
        const skillTitle = document.getElementById('skillTitle');
        const skillList = document.getElementById('skillList');
        const closeBtn = document.getElementById('closeSkillDetails');

        const skillsData = {
            frontend: {
                title: 'Frontend Technologies',
                skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Design', 'CSS Grid & Flexbox']
            },
            backend: {
                title: 'Backend Technologies', 
                skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT Authentication', 'Server Architecture']
            },
            database: {
                title: 'Database Systems',
                skills: ['MongoDB', 'Mongoose', 'SQL', 'Database Design', 'Data Modeling']
            },
            other: {
                title: 'Tools & Technologies',
                skills: ['Kotlin (Android)', 'Python (Basic)', 'Git & GitHub', 'Docker (Beginner)', 'Version Control']
            }
        };

        console.log('Setting up skills system...', skillPlanets.length, 'planets found'); // Debug

        skillPlanets.forEach(planet => {
            planet.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const skillType = planet.getAttribute('data-skill');
                const skillData = skillsData[skillType];
                
                console.log('Planet clicked:', skillType, skillData); // Debug log
                
                // Add click feedback
                planet.style.transform = 'translateX(-50%) scale(1.3)';
                setTimeout(() => {
                    planet.style.transform = 'translateX(-50%) scale(1.2)';
                }, 150);
                
                if (skillData && skillDetails && skillTitle && skillList) {
                    skillTitle.textContent = skillData.title;
                    skillList.innerHTML = '';
                    
                    skillData.skills.forEach((skill, index) => {
                        const skillItem = document.createElement('div');
                        skillItem.className = 'skill-item';
                        skillItem.textContent = skill;
                        skillItem.style.animationDelay = (index * 0.1) + 's';
                        skillList.appendChild(skillItem);
                    });
                    
                    skillDetails.classList.add('active');
                    console.log('Skill details shown for:', skillType); // Debug
                }
            });

            // Add hover effects
            planet.addEventListener('mouseenter', () => {
                planet.style.transform = 'translateX(-50%) scale(1.2)';
            });

            planet.addEventListener('mouseleave', () => {
                planet.style.transform = 'translateX(-50%) scale(1)';
            });
        });

        // Close skill details - Fixed
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                skillDetails.classList.remove('active');
            });
        }

        // Close on outside click
        if (skillDetails) {
            skillDetails.addEventListener('click', (e) => {
                if (e.target === skillDetails) {
                    skillDetails.classList.remove('active');
                }
            });
        }
    }

    // Setup Quiz System
    setupQuiz() {
        const quizQuestions = [
            {
                question: "Which movie genre inspires Aryan?",
                options: ["Romance", "Action", "Comedy", "Horror"],
                answer: "Action"
            },
            {
                question: "What was Aryan's first creative website?",
                options: ["Portfolio", "Superhero Resume", "Blog", "Quiz App"],
                answer: "Superhero Resume"
            },
            {
                question: "Aryan is passionate about?",
                options: ["Cooking", "Fashion", "Sports", "Music"],
                answer: "Fashion"
            },
            {
                question: "Where did Aryan complete Full-Stack training?",
                options: ["IIT Delhi", "Masai School", "NIT Warangal", "IIIT Allahabad"],
                answer: "Masai School"
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        const questionCounter = document.getElementById('questionCounter');
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        const feedback = document.getElementById('quizFeedback');

        if (!questionCounter || !questionText || !optionsContainer || !feedback) {
            return; // Quiz elements not found
        }

        const loadQuestion = () => {
            if (currentQuestion < quizQuestions.length) {
                const question = quizQuestions[currentQuestion];
                questionCounter.textContent = `Question ${currentQuestion + 1}/${quizQuestions.length}`;
                questionText.textContent = question.question;
                feedback.textContent = '';
                
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, index) => {
                    const button = document.createElement('button');
                    button.className = 'quiz-option';
                    button.textContent = option;
                    button.addEventListener('click', () => selectAnswer(option));
                    
                    // Stagger animation
                    setTimeout(() => {
                        button.style.opacity = '1';
                        button.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    button.style.opacity = '0';
                    button.style.transform = 'translateY(20px)';
                    button.style.transition = 'all 0.3s ease';
                    
                    optionsContainer.appendChild(button);
                });
            } else {
                // Quiz completed
                questionCounter.textContent = 'Quiz Complete!';
                questionText.textContent = `🎉 You scored ${score}/${quizQuestions.length}!`;
                optionsContainer.innerHTML = '';
                feedback.textContent = score === quizQuestions.length ? 
                    'Perfect! You know me well! 🚀' : 
                    'Great effort! Thanks for playing! ✨';
            }
        };

        const selectAnswer = (selectedAnswer) => {
            const question = quizQuestions[currentQuestion];
            const options = document.querySelectorAll('.quiz-option');
            
            options.forEach(option => {
                option.disabled = true;
                if (option.textContent === question.answer) {
                    option.classList.add('correct');
                } else if (option.textContent === selectedAnswer && selectedAnswer !== question.answer) {
                    option.classList.add('incorrect');
                }
            });
            
            if (selectedAnswer === question.answer) {
                score++;
                feedback.textContent = '✅ Correct! Well done!';
                feedback.style.color = '#4caf50';
            } else {
                feedback.textContent = `❌ Wrong! The answer was: ${question.answer}`;
                feedback.style.color = '#f44336';
            }
            
            setTimeout(() => {
                currentQuestion++;
                loadQuestion();
            }, 2000);
        };

        // Initialize quiz
        loadQuestion();
    }

    // Setup Contact Form - Fixed
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                this.showMessage('Please fill in all fields!', 'error');
                return;
            }
            
            // Simulate sending message
            const transmissionBtn = contactForm.querySelector('.transmission-btn');
            const originalText = transmissionBtn.querySelector('.btn-text').textContent;
            
            transmissionBtn.querySelector('.btn-text').textContent = 'TRANSMITTING...';
            transmissionBtn.disabled = true;
            transmissionBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                // Show success message
                this.showMessage(
                    `🚀 Message transmitted successfully!\n\nThank you ${name}! Your message has been sent through the cosmic portal.\nI'll respond to ${email} as soon as possible!`,
                    'success'
                );
                
                transmissionBtn.querySelector('.btn-text').textContent = originalText;
                transmissionBtn.disabled = false;
                transmissionBtn.style.opacity = '1';
                contactForm.reset();
            }, 2000);
        });
    }

    // Show Message Function - New
    showMessage(message, type = 'success') {
        // Create message overlay
        const messageOverlay = document.createElement('div');
        messageOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            background: ${type === 'success' ? 'rgba(0, 247, 255, 0.1)' : 'rgba(255, 59, 141, 0.1)'};
            border: 2px solid ${type === 'success' ? '#00f7ff' : '#ff3b8d'};
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            text-align: center;
            color: #fff;
            font-family: 'Rajdhani', sans-serif;
            box-shadow: 0 0 40px ${type === 'success' ? 'rgba(0, 247, 255, 0.3)' : 'rgba(255, 59, 141, 0.3)'};
        `;
        
        messageBox.innerHTML = `
            <div style="font-size: 1.2rem; margin-bottom: 1rem; white-space: pre-line;">${message}</div>
            <button onclick="this.closest('.message-overlay').remove()" style="
                padding: 0.8rem 2rem;
                background: linear-gradient(45deg, #00f7ff, #ff3b8d);
                border: none;
                border-radius: 8px;
                color: #000;
                font-weight: bold;
                cursor: pointer;
                font-family: 'Orbitron', monospace;
            ">ACKNOWLEDGE</button>
        `;
        
        messageOverlay.className = 'message-overlay';
        messageOverlay.appendChild(messageBox);
        document.body.appendChild(messageOverlay);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (messageOverlay.parentNode) {
                messageOverlay.remove();
            }
        }, 10000);
        
        // Close on overlay click
        messageOverlay.addEventListener('click', (e) => {
            if (e.target === messageOverlay) {
                messageOverlay.remove();
            }
        });
    }

    // Setup Interactive Elements
    setupInteractiveElements() {
        // Project stations hover effects
        const projectStations = document.querySelectorAll('.project-station');
        
        projectStations.forEach(station => {
            station.addEventListener('mouseenter', () => {
                station.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            station.addEventListener('mouseleave', () => {
                station.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Mission markers interaction
        const missionMarkers = document.querySelectorAll('.mission-marker');
        
        missionMarkers.forEach(marker => {
            marker.addEventListener('click', () => {
                marker.style.animation = 'markerPulse 0.5s ease-in-out';
                setTimeout(() => {
                    marker.style.animation = 'markerPulse 3s ease-in-out infinite';
                }, 500);
            });
        });

        // Social satellites hover effects
        const socialSatellites = document.querySelectorAll('.social-satellite');
        
        socialSatellites.forEach(satellite => {
            satellite.addEventListener('mouseenter', () => {
                const core = satellite.querySelector('.satellite-core');
                if (core) {
                    core.style.transform = 'scale(1.5)';
                    core.style.boxShadow = '0 0 20px var(--space-glow), 0 0 30px var(--space-primary)';
                }
            });
            
            satellite.addEventListener('mouseleave', () => {
                const core = satellite.querySelector('.satellite-core');
                if (core) {
                    core.style.transform = 'scale(1)';
                    core.style.boxShadow = '0 0 5px var(--space-primary)';
                }
            });
        });
    }

    // Setup Mouse Follower
    setupMouseFollower() {
        const mouseFollower = document.getElementById('mouseFollower');
        if (!mouseFollower) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!mouseFollower.classList.contains('active')) {
                mouseFollower.classList.add('active');
            }
        });
        
        document.addEventListener('mouseleave', () => {
            mouseFollower.classList.remove('active');
        });
        
        // Smooth following animation
        const updateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            mouseFollower.style.left = followerX - 10 + 'px';
            mouseFollower.style.top = followerY - 10 + 'px';
            
            requestAnimationFrame(updateFollower);
        };
        
        updateFollower();
    }

    // Create Shooting Stars
    createShootingStars() {
        const shootingStarsContainer = document.getElementById('shootingStars');
        if (!shootingStarsContainer) return;
        
        const createShootingStar = () => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Random starting position
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 50 + 'vh';
            
            // Animation
            star.style.animation = 'none';
            star.style.transform = 'translate3d(0, 0, 0)';
            
            shootingStarsContainer.appendChild(star);
            
            // Animate
            requestAnimationFrame(() => {
                star.style.transform = 'translate3d(100vw, 100vh, 0)';
                star.style.transition = 'transform 2s linear';
                star.style.opacity = '1';
                
                setTimeout(() => {
                    star.style.opacity = '0';
                }, 1000);
            });
            
            // Remove after animation
            setTimeout(() => {
                star.remove();
            }, 3000);
        };
        
        // Create shooting stars at intervals
        setInterval(() => {
            if (Math.random() < 0.3) {
                createShootingStar();
            }
        }, 3000);
    }

    // Setup Easter Eggs
    setupEasterEggs() {
        let keySequence = '';
        const secretCode = 'space';
        
        document.addEventListener('keydown', (e) => {
            keySequence += e.key.toLowerCase();
            
            if (keySequence.length > secretCode.length) {
                keySequence = keySequence.slice(-secretCode.length);
            }
            
            if (keySequence === secretCode) {
                this.triggerSpaceEasterEgg();
                keySequence = '';
            }
        });
        
        // Clickable shooting stars
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('shooting-star')) {
                this.createEasterEggExplosion(e.clientX, e.clientY);
            }
        });
    }

    // Trigger Space Easter Egg
    triggerSpaceEasterEgg() {
        const colors = ['#00f7ff', '#ff3b8d', '#f2a900', '#4caf50', '#9c27b0'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = Math.random() * 100 + 'vh';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '10000';
                particle.style.animation = 'easterEggParticle 3s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 3000);
            }, i * 100);
        }
        
        // Add CSS for particle animation
        if (!document.getElementById('easter-egg-styles')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-styles';
            style.textContent = `
                @keyframes easterEggParticle {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                    100% { transform: scale(0) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Create Easter Egg Explosion
    createEasterEggExplosion(x, y) {
        const colors = ['#00f7ff', '#ff3b8d', '#f2a900'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            
            const angle = (i / 10) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            particle.style.transition = 'all 1s ease-out';
            document.body.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.left = endX + 'px';
                particle.style.top = endY + 'px';
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0)';
            });
            
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Animation Loop
    startAnimationLoop() {
        const animate = () => {
            // Update any continuous animations here
            requestAnimationFrame(animate);
        };
        animate();
    }

    // Utility Functions
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Initialize the space portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Space Portfolio...');
    new SpacePortfolio();
});

// Additional utility functions for enhanced interactivity
function addGlowEffect(element, color = '#00f7ff') {
    if (!element) return;
    element.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
    
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 1000);
}

// Smooth scroll polyfill for older browsers
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
                const distance = targetPosition - startPosition;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, 1000);
                    window.scrollTo(0, run);
                    if (timeElapsed < 1000) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });
}

// Performance optimization for animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Disable or reduce animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0s');
}
