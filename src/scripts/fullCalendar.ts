import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events.ts";

function initCalendar(events: any) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    const transformedEvents: TransformedEvent[] = events.map((event: any) => {
      const isAllDay = !event.start.dateTime;
      let eventStart = new Date(event.start.dateTime || event.start.date);
      let eventEnd: Date | undefined = event.end
        ? new Date(event.end.dateTime || event.end.date)
        : undefined;

      const transformedEvent: TransformedEvent = {
        title: event.summary,
        description: event.description,
        location: event.location,
        allDay: isAllDay,
        start: eventStart,
        end: eventEnd,
      };

      if (event.recurrence && event.recurrence.length > 0) {
        // Helper function to format date for DTSTART
        const formatDateForDTSTART = (date: Date) => {
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          const h = String(date.getHours()).padStart(2, "0");
          const min = String(date.getMinutes()).padStart(2, "0");
          const s = String(date.getSeconds()).padStart(2, "0");
          return `${y}${m}${d}T${h}${min}${s}`;
        };

        // Use the helper function to get the formatted DTSTART
        const dtstart = formatDateForDTSTART(eventStart);

        // Update the transformedEvent.rrule with the correct DTSTART
        transformedEvent.rrule = `DTSTART:${dtstart}\n${event.recurrence[0]}`;
      } else if (isAllDay && eventStart) {
        // Adjust start date for non-recurring all-day events
        eventStart.setDate(eventStart.getDate() + 1);

        // Ensure eventEnd is defined before modifying it
        if (eventEnd) {
          eventEnd.setDate(eventEnd.getDate() + 1);
        }

        transformedEvent.start = eventStart;
      }

      return transformedEvent;
    });

    // Use window.matchMedia to detect mobile view
    const initialView = window.matchMedia("(max-width: 768px)").matches
      ? "listMonth"
      : "dayGridMonth";

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
      initialView: initialView,
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
        const modal = document.getElementById("event-modal");
        const titleEl = document.getElementById("event-title");
        const descriptionEl = document.getElementById("event-description");
        const closeModalButton = document.getElementById("close-modal");

        if (modal && titleEl && descriptionEl && closeModalButton) {
          titleEl.textContent = info.event.title;
          descriptionEl.innerHTML =
            info.event.extendedProps.description || "No description available.";

          modal.style.display = "block";

          closeModalButton.addEventListener("click", () => {
            modal.style.display = "none";
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

document.addEventListener("DOMContentLoaded", () => {
  ensureCalendarInitialized();
});

function ensureCalendarInitialized() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const events = window.events || [];

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available to initialize calendar");
    }
  } else {
    console.error("Calendar element not found in DOM");
  }
}
