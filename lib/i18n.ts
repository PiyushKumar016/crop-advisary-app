export type Language = "en" | "hi"

export interface Translations {
  // Navigation & Common
  login: string
  register: string
  getStarted: string
  dashboard: string
  profile: string
  logout: string
  back: string
  next: string
  submit: string
  cancel: string
  save: string
  loading: string
  error: string
  success: string

  // Homepage
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  watchDemo: string
  featuresTitle: string
  featuresSubtitle: string
  voiceAssistant: string
  voiceAssistantDesc: string
  marketAccess: string
  marketAccessDesc: string
  smartAdvisory: string
  smartAdvisoryDesc: string
  multilingual: string
  multilingualDesc: string
  governmentSchemes: string
  governmentSchemesDesc: string
  mobileFirst: string
  mobileFirstDesc: string
  ctaTitle: string
  ctaDescription: string
  startJourney: string
  footerTagline: string

  // Dashboard
  welcomeBack: string
  todaysWeather: string
  activeListings: string
  monthlyRevenue: string
  aiInteractions: string
  recentActivity: string

  // AI Assistant
  aiAssistantTitle: string
  askQuestion: string
  listening: string
  processing: string
  speakYourQuestion: string
  typeYourQuestion: string
  quickQuestions: string

  // Marketplace
  marketplace: string
  sellProducts: string
  myCart: string
  searchProducts: string
  filterByCategory: string
  addToCart: string
  buyNow: string
  contactFarmer: string

  // Advisory
  advisory: string
  weatherForecast: string
  cropHealth: string
  farmingTips: string
  alerts: string

  // Government Schemes
  schemes: string
  browseSchemes: string
  eligibility: string
  applyNow: string
  applicationStatus: string

  // Forms
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phoneNumber: string
  farmLocation: string
  farmSize: string
  cropTypes: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation & Common
    login: "Login",
    register: "Register",
    getStarted: "Get Started",
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",
    back: "Back",
    next: "Next",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    loading: "Loading...",
    error: "Error",
    success: "Success",

    // Homepage
    heroTitle: "Your Digital Farming Companion",
    heroSubtitle: "AI-Powered Farming Assistant",
    heroDescription:
      "Voice-powered AI assistant, direct market access, and real-time advisory - all in one simple platform designed for modern farmers.",
    watchDemo: "Watch Demo",
    featuresTitle: "Everything You Need in One Place",
    featuresSubtitle: "Comprehensive tools designed specifically for modern farming needs",
    voiceAssistant: "Voice Assistant",
    voiceAssistantDesc:
      "Ask questions in your language, get instant answers with voice responses powered by advanced AI",
    marketAccess: "Direct Market Access",
    marketAccessDesc:
      "Sell directly to buyers, skip middlemen, get better prices for your crops with transparent pricing",
    smartAdvisory: "Smart Advisory",
    smartAdvisoryDesc:
      "Get personalized farming advice, weather updates, and crop health insights tailored to your farm",
    multilingual: "Multilingual Support",
    multilingualDesc:
      "Available in Hindi, English, and regional languages for seamless communication and accessibility",
    governmentSchemes: "Government Schemes",
    governmentSchemesDesc:
      "Stay updated on latest schemes, subsidies, and support programs with easy application tracking",
    mobileFirst: "Mobile-First Design",
    mobileFirstDesc: "Works perfectly on any device, optimized for low bandwidth, with an intuitive interface",
    ctaTitle: "Ready to Transform Your Farming?",
    ctaDescription:
      "Join thousands of farmers already using KisanSeva to grow their business and increase their income",
    startJourney: "Start Your Journey Today",
    footerTagline: "Empowering farmers with technology for a sustainable and prosperous future",

    // Dashboard
    welcomeBack: "Welcome back!",
    todaysWeather: "Today's Weather",
    activeListings: "Active Listings",
    monthlyRevenue: "Monthly Revenue",
    aiInteractions: "AI Interactions",
    recentActivity: "Recent Activity",

    // AI Assistant
    aiAssistantTitle: "AI Farming Assistant",
    askQuestion: "Ask a Question",
    listening: "Listening...",
    processing: "Processing...",
    speakYourQuestion: "Speak your question",
    typeYourQuestion: "Type your question here...",
    quickQuestions: "Quick Questions",

    // Marketplace
    marketplace: "Marketplace",
    sellProducts: "Sell Products",
    myCart: "My Cart",
    searchProducts: "Search products...",
    filterByCategory: "Filter by Category",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    contactFarmer: "Contact Farmer",

    // Advisory
    advisory: "Advisory",
    weatherForecast: "Weather Forecast",
    cropHealth: "Crop Health",
    farmingTips: "Farming Tips",
    alerts: "Alerts",

    // Government Schemes
    schemes: "Government Schemes",
    browseSchemes: "Browse Schemes",
    eligibility: "Eligibility",
    applyNow: "Apply Now",
    applicationStatus: "Application Status",

    // Forms
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    farmLocation: "Farm Location",
    farmSize: "Farm Size",
    cropTypes: "Crop Types",
  },
  hi: {
    // Navigation & Common
    login: "लॉगिन",
    register: "पंजीकरण",
    getStarted: "शुरू करें",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    logout: "लॉगआउट",
    back: "वापस",
    next: "आगे",
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सेव करें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",

    // Homepage
    heroTitle: "आपका डिजिटल खेती साथी",
    heroSubtitle: "AI-संचालित खेती सहायक",
    heroDescription:
      "आवाज-संचालित AI सहायक, सीधी बाजार पहुंच, और वास्तविक समय सलाह - सब कुछ एक सरल प्लेटफॉर्म में जो आधुनिक किसानों के लिए डिज़ाइन किया गया है।",
    watchDemo: "डेमो देखें",
    featuresTitle: "सब कुछ एक जगह",
    featuresSubtitle: "आधुनिक खेती की जरूरतों के लिए विशेष रूप से डिज़ाइन किए गए व्यापक उपकरण",
    voiceAssistant: "आवाज सहायक",
    voiceAssistantDesc: "अपनी भाषा में प्रश्न पूछें, उन्नत AI द्वारा संचालित आवाज प्रतिक्रियाओं के साथ तुरंत उत्तर प्राप्त करें",
    marketAccess: "सीधी बाजार पहुंच",
    marketAccessDesc: "सीधे खरीदारों को बेचें, बिचौलियों को छोड़ें, पारदर्शी मूल्य निर्धारण के साथ अपनी फसलों के लिए बेहतर कीमत पाएं",
    smartAdvisory: "स्मार्ट सलाह",
    smartAdvisoryDesc: "अपने खेत के अनुकूल व्यक्तिगत खेती सलाह, मौसम अपडेट, और फसल स्वास्थ्य अंतर्दृष्टि प्राप्त करें",
    multilingual: "बहुभाषी समर्थन",
    multilingualDesc: "निर्बाध संचार और पहुंच के लिए हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं में उपलब्ध",
    governmentSchemes: "सरकारी योजनाएं",
    governmentSchemesDesc: "आसान आवेदन ट्रैकिंग के साथ नवीनतम योजनाओं, सब्सिडी और सहायता कार्यक्रमों पर अपडेट रहें",
    mobileFirst: "मोबाइल-फर्स्ट डिज़ाइन",
    mobileFirstDesc: "किसी भी डिवाइस पर पूर्ण रूप से काम करता है, कम बैंडविड्थ के लिए अनुकूलित, सहज इंटरफेस के साथ",
    ctaTitle: "अपनी खेती को बदलने के लिए तैयार हैं?",
    ctaDescription: "हजारों किसान पहले से ही KisanSeva का उपयोग करके अपना व्यवसाय बढ़ा रहे हैं और अपनी आय बढ़ा रहे हैं",
    startJourney: "आज ही अपनी यात्रा शुरू करें",
    footerTagline: "एक स्थायी और समृद्ध भविष्य के लिए प्रौद्योगिकी के साथ किसानों को सशक्त बनाना",

    // Dashboard
    welcomeBack: "वापस स्वागत है!",
    todaysWeather: "आज का मौसम",
    activeListings: "सक्रिय सूचियां",
    monthlyRevenue: "मासिक आय",
    aiInteractions: "AI इंटरैक्शन",
    recentActivity: "हाल की गतिविधि",

    // AI Assistant
    aiAssistantTitle: "AI खेती सहायक",
    askQuestion: "प्रश्न पूछें",
    listening: "सुन रहा है...",
    processing: "प्रसंस्करण...",
    speakYourQuestion: "अपना प्रश्न बोलें",
    typeYourQuestion: "यहाँ अपना प्रश्न टाइप करें...",
    quickQuestions: "त्वरित प्रश्न",

    // Marketplace
    marketplace: "बाजार",
    sellProducts: "उत्पाद बेचें",
    myCart: "मेरी गाड़ी",
    searchProducts: "उत्पाद खोजें...",
    filterByCategory: "श्रेणी के अनुसार फ़िल्टर करें",
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें",
    contactFarmer: "किसान से संपर्क करें",

    // Advisory
    advisory: "सलाह",
    weatherForecast: "मौसम पूर्वानुमान",
    cropHealth: "फसल स्वास्थ्य",
    farmingTips: "खेती के टिप्स",
    alerts: "अलर्ट",

    // Government Schemes
    schemes: "सरकारी योजनाएं",
    browseSchemes: "योजनाएं ब्राउज़ करें",
    eligibility: "पात्रता",
    applyNow: "अभी आवेदन करें",
    applicationStatus: "आवेदन स्थिति",

    // Forms
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    phoneNumber: "फोन नंबर",
    farmLocation: "खेत का स्थान",
    farmSize: "खेत का आकार",
    cropTypes: "फसल के प्रकार",
  },
}

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key] || translations.en[key]
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("language") as Language) || "en"
  }
  return "en"
}

export function setLanguage(language: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language)
    window.dispatchEvent(new CustomEvent("languageChange", { detail: language }))
  }
}
