<>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/main.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.8/main.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/list@6.1.8/main.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/rrule@6.1.8/main.global.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.8/main.global.min.js"></script>
</>;

export function initCalendar(events) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (calendarEl && errorMessageEl) {
    const transformedEvents = events.map((event) => {
      const isAllDay = !event.start.dateTime;

      let eventStart = new Date(event.start.dateTime || event.start.date);
      let eventEnd = event.end
        ? new Date(event.end.dateTime || event.end.date)
        : null;

      const transformedEvent = {
        title: event.summary,
        description: event.description,
        location: event.location,
        allDay: isAllDay,
      };

      if (event.recurrence && event.recurrence.length > 0) {
        transformedEvent.rrule = `DTSTART:${eventStart
          .toISOString()
          .replace(/[-:.]/g, "")
          .slice(0, 15)}Z\n${event.recurrence[0]}`;
      } else if (isAllDay && eventStart) {
        eventStart.setDate(eventStart.getDate() + 1);
        transformedEvent.start = eventStart;
      } else {
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
  const initializeCalendar = () => {
    const calendarEl = document.getElementById("calendar");

    if (calendarEl) {
      const events = window.events || [];

      if (events.length > 0) {
        initCalendar(events);
      }
    }
  };

  initializeCalendar();

  document.addEventListener("astro:after-swap", () => {
    if (window.location.pathname === "/calendar") {
      initializeCalendar();
    }
  });
});
