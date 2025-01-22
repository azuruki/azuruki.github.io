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


document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".text-6xl");
    
    // Divide el texto en letras y respeta los espacios entre palabras
    const text = title.textContent;
    title.innerHTML = ""; // Limpia el texto original
  
    // Creamos un array de caracteres donde cada letra o espacio es un elemento
    const characters = text.split("").map(char => char === " " ? "&nbsp;" : char);
  
    characters.forEach((char, index) => {
      const span = document.createElement("span");
  
      if (char === "&nbsp;") {
        // Si es un espacio, lo dejamos como un espacio no rompible
        span.innerHTML = "&nbsp;";
        span.style.display = "inline-block";
      } else {
        // Si es una letra, aplicamos la animación
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(-100vh)";
        span.style.animation = `bounceIn 1s ease-out forwards`;
        span.style.animationDelay = `${index * 0.1}s`;
      }
  
      title.appendChild(span);
    });
  });
  
  // Define la animación de rebote en CSS dinámicamente
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes bounceIn {
      0% {
        transform: translateY(-100vh);
        opacity: 0;
      }
      60% {
        transform: translateY(30px);
        opacity: 1;
      }
      80% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    span {
      animation-fill-mode: forwards; /* Asegura que el estado final persista */
    }
  `;
  document.head.appendChild(style);
  
  // Detectar cuando los botones llegan al viewport
  document.addEventListener("DOMContentLoaded", () => {
    const socialButtons = document.querySelectorAll(".social-button");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el botón entra en la vista, se activa la animación
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% del botón esté visible

    // Observar cada botón social
    socialButtons.forEach(button => {
        observer.observe(button);
    });

    // Reacción al hacer clic en el botón
    socialButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.add("clicked");

            // Remover el efecto de clic después de 200ms
            setTimeout(() => {
                button.classList.remove("clicked");
            }, 200);
        });
    });
});