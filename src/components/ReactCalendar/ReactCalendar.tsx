import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import { PortableText } from "@portabletext/react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { PortableTextBlock } from "sanity";
import type { TransformedEvent } from "../../types/events";
import "./ReactCalendar.css";

type CalendarEvent = {
  _id: string;
  tags: { id: string }[];
  date?: {
    startDate: string;
    endDate: string;
    rrule?: string;
  };
  allDay: boolean;
  event: string;
  title: string;
  description: string;
  location: string;
  rrule?: string;
};

type ModalEvent = {
  title: string;
  start: Date;
  end?: Date;
  allDay: boolean;
  description?: PortableTextBlock;
  location?: string;
};

type Tag = {
  id: string;
  name?: string | null;
  description?: string | null;
};

type Props = {
  events: CalendarEvent[];
  tags: Tag[];
};

export default function ReactCalendar({ events, tags }: Props) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [modalEvent, setModalEvent] = useState<ModalEvent | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter events by tag
  const filteredEvents = useMemo(() => {
    if (selectedTags.length === 0) return events;
    return events.filter((event) =>
      event.tags?.some((tag) => selectedTags.includes(tag.id))
    );
  }, [events, selectedTags]);

  const transformEvents = filteredEvents.map(transformEvent);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const openEventModal = (event: any, updateURL: boolean) => {
    const { title, start, end, allDay, extendedProps } = event;
    setModalEvent({
      title,
      start,
      end,
      allDay,
      description: extendedProps.description,
      location: extendedProps.location,
    });
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
  };

  const closeEventModal = () => {
    setModalEvent(null);
    history.pushState({}, "", window.location.pathname);
  };

  const checkForEventInURL = () => {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event");
    const startStr = params.get("start");

    if (eventId) {
      const eventData = transformEvents.find(
        (e) => e.id === eventId || e._id === eventId
      );

      if (eventData) {
        // Use the start date from the URL if provided, else default to the event's first instance
        const instanceStart = startStr ? new Date(startStr) : eventData.start;

        const simulatedEvent = {
          id: eventData.id || eventData._id,
          title: eventData.title,
          start: instanceStart,
          end: eventData.end,
          allDay: eventData.allDay,
          extendedProps: {
            description: eventData.description,
            location: eventData.location,
          },
        };

        if (calendarRef) {
          calendarRef.current?.getApi().gotoDate(simulatedEvent.start as Date);
        }

        openEventModal(simulatedEvent, false);
      }
    }
  };

  // Listen for click out
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Check for event in URL
  useEffect(() => {
    checkForEventInURL();
  }, []);

  const initialView = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches
        ? "listMonth"
        : "dayGridMonth";
    }
    return "dayGridMonth"; // Default fallback
  }, []);

  const headerToolbar = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches
        ? {
            left: "prev,next today",
            center: "",
            right: "",
          }
        : {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          };
    }
    return {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    };
  }, []);

  return (
    <div id="calendar-wrapper">
      {/* Dropdown Filter */}
      {tags && tags.length > 0 && (
        <div className="filter-wrapper" ref={dropdownRef}>
          <button
            className="filter-toggle"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            Event Type {isDropdownOpen ? "▲" : "▼"}
          </button>

          {isDropdownOpen && (
            <div className="checkbox-dropdown">
              {tags.map((tag) => (
                <label key={tag.id} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin]}
        initialView={initialView}
        headerToolbar={headerToolbar}
        views={{
          dayGridMonth: { buttonText: "Month", showNonCurrentDates: false, fixedWeekCount: false },
          timeGridWeek: { buttonText: "Week" },
          timeGridDay: { buttonText: "Day" },
          listMonth: {
            buttonText: "Agenda",
            contentHeight: 650, // Adjust the height here
          },
        }}
        events={transformEvents}
        eventClick={(info) => openEventModal(info.event, true)}
        height="auto"
      />

      {modalEvent && (
        <div
          id="modal-overlay"
          className="modal-overlay"
          onClick={closeEventModal}
        >
          <div
            id="event-modal"
            className="event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="event-title">{modalEvent.title}</h2>
            <p>
              <strong>When:</strong> {formatDateText(modalEvent)}
            </p>
            {modalEvent.location && (
              <p id="event-location">
                <strong>Where:</strong> {modalEvent.location}
              </p>
            )}
            {modalEvent.description && (
              <div id="event-description">
                <strong>Description:</strong>
                <div>
                  <PortableText value={modalEvent.description} />
                </div>
              </div>
            )}
            <button id="close-modal" onClick={closeEventModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDateForDTSTART(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function transformEvent(event: CalendarEvent): TransformedEvent {
  if (!event.date) {
    console.error("Event date is null or undefined", event);
    throw new Error("Event date is null or undefined");
  }

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

function formatDateText(event: ModalEvent): string {
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
