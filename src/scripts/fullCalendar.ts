import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events";

function initCalendar(events: SanityEvent[]) {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  let filteredEvents = [...events]; // Start with all events

  if (calendarEl && errorMessageEl) {
    const renderCalendar = () => {
      const transformedEvents: TransformedEvent[] = filteredEvents.map(
        (event: SanityEvent) => {
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
          const modalOverlay = document.getElementById(
            "modal-overlay"
          ) as HTMLElement;
          const titleEl = document.getElementById("event-title");
          const dateEl = document.getElementById("event-date");
          const locationEl = document.getElementById("event-location");
          const descriptionEl = document.getElementById("event-description");

          if (
            modalOverlay &&
            titleEl &&
            dateEl &&
            locationEl &&
            descriptionEl
          ) {
            titleEl.textContent = info.event.title;

            // Extract start and end dates
            const startDate = info.event.start
              ? new Date(info.event.start)
              : null;
            const endDate = info.event.end ? new Date(info.event.end) : null;
            const allDay = info.event.allDay;

            let dateText = "When: ";
            if (allDay) {
              // Handle all-day event display
              if (
                startDate &&
                endDate &&
                startDate.toDateString() === endDate.toDateString()
              ) {
                // Single-day all-day event
                dateText += startDate.toLocaleDateString();
              } else if (startDate && endDate) {
                // Multi-day all-day event
                dateText += `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
              } else if (startDate) {
                // All-day event with only a start date
                dateText += `${startDate.toLocaleDateString()}, All Day`;
              }
            } else if (startDate && endDate) {
              // Not an all-day event, include date and time
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
                // Same date, show time range on the same day
                dateText += `${startDateStr}, ${startTime} - ${endTime}`;
              } else {
                // Different dates, show full start and end date with times
                dateText += `${startDateStr}, ${startTime} - ${endDateStr}, ${endTime}`;
              }
            } else if (startDate) {
              // Only start date is available
              dateText += `${startDate.toLocaleDateString()}, ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
            }

            dateEl.textContent = dateText;

            if (info.event.extendedProps.location) {
              locationEl.textContent = `Where: ${info.event.extendedProps.location}`;
            } else {
              locationEl.textContent = ""; // Clear content if no location
            }

            descriptionEl.innerHTML = `<strong>Description</strong> ${info.event.extendedProps.description || "No description available."}`;

            modalOverlay.style.display = "block";
          }
        },
      });

      calendar.render();
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
    const events: SanityEvent[] = (window.events || []) as SanityEvent[];

    if (events.length > 0) {
      initCalendar(events);
    } else {
      console.error("No events available to initialize calendar");
    }
  } else {
    console.error("Calendar element not found in DOM");
  }
}
