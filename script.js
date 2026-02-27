document.addEventListener('DOMContentLoaded', function() {
    // Brutal loading animation
    document.body.classList.add('loading');
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);

    // Crosshair cursor follows mouse
    let cursors = [];

    // Create multiple cursor trails for brutal effect
    for (let i = 0; i < 5; i++) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: ${20 - i * 2}px;
            height: ${20 - i * 2}px;
            background: ${i === 0 ? '#ff0000' : i === 1 ? '#00ff00' : '#000000'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i * 0.2};
            transition: all ${0.1 + i * 0.02}s ease;
        `;
        document.body.appendChild(cursor);
        cursors.push(cursor);
    }

    document.addEventListener('mousemove', (e) => {
        cursors.forEach((cursor, index) => {
            setTimeout(() => {
                cursor.style.left = (e.clientX - parseInt(cursor.style.width) / 2) + 'px';
                cursor.style.top = (e.clientY - parseInt(cursor.style.height) / 2) + 'px';
            }, index * 20);
        });
    });

    // Hide default cursor on interactive elements
    document.addEventListener('mouseenter', (e) => {
        if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') {
            document.body.style.cursor = 'none';
        }
    });

    document.addEventListener('mouseleave', (e) => {
        if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a') {
            document.body.style.cursor = 'crosshair';
        }
    });

    // Terminal typing animation
    const terminalCommands = [
        'analyze_startup_failure_rate',
        'your_idea_validation_status',
        'calculate_market_potential',
        'check_competitor_analysis',
        'validate_customer_need'
    ];

    let currentCommandIndex = 0;
    const typingElement = document.querySelector('.typing');
    const cursorElement = document.querySelector('.cursor');

    function typeCommand() {
        if (typingElement) {
            const command = terminalCommands[currentCommandIndex];
            let charIndex = 0;

            // Clear previous command
            typingElement.textContent = '';

            const typeInterval = setInterval(() => {
                if (charIndex < command.length) {
                    typingElement.textContent += command[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    // Wait 3 seconds then type next command
                    setTimeout(() => {
                        currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
                        typeCommand();
                    }, 3000);
                }
            }, 100);
        }
    }

    // Start terminal typing
    setTimeout(typeCommand, 1000);

    // Glitch effect on hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setInterval(() => {
            if (Math.random() > 0.95) { // 5% chance every 100ms
                heroTitle.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                heroTitle.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => {
                    heroTitle.style.transform = 'translate(0, 0)';
                    heroTitle.style.filter = 'none';
                }, 50);
            }
        }, 100);
    }

    // Scroll-triggered animations with brutal timing
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const brutalistObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translate(0, 0)';
                entry.target.style.opacity = '1';

                // Add random delay for brutal stagger effect
                setTimeout(() => {
                    entry.target.classList.add('brutal-animate');
                }, Math.random() * 200);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.problem-card, .day-block, .pricing-card-brutal, .testimonial-brutal'
    );

    animatedElements.forEach(el => {
        // Initial state
        el.style.transform = 'translate(20px, 40px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

        brutalistObserver.observe(el);
    });

    // Add CSS for brutal animations
    const style = document.createElement('style');
    style.textContent = `
        .brutal-animate {
            animation: brutalistPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        @keyframes brutalistPop {
            0% {
                transform: translate(20px, 40px) scale(0.8);
                opacity: 0;
            }
            50% {
                transform: translate(-5px, -5px) scale(1.05);
            }
            100% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
        }

        .brutal-shake {
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .glitch {
            animation: glitch 0.3s ease-in-out;
        }

        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);

    // Brutal hover effects
    function addBrutalHover(elements, colorClass) {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = 'translate(-4px, -4px)';
                el.style.boxShadow = `4px 4px 0px var(--${colorClass})`;
                el.style.borderColor = `var(--${colorClass})`;

                // Random glitch chance
                if (Math.random() > 0.8) {
                    el.classList.add('glitch');
                    setTimeout(() => el.classList.remove('glitch'), 300);
                }
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = '';
            });
        });
    }

    // Apply brutal hover effects
    addBrutalHover(document.querySelectorAll('.problem-card'), 'red');
    addBrutalHover(document.querySelectorAll('.day-block:not(.final)'), 'black');
    addBrutalHover(document.querySelectorAll('.day-block.final'), 'red');
    addBrutalHover(document.querySelectorAll('.testimonial-brutal:nth-child(1)'), 'red');
    addBrutalHover(document.querySelectorAll('.testimonial-brutal:nth-child(2)'), 'green');
    addBrutalHover(document.querySelectorAll('.testimonial-brutal:nth-child(3)'), 'blue');

    // Smooth scroll for navigation with easing
    document.querySelectorAll('[data-target]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Add brutal shake to clicked element
                this.classList.add('brutal-shake');
                setTimeout(() => this.classList.remove('brutal-shake'), 500);

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button click effects
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create click explosion effect
            const explosion = document.createElement('div');
            explosion.style.cssText = `
                position: absolute;
                left: ${e.clientX - 10}px;
                top: ${e.clientY - 10}px;
                width: 20px;
                height: 20px;
                background: var(--red);
                border-radius: 50%;
                z-index: 10000;
                animation: explode 0.6s ease-out forwards;
                pointer-events: none;
            `;

            document.body.appendChild(explosion);

            // Remove explosion element
            setTimeout(() => {
                if (explosion.parentNode) {
                    explosion.parentNode.removeChild(explosion);
                }
            }, 600);

            // Add button press effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Add explosion animation
    const explosionStyle = document.createElement('style');
    explosionStyle.textContent = `
        @keyframes explode {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(explosionStyle);

    // Random element glitches
    setInterval(() => {
        const elements = document.querySelectorAll('.section-title-brutal, .day-title, .card-title');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];

        if (Math.random() > 0.98 && randomElement) { // Very rare glitch
            randomElement.classList.add('glitch');
            setTimeout(() => {
                randomElement.classList.remove('glitch');
            }, 300);
        }
    }, 1000);

    // Stats counter animation
    const statsElements = document.querySelectorAll('.stat-number-brutal');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                let currentNumber = 0;
                const increment = finalNumber.includes('%') ? 1 : finalNumber.includes('+') ? 10 : 1;
                const duration = 2000;
                const steps = duration / 50;
                const stepIncrement = parseInt(finalNumber) / steps;

                target.textContent = '0';

                const counter = setInterval(() => {
                    currentNumber += stepIncrement;
                    if (currentNumber >= parseInt(finalNumber)) {
                        target.textContent = finalNumber;
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentNumber) + (finalNumber.includes('%') ? '%' : finalNumber.includes('+') ? '+' : '');
                    }
                }, 50);

                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(el => statsObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Show navbar when scrolling up
        if (window.scrollY < lastScrollY) {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Add brutal transitions to navbar
    navbar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    // Form validation with brutal feedback
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form')) {
            const inputs = e.target.querySelectorAll('input[required]');
            let hasErrors = false;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    hasErrors = true;
                    input.style.borderColor = 'var(--red)';
                    input.style.boxShadow = '0 0 0 2px var(--red)';
                    input.classList.add('brutal-shake');

                    setTimeout(() => {
                        input.classList.remove('brutal-shake');
                    }, 500);
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });

            if (hasErrors) {
                e.preventDefault();
                // Show brutal error message
                const errorMsg = document.createElement('div');
                errorMsg.textContent = 'FIX YOUR SHIT FIRST';
                errorMsg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--red);
                    color: var(--white);
                    padding: 1rem 2rem;
                    font-family: var(--font-mono);
                    font-weight: 700;
                    text-transform: uppercase;
                    z-index: 10000;
                    border: 3px solid var(--black);
                `;
                document.body.appendChild(errorMsg);

                setTimeout(() => {
                    if (errorMsg.parentNode) {
                        errorMsg.parentNode.removeChild(errorMsg);
                    }
                }, 2000);
            }
        }
    });

    // Easter eggs
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

    document.addEventListener('keydown', (e) => {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }

        if (konami.toString() === konamiCode.toString()) {
            // Activate brutal mode
            document.body.style.animation = 'rainbow 2s infinite';

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Performance monitoring (brutal feedback)
    const startTime = performance.now();
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        if (loadTime > 3000) {
            console.log('SLOW AS FUCK: ' + loadTime + 'ms');
        }
    });

    // Add some chaos to scrolling
    let chaosMode = false;
    window.addEventListener('scroll', () => {
        if (Math.random() > 0.999 && !chaosMode) { // Very rare chaos
            chaosMode = true;
            document.body.style.transform = 'rotate(0.5deg)';
            setTimeout(() => {
                document.body.style.transform = '';
                chaosMode = false;
            }, 100);
        }
    });
});