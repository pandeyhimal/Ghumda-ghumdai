import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'np';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'nav.places': 'Places',
    'nav.food': 'Food',
    'nav.traditions': 'Traditions',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    
    // Hero Section
    'hero.title': 'Ghumda Ghumdai',
    'hero.subtitle': 'Travel Together, Discover More',
    'hero.description': 'Discover Nepal\'s hidden treasures through authentic local experiences. From ancient temples to traditional cuisines, embark on a journey that connects you with the heart of Nepali culture.',
    'hero.cta.explore': 'Start Exploring',
    'hero.cta.community': 'Join Community',
    'hero.stats.places': 'Hidden Places',
    'hero.stats.foods': 'Local Foods',
    'hero.stats.traditions': 'Traditions',
    
    // Search Filters
    'search.title': 'Discover Nepal',
    'search.description': 'Find amazing places, delicious food, and rich traditions',
    'search.keyword.placeholder': 'Search for places, food, traditions...',
    'search.province.placeholder': 'Select Province',
    'search.district.placeholder': 'Select District',
    'search.municipality.placeholder': 'Select Municipality',
    'search.category.placeholder': 'Select Category',
    'search.button': 'Discover Nepal',
    
    // Content Grid
    'content.title': 'Explore Nepal\'s Treasures',
    'content.description': 'Discover authentic experiences curated by locals who know Nepal best',
    'content.button': 'Explore All Content',
    'content.reviews': 'reviews',
    
    // Categories
    'category.place': 'Place',
    'category.food': 'Food',
    'category.tradition': 'Tradition',
    
    // Bookmarks
    'bookmarks.title': 'Your Bookmarked Content',
    'bookmarks.empty': 'You have no bookmarks yet.',

    // Footer
    'footer.description': 'Discover Nepal\'s hidden treasures through local experiences',
    'footer.copyright': '© 2024 Ghumda Ghumdai. Made with ❤️ for Nepal tourism.',
  },
  np: {
    // Header
    'nav.places': 'ठाउँहरू',
    'nav.food': 'खाना',
    'nav.traditions': 'परम्पराहरू',
    'nav.about': 'हाम्रो बारेमा',
    'nav.login': 'लगइन',
    'nav.signup': 'साइन अप',
    
    // Hero Section
    'hero.title': 'घुम्दा घुम्दै',
    'hero.subtitle': 'सँगै यात्रा गरौं, धेरै खोजौं',
    'hero.description': 'प्रामाणिक स्थानीय अनुभवहरूको माध्यमबाट नेपालका लुकेका खजानाहरू पत्ता लगाउनुहोस्। पुराना मन्दिरहरूदेखि परम्परागत खानाहरूसम्म, नेपाली संस्कृतिको मुटुसँग जोडिने यात्रामा निस्कनुहोस्।',
    'hero.cta.explore': 'अन्वेषण सुरु गर्नुहोस्',
    'hero.cta.community': 'समुदायमा सामेल हुनुहोस्',
    'hero.stats.places': 'लुकेका ठाउँहरू',
    'hero.stats.foods': 'स्थानीय खानाहरू',
    'hero.stats.traditions': 'परम्पराहरू',
    
    // Search Filters
    'search.title': 'नेपाल खोज्नुहोस्',
    'search.description': 'अचम्मका ठाउँहरू, स्वादिष्ट खाना र समृद्ध परम्पराहरू फेला पार्नुहोस्',
    'search.keyword.placeholder': 'ठाउँहरू, खाना, परम्पराहरू खोज्नुहोस्...',
    'search.province.placeholder': 'प्रदेश छान्नुहोस्',
    'search.district.placeholder': 'जिल्ला छान्नुहोस्',
    'search.municipality.placeholder': 'नगरपालिका छान्नुहोस्',
    'search.category.placeholder': 'श्रेणी छान्नुहोस्',
    'search.button': 'नेपाल खोज्नुहोस्',
    
    // Content Grid
    'content.title': 'नेपालका खजानाहरू अन्वेषण गर्नुहोस्',
    'content.description': 'नेपाललाई राम्ररी चिन्ने स्थानीयहरूद्वारा छानिएका प्रामाणिक अनुभवहरू पत्ता लगाउनुहोस्',
    'content.button': 'सबै सामग्री अन्वेषण गर्नुहोस्',
    'content.reviews': 'समीक्षाहरू',
    
    // Categories
    'category.place': 'ठाउँ',
    'category.food': 'खाना',
    'category.tradition': 'परम्परा',
    
    // Bookmarks
    'bookmarks.title': 'तपाईंको बुकमार्क गरिएको सामग्री',
    'bookmarks.empty': 'तपाईंको कुनै बुकमार्क छैन।',
    
    // Footer
    'footer.description': 'स्थानीय अनुभवहरूको माध्यमबाट नेपालका लुकेका खजानाहरू पत्ता लगाउनुहोस्',
    'footer.copyright': '© २०२४ घुम्दा घुम्दै। नेपाली पर्यटनको लागि ❤️ सँग बनाइएको।',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};