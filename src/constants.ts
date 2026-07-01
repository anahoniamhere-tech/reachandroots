import { TicketTier } from "./types";

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "Public Lecture: The Five Inner Thoughts",
    name: "Public Lecture",
    description: "Free admission to the general lecture on July 6 (prior registration required).",
    price: 0,
    duration: "single",
    isVip: false,
    includes: ["Public Lecture Entry"],
    excludes: [],
    capacity: 200,
    soldCount: 0,
    wristband: "E-Ticket",
    status: "active",
    sortOrder: 1
  },
  {
    id: "Single Workshop: Passion & Stress Management",
    name: "Workshop: Passion & Stress",
    description: "Learn practical tools for breathing, emotional decompression, and finding authentic passion.",
    price: 20,
    duration: "single",
    isVip: false,
    includes: ["Workshop 1 Access"],
    excludes: [],
    capacity: 50,
    soldCount: 0,
    wristband: "E-Ticket",
    status: "active",
    sortOrder: 2
  },
  {
    id: "Single Workshop: Mind Programming",
    name: "Workshop: Mind Programming",
    description: "An advanced session on identifying self-limiting core beliefs and replacing them with supportive cognitive patterns.",
    price: 20,
    duration: "single",
    isVip: false,
    includes: ["Workshop 2 Access"],
    excludes: [],
    capacity: 50,
    soldCount: 0,
    wristband: "E-Ticket",
    status: "active",
    sortOrder: 3
  },
  {
    id: "Double Workshop: Passion & Stress + Mind Programming",
    name: "Double Workshop Package",
    description: "Complete access to both specialized workshops for a reduced rate.",
    price: 30,
    duration: "2-day",
    isVip: true,
    badge: "Best Value",
    includes: ["Workshop 1 Access", "Workshop 2 Access"],
    excludes: [],
    capacity: 50,
    soldCount: 0,
    wristband: "E-Ticket",
    status: "active",
    sortOrder: 4
  }
];

export const EVENT_DAYS = [
  {
    id: "Friday",
    date: "July 24, 2026",
    themes: ["Food", "Beauty & Fashion", "Comedy"],
    highlights: ["Live Cooking", "Live Makeup", "Networking Event"],
    opens: "2:00 PM"
  },
  {
    id: "Saturday",
    date: "July 25, 2026",
    themes: ["Informative", "Content", "Sports", "Tourism", "Adventures"],
    highlights: ["Outdoor Activities", "Creator Workshops", "Networking"],
    opens: "11:00 AM"
  },
  {
    id: "Sunday",
    date: "July 26, 2026",
    themes: ["Family", "Story", "Mom’s Content", "Influence", "War & Impact"],
    highlights: ["Storytelling", "Influence in Crisis", "Family Zones"],
    opens: "11:00 AM"
  }
];
