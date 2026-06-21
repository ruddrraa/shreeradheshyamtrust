import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { About } from "@/components/home/About";
import { Guidance } from "@/components/home/Guidance";
import { Pillars } from "@/components/home/Pillars";
import { Vision } from "@/components/home/Vision";
import { Gallery } from "@/components/home/Gallery";
import { Videos } from "@/components/home/Videos";
import { Events } from "@/components/home/Events";
import { DonationSection } from "@/components/home/Donation";
import { Testimonials } from "@/components/home/Testimonials";
import {
  getSettings,
  getGalleryImages,
  getVideos,
  getEvents,
  getDonations,
} from "@/lib/data";
import { deepMergeTypography } from "@/lib/utils";
import { StructuredData } from "@/components/seo/StructuredData";

export default async function HomePage() {
  const [settings, gallery, videos, events, donationData] = await Promise.all([
    getSettings(),
    getGalleryImages(),
    getVideos(),
    getEvents(),
    getDonations(),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://shreeradheshyambhaktisarovertrust.com";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Shree Radhe Shyam Bhakti Sarover Trust",
    url: baseUrl,
    logo: `${baseUrl}/Logo.png`,
    description: "Promoting Gau Seva, Spiritual Teachings, Shri Radha Krishna Naam Sankirtan, Bhakti, Compassion, Sanatan Dharma, and Value-Based Living.",
    taxID: "WB/2022/032510300209546/2022",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Howrah",
      addressRegion: "West Bengal",
      addressCountry: "IN"
    },
    telephone: settings.contactPhone,
    email: settings.contactEmail,
    sameAs: Object.values(settings.socialLinks || {}).filter(Boolean)
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Gau Seva?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gau Seva is the sacred service, welfare, and protection of cows (Gau Mata). Our trust actively provides food, medical care, and safe shelter to ensure their well-being."
        }
      },
      {
        "@type": "Question",
        name: "How can I donate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can securely donate through our website's donation section using Razorpay, which supports UPI, cards, and net banking. 100% of your contributions go directly towards our Seva initiatives."
        }
      },
      {
        "@type": "Question",
        name: "How can I join Naam Sankirtan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Everyone is welcome! You can check our Events & Gatherings section for upcoming Shri Radha Krishna Naam Sankirtan schedules and join us in person."
        }
      },
      {
        "@type": "Question",
        name: "What activities does the Trust organize?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We organize extensive Gau Seva, spiritual discourses, regular Bhajan and Kirtan programs, charitable distribution, and large-scale Satsang gatherings."
        }
      },
      {
        "@type": "Question",
        name: "Where is the Trust located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Our trust is physically based in Howrah, Kolkata, West Bengal. Detailed location: ${settings.address}`
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={orgSchema} />
      <StructuredData data={faqSchema} />
      <Navbar />
      <main>
        <Hero 
          image={settings.heroImage} 
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          typography={deepMergeTypography(settings.typography?.global, settings.typography?.hero)}
        />
        <Impact stats={settings.impactStats || { gauSeva: 0, spiritualPrograms: 0, sankirtanGatherings: 0, devoteesReached: 0 }} />
        <About 
          about={{
            title: settings.aboutTitle,
            subtitle: settings.aboutSubtitle,
            description: settings.aboutDescription,
            image: settings.aboutImage
          }} 
          typography={deepMergeTypography(settings.typography?.global, settings.typography?.about)}
        />
        <Guidance guidance={settings.guidance} />
        <Pillars pillars={settings.pillars || []} typography={deepMergeTypography(settings.typography?.global, settings.typography?.pillars)} />
        <Vision 
          sanskrit={settings.visionSanskrit}
          subtitle={settings.visionSubtitle}
          image={settings.visionImage}
          typography={deepMergeTypography(settings.typography?.global, settings.typography?.vision)}
        />
        <Gallery images={gallery} typography={settings.typography?.global} />
        <Videos videos={videos} typography={deepMergeTypography(settings.typography?.global, settings.typography?.videos)} />
        <Events events={events} typography={deepMergeTypography(settings.typography?.global, settings.typography?.events)} />
        <DonationSection
          donations={donationData.donations}
          totalAmount={donationData.totalAmount}
          typography={settings.typography?.global}
        />
        <Testimonials typography={settings.typography?.global} />
      </main>
      <Footer
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        address={settings.address}
        socialLinks={settings.socialLinks}
        typography={deepMergeTypography(settings.typography?.global, settings.typography?.contact)}
      />
    </>
  );
}
