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
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          image={settings.heroImage}
        />
        <Impact stats={settings.impactStats} />
        <About />
        <Pillars />
        <Vision />
        <Gallery images={gallery} />
        <Videos videos={videos} />
        <Events events={events} />
        <DonationSection
          donations={donationData.donations}
          totalAmount={donationData.totalAmount}
        />
        <Testimonials />
      </main>
      <Footer
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        address={settings.address}
        socialLinks={settings.socialLinks}
      />
    </>
  );
}
