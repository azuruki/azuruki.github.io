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


document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      events: [
        {
          title: 'Evento 1',
          start: '2024-03-15',
          end: '2024-03-17',
        },
        {
          title: 'Evento 2',
          start: '2024-03-20',
        },
        {
          title: 'Evento 3',
          start: '2024-04-01',
        },
          {
              title: 'Salón Comic Vlc',
              start: '2025-02-28',
          },
      ]
    });
    calendar.render();
  });