"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SacredImage } from "@/components/ui/SacredImage";
import type { SiteSettings } from "@/types";

const teachings = [
  "निरंतर नाम-जप करें: अपने दैनिक कार्यों को करते समय—जैसे चलते, काम करते या विश्राम करते हुए—पृष्ठभूमि (background) में अपने मन में लगातार प्रभु नाम (जैसे \"राधा राधा\") का मानसिक जप करते रहें।",
  "केवल स्वयं के सुधार पर ध्यान दें (आत्म-निरीक्षण): दूसरों के दोष, गलतियाँ और उनके कार्यों को देखना पूरी तरह बंद कर दें। अपनी इस पूरी ऊर्जा को अपने व्यवहार की कमियों को देखने और उन्हें सुधारने में लगाएँ।",
  "माता-पिता की सेवा सर्वोपरि है: यदि आपके माता-पिता उपेक्षित या दुखी हैं, तो आपकी पूजा, दान या तीर्थ यात्रा का कोई फल नहीं मिलता। घर पर उनकी सेवा करना ही सबसे बड़ा तीर्थ है।",
  "क्रोध को हराने के लिए मौन का सहारा लें: जब कोई आपका अपमान करे, आलोचना करे या आपको उकसाए, तो पलटकर जवाब न दें। पूरी तरह मौन रहें और मुस्कुराएँ; शांत रहने से आपकी आंतरिक ऊर्जा सुरक्षित रहती है, जबकि प्रतिक्रिया देने से वह नष्ट हो जाती है।",
  "केवल ईमानदारी की कमाई का ही उपभोग करें: भ्रष्टाचार, धोखेबाज़ी या दूसरों को कष्ट देकर कमाए गए धन से कभी भी अपना या अपने परिवार का पालन-पोषण न करें। अधर्म की कमाई मन की शांति और चरित्र दोनों को नष्ट कर देती है।",
  "स्मरण रखें कि यह शरीर नश्वर है: खुद को लगातार यह याद दिलाते रहें कि यह भौतिक शरीर, धन और सांसारिक प्रतिष्ठा क्षणभंगुर हैं और एक दिन मिट्टी में मिल जाएँगे। केवल आपके सत्कर्म और आध्यात्मिक साधना ही आपके साथ जाएँगे।",
  "संसार के लोगों से अपेक्षाएँ कम रखें: सांसारिक रिश्तों से बिना शर्त प्यार, वफादारी या पूर्णता की उम्मीद रखना हमेशा दुख का कारण बनता है। अपनी गहरी भावनात्मक अपेक्षाएँ केवल ईश्वर से रखें।",
  "अपनी इंद्रियों की रक्षा करें (कुसंग से बचें): आप क्या देखते हैं, क्या सुनते हैं और क्या खाते हैं, इसके प्रति अत्यंत सतर्क रहें। गलत संगति (कुसंग), दूसरों की बुराई और नकारात्मक सामग्री से दूर रहें, क्योंकि ये आपके विचारों को तुरंत दूषित करते हैं।",
  "कण-कण में ईश्वर को देखें: प्रत्येक मनुष्य और जीव-जंतु के साथ सम्मान और दया का व्यवहार करें। किसी भी जीवित प्राणी से घृणा करना या उसे ठेस पहुँचाना, उनके भीतर वास करने वाले परमात्मा का अपमान करने के समान है।",
  "अनासक्त होकर अपना कर्तव्य निभाएँ: अपनी सांसारिक और व्यावसायिक ज़िम्मेदारियों को पूरी निष्ठा और अपनी सर्वोत्तम क्षमता के साथ निभाएँ, लेकिन अंतिम परिणाम और भविष्य की चिंताओं को पूरी तरह से सर्वशक्तिमान प्रभु के हाथों में छोड़ दें।"
];

interface GuidanceProps {
  guidance?: SiteSettings["guidance"];
}

export function Guidance({ guidance }: GuidanceProps) {
  if (!guidance) return null;

  return (
    <section id="guidance" className="py-20 lg:py-40 bg-stone-50">
      <Container wide>
        {/* Guru Ji Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-28 items-center mb-20 lg:mb-32">
          <FadeIn className="lg:col-span-5">
            <div className="museum-frame relative aspect-[4/5] overflow-hidden">
              <SacredImage
                src={guidance.guru?.image || "/images/guru-ji-placeholder.jpg"} 
                alt={guidance.guru?.name || "Shri Premanand Ji Maharaj"}
                fill
                className="object-cover object-top transition-transform duration-[1.4s] hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={0.2}>
            <h2 className="font-yatra text-4xl md:text-5xl font-normal text-deep-brown mb-6">
              {guidance.guru?.name}
            </h2>
            <p className="font-marcellus text-xl text-maroon mb-8 italic">
              {guidance.guru?.details}
            </p>
            <p className="text-sm text-muted mb-8 italic">
              (नोट: आध्यात्मिक संदर्भों में 'Bhagwat Prapt' के लिए 'भगवद्-प्राप्त' शब्द का प्रयोग किया जाता है, जिसका अर्थ है जिन्होंने भगवान को प्राप्त कर लिया हो।)
            </p>
            <h3 className="font-yatra text-2xl text-charcoal mb-6">
              परम पूज्य सद्गुरुदेव श्री प्रेमानंद जी महाराज की 10 मुख्य शिक्षाएँ (Shiksha)
            </h3>
            <ul className="space-y-4">
              {teachings.map((teach, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-gold mr-3 font-bold mt-1">{i + 1}.</span>
                  <span className="text-muted font-light leading-relaxed">{teach.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Mata Pita Ji Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-28 items-center mb-20 lg:mb-32">
          <FadeIn className="lg:col-span-7 order-2 lg:order-1" delay={0.2}>
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold mb-4">
              Under the Guidance Of
            </p>
            <h2 className="font-yatra text-4xl md:text-5xl font-normal text-deep-brown mb-6 leading-tight">
              {guidance.parents?.name}
            </h2>
            <div className="luxe-divider mb-8" aria-hidden />
            <p className="font-marcellus text-lg text-muted leading-relaxed">
              {guidance.parents?.details}
            </p>
          </FadeIn>
          <FadeIn className="lg:col-span-5 order-1 lg:order-2">
            <div className="museum-frame relative aspect-[4/5] overflow-hidden">
              <SacredImage
                src={guidance.parents?.image || "/images/parents-placeholder.jpg"}
                alt={guidance.parents?.name || "Parents"}
                fill
                className="object-cover object-top transition-transform duration-[1.4s] hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>

        {/* Neha Rai Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-28 items-center mb-20 lg:mb-32">
          <FadeIn className="lg:col-span-5">
            <div className="museum-frame relative aspect-[3/4] overflow-hidden">
              <SacredImage
                src={guidance.mentor?.image || "/images/neha-rai-placeholder.jpg"} 
                alt={guidance.mentor?.name || "Mentor"}
                fill
                className="object-cover object-top transition-transform duration-[1.4s] hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={0.2}>
            <p className="text-[11px] uppercase tracking-[0.38em] text-gold mb-4">
              {guidance.mentor?.title?.split('|')[0]?.trim() || "Trustee & Worker (Mentor)"}
            </p>
            <h2 className="font-yatra text-4xl md:text-5xl font-normal text-deep-brown mb-4">
              {guidance.mentor?.name}
            </h2>
            <p className="font-marcellus text-xl text-maroon mb-8 italic">
              {guidance.mentor?.title?.split('|')[1]?.trim() || "Devotional Singer (Hari Naam Pracharak)"}
            </p>
            <div className="luxe-divider mb-8" aria-hidden />
            <p className="font-marcellus text-lg text-muted leading-relaxed">
              {guidance.mentor?.details}
            </p>
          </FadeIn>
        </div>

        {/* Seva Pics Section */}
        <div className="pt-20 border-t border-deep-brown/10">
          <FadeIn>
            <h2 className="font-yatra text-4xl md:text-5xl text-center font-normal text-deep-brown mb-16">
              Our Seva Highlights
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-12">
            {(guidance.sevaHighlights || []).map((seva, i) => (
              <FadeIn key={i} delay={0.1 * i} className="group">
                <div className="museum-frame relative aspect-square overflow-hidden mb-6">
                  <SacredImage
                    src={seva.image || "/images/seva-placeholder.jpg"}
                    alt={seva.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-yatra text-xl text-charcoal mb-2 leading-snug">{seva.title}</h3>
                <p className="font-marcellus text-sm text-muted italic">{seva.subtitle}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
