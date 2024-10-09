import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events.ts";

// Helper to convert Sanity block content to plain text
function getSanityText(blocks: any[]): string {
  return blocks
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join("\n");
}

function initCalendar(events: any) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    const transformedEvents: TransformedEvent[] = events.map((event: any) => {
      let eventStart = new Date(event.date.startDate);
      let eventEnd = event.date.endDate
        ? new Date(event.date.endDate)
        : undefined;

      const transformedEvent: TransformedEvent = {
        title: event.title,
        description: getSanityText(event.description),
        location: event.location,
        allDay: event.allDay,
        start: eventStart,
        end: eventEnd,
      };

      if (event.date.rrule) {
        // Use toISOString() to keep UTC for DTSTART and don't strip the 'Z'
        const dtstart =
          eventStart.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        // Keep the rrule in UTC, FullCalendar will handle the conversion for local time
        transformedEvent.rrule = `DTSTART:${dtstart}\n${event.date.rrule}`;
      }

      return transformedEvent;
    });

    // Use window.matchMedia to detect mobile view
    const initialView = window.matchMedia("(max-width: 768px)").matches
      ? "listMonth"
      : "dayGridMonth";

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
      timeZone: "local", // Keep everything in UTC, as you requested
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
