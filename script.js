// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (!mobileMenu) return;
    const isHidden = mobileMenu.classList.contains('pointer-events-none');
    if (isHidden) {
        mobileMenu.classList.remove('-left-full', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('left-0', 'opacity-100');
    } else {
        mobileMenu.classList.add('-left-full', 'opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('left-0', 'opacity-100');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    if (!mobileMenu) return;
    mobileMenu.classList.add('-left-full', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('left-0', 'opacity-100');
}));

// Enhanced smooth scrolling for navigation links with better easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Enhanced smooth scroll with better easing and duration
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });

            // Additional custom scroll enhancement for ultra-smooth experience
            const targetPosition = target.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.abs(distance) / 2, 1200); // Adaptive duration, max 1.2s

            let start = null;
            function scrollAnimation(timestamp) {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);

                // Custom easing function for ultra-smooth scroll
                const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                window.scrollTo(0, startPosition + (distance * ease));

                if (progress < 1) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.classList.remove('text-amber-400');
        link.classList.add('text-gray-200');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.classList.add('text-amber-400');
            link.classList.remove('text-gray-200');
        }
    });
});

// Bidirectional Reveal on scroll animation for all sections
const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Stagger animation for child elements if they exist
            const children = entry.target.querySelectorAll('.reveal-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('revealed');
                }, index * 200); // Slower stagger for more elegant feel
            });
        } else {
            // Re-trigger animation when scrolling back up
            setTimeout(() => {
                entry.target.classList.remove('revealed');
                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach(child => {
                    child.classList.remove('revealed');
                });
            }, 150); // Slightly longer delay for smoother resets
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(element => {
    element.classList.add('reveal-element');
    revealOnScroll.observe(element);
});

// Enhanced bidirectional section animations with extended timing
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;

            // Animate section title with extended duration
            const title = section.querySelector('h2');
            if (title) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
                title.style.transition = 'opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }

            // Animate content with extended stagger effect
            const contentElements = section.querySelectorAll('p, .info-card, .skill-card, .project-card');
            contentElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = `opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s`;
                }, index * 150); // Much slower stagger for elegant flow
            });

            // Special handling for skills section with extended animation
            if (section.id === 'skills') {
                const skillBars = section.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width || bar.dataset.width || '80%';
                        bar.style.width = '0%';
                        bar.style.transition = 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    }, index * 300); // Much slower skill bar animation
                });
            }

            // Special handling for projects section with extended timing
            if (section.id === 'projects') {
                const projectCards = section.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = `opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.12}s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.12}s`;
                    }, index * 250); // Extended project card stagger
                });
            }
        } else {
            // Reset animations when scrolling back up with extended timing
            setTimeout(() => {
                const section = entry.target;

                // Reset section title
                const title = section.querySelector('h2');
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(15px)';
                    title.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }

                // Reset content elements
                const contentElements = section.querySelectorAll('p, .info-card, .skill-card, .project-card');
                contentElements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });

                // Reset skill bars
                if (section.id === 'skills') {
                    const skillBars = section.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        bar.style.width = '0%';
                    });
                }

                // Reset project cards
                if (section.id === 'projects') {
                    const projectCards = section.querySelectorAll('.project-card');
                    projectCards.forEach(card => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    });
                }
            }, 150);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px'
});

// Observe all main sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Add fade-in animation for project cards
const projectCards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
});

// Advanced Typewriter Effect with Realistic Typing
class TypewriterEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.options = {
            speed: options.speed || 80,
            deleteSpeed: options.deleteSpeed || 40,
            delay: options.delay || 1000,
            pauseTime: options.pauseTime || 2000,
            loop: options.loop || true
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.cursor = null;
    }

    type() {
        if (this.isPaused) return;

        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // Deleting effect
            this.element.textContent = currentText.substring(0, this.element.textContent.length - 1);
            
            if (this.element.textContent === '') {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                this.currentCharIndex = 0;
                
                if (this.options.loop || this.currentTextIndex !== 0) {
                    setTimeout(() => this.type(), this.options.delay);
                }
                return;
            }
            
            // Random delete speed for realism
            const randomDeleteSpeed = this.options.deleteSpeed + Math.random() * 30;
            setTimeout(() => this.type(), randomDeleteSpeed);
        } else {
            // Typing effect
            if (this.currentCharIndex < currentText.length) {
                this.element.textContent += currentText.charAt(this.currentCharIndex);
                this.currentCharIndex++;
                
                // Random typing speed for realism
                const randomSpeed = this.options.speed + Math.random() * 50;
                setTimeout(() => this.type(), randomSpeed);
            } else {
                // Finished typing current text
                if (this.options.loop || this.currentTextIndex < this.texts.length - 1) {
                    setTimeout(() => {
                        this.isDeleting = true;
                        this.type();
                    }, this.options.pauseTime);
                }
            }
        }
    }

    start() {
        this.createDynamicCursor();
        setTimeout(() => this.type(), this.options.delay);
    }

    createDynamicCursor() {
        // Remove existing cursor if any
        const existingCursor = this.element.parentElement.querySelector('.cursor');
        if (existingCursor) {
            existingCursor.remove();
        }

        // Create new dynamic cursor positioned right after the text
        this.cursor = document.createElement('span');
        this.cursor.className = 'cursor';
        this.cursor.innerHTML = '';
        
        // Insert cursor right after the typewriter text element
        this.element.parentElement.insertBefore(this.cursor, this.element.nextSibling);
    }
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    const typewriterElement = document.getElementById('typewriter');
    // Fade-in hero title
    const heroTitle = document.querySelector('#home p.text-4xl');
    if (heroTitle) {
        requestAnimationFrame(() => {
            heroTitle.classList.remove('opacity-0');
            heroTitle.classList.remove('translate-y-5');
        });
    }
    // Smooth, slow float animation for the photo wrapper using JS timeline
    const floatWrapper = document.querySelector('.float-wrapper');
    if (floatWrapper && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        const durationMs = 6000; // slower and smoother
        const amplitudePx = 8;  // small vertical travel
        let startTs = null;
        let direction = 1;

        function step(ts) {
            if (!startTs) startTs = ts;
            const elapsed = (ts - startTs) % durationMs;
            // Use cosine easing for smooth up and down
            const progress = elapsed / durationMs; // 0..1
            const y = Math.cos(progress * 2 * Math.PI) * amplitudePx * -1; // -amp..amp
            floatWrapper.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    if (typewriterElement) {
        const typewriter = new TypewriterEffect(typewriterElement, [
            "Informatics Student",
            "Web Developer",
            "Machine Learning",
            "Tech Enthusiast"
        ], {
            speed: 100,
            deleteSpeed: 40,
            delay: 300,
            pauseTime: 2000,
            loop: true
        });
        typewriter.start();
    }

    // Waving hand animation for 👋 emoji without CSS native
    const wave = document.getElementById('wave-emoji');
    if (wave && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        let start = null;
        const period = 1200; // 1.2s for a smooth wave
        function animate(ts) {
            if (!start) start = ts;
            const t = (ts - start) % period;
            const p = t / period; // 0..1
            // Wave angle easing (-18deg to +18deg)
            const angle = Math.sin(p * 2 * Math.PI) * 18;
            wave.style.display = 'inline-block';
            wave.style.transformOrigin = '70% 70%';
            wave.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
});
