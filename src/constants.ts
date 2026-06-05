import { TicketTier } from "./types";

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "ga-single",
    name: "General Admission — Single Day",
    description: "Perfect for a focused dive into the Roots & Reach experience.",
    price: 20,
    duration: "single",
    isVip: false,
    includes: [
      "Access to all open festival zones for one full day",
      "Main Stage",
      "Exhibition Area",
      "Platform Village",
      "Food Court",
      "Comedy Theater (general seating)",
      "Playground & Interactive Experiences"
    ],
    excludes: [
      "Conference Hall panels",
      "Workshops and masterclasses",
      "VIP Lounge",
      "Speaker meetups",
      "Comedy Theater front-row seating"
    ],
    capacity: 1000,
    soldCount: 0,
    wristband: "Green wristband",
    status: "active",
    sortOrder: 1
  },
  {
    id: "ga-3day",
    name: "General Admission — 3-Day Pass",
    description: "The full festival energy across the entire weekend.",
    price: 30,
    duration: "3-day",
    isVip: false,
    badge: "Best Value",
    includes: [
      "Same access as GA Single Day across all three days",
      "Continuous access without daily repurchase",
      "Valid for all open festival zones throughout the full event"
    ],
    excludes: [
      "Conference Hall panels",
      "Workshops and masterclasses",
      "VIP Lounge",
      "Speaker meetups",
      "Comedy Theater front-row seating"
    ],
    capacity: 500,
    soldCount: 0,
    wristband: "Green wristband with 3-day identifier sticker",
    status: "active",
    sortOrder: 2
  },
  {
    id: "vip-single",
    name: "VIP Pass — Single Day",
    description: "A premium one-day experience with exclusive access and comfort.",
    price: 45,
    duration: "single",
    isVip: true,
    includes: [
      "Full event access for one day",
      "Conference Hall access",
      "All panels and workshops",
      "VIP Lounge access",
      "Speaker meetup sessions",
      "VIP catering",
      "Reserved front-row seating at Main Stage"
    ],
    excludes: [],
    capacity: 100,
    soldCount: 0,
    wristband: "Gold day-marked wristband",
    status: "active",
    sortOrder: 3
  },
  {
    id: "vip-3day",
    name: "VIP Pass — Full Festival (3 Days)",
    description: "The ultimate Roots & Reach immersion. Limited and exclusive.",
    price: 90,
    duration: "3-day",
    isVip: true,
    badge: "Most Popular",
    includes: [
      "Full unrestricted access across all three festival days",
      "All panels, workshops, and Conference Hall sessions",
      "VIP Lounge access throughout the event",
      "Speaker meetup sessions",
      "VIP catering included",
      "Front-row reserved seating throughout the event",
      "Branded welcome kit: tote bag, lanyard, notebook, and event merchandise"
    ],
    excludes: [],
    capacity: 200,
    soldCount: 0,
    wristband: "Premium Gold wristband",
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
