const toggleCalendarButton = document.getElementById('toggle-calendar');
const calendarContainer = document.getElementById('calendar-container');

toggleCalendarButton.addEventListener('click', () => {
  if (calendarContainer.style.display === 'none') {
    calendarContainer.style.display = 'block';
      toggleCalendarButton.textContent = "Ocultar calendario de eventos"
  } else {
    calendarContainer.style.display = 'none';
       toggleCalendarButton.textContent = "Mostrar calendario de eventos"
  }
});

// Usamos la función initCalendar definida en admin-calendar.js
// Esta función se carga dinámicamente cuando se importa el script


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    
    // Cargar el script de administración del calendario
    const adminScript = document.createElement('script');
    adminScript.src = './public/js/admin-calendar.js';
    
    // Esperar a que el script de administración se cargue antes de inicializar el calendario
    adminScript.onload = function() {
      console.log('Script admin-calendar.js cargado correctamente');
      
      // Inicializar el calendario después de cargar el script de administración
      if (calendarEl && typeof window.initCalendar === 'function') {
        const calendar = window.initCalendar(calendarEl);
        
        // Actualizar el calendario con los eventos si está disponible la función
        if (typeof loadEvents === 'function') {
          calendar.removeAllEvents();
          calendar.addEventSource(loadEvents());
        }
      }
    };
    
    document.head.appendChild(adminScript);
    console.log('Cargando script admin-calendar.js desde calendar.js');
  });