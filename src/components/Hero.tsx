"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { HeroData, urlFor } from "@/lib/sanity";

const DEFAULT_BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop",
];

function ImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  const currentImage = images && images.length > 0 ? images[index % images.length] : DEFAULT_BACKGROUND_IMAGES[0];

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={index}
          src={currentImage}
          alt="Conference background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dark gradient overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/50 to-navy/80" />
    </div>
  );
}

/* ── Countdown timer ─────────────────────────────────────────────────── */
function useCountdown(targetDate: Date) {
  const calc = useCallback(() => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return time;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="countdown-unit bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold text-gold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-white/60 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ── Particle canvas ────────────────────────────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 163, 61, ${p.a})`;
        ctx.fill();
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(42, 157, 143, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" />;
}

interface HeroProps {
  data?: HeroData | null;
}

/* ── Hero Section ───────────────────────────────────────────────────── */
export default function Hero({ data }: HeroProps) {
  const defaultDate = new Date("2026-09-12T09:00:00+05:30");
  const conferenceDate = data?.conferenceDate ? new Date(data.conferenceDate) : defaultDate;
  const countdown = useCountdown(conferenceDate);

  const eyebrow = data?.eyebrow || "Two-Day International Conference (Online Mode)";
  const title = data?.title || "SMECON";
  const highlightedYear = data?.highlightedYear || "2026";
  const subtitle = data?.subtitle || "International Conference on Smart Manufacturing, Sustainable Energy & Computational Intelligence";
  const organizerText = data?.organizerText || "Jointly organized by Dept. of Chemistry, Sovarani Memorial College (SMC) Howrah, India & IKC Trust, in collaboration with IQAC, Sovarani Memorial College Howrah, WB, India";
  const countdownLabel = data?.countdownLabel || "Conference begins in";

  const primaryBtnLabel = data?.primaryButton?.label || "Submit Paper";
  const primaryBtnUrl = data?.primaryButton?.url || "https://forms.gle/ZuWYQG2nDfaQ8GSQ7";

  const secondaryBtnLabel = data?.secondaryButton?.label || "Paper Template";
  const secondaryBtnUrl = data?.secondaryButton?.url || "https://docs.google.com/document/d/1dYM38sYudATuPjuO0IZmzGUEiHyG9xMg/edit";

  // Parse background images
  const bgImages = data?.backgroundImages && data.backgroundImages.length > 0
    ? data.backgroundImages.map((img) => (typeof img === "string" ? img : urlFor(img) || "")).filter(Boolean)
    : DEFAULT_BACKGROUND_IMAGES;

  // Badges fallback
  const badges = data?.badges && data.badges.length > 0
    ? data.badges
    : [
        { text: "12–13 September 2026", iconType: "calendar" },
        { text: "Fully Online", iconType: "online" },
      ];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  const badgeScale: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.8 + i * 0.15, ease: [0.175, 0.885, 0.32, 1.1] },
    }),
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy py-3 h-fit"
    >
      {/* Image Slider Background with Gradients */}
      <ImageSlider images={bgImages.length > 0 ? bgImages : DEFAULT_BACKGROUND_IMAGES} />

      <ParticleBackground />
1``
      {/* Content */}
      <div className="relative z-20 px-4 sm:px-6 text-center max-w-5xl mx-auto py-20">
        {/* Eyebrow */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gold/90 font-semibold mb-6 shadow-sm"
        >
          {eyebrow}
        </motion.p>

        {/* Title */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-[0.15em] text-white mb-4 drop-shadow-lg"
        >
          {title}{" "}
          <span className="text-gold">{highlightedYear}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4 font-medium drop-shadow-md"
        >
          {subtitle}
        </motion.p>

        {/* Organizer line */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-sm"
        >
          {organizerText}
        </motion.p>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {badges.map((badge, idx) => (
            <motion.span
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={badgeScale}
              className={`inline-flex items-center gap-2 backdrop-blur-md border px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg ${
                idx % 2 === 0
                  ? "bg-gold/20 border-gold/40 text-gold"
                  : "bg-teal/20 border-teal/40 text-teal-light"
              }`}
            >
              {badge.iconType === "online" ? (
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767A2 2 0 0110 16h2l3 3v-3h1a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {badge.text}
            </motion.span>
          ))}
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3 font-semibold drop-shadow-sm">
            {countdownLabel}
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 drop-shadow-lg">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-xl text-white/50 font-light mt-[-20px]">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-xl text-white/50 font-light mt-[-20px]">:</span>
            <CountdownUnit value={countdown.minutes} label="Min" />
            <span className="text-xl text-white/50 font-light mt-[-20px]">:</span>
            <CountdownUnit value={countdown.seconds} label="Sec" />
          </div>
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <a
            href={primaryBtnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gold hover:bg-gold/90 text-navy font-bold rounded-full transition-colors duration-300 uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(232,163,61,0.5)] hover:shadow-[0_0_25px_rgba(232,163,61,0.7)]"
          >
            {primaryBtnLabel}
          </a>
          <a
            href={secondaryBtnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 transition-all duration-300 uppercase tracking-wider text-sm backdrop-blur-md shadow-lg"
          >
            {secondaryBtnLabel}
          </a>
        </motion.div>
      </div>

      {/* Bottom fade into Tracks section (bg-bg-light: #F5F7FA) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-light via-bg-light/70 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
