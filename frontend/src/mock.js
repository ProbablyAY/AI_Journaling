// Mock data for EchoDiary app

export const mockStats = {
  activeUsers: "3,200+",
  pagesWritten: "185,000+",
  encryptionRate: "100%"
};

export const mockPrompts = [
  "What surprised you today?",
  "How did you feel after work/school?",
  "Did anything not go as planned?",
  "Tell me about a moment that made you smile today",
  "What's been on your mind lately?",
  "How are you feeling right now?"
];

export const mockTranscript = [
  "Well, today was actually pretty interesting...",
  "I had this meeting with my team and we finally solved that problem we've been working on for weeks.",
  "It felt really good to see everything click into place.",
  "But then on my way home, I got stuck in traffic for like an hour.",
  "It gave me time to think though, which was nice."
];

export const mockEntries = [
  {
    id: "1",
    date: "2025-01-15",
    mood: "Reflective",
    preview: "Today was actually pretty interesting. I had this meeting with my team and we finally solved that problem...",
    duration: "8 min",
    tags: ["work", "achievement", "reflection"]
  },
  {
    id: "2", 
    date: "2025-01-14",
    mood: "Grateful",
    preview: "I've been thinking about how much I appreciate the small moments in life. Like this morning when I had coffee...",
    duration: "12 min",
    tags: ["gratitude", "morning", "mindfulness"]
  },
  {
    id: "3",
    date: "2025-01-13", 
    mood: "Excited",
    preview: "I can't believe I finally booked that trip I've been planning. It feels so good to have something to look forward to...",
    duration: "6 min",
    tags: ["travel", "planning", "excitement"]
  },
  {
    id: "4",
    date: "2025-01-12",
    mood: "Contemplative", 
    preview: "Been reflecting on the conversation I had with my friend yesterday. Sometimes you need someone to help you see things...",
    duration: "15 min",
    tags: ["friendship", "perspective", "growth"]
  }
];

export const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  plan: "Free",
  joinedDate: "January 2025"
};

export const pricingPlans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "forever",
    features: [
      "7 days of stored entries",
      "AI conversation journaling", 
      "Basic transcription",
      "No exports"
    ],
    popular: false
  },
  {
    name: "Standard", 
    price: "$10",
    period: "month",
    features: [
      "365 days of entries",
      "Monthly PDF/Word exports",
      "Better AI-generated summaries",
      "Mood tracking"
    ],
    popular: true
  },
  {
    name: "Pro",
    price: "$30", 
    period: "month",
    features: [
      "Unlimited entries",
      "Insight trends & tone analysis",
      "Auto-backup & sync",
      "Priority support"
    ],
    popular: false
  }
];