import type { Language } from "../types";

const dict = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    alerts: "Alerts",
    rewards: "Rewards",
    settings: "Settings",

    voicePrompt: "Tap and ask: medicine li kya?",
    listening: "Listening...",
    tapToSpeak: "Tap to Speak",
    askWhichMedicineToTakeNext: "Ask which medicine to take next",
    active: "Active",
    voice: "Voice",

    streak: "Streak",
    needsAttention: "Needs attention",
    allDone: "All done",
    stayOnTrack: "Stay on track",
    today: "Today",

    completion: "Completion",
    nextDose: "Next dose",
    leftToday: "Left today",
    nothingPending: "Nothing pending",
    enjoyCalmDay: "Enjoy a calm day.",
    noMedicinesScheduled: "No medicines scheduled",
    askCaretakerAddPlan: "Ask the caretaker side to add today's plan.",
    todaysMedicines: "Today's medicines",
    tapToMarkTaken: "Tap the button when a pill is taken.",
    loadingMedicines: "Loading medicines...",

    doseFallback: "Dose",

    oneDoseOverdue: "One dose is overdue",
    greatWorkToday: "Great work today",
    tapAlertButtonForHelp: "Tap the alert button if you need help with a missed dose.",
    allMedicinesComplete: "All medicines for today are complete.",
    nextDoseAt: "Next dose at {time}.",

    keepChainGoing: "Keep the chain going",
    noMisses: "No misses",
    total: "total",

    sosFromPatientCritical: "SOS from the patient screen. A critical dose was missed.",
    sosSent: "SOS sent to caretaker.",
    canNotSendSOS: "Could not send SOS right now.",
    noUrgentAlert: "No urgent alert right now.",

    alertCaretakerMock: "Alert Caretaker (Mock)",

    take: "Tap to Mark as Taken",
    taken: "Taken",
    missed: "Missed",
    upcoming: "Upcoming",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",

    sosCta: "SOS - Alert Caretaker",

    emergency: "Emergency",
    backToStart: "Back to start",
    patientSide: "Patient side",
    caretakerSide: "Caretaker side",

    patientHeroTitle: "Check doses and reach your caretaker fast",
    caretakerHeroTitle: "Manage medicines and keep watch",
    patientHeroCopy:
      "Patient mode keeps the medicine editor hidden. Use the home screen for tracking and this page for alerts.",
    caretakerHeroCopy: "Add medicines, review the feed, and stay ahead of missed doses.",

    caretakerFeedTitle: "Alerts",
    caretakerFeedEmpty: "No new alerts. You are all set.",
    new: "NEW",

    manageMedicines: "Manage medicines",
    manageMedicinesCopy: "Add or edit a medicine with one time and one label.",
    addMedicine: "Add Medicine",
    updateMedicine: "Update Medicine",

    securityStatus: "Security Status",
    securityCopy: "Core protections are in place for a safe caregiver workflow.",
    roleSelectionEnabled: "Role selection enabled",
    caretakerCodeGate: "Caretaker code gate",
    httpsOnDeployment: "HTTPS on deployment",

    language: "Language",
    pickLanguage: "Pick the language that feels easiest to read and speak.",
    forSimpleNavigation: "For simple navigation",
    useHindiPrompts: "Use Hindi prompts",
    useMarathiPrompts: "Use Marathi prompts",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",

    loginTitle: "OTP Login",
    phoneNumberPlaceholder: "+91 phone number",
    otpPlaceholder: "OTP",
    verify: "Verify",

    consistency: "Consistency",
    dayStreak: "Day Streak",
    pointsEarned: "points earned",
    nextGoal: "Next goal",
    youAreWayToNext: "You are {progress}% of the way to the next reward milestone.",

    badges: "Badges",
    unlockMilestones: "Unlock milestones as your consistency grows.",

    pointsProgress: "Points Progress",
    quickLookRewards: "A quick look at how rewards build over time.",

    adherence: "Adherence",
    takenCard: "Taken",
    missedCard: "Missed",
    heatmap30: "30-Day Heatmap",
    weeklyTrend: "Weekly Trend",
    takenVsMissed: "Taken vs Missed",
    loadingAIInsights: "Loading AI insights...",
  },
  hi: {
    home: "होम",
    dashboard: "डैशबोर्ड",
    alerts: "अलर्ट",
    rewards: "रिवॉर्ड्स",
    settings: "सेटिंग्स",

    voicePrompt: "टैप करें और पूछें: medicine li kya?",
    listening: "सुन रहा है...",
    tapToSpeak: "बोलने के लिए टैप करें",
    askWhichMedicineToTakeNext: "अगली दवा कौन सी है पूछें",
    active: "सक्रिय",
    voice: "आवाज़",

    streak: "स्ट्रीक",
    needsAttention: "ध्यान चाहिए",
    allDone: "सब हो गया",
    stayOnTrack: "ट्रैक पर रहें",
    today: "आज",

    completion: "पूरा होना",
    nextDose: "अगली दवा",
    leftToday: "आज बाकी",
    nothingPending: "कुछ बाकी नहीं",
    enjoyCalmDay: "शांत दिन का आनंद लें।",
    noMedicinesScheduled: "आज दवाएँ तय नहीं हैं",
    askCaretakerAddPlan: "केयरटेकर से आज का प्लान जोड़ने को कहें।",
    todaysMedicines: "आज की दवाएँ",
    tapToMarkTaken: "गोल्ली लेने पर बटन टैप करें।",
    loadingMedicines: "दवाएँ लोड हो रही हैं...",
    doseFallback: "डोज़",

    oneDoseOverdue: "एक डोज़ देर से है",
    greatWorkToday: "आज बहुत अच्छा काम",
    tapAlertButtonForHelp: "मिस हुई दवा के लिए मदद चाहिए तो अलर्ट बटन टैप करें।",
    allMedicinesComplete: "आज की सारी दवाएँ पूरी हो गई हैं।",
    nextDoseAt: "अगली दवा {time} पर है।",

    keepChainGoing: "चेन बनाए रखें",
    noMisses: "कोई छूट नहीं",
    total: "कुल",

    sosFromPatientCritical: "पेशेंट स्क्रीन से SOS। एक जरूरी डोज़ छूट गई।",
    sosSent: "केयरटेकर को SOS भेजा गया।",
    canNotSendSOS: "अभी SOS नहीं भेज पाये।",
    noUrgentAlert: "अभी कोई जरूरी अलर्ट नहीं है।",

    alertCaretakerMock: "केयरटेकर को अलर्ट (मॉक)",

    take: "लिया हुआ बताने के लिए टैप करें",
    taken: "लिया",
    missed: "छूटा",
    upcoming: "आने वाला",
    cancel: "कैंसल",
    edit: "एडिट",
    delete: "डिलीट",

    sosCta: "SOS - केयरटेकर को सूचित करें",

    emergency: "इमरजेंसी",
    backToStart: "शुरुआत पर वापस",
    patientSide: "पेशेंट साइड",
    caretakerSide: "केयरटेकर साइड",

    patientHeroTitle: "दवाएँ देखें और केयरटेकर को जल्दी बताएं",
    caretakerHeroTitle: "दवाएँ मैनेज करें और ध्यान रखें",
    patientHeroCopy:
      "पेशेंट मोड में दवाएँ एडिट नहीं दिखेंगी। ट्रैकिंग के लिए होम और अलर्ट के लिए ये पेज इस्तेमाल करें।",
    caretakerHeroCopy: "दवाएँ जोड़ें, फीड देखें, और छूटने से पहले रहें।",

    caretakerFeedTitle: "अलर्ट",
    caretakerFeedEmpty: "कोई नया अलर्ट नहीं। आप बिल्कुल तैयार हैं।",
    new: "नया",

    manageMedicines: "दवाएँ मैनेज करें",
    manageMedicinesCopy: "एक समय और एक लेबल के साथ दवा जोड़ें/बदलें।",
    addMedicine: "दवा जोड़ें",
    updateMedicine: "दवा अपडेट करें",

    securityStatus: "सुरक्षा स्थिति",
    securityCopy: "सेफ केयरटेकर वर्कफ्लो के लिए मुख्य सुरक्षा मौजूद है।",
    roleSelectionEnabled: "Role selection enabled",
    caretakerCodeGate: "Caretaker code gate",
    httpsOnDeployment: "HTTPS on deployment",

    language: "भाषा",
    pickLanguage: "वो भाषा चुनें जो पढ़ने और बोलने में सबसे आसान लगे।",
    forSimpleNavigation: "आसान नेविगेशन के लिए",
    useHindiPrompts: "Hindi prompts उपयोग करें",
    useMarathiPrompts: "Marathi prompts उपयोग करें",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",

    loginTitle: "OTP लॉगिन",
    phoneNumberPlaceholder: "+91 फोन नंबर",
    otpPlaceholder: "OTP",
    verify: "वेरिफाई",

    consistency: "कंसिस्टेंसी",
    dayStreak: "दिन स्ट्रीक",
    pointsEarned: "points earned",
    nextGoal: "अगला लक्ष्य",
    youAreWayToNext: "आप अगले रिवार्ड माइलस्टोन तक {progress}% पहुँचे हैं।",

    badges: "बैज",
    unlockMilestones: "जैसे आपकी कंसिस्टेंसी बढ़ती है, माइलस्टोन अनलॉक होते जाएंगे।",

    pointsProgress: "अंक प्रोग्रेस",
    quickLookRewards: "समय के साथ रिवार्ड्स कैसे बनते हैं, जल्दी देखें।",

    adherence: "एड्हीयरेंस",
    takenCard: "लिया",
    missedCard: "छूटा",
    heatmap30: "30-दिन Heatmap",
    weeklyTrend: "साप्ताहिक ट्रेंड",
    takenVsMissed: "लिया बनाम छूटा",
    loadingAIInsights: "AI insights लोड हो रहा है...",
  },
  mr: {
    home: "होम",
    dashboard: "डॅशबोर्ड",
    alerts: "अलर्ट",
    rewards: "बक्षीस",
    settings: "सेटिंग्ज",

    voicePrompt: "टॅप करा आणि विचारा: medicine li kya?",
    listening: "ऐकत आहे...",
    tapToSpeak: "बोलण्यासाठी टॅप करा",
    askWhichMedicineToTakeNext: "पुढची औषध कोणती विचार करा",
    active: "सक्रिय",
    voice: "आवाज",

    streak: "स्ट्रीक",
    needsAttention: "लक्ष द्या",
    allDone: "सगळं पूर्ण",
    stayOnTrack: "ट्रॅकवर राहा",
    today: "आज",

    completion: "पूर्णता",
    nextDose: "पुढील डोस",
    leftToday: "आज उरलेलं",
    nothingPending: "काही बाकी नाही",
    enjoyCalmDay: "तणावमुक्त दिवस एन्जॉय करा.",
    noMedicinesScheduled: "आज औषधे शेड्यूल नाहीत",
    askCaretakerAddPlan: "केअरटेकरला आजचा प्लॅन जोडायला सांगा.",
    todaysMedicines: "आजची औषधे",
    tapToMarkTaken: "गोळी घेतल्यावर बटन टॅप करा.",
    loadingMedicines: "औषधे लोड होत आहेत...",
    doseFallback: "डोज़",

    oneDoseOverdue: "एक डोस उशीर झाला आहे",
    greatWorkToday: "आज छान काम",
    tapAlertButtonForHelp: "मिस झालेल्या डोससाठी मदत हवी असेल तर अलर्ट बटन टॅप करा.",
    allMedicinesComplete: "आजची सगळी औषधे पूर्ण झाली आहेत.",
    nextDoseAt: "पुढील डोस {time} ला.",

    keepChainGoing: "चेन कायम ठेवा",
    noMisses: "मिस नाही",
    total: "एकूण",

    sosFromPatientCritical: "पेशंट स्क्रीनवरून SOS. एक महत्वाचा डोस मिस झाला.",
    sosSent: "केअरटेकरला SOS पाठवला.",
    canNotSendSOS: "आत्ता SOS पाठवता आले नाही.",
    noUrgentAlert: "आत्ता कोणताही तातडीचा अलर्ट नाही.",

    alertCaretakerMock: "केअरटेकरला अलर्ट (मॉक)",

    take: "घेतले म्हणून टॅप करा",
    taken: "घेतले",
    missed: "मिस",
    upcoming: "येणारा",
    cancel: "कॅन्सल",
    edit: "एडिट",
    delete: "डिलीट",

    sosCta: "SOS - केअरटेकरला कळवा",

    emergency: "इमरजन्सी",
    backToStart: "मागे सुरुवातीला",
    patientSide: "पेशंट साइड",
    caretakerSide: "केअरटेकर साइड",

    patientHeroTitle: "डोस पाहा आणि पटकन केअरटेकरला कळवा",
    caretakerHeroTitle: "औषधे व्यवस्थापित करा आणि लक्ष ठेवा",
    patientHeroCopy:
      "पेशंट मोडमध्ये औषध एडिटर लपलेला असतो. ट्रॅकिंगसाठी होम आणि अलर्टसाठी हा पेज वापरा.",
    caretakerHeroCopy: "औषधे जोडा, फीड पहा, आणि मिस होण्याआधी पुढे रहा.",

    caretakerFeedTitle: "अलर्ट",
    caretakerFeedEmpty: "नवीन अलर्ट नाही. तुम्ही सगळे तयार आहात.",
    new: "नवीन",

    manageMedicines: "औषधे व्यवस्थापित करा",
    manageMedicinesCopy: "एक वेळ आणि एक लेबलसह औषध जोडा/बदल करा.",
    addMedicine: "औषध जोडा",
    updateMedicine: "औषध अपडेट करा",

    securityStatus: "सुरक्षा स्थिती",
    securityCopy: "सेफ केअरटेकर वर्कफ्लोसाठी मुख्य सुरक्षा आहे.",
    roleSelectionEnabled: "Role selection enabled",
    caretakerCodeGate: "Caretaker code gate",
    httpsOnDeployment: "HTTPS on deployment",

    language: "भाषा",
    pickLanguage: "वाचायला आणि बोलायला सर्वात सोपी वाटणारी भाषा निवडा.",
    forSimpleNavigation: "सोपी नेव्हिगेशनसाठी",
    useHindiPrompts: "हिंदी प्रॉम्प्ट्स वापरा",
    useMarathiPrompts: "मराठी प्रॉम्प्ट्स वापरा",
    english: "English",
    hindi: "हिंदी",
    marathi: "मराठी",

    loginTitle: "OTP लॉगिन",
    phoneNumberPlaceholder: "+91 फोन नंबर",
    otpPlaceholder: "OTP",
    verify: "व्हेरिफाय",

    consistency: "कन्सिस्टन्सी",
    dayStreak: "दिवस स्ट्रीक",
    pointsEarned: "points earned",
    nextGoal: "पुढचे लक्ष्य",
    youAreWayToNext: "पुढच्या बक्षीस माइलस्टोनपर्यंत तुम्ही {progress}% पोहोचलात.",

    badges: "बॅजेस",
    unlockMilestones: "कन्सिस्टन्सी वाढत जाईल तशी माइलस्टोन्स अनलॉक होतील.",

    pointsProgress: "अंक प्रोग्रेस",
    quickLookRewards: "वेळेनुसार रिवार्ड्स कसे वाढतात ते जलद बघा.",

    adherence: "एड्हीयरेंस",
    takenCard: "घेतले",
    missedCard: "मिस",
    heatmap30: "30-दिवस Heatmap",
    weeklyTrend: "साप्ताहिक ट्रेंड",
    takenVsMissed: "घेतले विरुद्ध मिस",
    loadingAIInsights: "AI insights लोड होत आहे...",
  },
} satisfies Record<Language, Record<string, string>>;

export type I18nKey = keyof typeof dict.en;

export function t(lang: Language, key: I18nKey, vars?: Record<string, string | number>) {
  let text = dict[lang][key] ?? dict.en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.split(`{${k}}`).join(String(v));
    }
  }
  return text;
}
