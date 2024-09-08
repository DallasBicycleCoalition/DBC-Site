import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";

declare global {
  interface Window {
    events: any;
  }
}

export function initCalendar(events: any) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    const transformedEvents = events.map((event: any) => {
      // Define if the event is all-day
      const isAllDay = !event.start.dateTime;

      // Convert start and end dateTimes to Date objects
      let eventStart = new Date(event.start.dateTime || event.start.date);
      let eventEnd = event.end
        ? new Date(event.end.dateTime || event.end.date)
        : null;

      const transformedEvent: any = {
        title: event.summary,
        description: event.description,
        location: event.location,
        allDay: isAllDay,
      };

      if (event.recurrence && event.recurrence.length > 0) {
        // Handle recurrence rule
        transformedEvent.rrule = `DTSTART:${eventStart.toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z\n${event.recurrence[0]}`;
      } else if (isAllDay && eventStart) {
        // Adjust start date for all-day events because end.date is exclusive
        eventStart.setDate(eventStart.getDate() + 1);
        transformedEvent.start = eventStart;
      } else {
        // No recurrence or all-day, use setDates for normal events
        transformedEvent.start = eventStart;
        transformedEvent.end = eventEnd;
      }

      return transformedEvent;
    });

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },
      views: {
        dayGridMonth: { buttonText: "Month" },
        timeGridWeek: { buttonText: "Week" },
        timeGridDay: { buttonText: "Day" },
        listMonth: { buttonText: "Agenda" },
      },
      events: transformedEvents,
      eventClick: function (info) {
        // Get the modal elements
        const modal = document.getElementById("event-modal");
        const titleEl = document.getElementById("event-title");
        const descriptionEl = document.getElementById("event-description");
        const closeModalButton = document.getElementById("close-modal");

        // Set the content of the modal
        if (modal && titleEl && descriptionEl && closeModalButton) {
          titleEl.textContent = info.event.title;
          descriptionEl.textContent =
            info.event.extendedProps.description || "No description available.";

          // Display the modal
          modal.style.display = "block";

          // Add event listener to close the modal
          closeModalButton.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal when the button is clicked
          });
        }
      },
    });

    calendar.render();
  } else {
    console.error("Calendar or error message element not found");
    if (errorMessageEl) {
      errorMessageEl.innerText =
        "Calendar could not be loaded. Missing required elements.";
    }
  }
}

// Ensure the DOM is loaded before initializing the calendar
document.addEventListener("DOMContentLoaded", () => {
  const events = window.events || [];
  initCalendar(events);
});
