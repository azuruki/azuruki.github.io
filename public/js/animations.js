// Script para animaciones y efectos visuales

document.addEventListener('DOMContentLoaded', function() {
    // Función para revelar elementos al hacer scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Ajusta este valor según necesites
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    // Añadir clases de animación a elementos existentes
    function initAnimations() {
        // Animaciones para secciones principales
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                section.classList.add('reveal-left');
            } else {
                section.classList.add('reveal-right');
            }
        });
        
        // Animaciones para títulos
        const titles = document.querySelectorAll('h2');
        titles.forEach(title => {
            title.classList.add('reveal');
        });
        
        // Animaciones para botones
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.classList.add('fade-in');
            
            // Efecto al hacer hover
            button.addEventListener('mouseenter', function() {
                this.classList.add('float');
            });
            
            button.addEventListener('mouseleave', function() {
                this.classList.remove('float');
            });
        });
        
        // Animación para la imagen de perfil
        const profileImg = document.querySelector('#social img');
        if (profileImg) {
            profileImg.classList.add('bounce');
        }
        
        // Animaciones para la galería
        const galleryItems = document.querySelectorAll('.gallery .group');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in');
        });
        
        // Efecto de transición suave para los enlaces de navegación
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                // Solo aplicar scroll suave para enlaces internos
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Ajuste para el navbar fijo
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // Para enlaces externos, navegar normalmente
                    window.location.href = targetId;
                }
            });
        });
    }
    
    // Inicializar animaciones
    initAnimations();
    
    // Ejecutar revealOnScroll al cargar la página
    revealOnScroll();
    
    // Añadir evento de scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Añadir efecto de partículas decorativas entre secciones
    function createParticles() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Crear un contenedor para las partículas
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            particleContainer.style.position = 'absolute';
            particleContainer.style.width = '100%';
            particleContainer.style.height = '100px';
            particleContainer.style.overflow = 'hidden';
            particleContainer.style.zIndex = '1';
            
            // Colocar el contenedor después de cada sección
            section.parentNode.insertBefore(particleContainer, section.nextSibling);
            
            // Crear partículas
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.position = 'absolute';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = '#9f7aea';
                particle.style.opacity = '0.6';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}px`;
                particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                particleContainer.appendChild(particle);
            }
        });
    }
    
    // Inicializar partículas
    createParticles();
});