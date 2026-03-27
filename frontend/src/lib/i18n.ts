import type { Language } from "../types";

const dict = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    alerts: "Alerts",
    rewards: "Rewards",
    settings: "Settings",
    take: "Take",
    voicePrompt: "Tap and ask: medicine li kya?",
  },
  hi: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    alerts: "अलर्ट",
    rewards: "रिवॉर्ड्स",
    settings: "सेटिंग्स",
    take: "ले लिया",
    voicePrompt: "पूछें: medicine li kya?",
  },
  mr: {
    home: "होम",
    dashboard: "डॅशबोर्ड",
    alerts: "अलर्ट",
    rewards: "बक्षीस",
    settings: "सेटिंग्स",
    take: "घेतले",
    voicePrompt: "विचारा: medicine li kya?",
  },
};

export const t = (lang: Language, key: keyof (typeof dict)["en"]) => dict[lang][key];
