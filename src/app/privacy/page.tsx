import { LegalPageLayout } from "@/components/ui/LegalPageLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | Shree Radhe Shyam Bhakti Sarover Trust",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <LegalPageLayout title="Privacy Policy" lastUpdated="June 2026">
        <p>
          At Shree Radhe Shyam Bhakti Sarover Trust, your privacy is of the utmost importance to us. This Privacy Policy outlines the types of personal information that is received and collected by our organization and how it is used.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          When you visit our website, register for events, or make a donation, we may collect the following information:
        </p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address.</li>
          <li><strong>Payment Information:</strong> For processing donations, we use secure third-party payment gateways (such as Razorpay). We do not store your complete credit card or bank details on our servers.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, and operating system collected via standard server logs.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          The information we collect is used to:
        </p>
        <ul>
          <li>Process and acknowledge your donations and issue applicable tax receipts.</li>
          <li>Keep you informed about our trust&apos;s activities, events, and Gau Seva initiatives (if you have opted in).</li>
          <li>Respond to your inquiries and support requests.</li>
          <li>Improve our website and the services we offer to our devotees.</li>
        </ul>

        <h2>3. Data Protection and Sharing</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our operations, or servicing you, so long as those parties agree to keep this information confidential.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Our website may use &quot;cookies&quot; to enhance user experience. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.
        </p>

        <h2>5. Changes to this Privacy Policy</h2>
        <p>
          Shree Radhe Shyam Bhakti Sarover Trust has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes.
        </p>

        <h2>6. Contacting Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, you may contact us using the information provided in the footer of our website.
        </p>
      </LegalPageLayout>
      <Footer />
    </>
  );
}
