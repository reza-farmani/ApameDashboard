"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; 

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { title: "رویداد نمونه", date: "2025-07-25" },
  ]);

  const handleDateClick = (arg: { dateStr: any }) => {
    const title = prompt("عنوان رویداد جدید را وارد کنید:");
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تقویم من</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="fa" 
        dateClick={handleDateClick}
        events={events}
        height="auto"
      />
    </div>
  );
}
