import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Impact } from "@/components/home/Impact";
import { About } from "@/components/home/About";
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

export default async function HomePage() {
  const [settings, gallery, videos, events, donationData] = await Promise.all([
    getSettings(),
    getGalleryImages(),
    getVideos(),
    getEvents(),
    getDonations(),
  ]);

  return (
    <>
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
