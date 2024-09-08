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
  console.log("Initializing calendar with events:", events);

  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    console.log("Calendar element found, proceeding to initialize");

    const transformedEvents = events.map((event: any) => {
      console.log("Processing event:", event);

      const isAllDay = !event.start.dateTime;
      let eventStart = new Date(event.start.dateTime || event.start.date);
      let eventEnd = event.end
        ? new Date(event.end.dateTime || event.end.date)
        : null;

      const transformedEvent: any = {
        title: event.summary,
        description: event.description,
        location: event.location,
        allDay: isAllDay,
        start: eventStart,
        end: eventEnd
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
        console.log("Event clicked:", info.event);

        const modal = document.getElementById("event-modal");
        const titleEl = document.getElementById("event-title");
        const descriptionEl = document.getElementById("event-description");
        const closeModalButton = document.getElementById("close-modal");

        if (modal && titleEl && descriptionEl && closeModalButton) {
          titleEl.textContent = info.event.title;
          descriptionEl.textContent =
            info.event.extendedProps.description || "No description available.";

          modal.style.display = "block";

          closeModalButton.addEventListener("click", () => {
            modal.style.display = "none";
          });
        }
      },
    });

    console.log("Rendering the calendar");
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
  console.log("DOMContentLoaded: Initializing the calendar");
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const events = window.events || [];
    console.log("Fetched events from window:", events);

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available to initialize calendar");
    }
  } else {
    console.error("Calendar element not found in DOM");
}});

document.addEventListener("astro:after-swap", () => {
  console.log("astro:after-swap: Reinitializing calendar after page swap");
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const events = window.events || [];
    console.log("Fetched events after swap:", events);

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available after page swap");
    }
  } else {
    console.error("Calendar element not found in DOM after swap");
  }
});
