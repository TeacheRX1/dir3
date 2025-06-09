document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    }

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        // Only run cursor effects on desktop
        if (window.innerWidth > 992) {
            document.addEventListener('mousemove', function(e) {
                // Position the cursor elements
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
                
                // Add a slight delay to the outline for a trailing effect
                setTimeout(function() {
                    cursorOutline.style.left = e.clientX + 'px';
                    cursorOutline.style.top = e.clientY + 'px';
                }, 50);
                
                // Show cursors once they've moved into position
                if (cursorDot.style.opacity === '0' || cursorOutline.style.opacity === '0') {
                    cursorDot.style.opacity = '1';
                    cursorOutline.style.opacity = '1';
                }
            });
            
            // Make cursor larger when hovering over links or buttons
            const hoverElements = document.querySelectorAll('a, button, .card, .points-card, .vehicle-card, .skin-card, .property-card');
            
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    cursorOutline.style.width = '70px';
                    cursorOutline.style.height = '70px';
                    cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                });
                
                element.addEventListener('mouseleave', function() {
                    cursorOutline.style.width = '40px';
                    cursorOutline.style.height = '40px';
                    cursorOutline.style.borderColor = '#d4af37';
                });
            });
            
            // Hide cursor when leaving window
            document.addEventListener('mouseout', function(e) {
                if (e.relatedTarget === null) {
                    cursorDot.style.opacity = '0';
                    cursorOutline.style.opacity = '0';
                }
            });
        } else {
            // Hide custom cursor on mobile/tablet
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    }

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            // Calculate scroll percentage
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            // Update progress bar width
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }

    // Initialize particles.js if the container exists
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
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
                    "value": 5,
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
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
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

    // Vehicle Filtering - Fixed version
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vehicleItems = document.querySelectorAll('.vehicle-item');
    
    if (filterBtns.length && vehicleItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter vehicle items
                vehicleItems.forEach(item => {
                    if (filterValue === 'all') {
                        // Show all items
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else if (item.classList.contains(filterValue)) {
                        // Show items matching the filter
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        // Hide items not matching the filter
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // FAQ Accordion - Fixed version
    const faqButtons = document.querySelectorAll('.faq-button');
    
    if (faqButtons.length) {
        // Initialize the accordion functionality manually if Bootstrap's collapse isn't working
        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                const isCollapsed = this.classList.contains('collapsed');
                const targetId = this.getAttribute('data-target') || this.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                
                // Toggle the collapsed class
                if (isCollapsed) {
                    this.classList.remove('collapsed');
                    this.setAttribute('aria-expanded', 'true');
                    this.querySelector('i').style.transform = 'rotate(180deg)';
                    
                    // Show the content
                    if (targetEl) {
                        targetEl.classList.add('show');
                    }
                } else {
                    this.classList.add('collapsed');
                    this.setAttribute('aria-expanded', 'false');
                    this.querySelector('i').style.transform = 'rotate(0deg)';
                    
                    // Hide the content
                    if (targetEl) {
                        targetEl.classList.remove('show');
                    }
                }
                
                // Close other open accordions if using accordion behavior
                const parentId = this.getAttribute('data-parent');
                if (parentId) {
                    const parent = document.querySelector(parentId);
                    if (parent) {
                        const siblings = parent.querySelectorAll('.faq-button:not(.collapsed)');
                        siblings.forEach(sibling => {
                            if (sibling !== this) {
                                sibling.classList.add('collapsed');
                                sibling.setAttribute('aria-expanded', 'false');
                                sibling.querySelector('i').style.transform = 'rotate(0deg)';
                                
                                const siblingTargetId = sibling.getAttribute('data-target') || sibling.getAttribute('href');
                                const siblingTarget = document.querySelector(siblingTargetId);
                                if (siblingTarget) {
                                    siblingTarget.classList.remove('show');
                                }
                            }
                        });
                    }
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const offset = 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check if we need to scroll to a specific section (for donation page)
    const scrollToSection = document.body.getAttribute('data-scroll-to-section');
    
    if (scrollToSection) {
        const sectionElement = document.getElementById(scrollToSection);
        
        if (sectionElement) {
            // Wait for page to fully load
            setTimeout(function() {
                // Offset for fixed header
                const offset = 100;
                const sectionPosition = sectionElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});
