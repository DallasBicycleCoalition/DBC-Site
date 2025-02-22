import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { TransformedEvent } from "../types/events";

// --- Modal Functions ---

const modalElements = {
  overlay: document.getElementById("modal-overlay") as HTMLElement,
  title: document.getElementById("event-title"),
  date: document.getElementById("event-date"),
  location: document.getElementById("event-location"),
  description: document.getElementById("event-description"),
  closeButton: document.getElementById("close-modal"),
};

function formatDateText(event: any): string {
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
    const startStr = startDate.toLocaleDateString();
    const endStr = endDate.toLocaleDateString();
    const startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    dateText +=
      startStr === endStr
        ? `${startStr}, ${startTime} - ${endTime}`
        : `${startStr}, ${startTime} - ${endStr}, ${endTime}`;
  } else if (startDate) {
    dateText += `${startDate.toLocaleDateString()}, ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  return dateText;
}

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
): void {
  if (
    !modalElements.overlay ||
    !modalElements.title ||
    !modalElements.date ||
    !modalElements.location ||
    !modalElements.description
  ) {
    return;
  }

  modalElements.title.textContent = event.title;
  modalElements.date.textContent = formatDateText(event);
  modalElements.location.textContent = event.extendedProps.location
    ? `Where: ${event.extendedProps.location}`
    : "";
  modalElements.description.innerHTML = `<strong>Description</strong> ${event.extendedProps.description || "No description available."}`;
  modalElements.overlay.style.display = "block";

  if (updateURL) {
    const startParam = event.start
      ? `&start=${encodeURIComponent(new Date(event.start.getTime() - 86400000).toISOString())}`
      : "";
    history.pushState(
      { eventId: event.id },
      "",
      `?event=${event.id}${startParam}`
    );
  }
}

function closeEventModal(): void {
  if (modalElements.overlay) {
    modalElements.overlay.style.display = "none";
  }
  history.pushState({}, "", window.location.pathname);
}

// --- URL Handling ---

function checkForEventInURL(): void {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("event");
  const startStr = params.get("start");

  if (eventId) {
    const eventData = (window.events || []).find(
      (e: any) => e.id === eventId || e._id === eventId
    );

    if (eventData) {
      // Use the start date from the URL if provided, else default to the event's first instance
      const instanceStart = startStr
        ? new Date(startStr)
        : new Date(eventData.date.startDate);

      const simulatedEvent = {
        id: eventData.id || eventData._id,
        title: eventData.title,
        start: instanceStart,
        end: eventData.date.endDate ? new Date(eventData.date.endDate) : null,
        allDay: eventData.allDay,
        extendedProps: {
          description: eventData.description,
          location: eventData.location,
        },
      };

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

// --- Calendar Initialization ---

function formatDateForDTSTART(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function transformEvent(event: any): TransformedEvent {
  let eventStart = new Date(event.date.startDate);
  let eventEnd = event.date.endDate ? new Date(event.date.endDate) : undefined;

  if (eventEnd && eventStart.toDateString() !== eventEnd.toDateString()) {
    eventStart.setDate(eventStart.getDate() - 1);
    if (eventEnd) eventEnd.setDate(eventEnd.getDate() + 1);
  } else if (event.allDay) {
    eventStart.setDate(eventStart.getDate() - 1);
  }

  const transformedEvent: TransformedEvent = {
    id: event._id,
    title: event.title,
    description: event.description,
    location: event.location,
    allDay: event.allDay,
    start: eventStart,
    end: eventEnd,
  };

  if (event.date.rrule) {
    const dtstart = formatDateForDTSTART(eventStart);
    transformedEvent.rrule = `DTSTART:${dtstart}\n${event.date.rrule}`;
  } else if (event.allDay && eventStart) {
    eventStart.setDate(eventStart.getDate() + 1);
  }

  return transformedEvent;
}

function initCalendar(events: TransformedEvent[]): void {
  const calendarEl = document.getElementById("calendar");
  const errorMessageEl = document.getElementById("error-message");

  if (!calendarEl || !errorMessageEl) {
    console.error("Required calendar elements not found");
    if (errorMessageEl) {
      errorMessageEl.innerText =
        "Calendar could not be loaded. Missing required elements.";
    }
    return;
  }

  let filteredEvents = [...events];

  const renderCalendar = (): void => {
    const transformedEvents: TransformedEvent[] =
      filteredEvents.map(transformEvent);
    const initialView = window.matchMedia("(max-width: 768px)").matches
      ? "listMonth"
      : "dayGridMonth";

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],
      timeZone: "local",
      initialView,
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
      eventClick: (info) => openEventModal(info.event),
    });

    calendar.render();
    window.calendar = calendar;
    document.dispatchEvent(new Event("calendarReady"));
  };

  renderCalendar();

  // Listen for tag filter changes from the dropdown component
  window.addEventListener("filterEvents", (e: Event) => {
    const { selectedTags } = (e as CustomEvent).detail;
    filteredEvents =
      selectedTags.length === 0
        ? [...events]
        : events.filter((event) =>
            event.tags?.some((tag: { id: string }) =>
              selectedTags.includes(tag.id)
            )
          );
    calendarEl.innerHTML = "";
    renderCalendar();
  });
}

function ensureCalendarInitialized(): void {
  const calendarEl = document.getElementById("calendar");

  // Ensure TypeScript treats window.events as an array
  const events = (window.events as TransformedEvent[]) || [];

  if (calendarEl && events.length > 0) {
    initCalendar(events);
  } else {
    console.error("No events available or calendar element missing.");
  }
}

// --- DOM and Navigation Handlers ---

document.addEventListener("DOMContentLoaded", () => {
  ensureCalendarInitialized();

  // Modal close handlers
  if (modalElements.overlay && modalElements.closeButton) {
    modalElements.overlay.addEventListener("click", (e) => {
      if (e.target === modalElements.overlay) closeEventModal();
    });
    modalElements.closeButton.addEventListener("click", closeEventModal);
  }
  document.addEventListener("keydown", (e) => {
    if (
      (e.key === "Escape" || e.key === "Esc") &&
      modalElements.overlay.style.display === "block"
    ) {
      closeEventModal();
    }
  });

  // Open modal if URL has an event id
  checkForEventInURL();
});

window.addEventListener("popstate", () => {
  window.location.reload();
});
