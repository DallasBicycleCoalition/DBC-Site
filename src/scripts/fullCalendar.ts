import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events";

// Opens the modal with event details and updates the URL (if desired)
function openEventModal(
  event: {
    id: string;
    title: string;
    start: Date | null;
    end: Date | null;
    allDay: boolean;
    extendedProps: { description?: string; location?: string };
  },
  updateURL = true
) {
  const modalOverlay = document.getElementById("modal-overlay") as HTMLElement;
  const titleEl = document.getElementById("event-title");
  const dateEl = document.getElementById("event-date");
  const locationEl = document.getElementById("event-location");
  const descriptionEl = document.getElementById("event-description");

  if (modalOverlay && titleEl && dateEl && locationEl && descriptionEl) {
    titleEl.textContent = event.title;

    const startDate = event.start ? new Date(event.start) : null;
    const endDate = event.end ? new Date(event.end) : null;
    const allDay = event.allDay;
    let dateText = "When: ";
    if (allDay) {
      if (
        startDate &&
        endDate &&
        startDate.toDateString() === endDate.toDateString()
      ) {
        dateText += startDate.toLocaleDateString();
      } else if (startDate && endDate) {
        dateText += `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      } else if (startDate) {
        dateText += `${startDate.toLocaleDateString()}, All Day`;
      }
    } else if (startDate && endDate) {
      const startDateStr = startDate.toLocaleDateString();
      const endDateStr = endDate.toLocaleDateString();
      const startTime = startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const endTime = endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (startDateStr === endDateStr) {
        dateText += `${startDateStr}, ${startTime} - ${endTime}`;
      } else {
        dateText += `${startDateStr}, ${startTime} - ${endDateStr}, ${endTime}`;
      }
    } else if (startDate) {
      dateText += `${startDate.toLocaleDateString()}, ${startDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    }
    dateEl.textContent = dateText;

    if (event.extendedProps.location) {
      locationEl.textContent = `Where: ${event.extendedProps.location}`;
    } else {
      locationEl.textContent = "";
    }

    descriptionEl.innerHTML = `<strong>Description</strong> ${
      event.extendedProps.description || "No description available."
    }`;

    modalOverlay.style.display = "block";

    if (updateURL) {
      history.pushState({ eventId: event.id }, "", `?event=${event.id}`);
    }
  }
}

// Closes the modal and resets the URL
function closeEventModal() {
  const modalOverlay = document.getElementById("modal-overlay") as HTMLElement;
  if (modalOverlay) {
    modalOverlay.style.display = "none";
  }
  history.pushState({}, "", window.location.pathname);
}

// On page load, check if the URL contains an event id and open its modal if so
function checkForEventInURL() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event");

  if (eventId) {
    const eventData = (window.events || []).find(
      (e: any) => e.id === eventId || e._id === eventId
    );

    if (eventData) {
      const simulatedEvent = {
        id: eventData.id || eventData._id,
        title: eventData.title,
        start: new Date(eventData.date.startDate),
        end: eventData.date.endDate ? new Date(eventData.date.endDate) : null,
        allDay: eventData.allDay,
        extendedProps: {
          description: eventData.description,
          location: eventData.location,
        },
      };

      // Wait until FullCalendar is initialized before jumping to the event's date
      if (window.calendar) {
        window.calendar.gotoDate(simulatedEvent.start);
      } else {
        document.addEventListener("calendarReady", () => {
          window.calendar.gotoDate(simulatedEvent.start);
        });
      }

      openEventModal(simulatedEvent, false);
    }
  }
}

function initCalendar(events: any[]) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  let filteredEvents = [...events]; // Start with all events

  if (calendarEl && errorMessageEl) {
    const renderCalendar = () => {
      const transformedEvents: TransformedEvent[] = filteredEvents.map(
        (event: any) => {
          let eventStart = new Date(event.date.startDate);
          let eventEnd = event.date.endDate
            ? new Date(event.date.endDate)
            : undefined;

          if (
            eventEnd &&
            eventStart.toDateString() !== eventEnd.toDateString()
          ) {
            eventStart = new Date(eventStart.setDate(eventStart.getDate() - 1));
            eventEnd = new Date(eventEnd.setDate(eventEnd.getDate() + 1));
          } else if (event.allDay) {
            eventStart = new Date(eventStart.setDate(eventStart.getDate() - 1));
          }

          const transformedEvent: TransformedEvent = {
            id: event._id, // Now pulling the id from _id
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
        }
      );

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
          openEventModal(info.event);
        },
      });

      calendar.render();

      // Store the calendar instance globally so we can use it elsewhere
      window.calendar = calendar;

      // Dispatch an event so `checkForEventInURL()` knows FullCalendar is ready
      document.dispatchEvent(new Event("calendarReady"));
    };

    renderCalendar();

    // Listen for tag filter changes from the custom TagsFilterDropdown component
    window.addEventListener("filterEvents", (event: Event) => {
      const customEvent = event as CustomEvent;
      const selectedTags = customEvent.detail.selectedTags;

      if (selectedTags.length === 0) {
        filteredEvents = [...events];
      } else {
        filteredEvents = events.filter((event) => {
          if (!event.tags || event.tags.length === 0) {
            return false;
          }
          return event.tags.some((tag: { id: string }) =>
            selectedTags.includes(tag.id)
          );
        });
      }

      // Clear and re-render the calendar with filtered events
      calendarEl.innerHTML = "";
      renderCalendar();
    });
  } else {
    console.error("Calendar or error message element not found");
    if (errorMessageEl) {
      errorMessageEl.innerText =
        "Calendar could not be loaded. Missing required elements.";
    }
  }
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  ensureCalendarInitialized();

  const modalOverlay = document.getElementById("modal-overlay") as HTMLElement;
  const closeModalButton = document.getElementById("close-modal");

  if (modalOverlay && closeModalButton) {
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) {
        closeEventModal();
      }
    });

    closeModalButton.addEventListener("click", () => {
      closeEventModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        if (modalOverlay.style.display === "block") {
          closeEventModal();
        }
      }
    });
  }

  // Check URL for event parameter on load
  checkForEventInURL();
});

// Handle browser navigation (back/forward)
window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event");
  if (eventId) {
    const eventData = (window.events || []).find((e: any) => e.id === eventId);
    if (eventData) {
      const simulatedEvent = {
        id: eventData.id,
        title: eventData.title,
        start: new Date(eventData.date.startDate),
        end: eventData.date.endDate ? new Date(eventData.date.endDate) : null,
        allDay: eventData.allDay,
        extendedProps: {
          description: eventData.description,
          location: eventData.location,
        },
      };
      openEventModal(simulatedEvent, false);
    }
  } else {
    closeEventModal();
  }
});

function ensureCalendarInitialized() {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const events: any[] = (window.events || []) as any[];

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available to initialize calendar");
    }
  } else {
    console.error("Calendar element not found in DOM");
  }
}
