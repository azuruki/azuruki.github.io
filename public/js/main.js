// Navegación por teclado y accesibilidad
document.addEventListener('DOMContentLoaded', () => {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Manejo del header sticky
    const header = document.querySelector('.sticky-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Carrusel de Instagram
    const carousel = document.querySelector('.instagram-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-button-prev');
        const nextButton = carousel.querySelector('.carousel-button-next');
        const indicators = carousel.querySelector('.carousel-indicators');
        
        let currentIndex = 0;
        
        // Crear indicadores
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.setAttribute('aria-label', `Ir a slide ${index + 1}`);
            button.classList.add('carousel-indicator');
            if (index === 0) button.classList.add('active');
            
            button.addEventListener('click', () => goToSlide(index));
            indicators.appendChild(button);
        });
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar indicadores
            carousel.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            // Actualizar ARIA
            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Autoplay
        let autoplayInterval = setInterval(nextSlide, 5000);
        
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
        
        // Navegación por teclado
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    // Lazy loading de imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Modo oscuro
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setDarkMode(isDark) {
        document.documentElement.classList.toggle('dark-mode', isDark);
        localStorage.setItem('darkMode', isDark);
    }
    
    // Inicializar modo oscuro
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
    } else {
        setDarkMode(prefersDarkScheme.matches);
    }
    
    // Toggle modo oscuro
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark-mode');
            setDarkMode(!isDark);
        });
    }
    
    // Escuchar cambios en las preferencias del sistema
    prefersDarkScheme.addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
            setDarkMode(e.matches);
        }
    });
}); 