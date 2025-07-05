// ===== MEJORAS KUROMI - FUNCIONALIDADES ADICIONALES =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMACIONES DE SCROLL =====
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animateElements = document.querySelectorAll('.about, .portfolio, .kofi-section, .center');
    animateElements.forEach(el => observer.observe(el));
    
    // ===== NAVEGACIÓN MEJORADA =====
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Efecto de scroll en navegación
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Navegación suave mejorada
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Ajuste para navegación fija
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== EFECTOS DE HOVER MEJORADOS =====
    
    // Efecto de partículas en botones
    const buttons = document.querySelectorAll('.btn, .social-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', createParticles);
        button.addEventListener('mouseleave', removeParticles);
    });
    
    function createParticles(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--kuromi-pink);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * rect.width}px;
                top: ${Math.random() * rect.height}px;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            button.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1000);
        }
    }
    
    function removeParticles(e) {
        const particles = e.target.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
    }
    
    // ===== EFECTOS DE TEXTO =====
    
    // Efecto de escritura para el título principal
    const mainTitle = document.querySelector('.social h1');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }
    
    // ===== MEJORAS DE ACCESIBILIDAD =====
    
    // Navegación por teclado mejorada
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                document.getElementById('menu-toggle').click();
            }
        }
    });
    
    // ===== EFECTOS DE CURSOR =====
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--kuromi-pink);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Efecto de cursor en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .social-button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--kuromi-magenta)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--kuromi-pink)';
        });
    });
    
    // ===== ANIMACIONES CSS ADICIONALES =====
    
    // Añadir estilos CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-50px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
        
        .glow-on-hover:hover {
            box-shadow: 0 0 20px var(--kuromi-pink);
        }
        
        .text-shimmer {
            background: linear-gradient(90deg, var(--kuromi-pink), var(--kuromi-magenta), var(--kuromi-pink));
            background-size: 200% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ===== MEJORAS DE RENDIMIENTO =====
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
    
    // ===== EFECTOS DE SONIDO (OPCIONAL) =====
    
    // Crear contexto de audio para efectos sutiles
    let audioContext;
    
    function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    // Efecto de sonido sutil para botones
    function playButtonSound() {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Añadir sonido a botones (solo si el usuario ha interactuado)
    let audioEnabled = false;
    
    document.addEventListener('click', () => {
        if (!audioEnabled) {
            initAudio();
            audioEnabled = true;
        }
    });
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (audioEnabled) {
                playButtonSound();
            }
        });
    });
    
    // ===== MEJORAS DE RESPONSIVIDAD =====
    
    function handleResize() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // ===== EFECTOS DE PARALLAX SUAVE =====
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.social, .hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ===== INICIALIZACIÓN FINAL =====
    
    console.log('🎀 Kuromi enhancements loaded successfully!');
    
    // Añadir clase de carga completada
    document.body.classList.add('kuromi-loaded');
    
});

// ===== FUNCIONES UTILITARIAS =====

// Función para crear efectos de confeti
function createConfetti() {
    const colors = ['#FF69B4', '#FF1493', '#8A2BE2', '#FFFFFF'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 3000);
    }
}

// Añadir animación de confeti al CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(${window.innerHeight}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Función para activar confeti en eventos especiales
function triggerConfetti() {
    createConfetti();
}

// Exportar funciones para uso global
window.KuromiEnhancements = {
    triggerConfetti,
    createConfetti
}; 