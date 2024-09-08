import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // For Month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For Week and Day views
import listPlugin from '@fullcalendar/list'; // For List view
import rrulePlugin from '@fullcalendar/rrule'; // For Recurrence support

declare global {
  interface Window {
    events: any;
  }
}

export function initCalendar(events: any) {
  const calendarEl = document.getElementById('calendar');
  const errorMessageEl = document.getElementById('error-message');
  console.log(events);

  if (calendarEl && errorMessageEl) {
    const transformedEvents = events.map((event: any) => {
      // Transform the event into the format FullCalendar expects
      const transformedEvent: any = {
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        description: event.description,
        location: event.location,
      };

      // Handle recurrence rule if it exists
      if (event.recurrence && event.recurrence.length > 0) {
        transformedEvent.rrule = event.recurrence[0].replace('RRULE:', ''); // Remove the RRULE: prefix
      }

      return transformedEvent;
    });

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin], // Add necessary plugins
      initialView: 'dayGridMonth', // Set initial view to Month view
      headerToolbar: {
        left: 'prev,next today', // Navigation buttons
        center: 'title', // Calendar title
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // View buttons
      },
      views: {
        dayGridMonth: { buttonText: 'Month' }, // Month view
        timeGridWeek: { buttonText: 'Week' },  // Week view
        timeGridDay: { buttonText: 'Day' },    // Day view
        listWeek: { buttonText: 'List' },      // List view (Week-based)
      },
      events: transformedEvents, // Pass the transformed events
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
