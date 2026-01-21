"use client";

import { useEffect, useState } from "react";

interface LocalDateTimeProps {
  dateString: string;
  showTime?: boolean;
  format?: 'full' | 'date' | 'time';
}

export default function LocalDateTime({ dateString, showTime = true, format = 'full' }: LocalDateTimeProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Parse the date string (assuming it's in ISO format or a parseable format)
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      setFormattedDate(dateString); // Fallback to original string if invalid
      return;
    }

    // Format based on the format prop
    let formatted = '';

    if (format === 'full' || format === 'date') {
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      formatted = date.toLocaleDateString(undefined, dateOptions);
    }

    if (format === 'full' && showTime) {
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      };
      const timeStr = date.toLocaleTimeString(undefined, timeOptions);
      formatted = `${formatted} • ${timeStr}`;
    } else if (format === 'time') {
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      };
      formatted = date.toLocaleTimeString(undefined, timeOptions);
    }

    setFormattedDate(formatted);
  }, [dateString, showTime, format]);

  if (!formattedDate) {
    return <span>{dateString}</span>;
  }

  return <span>{formattedDate}</span>;
}
