export const sessions = [
  {
    id: "sess-1001",
    name: "Andi Pratama",
    msisdn: "+62812-1000-001",
    agent: "Support Assistant",
    lastMessage: "Can you help reset my package?",
    status: "open",
    updatedAt: "2026-04-27 13:05",
  },
  {
    id: "sess-1002",
    name: "Siti Rahma",
    msisdn: "+62812-1000-002",
    agent: "Sales Assistant",
    lastMessage: "What promo is available this week?",
    status: "open",
    updatedAt: "2026-04-27 12:46",
  },
  {
    id: "sess-1003",
    name: "Budi Santoso",
    msisdn: "+62812-1000-003",
    agent: "Retention Bot",
    lastMessage: "I want to cancel my subscription.",
    status: "closed",
    updatedAt: "2026-04-27 11:38",
  },
];

export const sessionMessagesById = {
  "sess-1001": [
    { id: 1, sender: "user", text: "Hi, I need help with my package.", time: "13:01" },
    { id: 2, sender: "bot", text: "Sure, I can help. Can you share your package name?", time: "13:02" },
    { id: 3, sender: "user", text: "Family Plus 20GB.", time: "13:03" },
    { id: 4, sender: "bot", text: "Thanks. I found the reset option. Want me to proceed?", time: "13:04" },
    { id: 5, sender: "user", text: "Yes please proceed.", time: "13:05" },
    { id: 6, sender: "bot", text: "Done. Your quota reset is in progress.", time: "13:06" },
    { id: 7, sender: "user", text: "How long does it take?", time: "13:06" },
    { id: 8, sender: "bot", text: "Usually around 1–3 minutes.", time: "13:07" },
    { id: 9, sender: "user", text: "Can I keep my rollover quota?", time: "13:07" },
    { id: 10, sender: "bot", text: "Yes, rollover quota is not affected by reset.", time: "13:08" },
    { id: 11, sender: "user", text: "Great, thank you.", time: "13:08" },
    { id: 12, sender: "bot", text: "You're welcome. Anything else I can help with?", time: "13:09" },
    { id: 13, sender: "user", text: "No, that's all for now.", time: "13:09" },
    { id: 14, sender: "bot", text: "Noted. Have a nice day!", time: "13:10" },
    { id: 15, sender: "user", text: "You too!", time: "13:10" },
  ],
  "sess-1002": [
    { id: 1, sender: "user", text: "Any weekend promo?", time: "12:40" },
    { id: 2, sender: "bot", text: "Yes, we have 30% data booster promo today.", time: "12:41" },
    { id: 3, sender: "user", text: "Can I activate from app?", time: "12:42" },
    { id: 4, sender: "bot", text: "Yes, open Packages > Booster > Activate.", time: "12:43" },
  ],
  "sess-1003": [
    { id: 1, sender: "user", text: "Please cancel my subscription.", time: "11:32" },
    { id: 2, sender: "bot", text: "I can help with that. May I know your reason?", time: "11:33" },
    { id: 3, sender: "user", text: "Too expensive.", time: "11:34" },
    { id: 4, sender: "bot", text: "Understood. I can offer a retention package before canceling.", time: "11:36" },
  ],
};

export const sessionMessages = sessionMessagesById["sess-1001"];
