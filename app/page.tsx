"use client";

import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import SmoothScroll from "./SmoothScroll";

type Brand = "digital" | "design";

const CONTACT_EMAIL = "ssdigital22@gmail.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ssagency.in/#organization",
      name: "SS Digital",
      alternateName: ["SS Designs", "SS Agency"],
      email: CONTACT_EMAIL,
      telephone: "+91 8955796861",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
      founder: {
        "@id": "https://ssagency.in/#lakshya-acharya",
      },
      employee: {
        "@id": "https://ssagency.in/#lakshya-acharya",
      },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "App Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Graphic Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reel Editing" } },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://ssagency.in/#lakshya-acharya",
      name: "Lakshya Acharya",
      jobTitle: "Founder and CEO",
      worksFor: {
        "@id": "https://ssagency.in/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ssagency.in/#website",
      name: "SS Digital",
      alternateName: "SS Designs",
      publisher: {
        "@id": "https://ssagency.in/#organization",
      },
    },
  ],
};

const brandContent = {
  digital: {
    name: "SS Digital",
    theme: "blue",
    bg: "bg-black",
    accent: "bg-blue-600",
    accentHover: "hover:bg-blue-700",
    tint: "bg-blue-500/5 hover:bg-blue-500/10",
    glow: "rgba(59,130,246,0.15)",
    hero: ["Build.", "Scale.", "Dominate."],
    intro:
      "Helping businesses grow with websites, apps, digital marketing and AI-powered solutions.",
    cta: "Explore Digital Services",
    services: [
      "Web Development",
      "App Development",
      "Digital Marketing",
      "AI Automation",
      "SEO Optimization",
      "Meta Ads",
      "Google Ads",
      "CRM & Lead Automation",
    ],
    expertise: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Mobile Apps",
      "AI Automation",
      "SEO",
      "Meta Ads",
      "Google Ads",
      "Analytics",
      "Landing Pages",
      "Lead Funnels",
    ],
    projects: ["E-Commerce Platform", "Business Website", "Mobile App"],
  },
  design: {
    name: "SS Designs",
    theme: "pink",
    bg: "bg-[#120A16]",
    accent: "bg-pink-600",
    accentHover: "hover:bg-pink-700",
    tint: "bg-pink-500/5 hover:bg-pink-500/10",
    glow: "rgba(236,72,153,0.15)",
    hero: ["Design.", "Create.", "Inspire."],
    intro:
      "Creative graphic design, reels, videos and AI-powered content that captures attention.",
    cta: "Explore Design Services",
    services: [
      "Graphic Design",
      "Video Editing",
      "Reel Editing",
      "AI Creative Studio",
      "Logo Design",
      "Brand Identity",
      "Social Media Posts",
      "Motion Graphics",
    ],
    expertise: [
      "Graphic Design",
      "Logo Design",
      "Branding",
      "Reel Editing",
      "Video Editing",
      "Motion Graphics",
      "Social Media Creatives",
      "Poster Design",
      "YouTube Thumbnails",
      "Instagram Campaigns",
      "AI Creative Studio",
      "Content Design",
    ],
    projects: ["Brand Identity", "Instagram Campaign", "Reel Editing"],
  },
} satisfies Record<
  Brand,
  {
    name: string;
    theme: string;
    bg: string;
    accent: string;
    accentHover: string;
    tint: string;
    glow: string;
    hero: string[];
    intro: string;
    cta: string;
    services: string[];
    expertise: string[];
    projects: string[];
  }
>;

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    text: "Understanding your business goals.",
  },
  {
    number: "02",
    title: "Strategy",
    text: "Creating the perfect roadmap.",
  },
  {
    number: "03",
    title: "Execution",
    text: "Designing and developing solutions.",
  },
  {
    number: "04",
    title: "Growth",
    text: "Launching and scaling your brand.",
  },
];

const testimonials = [
  {
    name: "Raj Sharma",
    company: "Sharma Enterprises",
    review: "Outstanding website and marketing support.",
  },
  {
    name: "Priya Mehta",
    company: "Mehta Fashion",
    review: "Amazing graphic designs and quick delivery.",
  },
  {
    name: "Amit Singh",
    company: "AS Technologies",
    review: "Professional team and excellent communication.",
  },
  {
    name: "Neha Verma",
    company: "NV Studio",
    review: "Highly recommended for branding and reels.",
  },
  {
    name: "Rohit Gupta",
    company: "RG Foods",
    review: "Our online presence improved dramatically.",
  },
  {
    name: "Karan Joshi",
    company: "KJ Solutions",
    review: "Modern designs and premium quality work.",
  },
];

const stats = [
  { value: "100+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "95%", label: "Retention" },
  { value: "24/7", label: "Support" },
];

export default function Home() {
  const [brand, setBrand] = useState<Brand>("digital");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [thinking, setThinking] = useState(false);
  const { scrollYProgress } = useScroll();
  const content = brandContent[brand];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollYProgress.on("change", () => undefined);
  }, [scrollYProgress]);

  const handleServicePick = (selectedService: string) => {
    setService(selectedService);
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      setStep(2);
    }, 700);
  };

  const closeMenu = () => setMenuOpen(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-7xl font-extrabold text-white">SS</h1>
          <p className="mt-2 text-2xl tracking-[10px] text-blue-400">
            DIGITAL
          </p>
          <div className="mt-8 text-gray-500">Loading Experience...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <main
      onMouseMove={(event) => {
        const position = { x: event.clientX, y: event.clientY };
        setMousePosition(position);
        setCursor(position);
      }}
      className={`min-h-screen overflow-hidden text-white transition-all duration-700 ${content.bg}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <p className="sr-only">
        SS Digital and SS Designs were founded by Lakshya Acharya, Founder and CEO.
      </p>
      <SmoothScroll />

      <div
        className="pointer-events-none fixed z-[9999] hidden h-8 w-8 rounded-full border border-white/70 md:block"
        style={{ left: cursor.x - 16, top: cursor.y - 16 }}
      />
      <motion.div
        className={`pointer-events-none fixed z-[9999] hidden h-10 w-10 rounded-full blur-sm md:block ${content.accent}/40`}
        animate={{ x: cursor.x - 20, y: cursor.y - 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[10000] hidden h-2 w-2 rounded-full bg-white md:block"
        animate={{ x: cursor.x - 4, y: cursor.y - 4 }}
        transition={{ type: "spring", damping: 30, stiffness: 600 }}
      />

      <div
        className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full blur-[120px]"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          background: content.glow,
        }}
      />

      <SiteHeader
        brand={brand}
        contentName={content.name}
        menuOpen={menuOpen}
        onBrandChange={setBrand}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onMenuClose={closeMenu}
      />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className={`absolute h-[700px] w-[700px] rounded-full blur-[180px] ${content.accent}/20`} />
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-6xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-9xl"
        >
          {content.hero.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          {content.intro}
        </motion.p>

        <motion.button
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 mt-10 rounded-xl px-8 py-4 font-semibold ${content.accent} ${content.accentHover}`}
        >
          {content.cta}
        </motion.button>
      </section>

      <AnimatedSection className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-4xl font-bold">{item.value}</h3>
              <p className="mt-2 text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <section className="overflow-hidden px-6 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold">Technologies & Expertise</h2>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {content.expertise.map((tech) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.08, y: -5 }}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-16 text-center text-5xl font-bold">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {content.services.map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-300 ${content.tint}`}
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-16 text-center text-5xl font-bold">Portfolio</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.projects.map((project, index) => (
            <motion.article
              key={project}
              whileHover={{ y: -8 }}
              className="min-h-56 rounded-2xl border border-white/10 bg-white/5 p-7"
            >
              <p className={`mb-8 text-sm font-bold ${brand === "digital" ? "text-blue-300" : "text-pink-300"}`}>
                Project 0{index + 1}
              </p>
              <h3 className="text-2xl font-bold">{project}</h3>
              <p className="mt-4 text-gray-400">
                Strategy, design and execution built around clear business outcomes.
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-16 text-center text-5xl font-bold">How We Work</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {processSteps.map((item) => (
            <motion.div
              key={item.number}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <div className={`text-6xl font-extrabold ${brand === "digital" ? "text-blue-400" : "text-pink-400"}`}>
                {item.number}
              </div>
              <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 text-gray-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Reviews />
      <Faq />
      <Contact brand={brand} content={content} />

      <a
        href="https://wa.me/918955796861"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-5 py-4 font-semibold shadow-lg transition hover:scale-110"
      >
        WhatsApp
      </a>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className={`rounded-3xl p-10 text-center md:p-12 ${brand === "digital" ? "bg-blue-600" : "bg-pink-600"}`}>
          <h2 className="text-4xl font-bold md:text-5xl">Ready To Grow Your Brand?</h2>
          <p className="mt-6 text-xl">Let us create something extraordinary together.</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 rounded-xl bg-white px-8 py-4 font-bold text-black"
          >
            Start Your Project
          </button>
        </div>
      </section>

      <button
        onClick={() => setChatOpen((open) => !open)}
        className={`fixed bottom-24 right-6 z-50 rounded-full px-5 py-4 font-semibold shadow-xl ${content.accent}`}
      >
        AI Consultant
      </button>

      {chatOpen && (
        <AIConsultant
          brand={brand}
          step={step}
          service={service}
          name={name}
          phone={phone}
          thinking={thinking}
          onServicePick={handleServicePick}
          onStepChange={setStep}
          onNameChange={setName}
          onPhoneChange={setPhone}
        />
      )}

      <footer className="border-t border-white/10 py-10 text-center text-gray-400">
        Copyright 2026 SS Digital x SS Designs. All Rights Reserved.
      </footer>
    </main>
  );
}

function SiteHeader({
  brand,
  contentName,
  menuOpen,
  onBrandChange,
  onMenuToggle,
  onMenuClose,
}: {
  brand: Brand;
  contentName: string;
  menuOpen: boolean;
  onBrandChange: (brand: Brand) => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}) {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex w-full items-center justify-between px-3 py-3 sm:px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-w-0 items-center gap-3 text-left"
            aria-label="SS Agency home"
          >
            <Image
              src="/logo.png"
              alt="SS Agency logo"
              width={72}
              height={72}
              priority
              className="h-16 w-16 rounded-xl object-cover"
            />
            <span className="min-w-0 leading-tight">
              <span className="block text-base font-semibold uppercase tracking-[0.22em] sm:text-lg">
                {contentName}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.35em] text-gray-500">
                Creative Agency
              </span>
            </span>
          </button>

          <div className="hidden rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl md:flex">
            {(["digital", "design"] as Brand[]).map((item) => (
              <button
                key={item}
                onClick={() => onBrandChange(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  brand === item
                    ? `${brandContent[item].accent} text-white`
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {brandContent[item].name}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <button className="md:hidden" onClick={onMenuToggle} aria-label="Toggle menu">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 top-full w-full border-t border-white/10 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-6 p-6 text-lg">
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-2">
              {(["digital", "design"] as Brand[]).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    onBrandChange(item);
                    onMenuClose();
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    brand === item ? `${brandContent[item].accent} text-white` : "text-gray-400"
                  }`}
                >
                  {brandContent[item].name}
                </button>
              ))}
            </div>

            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={onMenuClose}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Reviews() {
  const reviewRows = [
    { direction: ["0%", "-50%"], duration: 25 },
    { direction: ["-50%", "0%"], duration: 30 },
    { direction: ["0%", "-50%"], duration: 35 },
  ];

  return (
    <section id="reviews" className="overflow-hidden py-24">
      <h2 className="mb-16 text-center text-5xl font-bold">Client Reviews</h2>
      {reviewRows.map((row, rowIndex) => (
        <div key={rowIndex} className="mb-6 overflow-hidden last:mb-0">
          <motion.div
            animate={{ x: row.direction }}
            transition={{ repeat: Infinity, duration: row.duration, ease: "linear" }}
            className="flex w-max gap-6"
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <article
                key={`${item.name}-${rowIndex}-${index}`}
                className="min-w-[300px] rounded-2xl border border-white/10 bg-white/5 p-6 sm:min-w-[350px]"
              >
                <p className="mb-4 text-sm tracking-[0.35em] text-yellow-300">5 STARS</p>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-bold">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.company}</p>
                  </div>
                </div>
                <p>{item.review}</p>
              </article>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}

function Faq() {
  const questions = [
    {
      question: "How much does a website cost?",
      answer: "Website pricing starts from Rs. 9,999 and depends on features and complexity.",
    },
    {
      question: "How long does development take?",
      answer: "Most projects are delivered within 1 to 4 weeks.",
    },
    {
      question: "Do you provide support after delivery?",
      answer: "Yes, we provide ongoing support and maintenance.",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-12 text-center text-5xl font-bold">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {questions.map((item) => (
          <details key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <summary className="cursor-pointer font-semibold">{item.question}</summary>
            <p className="mt-4 text-gray-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact({
  brand,
  content,
}: {
  brand: Brand;
  content: (typeof brandContent)[Brand];
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formName = String(formData.get("name") ?? "");
    const formEmail = String(formData.get("email") ?? "");
    const formPhone = String(formData.get("phone") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = `New project enquiry from ${formName || "website visitor"}`;
    const body = [
      "New enquiry from SS Agency website",
      "",
      `Name: ${formName}`,
      `Email: ${formEmail}`,
      `Phone: ${formPhone}`,
      `Interested Team: ${brand === "digital" ? "SS Digital" : "SS Designs"}`,
      "",
      "Project Details:",
      message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="mb-16 text-center text-5xl font-bold">Let us Build Something Amazing</h2>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h3 className="mb-4 text-3xl font-bold">Get In Touch</h3>
          <p className="text-gray-400">
            Looking for a website, app, graphic design, reel editing or AI solution? Let us talk.
          </p>
          <div className="mt-8 space-y-4">
            <p>Email: {CONTACT_EMAIL}</p>
            <p>Phone: +91 8955796861</p>
            <p>Location: Rajasthan, India</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-8">
          <input name="name" type="text" placeholder="Your Name" required className="w-full rounded-xl border border-white/10 bg-black/30 p-4" />
          <input name="email" type="email" placeholder="Email" required className="w-full rounded-xl border border-white/10 bg-black/30 p-4" />
          <input name="phone" type="text" placeholder="Phone Number" required className="w-full rounded-xl border border-white/10 bg-black/30 p-4" />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows={5}
            required
            className="w-full rounded-xl border border-white/10 bg-black/30 p-4"
          />
          <button type="submit" className={`w-full rounded-xl py-4 font-semibold transition ${content.accent} ${content.accentHover}`}>
            Send Message
          </button>
          <p className="text-center text-xs text-gray-500">{brand === "digital" ? "Digital growth team" : "Creative design team"}</p>
        </form>
      </div>
    </section>
  );
}

function AIConsultant({
  brand,
  step,
  service,
  name,
  phone,
  thinking,
  onServicePick,
  onStepChange,
  onNameChange,
  onPhoneChange,
}: {
  brand: Brand;
  step: number;
  service: string;
  name: string;
  phone: string;
  thinking: boolean;
  onServicePick: (service: string) => void;
  onStepChange: (step: number) => void;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
}) {
  const plans: Record<string, string[]> = {
    Website: ["Responsive Website", "SEO Ready", "WhatsApp Integration", "Starting Rs. 24,999"],
    App: ["Android + iOS App", "Admin Panel", "Starting Rs. 75,000"],
    Marketing: ["Meta Ads", "Lead Generation", "Starting Rs. 15,000/month"],
    Design: ["Branding Kit", "Social Media Designs", "Starting Rs. 9,999"],
  };

  return (
    <div className="fixed bottom-40 right-6 z-50 w-[calc(100vw-48px)] max-w-[350px] rounded-3xl border border-white/10 bg-black p-6 backdrop-blur-xl">
      <h3 className="mb-4 text-xl font-bold">SS AI Consultant</h3>
      {thinking && <p className="mb-4 text-gray-400">Preparing your recommendation...</p>}

      {step === 1 && !thinking && (
        <>
          <p className="mb-4">What service are you looking for?</p>
          <div className="grid gap-2">
            {[
              ["Website", "Website Development"],
              ["App", "App Development"],
              ["Marketing", "Digital Marketing"],
              ["Design", "Graphic Design"],
            ].map(([value, label]) => (
              <button key={value} onClick={() => onServicePick(value)} className="rounded-xl bg-white/10 p-3 text-left">
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="mb-4">What is your budget?</p>
          <div className="grid gap-2">
            {["Rs. 10k - Rs. 25k", "Rs. 25k - Rs. 50k", "Rs. 50k+"].map((budget) => (
              <button key={budget} onClick={() => onStepChange(3)} className="rounded-xl bg-white/10 p-3 text-left">
                {budget}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p className="mb-4 font-bold">Recommended Plan</p>
          <div className="rounded-xl bg-white/5 p-4">
            {(plans[service] ?? plans.Website).map((item) => (
              <p key={item}>- {item}</p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            className="mt-4 w-full rounded-xl bg-white/10 p-3"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            className="mt-3 w-full rounded-xl bg-white/10 p-3"
          />
          <a
            href={`https://wa.me/918955796861?text=${encodeURIComponent(
              `Hi SS Agency, I am ${name} (${phone}) and I need ${service} services.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 block rounded-xl p-3 text-center ${brand === "digital" ? "bg-blue-600" : "bg-pink-600"}`}
          >
            Contact on WhatsApp
          </a>
        </>
      )}
    </div>
  );
}
