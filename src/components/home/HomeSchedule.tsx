"use client";

import { useState } from "react";
import { Clock, MapPin, Video, ChevronRight } from "lucide-react";
import { ImportantDatesData } from "@/lib/sanity";

const DAY1_SESSIONS = [
  { time: "09:30 AM", title: "Inaugural Session & Welcome Address", mode: "hybrid" },
  { time: "10:00 AM", title: "Plenary Session I — Keynote Addresses", mode: "hybrid" },
  { time: "11:10 AM", title: "Plenary Session II — Invited Talks", mode: "hybrid" },
  { time: "12:45 PM", title: "Lunch Break & Student Interaction", mode: "break" },
];

const DAY2_SESSIONS = [
  { time: "09:00 AM", title: "Welcome & Recap of Day 1", mode: "online" },
  { time: "09:10 AM", title: "Keynote Session III — Distinguished Speakers", mode: "online" },
  { time: "11:10 AM", title: "Technical Session I — Parallel Tracks A & B", mode: "online" },
  { time: "01:45 PM", title: "Technical Session II — Parallel Tracks A & B", mode: "online" },
  { time: "03:00 PM", title: "Valedictory & Closing Session", mode: "online" },
];

function ModeBadge({ mode }: { mode: string }) {
  if (mode === "online") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
        <Video size={12} />
        Online
      </span>
    );
  }
  if (mode === "hybrid") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
        <MapPin size={12} />
        Hybrid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
      Break
    </span>
  );
}

export default function HomeSchedule({ data }: { data?: ImportantDatesData | null }) {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const sessions = activeDay === 1 ? DAY1_SESSIONS : DAY2_SESSIONS;
  const dateLabel =
    activeDay === 1 ? "Saturday, 19 September 2026" : "Sunday, 20 September 2026";

  return (
    <section id="schedule" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-[var(--color-outline)] mb-2">
            Programme
          </p>
          <h2 className="font-serif text-[2.5rem] font-normal text-[var(--color-on-surface)]">
            Two Days of Academic Exchange
          </h2>
        </div>

        {/* Day tab switcher */}
        <div className="flex gap-2 mt-6 mb-10">
          {([1, 2] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={
                "rounded-full px-5 py-2 text-sm font-medium transition-colors " +
                (activeDay === day
                  ? "bg-[#914630] text-white"
                  : "bg-[var(--color-surface-container)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-high)]")
              }
            >
              Day {day}
            </button>
          ))}
        </div>

        {/* Date badge */}
        <p className="text-sm text-[var(--color-on-surface-variant)] mb-6 font-medium">{dateLabel}</p>

        {/* Sessions */}
        <div>
          {sessions.map((session, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-4 border-b border-[var(--color-outline-variant)] last:border-0"
            >
              <Clock size={16} className="text-[#914630] mt-1 shrink-0" />
              <span className="text-sm font-medium text-[var(--color-on-surface-variant)] w-20 shrink-0">
                {session.time}
              </span>
              <span className="text-sm font-medium text-[var(--color-on-surface)] flex-1">
                {session.title}
              </span>
              <ModeBadge mode={session.mode} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/schedule"
          className="mt-8 inline-flex items-center gap-2 bg-[#914630] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#7a3927] transition-colors"
        >
          View Full Programme
          <ChevronRight size={16} />
        </a>
      </div>
    </section>
  );
}
