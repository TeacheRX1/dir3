// Rules page JavaScript
$(document).ready(function() {
    // Initialize AOS - faster animations
    AOS.init({
        duration: 400,
        once: true
    });
    
    // Fast scrolling for rules navigation
    $('.rules-nav a').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this).attr('href');
        
        // Update active class immediately
        $('.rules-nav a').removeClass('active');
        $(this).addClass('active');
        
        // Scroll to target section much faster (200ms instead of 800ms)
        $('html, body').animate({
            scrollTop: $(target).offset().top - 100
        }, 200);
    });
    
    // Update active nav item on scroll
    $(window).on('scroll', function() {
        var scrollPosition = $(window).scrollTop();
        
        // Check each rules section
        $('.rules-item').each(function() {
            var currentSection = $(this);
            var sectionTop = currentSection.offset().top - 150;
            var sectionBottom = sectionTop + currentSection.outerHeight();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                var id = currentSection.attr('id');
                $('.rules-nav a').removeClass('active');
                $('.rules-nav a[href="#' + id + '"]').addClass('active');
            }
        });
    });
    
    // Initially set the first nav item as active
    $('.rules-nav a:first').addClass('active');
    
    // Initialize particles background with more interactive effects
    particlesJS('particles-js', {
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
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#d4af37",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
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
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });
    
    // Add hover effect for nav items
    $('.rules-nav a').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );
    
    // Add glow effect to rules headers on scroll
    $(window).scroll(function() {
        $('.rules-item h2, .rules-item h3').each(function() {
            if($(this).isInViewport()) {
                $(this).addClass('glow-effect');
            } else {
                $(this).removeClass('glow-effect');
            }
        });
    });
    
    // Helper function to check if element is in viewport
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    // Create floating particles for background effect
    function createParticles() {
        // Remove existing particles
        $('.floating-particle').remove();
        
        // Create 30 floating particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 6 + 2;
        
        // Random opacity
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Set styles
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animation = `float ${duration}s ease-in-out infinite`;
        
        // Add particle to rules section
        document.querySelector('.rules-section').appendChild(particle);
        
        // Remove and recreate after a random time for variety
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                createParticle();
            }
        }, duration * 1000);
    }
    
    // Create particles
    createParticles();
    
    // Re-create particles on window resize
    $(window).on('resize', function() {
        createParticles();
    });
    
    // Apply English direction to specific paragraphs if needed
    $('.rules-item p').each(function() {
        // Check if paragraph contains more English than Arabic
        // This is a simple check - you may need to refine it
        const text = $(this).text();
        const englishChars = text.match(/[a-zA-Z0-9]/g) || [];
        const arabicChars = text.match(/[\u0600-\u06FF]/g) || [];
        
        if (englishChars.length > arabicChars.length) {
            $(this).addClass('english');
        }
    });
    
    // Smooth scrolling to anchor when page loads with hash
    if (window.location.hash) {
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top - 100
            }, 200);
            
            // Update active nav item
            $('.rules-nav a').removeClass('active');
            $('.rules-nav a[href="' + window.location.hash + '"]').addClass('active');
        }, 300);
    }
});