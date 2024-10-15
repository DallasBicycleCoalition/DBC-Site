import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events";

function initCalendar(events: IncomingEvent[]) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    const transformedEvents: TransformedEvent[] = events.map((event: any) => {
      let eventStart = new Date(event.date.startDate);
      let eventEnd = event.date.endDate
        ? new Date(event.date.endDate)
        : undefined;

      if (eventEnd && eventStart.toDateString() !== eventEnd.toDateString()) {
        eventStart = new Date(eventStart.setDate(eventStart.getDate() - 1));
        eventEnd = new Date(eventEnd.setDate(eventEnd.getDate() + 1));
      }

      const transformedEvent: TransformedEvent = {
        title: event.title,
        description: event.description,
        location: event.location,
        allDay: event.allDay,
        start: eventStart,
        end: eventEnd,
      };

      if (event.date.rrule) {
        const formatDateForDTSTART = (date: Date) => {
          const y = date.getFullYear();
          const m = String(date.getMonth() + 1).padStart(2, "0");
          const d = String(date.getDate()).padStart(2, "0");
          const h = String(date.getHours()).padStart(2, "0");
          const min = String(date.getMinutes()).padStart(2, "0");
          const s = String(date.getSeconds()).padStart(2, "0");
          return `${y}${m}${d}T${h}${min}${s}`;
        };

        const dtstart = formatDateForDTSTART(eventStart);
        transformedEvent.rrule = `DTSTART:${dtstart}\n${event.date.rrule}`;
      } else if (event.allDay && eventStart) {
        eventStart.setDate(eventStart.getDate() + 1);
      }

      return transformedEvent;
    });

    const initialView = window.matchMedia("(max-width: 768px)").matches
      ? "listMonth"
      : "dayGridMonth";

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
      timeZone: "local",
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
        const modalOverlay = document.getElementById(
          "modal-overlay"
        ) as HTMLElement;
        const titleEl = document.getElementById("event-title");
        const descriptionEl = document.getElementById("event-description");

        if (modalOverlay && titleEl && descriptionEl) {
          titleEl.textContent = info.event.title;
          descriptionEl.innerHTML = info.event.extendedProps.description;
          modalOverlay.style.display = "block";
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

  const modalOverlay = document.getElementById("modal-overlay") as HTMLElement;
  const closeModalButton = document.getElementById("close-modal");

  if (modalOverlay && closeModalButton) {
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) {
        modalOverlay.style.display = "none";
      }
    });

    closeModalButton.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        if (modalOverlay.style.display === "block") {
          modalOverlay.style.display = "none";
        }
      }
    });
  }
});

function ensureCalendarInitialized() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const events: IncomingEvent[] = (window.events || []) as IncomingEvent[];

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available to initialize calendar");
    }
  } else {
    console.error("Calendar element not found in DOM");
  }
}