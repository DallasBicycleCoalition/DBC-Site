interface IncomingEvent {
    title: string;
    description?: string;
    location?: string;
    allDay?: boolean;
    date: {
      startDate: string | Date;
      endDate?: string | Date;
    };
  }