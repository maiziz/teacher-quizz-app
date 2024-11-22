"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export function MeetingScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
      />
      
      <ScrollArea className="h-[200px]">
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {selectedDate && selectedTime && (
        <Button className="w-full">
          Schedule Meeting
        </Button>
      )}
    </div>
  );
}