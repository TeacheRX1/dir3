// SahraCity Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show the specific slide
        heroSlides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    if(heroSlides.length > 0) {
        showSlide(0);
        // Change slide every 7 seconds
        setInterval(nextSlide, 7000);
    }
    
    // Copy IP function
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            const copyBtn = document.querySelector('.copy-ip');
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = '#00ff4c';
            
            setTimeout(function() {
                copyBtn.innerHTML = originalIcon;
                copyBtn.style.color = '';
            }, 2000);
        });
    }

    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                
                let count = 0;
                const duration = 2000; // 2 seconds
                const step = Math.ceil(countTo / (duration / 16)); // 60fps
                
                const interval = setInterval(() => {
                    count += step;
                    if (count > countTo) {
                        count = countTo;
                        clearInterval(interval);
                    }
                    target.innerText = count;
                }, 16);
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Smooth Scrolling for Menu Items
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mouse Scroll Button
    const mouseScroll = document.querySelector('.mouse-scroll');
    if(mouseScroll) {
        mouseScroll.addEventListener('click', function() {
            const infoSection = document.querySelector('#info');
            if(infoSection) {
                window.scrollTo({
                    top: infoSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if(cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            
            // Cursor dot follows cursor exactly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Cursor outline follows with a slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 200, fill: 'forwards' });
        });
        
        // Hide cursor when leaving the window
        window.addEventListener('mouseout', function() {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .info-card, .script-card, .about-img');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseover', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'var(--golden)';
            });
            
            element.addEventListener('mouseout', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--golden)';
            });
        });
    }

    // Initialize Particles.js if available
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#d4af37"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#d4af37",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Enhanced Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        
        // Hero parallax effect
        document.querySelectorAll('.hero-slide').forEach(slide => {
            if(slide.classList.contains('active')) {
                slide.style.transform = `scale(1) translateY(${scrollPosition * 0.15}px)`;
            }
        });
        
        // Content parallax effect (moving slightly slower than background)
        if (scrollPosition <= heroSection.offsetHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.05}px)`;
            heroContent.style.opacity = 1 - (scrollPosition / (heroSection.offsetHeight * 0.5));
        }
        
        // Section background parallax
        document.querySelectorAll('.parallax-bg').forEach(bg => {
            const speed = bg.getAttribute('data-speed') || 0.2;
            bg.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Hero overlay opacity change
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            const baseOpacity = 0.7; // Starting opacity
            const additionalOpacity = Math.min(0.3, scrollPosition / 1000);
            heroOverlay.style.background = `linear-gradient(to bottom, 
                rgba(18, 18, 18, ${baseOpacity + additionalOpacity}), 
                rgba(18, 18, 18, ${baseOpacity + additionalOpacity + 0.1}))`;
        }
    });

    // Initialize AOS (Animate On Scroll) if available
    if(typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Scroll Progress Bar
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const scrollProgressContainer = document.querySelector('.scroll-progress-container');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // Update progress bar width
        if(scrollProgressBar) {
            scrollProgressBar.style.width = scrollProgress + "%";
        }
        
        // Show progress bar when scrolling starts
        if(scrollTop > 50) {
            if(scrollProgressContainer) {
                scrollProgressContainer.classList.add('visible');
            }
        } else {
            if(scrollProgressContainer) {
                scrollProgressContainer.classList.remove('visible');
            }
        }
        
        // Section Navigation Active State
        const sections = document.querySelectorAll('section[id]');
        const navDots = document.querySelectorAll('.section-nav-dot');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if(scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if(dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth Scrolling for Section Navigation
    document.querySelectorAll('.section-nav-dot').forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
