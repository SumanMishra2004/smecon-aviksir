
"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  FileDown,
  MapPin,
  Monitor,
  Users,
  Video,
} from "lucide-react";

type ScheduleItem = {
  time: string;
  title: string;
  description?: string;
};

type SessionProps = {
  title: string;
  chair?: string;
  link?: string;
  linkLabel?: string;
  items: ScheduleItem[];
  note?: string;
};

const day1Inaugural: ScheduleItem[] = [
  {
    time: "09:30–09:40 AM",
    title: "Welcome Address & Introduction to SMECON 2026",
  },
  {
    time: "09:40–09:55 AM",
    title: "Address by Patrons",
  },
  {
    time: "09:55–10:00 AM",
    title: "Address by Conveners",
  },
];

const day1Plenary1: ScheduleItem[] = [
  {
    time: "10:00–10:30 AM",
    title: "Keynote Address I — Prof. Dr. Rajiv Ganguly",
  },
  {
    time: "10:30–11:00 AM",
    title: "Keynote Address II — Prof. Dr. Bhaskar Biswas",
  },
  {
    time: "11:00–11:10 AM",
    title: "TEA BREAK",
  },
];

const day1Plenary2: ScheduleItem[] = [
  {
    time: "11:10–11:40 AM",
    title: "Keynote Address III — Prof. Dr. Dilip Kumar Maiti",
  },
  {
    time: "11:40 AM–12:10 PM",
    title: "Keynote Address IV — Prof. Dr. Bibaswan Biswas",
  },
  {
    time: "12:10–12:35 PM",
    title: "Invited Talk-I — Prof. Dr. Suvadra Das",
  },
  {
    time: "12:35- 12:45 pm",
    title: "Concluding Remarks- Dr. Sourajit Maity & Ms. Priti Kamal",
  },
  {
    time: "12:45–01:30 PM",
    title: "LUNCH BREAK & STUDENT INTERACTION",
  },
];

const day2Keynote: ScheduleItem[] = [
  {
    time: "09:00 – 09:10 AM",
    title: "Welcome & Recap of Day 1",
  },
  {
    time: "09:10 – 09:40 AM",
    title: "Keynote Address VI — Prof. Sourangshu Mukhopadhyay",
  },
  {
    time: "09:40 – 10:10 AM",
    title: "Keynote Address VII — Prof. Bimal Krishna Banik",
  },
];

const day2Invited2: ScheduleItem[] = [
  {
    time: "10:10 – 10:35 AM",
    title: "Invited Talk II — Dr. Ekta Yadav",
  },
  {
    time: "10:35 – 11:00 AM",
    title: "Invited Talk III— _Sakera Khatun",
  },
  {
    time: "11:00 – 11:10 AM",
    title: "TEA / SCREEN BREAK",
  },
];

const technicalA1: ScheduleItem[] = [
  {
    time: "11:10 AM – 11:25 AM",
    title:
      "DeepSafe-Triage: Multi-Task Deep Learning for Clinical Triage and Response Safety by Soham Bangal, Spandan Aich, Ankush Dutta, Jeenia Basu, Tirthadeep Kapat, Abhijit Debnath",
  },
  {
    time: "11:25 AM – 11:40 AM",
    title:
      "Multi-Temporal Sentinel-1 SAR-Based Crop Classification Using Machine Learning, Deep Learning, Quantum Machine Learning, and Hybrid CNNXGBoost Architectures by Debarshi Banerjee, Seyan Hossain Saan, Prisha Roy Chaudhuri, Sayan Mondal.",
  },
  {
    time: "11:40 AM – 11:55 AM",
    title:
      "An intelligent AI-ML based framework for Parkinson disease prediction using voice acoustic features by Puja Verma, Sania Mukherjee, Iqra Asif, Moubani Das, Aparna Dhara",
  },
  {
    time: "11:55 AM – 12:10 PM",
    title:
      "Persistence-Conditioned Radar-Map Verification Across Independent UAV Flights: A Reproducible Simulation Study by Abhishek Garg, Aric Paul, Sagnik Saha, Pratigya Kaushal, Ramasish Manna, Pranab Singh",
  },
];

const technicalB1: ScheduleItem[] = [
  {
    time: "11:10 AM – 11:25 AM",
    title:
      "A Unified Framework for Cooperative Aerial–Underwater Tracking with Information-Driven Formation Control and Adaptive Bayesian Sensor Fusion by Ayush Kumar, Harsh Tiwari",
  },
  {
    time: "11:25 AM – 11:40 AM",
    title:
      "Adaptive Multimodal UAV-Based Autonomous Landmine Detection, Classification, and Risk Mapping Using Thermal, GPR, and EMI Sensing by Anish Dey, Kasturi Adhikari, Pritim Mondal, Arpan Chatterjee",
  },
  {
    time: "11:40 AM – 11:55 AM",
    title:
      "AI-Enabled Digital Twin for Sustainable and Climate-Resilient Conservation of Victoria amazonica in Botanical Garden by Rustom Roy, Saptak Dey.",
  },
  {
    time: "11:55 AM – 12:10 PM",
    title:
      "Design and Simulation of an Autonomous Navigation System for Hybrid UUAV Using Sensor Fusion and Adaptive Path Planning by Saheli Ghorai, Shramana Sanyal",
  },
  {
    time: "12:10 PM – 12:25 PM",
    title:
      "A Hybrid Multi-Paradigm Ensemble for Audio Spoofing Detection: Combining Classical Machine Learning and Deep Neural Architectures by Dhruba Dutta Banik, Sucharita Jalui, Aunkan Pal",
  },
];

const invited3: ScheduleItem[] = [
  {
    time: "12:25 – 12:50 PM",
    title: "Invited Talk IV — Dr. Susmita Singh",
  },
  {
    time: "12:25 – 01:15 PM",
    title: "Invited Talk V- Prof Dr. Shreemoyee Ganguly",
  },
  {
    time: "01:15 – 01:45 PM",
    title: "LUNCH & SCREEN BREAK",
  },
];

const technicalA3: ScheduleItem[] = [
  {
    time: "01:45 PM – 02:00 PM",
    title:
      "Voice2Sentiment: An End-to-End Multilingual System for Speech Emotion Recognition and Textual Sentiment Analysis via Reinforcement-Learned Language-Aware Reliability Fusion by Aditya Choudhary, Uma Saha, Sohan Das, Sonali Das, and Chandra Karmakar",
  },
  {
    time: "02:00 PM – 02:15 PM",
    title:
      "Linguistic Rationale-Aware Fusion for Multimodal Fake News Detection Using Text by Mitrajit Ghosh, Disha Sharma, Soumyajeet Das, Pial Sarker",
  },
  {
    time: "02:15 PM – 02:30 PM",
    title:
      "Deep-Tissue Cancer Theranostics: Advancing Two-Photon Fluorescence Microscopy in Diagnosis and Photodynamic Therapy by Debosreeta Bose, Asmit Santra, Malaika Azhar Baig, Rajdeep Chowdhury, Agnishwar Girigoswami",
  },
  {
    time: "02:30 PM – 02:45 PM",
    title:
      "Design and Development of a Location-Aware Destination Alert System for Public Transportation by Apalok Roy, Uddipan Ghosh, Anirban Biswas, Priyanka Dutta Banik, Trina Nag.",
  },
];

const technicalB2: ScheduleItem[] = [
  {
    time: "01:45 PM – 02:00 PM",
    title:
      "Lightweight IoT Botnet Detection Using Cost-Aware Feature Selection and Adaptive Early-Exit Classification by Suman Mishra, Aditi Dutta, Shreyangi Roy, Shamayita Moitra",
  },
  {
    time: "02:00 PM – 02:15 PM",
    title:
      "Statistical Methods and AI/ML: A Comprehensive Review of Multi-Domain Applications, Advancements, Challenges, and Future Directions by Smita Pal Sarkar, Supriya Mondal, Rekharani Mahanta, Arunava Das, Swastik Roy, Subhadeep Mondal",
  },
  {
    time: "02:15 PM – 02:30 PM",
    title:
      "Pollution Surveillance of Surface to Seafloor: A YOLOv8 Deep Learning Approach by Tuheena Bose, Divyanshi Srivastava, Shambhavi Kumari.",
  },
  {
    time: "02:30 PM – 02:45 PM",
    title:
      "Development of an Efficient Bio-catalyst for Bioethanol Production from fruit peel Waste by Soumyadeep Chowdhury, Sunanda Saha, Kirti Mohta, Anushna Dutta, Susmita Singh",
  },
  {
    time: "02:45 PM￾03:00 PM",
    title:
      "Valorization of fruit peel waste for production of sustainable bioethanol: A comparative study of Microbial and chemical pathways by Sunanda Saha, Soumyadeep Chowdhury, Nisha Kumari, Anushna Dutta, Susmita Sing",
  },
];

const valedictory: ScheduleItem[] = [
  {
    time: "03:00 – 03:10 PM",
    title: "Conference Highlights & Rapporteur's Report",
  },
  {
    time: "03:10 – 03:20 PM",
    title: "Address by the Organising Committee",
  },
  {
    time: "03:20 – 03:30 PM",
    title: "Valedictory Address & Award Giving",
  },
  {
    time: "03:30 PM",
    title: "Vote of Thanks & Conclusion of SMECON 2026",
  },
];

function Session({
  title,
  chair,
  link,
  linkLabel = "Join Online Session",
  items,
  note,
}: SessionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-xl">
      <div className="border-b border-zinc-100 bg-zinc-50/80 px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-950 sm:text-xl">
              {title}
            </h3>

            {chair && (
              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
                <Users className="h-4 w-4" />
                <span>Session Chair: {chair}</span>
              </div>
            )}
          </div>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Video className="h-4 w-4" />
              {linkLabel}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="divide-y divide-zinc-100">
        {items.map((item, index) => (
          <div
            key={`${item.time}-${index}`}
            className="group grid gap-3 px-5 py-5 sm:grid-cols-[155px_1fr] sm:px-7"
          >
            <div className="flex items-start gap-2 text-sm font-bold text-zinc-500">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
              <span>{item.time}</span>
            </div>

            <div>
              <p className="text-[15px] font-medium leading-7 text-zinc-900 sm:text-base">
                {item.title}
              </p>

              {item.description && (
                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {note && (
        <div className="border-t border-zinc-100 bg-zinc-50 px-5 py-4 text-sm italic text-zinc-600 sm:px-7">
          {note}
        </div>
      )}
    </section>
  );
}

function DayHeader({
  day,
  date,
  mode,
  children,
}: {
  day: string;
  date: string;
  mode: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-8 text-white shadow-2xl sm:px-10 sm:py-10">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
      <div className="absolute -bottom-28 right-20 h-64 w-64 rounded-full border border-white/5" />

      <div className="relative z-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
            {day}
          </span>

          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
            {mode}
          </span>
        </div>

        <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
          {date}
        </h2>

        {children}
      </div>
    </div>
  );
}

export default function SmeconSchedule({
  pdfUrl = "/Day 1 2 schedule SMECON 2026.pdf",
}: {
  pdfUrl?: string;
}) {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const scrollToDay = (day: 1 | 2) => {
    setActiveDay(day);

    document
      .getElementById(`day-${day}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-950">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                <CalendarDays className="h-4 w-4" />
                Conference Schedule
              </div>

              <h1 className="text-5xl font-black tracking-[-0.04em] text-zinc-950 sm:text-7xl">
                SMECON
                <span className="text-zinc-400"> 2026</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                Two days of keynote addresses, invited talks, technical
                presentations and academic interaction.
              </p>
            </div>

            <a
              href={pdfUrl}
              download
              className="group inline-flex w-fit items-center gap-3 rounded-2xl bg-zinc-950 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              <FileDown className="h-5 w-5" />
              Download Schedule PDF
              <ExternalLink className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Conference Info */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Venue
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-zinc-800">
                Sovarani Memorial College, Howrah, West Bengal, India
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <Monitor className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Day 1
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-800">
                Saturday, 19 September 2026 | Hybrid Mode
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:col-span-2 lg:col-span-1">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <Video className="h-4 w-4" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Online Link
              </p>
              <a
                href="https://meet.google.com/gcv-rjwg-nre"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block truncate text-sm font-semibold text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900"
              >
                https://meet.google.com/gcv-rjwg-nre
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DAY NAVIGATION */}
      <div className="sticky top-0 z-30 border-y border-zinc-200/80 bg-[#f7f7f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-2 px-5 py-3 sm:px-8">
          <button
            onClick={() => scrollToDay(1)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeDay === 1
                ? "bg-zinc-950 text-white"
                : "bg-white text-zinc-500 hover:text-zinc-950"
            }`}
          >
            Day 1
          </button>

          <button
            onClick={() => scrollToDay(2)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeDay === 2
                ? "bg-zinc-950 text-white"
                : "bg-white text-zinc-500 hover:text-zinc-950"
            }`}
          >
            Day 2
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-5 py-10 sm:px-8 sm:py-16">
        {/* DAY 1 */}
        <section id="day-1" className="scroll-mt-24">
          <DayHeader
            day="DAY 1"
            date="Saturday, 19 September 2026"
            mode="Hybrid Mode"
          >
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <MapPin className="h-4 w-4" />
              Sovarani Memorial College, Howrah, West Bengal, India
            </div>

            <a
              href="https://meet.google.com/gcv-rjwg-nre"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              Online Link
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </DayHeader>

          <div className="mt-8 space-y-6">
            <Session
              title="INAUGURAL SESSION"
              items={day1Inaugural}
            />

            <Session
              title="PLENARY SESSION – I"
              chair="[Prof. Dr. Hari Sankar Biswas]"
              items={day1Plenary1.slice(0, 2)}
              note="25 minutes presentation + 5 minutes interaction/Q&A"
            />

            <Session
              title="PLENARY SESSION – II"
              chair="[Prof. Dr. Rajiv Ganguly]"
              items={day1Plenary2}
              note="25 minutes presentation + 5 minutes interaction/Q&A (Keynote) • 20 minutes presentation + 5 minutes interaction/Q&A (Invited Talk)"
            />

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center text-sm font-semibold text-zinc-500">
              11:00–11:10 AM - TEA BREAK
            </div>
          </div>
        </section>

        {/* DAY 2 */}
        <section id="day-2" className="scroll-mt-24">
          <DayHeader
            day="DAY 2"
            date="Sunday, 20 September 2026"
            mode="Online Mode"
          >
            <p className="mt-4 text-sm text-zinc-400">
              Virtual Conference | Organized by IKC Trust & Sovarani Memorial
              College
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Master of Ceremonies- Prof. Dr. Susmita Singh
            </p>

            <a
              href="https://meet.google.com/gcv-rjwg-nre"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              Online Joining Link
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </DayHeader>

          <div className="mt-8 space-y-6">
            <Session
              title="KEYNOTE SESSION – III"
              chair="Prof. Dr. Ekta Yadav"
              items={day2Keynote}
              note="Keynote Talk: 25 min + 5 min Interaction/Q&A"
            />

            <Session
              title="INVITED TALK SESSION – II"
              chair="Prof. Dr. Arpan Maiti"
              items={day2Invited2.slice(0, 2)}
              note="Invited Talk: 20 min + 5 min Interaction/Q&A"
            />

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center text-sm font-semibold text-zinc-500">
              TEA / SCREEN BREAK- 11:00 – 11:10 AM
            </div>

            {/* PARALLEL SESSIONS */}
            <div className="pt-4">
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Parallel Sessions
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">
                  TECHNICAL SESSION – I
                </h3>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Session
                  title="TECHNICAL SESSION – I (PARALLEL SESSIONS- A)"
                  chair="Prof. Dr. Debosreeta Bose"
                  link="https://meet.google.com/jue-vxrr-kjn"
                  items={technicalA1}
                  note="Each Presentation: 10 min + 5 min Q&A"
                />

                <Session
                  title="TECHNICAL SESSION – I (PARALLEL SESSIONS- B)"
                  chair="Prof. Sangita Dutta"
                  link="https://meet.google.com/tib-aqpj-hvu"
                  items={technicalB1}
                  note="Each Presentation: 10 min + 5 min Q&A"
                />
              </div>
            </div>

            <Session
              title="INVITED LECTURE SESSION – III"
              chair="Prof. Dr. Asim Kumar Biswas"
              link="https://meet.google.com/gcv-rjwg-nre"
              items={invited3.slice(0, 2)}
              note="Invited Talk: 20 min + 5 min Interaction/Q&A"
            />

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center text-sm font-semibold text-zinc-500">
              LUNCH & SCREEN BREAK- 01:15 – 01:45 PM
            </div>

            {/* AFTERNOON PARALLEL */}
            <div className="pt-4">
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Afternoon Programme
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">
                  Technical Sessions
                </h3>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Session
                  title="TECHNICAL SESSION – IIII (PARALLEL SESSIONS- A)"
                  chair="Prof. Apurba Nandi"
                  link="https://meet.google.com/jue-vxrr-kjn"
                  items={technicalA3}
                  note="Each Presentation: 10 min + 5 min Q&A"
                />

                <Session
                  title="TECHNICAL SESSION – II (PARALLEL SESSIONS- B)"
                  chair="Prof. Dr. Sukhendu Sadhukhan"
                  link="https://meet.google.com/tib-aqpj-hvu"
                  items={technicalB2}
                  note="Each Presentation: 10 min + 5 min Q&A"
                />
              </div>
            </div>

            <Session
              title="VALEDICTORY & CLOSING SESSION"
              link="https://meet.google.com/gcv-rjwg-nre"
              items={valedictory}
            />
          </div>
        </section>

        {/* FOOTER DOWNLOAD */}
        <section className="rounded-[2rem] bg-zinc-950 px-6 py-10 text-center text-white sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            SMECON 2026
          </p>

          <h2 className="mt-3 text-2xl font-black sm:text-3xl">
            Keep the complete schedule with you
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Download the official SMECON 2026 schedule PDF for offline
            reference.
          </p>

          <a
            href={pdfUrl}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </a>
        </section>
      </div>
    </main>
  );
}
