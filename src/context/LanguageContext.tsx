import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "sw";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    ourStory: "Our Story",
    featured: "Featured",
    testimonials: "Testimonials",
    shop: "Shop",
    
    // Cart
    cart: "Cart",
    clear: "Clear",
    checkout: "Checkout",
    subtotal: "Subtotal",
    emptyCart: "Your cart is empty.",
    yourCart: "Your Cart",
    close: "Close",
    remove: "Remove",
    
    // Hero
    artisanalSkincare: "Artisanal Skincare",
    heroTitle: "Luxury in Every Lather",
    heroSubtitle: "Refined, minimal, and meticulously crafted soaps that elevate your daily ritual.",
    shopNow: "Shop Now",
    scroll: "Scroll",
    
    // About Section
    meetTheCreators: "Meet the Creators",
    aboutParagraph1: "Dira Naturals was born from a mother-daughter passion for natural skincare. Sarah and Amelia started experimenting with cold-process soap making in their home kitchen in 2018, driven by a desire to create gentle, effective products free from harsh chemicals.",
    aboutParagraph2: "Today, every bar is still handcrafted in small batches at our workshop in Dar es Salaam, using locally sourced botanicals and time-honored techniques passed down through generations.",
    artisanalTitle: "Artisanal. Sustainable. Pure.",
    artisanalDescription: "We craft small-batch soaps using cold-process methods, botanical oils, and mineral-rich clays. Our formulas are free from synthetic dyes and harsh sulfates, designed to nourish skin and calm the senses.",
    ingredientEthical: "Ethically sourced, plant-based ingredients",
    ingredientRecyclable: "Recyclable, minimal packaging",
    ingredientNoHarmful: "No parabens, no phthalates, no silicones",
    quote: "We believe in quiet luxury—considered materials, elevated textures, and thoughtful details. Each bar is cured for weeks to achieve a gentle, creamy lather.",
    
    // Featured Section
    featuredCreations: "Featured Creations",
    featuredSubtitle: "A small preview of our favorite bars—scents that linger, textures that soothe.",
    
    // Testimonials
    testimonial1: "The only soap that feels truly indulgent—soft, creamy lather and a scent that lingers subtly.",
    testimonial2: "Minimal packaging, maximal experience. My skin feels balanced and calm.",
    testimonial3: "Quiet luxury in a bar. It transformed my morning routine.",
    
    // Footer
    footerTagline: "Luxury handmade soaps crafted with all-natural ingredients.",
    
    // Shop Page
    signatureCollection: "Signature Collection",
    signatureDescription: "Our timeless essentials — crafted for everyday luxury.",
    seasonalCollection: "Seasonal Collection",
    seasonalDescription: "Limited edition bars inspired by the changing seasons.",
    add: "Add",
    soldOut: "Sold Out",
    
    // Checkout
    customerDetails: "Customer Details",
    fullName: "Full name",
    email: "Email",
    deliveryMethod: "Delivery Method",
    homeDelivery: "Home Delivery",
    storePickup: "Store Pickup",
    payment: "Payment",
    payOnDelivery: "Pay on Delivery",
    mobileBanking: "Mobile Banking",
    deliveryAddress: "Delivery Address",
    address: "Address",
    city: "City",
    state: "State",
    zip: "ZIP",
    placeOrder: "Place Order",
    processing: "Processing…",
    orderSummary: "Order Summary",
    delivery: "Delivery",
    pickup: "Pickup",
    free: "Free",
    vat: "VAT",
    total: "Total",
    promoCode: "Promo Code",
    apply: "Apply",
    promoApplied: "Promo applied!",
    invalidCode: "Invalid code",
    discount: "Discount",
    
    // Order Confirmation
    thankYou: "Thank You for Your Order!",
    orderReceived: "Your order has been received and is being processed.",
    transactionId: "Transaction ID",
    continueShopping: "Continue Shopping",
  },
  sw: {
    // Navigation
    ourStory: "Hadithi Yetu",
    featured: "Bidhaa Bora",
    testimonials: "Ushuhuda",
    shop: "Duka",
    
    // Cart
    cart: "Kikapu",
    clear: "Futa",
    checkout: "Lipia",
    subtotal: "Jumla Ndogo",
    emptyCart: "Kikapu chako ni tupu.",
    yourCart: "Kikapu Chako",
    close: "Funga",
    remove: "Ondoa",
    
    // Hero
    artisanalSkincare: "Bidhaa za Ngozi za Asili",
    heroTitle: "Anasa katika Kila Povu",
    heroSubtitle: "Sabuni safi, za kisasa, na zilizoundwa kwa uangalifu zinazoinua desturi yako ya kila siku.",
    shopNow: "Nunua Sasa",
    scroll: "Sogeza",
    
    // About Section
    meetTheCreators: "Kutana na Waanzilishi",
    aboutParagraph1: "Dira Naturals ilizaliwa kutokana na shauku ya mama na binti kwa utunzaji wa ngozi wa asili. Sarah na Amelia walianza majaribio ya kutengeneza sabuni kwa njia ya baridi katika jikoni lao nyumbani mwaka 2018, wakiongozwa na hamu ya kuunda bidhaa laini na zenye ufanisi bila kemikali kali.",
    aboutParagraph2: "Leo, kila kipande bado kinaundwa kwa mikono kwa vikundi vidogo katika warsha yetu huko Dar es Salaam, kwa kutumia mimea inayopatikana ndani na mbinu za zamani zinazopitishwa kutoka kizazi hadi kizazi.",
    artisanalTitle: "Za Kisanaa. Endelevu. Safi.",
    artisanalDescription: "Tunaunda sabuni za vikundi vidogo kwa njia za baridi, mafuta ya mimea, na udongo wenye madini. Fomyula zetu hazina rangi za bandia na sulfate kali, zimeundwa kulisha ngozi na kutuliza hisia.",
    ingredientEthical: "Viungo vya mimea vilivyopatikana kwa njia ya maadili",
    ingredientRecyclable: "Ufungaji unaoweza kusindikwa tena, mdogo",
    ingredientNoHarmful: "Hakuna parabeni, hakuna phthalates, hakuna silikoni",
    quote: "Tunaamini katika anasa ya utulivu—vifaa vilivyozingatiwa, muundo ulioboreshwa, na maelezo yenye kufikiria. Kila kipande kinakaushwa kwa wiki kufikia povu laini na lenye krimu.",
    
    // Featured Section
    featuredCreations: "Bidhaa Bora",
    featuredSubtitle: "Muhtasari mdogo wa vipande vyetu tunavyopenda zaidi—harufu zinazobaki, muundo unaotuliza.",
    
    // Testimonials
    testimonial1: "Sabuni pekee inayohisi kuwa ya anasa kweli—povu laini na lenye krimu na harufu inayobaki kwa upole.",
    testimonial2: "Ufungaji mdogo, uzoefu mkubwa. Ngozi yangu inahisi kuwa na usawa na utulivu.",
    testimonial3: "Anasa ya utulivu katika kipande. Ilibadilisha desturi yangu ya asubuhi.",
    
    // Footer
    footerTagline: "Sabuni za anasa zilizotengenezwa kwa mkono na viungo vya asili.",
    
    // Shop Page
    signatureCollection: "Mkusanyiko wa Saini",
    signatureDescription: "Bidhaa zetu za kudumu — zilizotengenezwa kwa anasa ya kila siku.",
    seasonalCollection: "Mkusanyiko wa Msimu",
    seasonalDescription: "Vipande vya toleo la muda mfupi vilivyoongozwa na msimu unaobadilika.",
    add: "Ongeza",
    soldOut: "Imeuzwa",
    
    // Checkout
    customerDetails: "Maelezo ya Mteja",
    fullName: "Jina kamili",
    email: "Barua pepe",
    deliveryMethod: "Njia ya Uwasilishaji",
    homeDelivery: "Uwasilishaji Nyumbani",
    storePickup: "Kuchukua Dukani",
    payment: "Malipo",
    payOnDelivery: "Lipa Uwasilishaji",
    mobileBanking: "Benki ya Simu",
    deliveryAddress: "Anwani ya Uwasilishaji",
    address: "Anwani",
    city: "Jiji",
    state: "Mkoa",
    zip: "Nambari ya Posta",
    placeOrder: "Weka Oda",
    processing: "Inashughulikiwa…",
    orderSummary: "Muhtasari wa Oda",
    delivery: "Uwasilishaji",
    pickup: "Kuchukua",
    free: "Bure",
    vat: "Kodi",
    total: "Jumla",
    promoCode: "Msimbo wa Punguzo",
    apply: "Tumia",
    promoApplied: "Punguzo limetumika!",
    invalidCode: "Msimbo batili",
    discount: "Punguzo",
    
    // Order Confirmation
    thankYou: "Asante kwa Oda Yako!",
    orderReceived: "Oda yako imepokelewa na inashughulikiwa.",
    transactionId: "Nambari ya Muamala",
    continueShopping: "Endelea Kununua",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "sw" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
