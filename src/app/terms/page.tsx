import { LegalPageLayout } from "@/components/ui/LegalPageLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/data";
import { deepMergeTypography } from "@/lib/utils";

export const metadata = {
  title: "Terms and Conditions | Shree Radhe Shyam Bhakti Sarover Trust",
};

export default async function TermsAndConditions() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />
      <LegalPageLayout title="Terms & Conditions" lastUpdated="June 2026">
        <p>
          Welcome to the Shree Radhe Shyam Bhakti Sarover Trust website. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing this website, you agree to be bound by these Terms and Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. You may not:
        </p>
        <ul>
          <li>Modify or copy the materials.</li>
          <li>Use the materials for any commercial purpose or public display.</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
        </ul>

        <h2>3. Donations and Offerings</h2>
        <p>
          Donations made to the Trust are voluntary and utilized towards our core objectives, including Gau Seva, spiritual gatherings, and community welfare. By making a donation, you confirm that the funds are your own and are given unconditionally. Please note that tax exemption receipts (such as 80G, if applicable) will be issued based on the details provided during the donation process.
        </p>

        <h2>4. Disclaimer</h2>
        <p>
          The materials on our website are provided on an &apos;as is&apos; basis. Shree Radhe Shyam Bhakti Sarover Trust makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>5. Limitations</h2>
        <p>
          In no event shall Shree Radhe Shyam Bhakti Sarover Trust or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
        </p>

        <h2>6. Revisions and Errata</h2>
        <p>
          The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          Any claim relating to the Shree Radhe Shyam Bhakti Sarover Trust website shall be governed by the laws of India, particularly the jurisdiction of West Bengal, without regard to its conflict of law provisions.
        </p>
      </LegalPageLayout>
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
