import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

declare global {
  interface Window {
    events: any; // or you can type it more strictly as events array structure
  }
}

export function initCalendar(events: any) {
  const calendarEl = document.getElementById('calendar');
  const errorMessageEl = document.getElementById('error-message');

  if (calendarEl && errorMessageEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: events,
    });

    calendar.render();
  } else {
    console.error('Calendar or error message element not found');
    if (errorMessageEl) {
      errorMessageEl.innerText =
        'Calendar could not be loaded. Missing required elements.';
    }
  }
}

// Ensure the DOM is loaded before initializing the calendar
document.addEventListener('DOMContentLoaded', () => {
  const events = window.events || [];  // Use the events passed from Astro
  initCalendar(events);
});
