// Instagram Carousel para el portafolio de Azurukisan

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel
    initCarousel();
    
    // Cargar fotos de Instagram
    fetchInstagramPhotos();
});

// Función para inicializar el carrusel
function initCarousel() {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button-prev');
    const nextButton = document.querySelector('.carousel-button-next');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    let slideWidth = 0;
    
    // Calcular el ancho de los slides basado en el contenedor
    function calculateSlideWidth() {
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            slideWidth = carousel.offsetWidth;
            updateCarousel();
        }
    }
    
    // Actualizar la posición del carrusel
    function updateCarousel() {
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Actualizar indicadores
            document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }
    
    // Event listeners para los botones
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const slides = document.querySelectorAll('.carousel-slide');
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1; // Volver al último slide
            }
            updateCarousel();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const slides = document.querySelectorAll('.carousel-slide');
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Volver al primer slide
            }
            updateCarousel();
        });
    }
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Calcular el ancho inicial y recalcular cuando cambie el tamaño de la ventana
    calculateSlideWidth();
    window.addEventListener('resize', calculateSlideWidth);
    
    // Swipe para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }
    
    function handleSwipe() {
        const slides = document.querySelectorAll('.carousel-slide');
        if (touchEndX < touchStartX - 50) { // Swipe izquierda -> siguiente
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }
        if (touchEndX > touchStartX + 50) { // Swipe derecha -> anterior
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1;
            }
            updateCarousel();
        }
    }
}

// Función para obtener fotos de Instagram
async function fetchInstagramPhotos() {
    const carouselTrack = document.querySelector('.carousel-track');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    try {
        // Mensaje de carga mientras se obtienen las fotos
        if (carouselTrack) {
            carouselTrack.innerHTML = '<div class="carousel-slide loading"><p class="text-center py-20">Cargando fotos de Instagram...</p></div>';
        }
        
        // Nota: Como no podemos usar la API de Instagram directamente sin autenticación,
        // usaremos las imágenes existentes como demostración
        // En un entorno real, aquí se implementaría la llamada a la API de Instagram
        
        // Simulamos la carga de fotos con un pequeño retraso
        setTimeout(() => {
            // Obtener las imágenes existentes del portafolio
            const images = [
                { src: '/public/images/Momo.jpg', alt: 'Momo Yaoyorozu' },
                { src: '/public/images/Nobara.jpg', alt: 'Nobara Kugisaki' },
                { src: '/public/images/Makima.jpg', alt: 'Makima' },
                { src: '/public/images/Bocchi.jpg', alt: 'Bocchi' },
                { src: '/public/images/Kobeni.jpg', alt: 'Kobeni' },
                { src: '/public/images/KrulTepes.jpg', alt: 'Krul Tepes' },
                { src: '/public/images/Mitsuri.jpg', alt: 'Mitsuri' },
                { src: '/public/images/Reze.jpg', alt: 'Reze' },
                { src: '/public/images/Yumeko.jpg', alt: 'Yumeko' }
            ];
            
            // Limpiar el contenedor
            if (carouselTrack) {
                carouselTrack.innerHTML = '';
            }
            
            if (indicatorsContainer) {
                indicatorsContainer.innerHTML = '';
            }
            
            // Crear slides e indicadores
            images.forEach((image, index) => {
                // Crear slide
                if (carouselTrack) {
                    const slide = document.createElement('div');
                    slide.className = 'carousel-slide';
                    
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'relative group w-full h-full';
                    
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    img.className = 'w-auto h-full max-h-full object-contain rounded-lg shadow-lg transform group-hover:scale-105 transition duration-300';
                    
                    const overlay = document.createElement('div');
                    overlay.className = 'absolute inset-0 bg-gradient-to-r from-purple-800 to-black bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg';
                    
                    const caption = document.createElement('span');
                    caption.className = 'text-white text-lg font-medium';
                    caption.textContent = image.alt;
                    
                    overlay.appendChild(caption);
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(overlay);
                    slide.appendChild(imgContainer);
                    carouselTrack.appendChild(slide);
                }
                
                // Crear indicador
                if (indicatorsContainer) {
                    const indicator = document.createElement('button');
                    indicator.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
                    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
                    indicator.dataset.slideIndex = index;
                    indicatorsContainer.appendChild(indicator);
                }
            });
            
            // Reinicializar el carrusel después de cargar las imágenes
            initCarousel();
        }, 500);
        
    } catch (error) {
        console.error('Error al cargar fotos de Instagram:', error);
        if (carouselTrack) {
            carouselTrack.innerHTML = '<div class="carousel-slide error"><p class="text-center py-20 text-red-500">Error al cargar las fotos. Por favor, intenta más tarde.</p></div>';
        }
    }
}

// Función para implementar la carga automática desde Instagram en el futuro
// Esta función requeriría un token de acceso y la implementación de la API de Instagram
function setupInstagramAutoUpdate() {
    // Aquí iría el código para configurar actualizaciones automáticas
    // usando la API de Instagram Basic Display o Graph API
    console.log('Función para actualización automática desde Instagram');
    // Esta implementación requeriría un backend para manejar la autenticación
}