 // Añadir animaciones suaves en botones
 document.querySelectorAll('a.btn').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('shadow-2xl');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('shadow-2xl');
    });
});

// Animación para las imágenes al hacer scroll
const images = document.querySelectorAll('.gallery img');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-y-0');
        } else {
            entry.target.classList.remove('opacity-100');
            entry.target.classList.remove('translate-y-0');
        }
    });
}, { threshold: 0.5 });

images.forEach(image => {
    image.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-500');
    observer.observe(image);
});