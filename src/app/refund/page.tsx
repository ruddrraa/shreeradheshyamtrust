import { LegalPageLayout } from "@/components/ui/LegalPageLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/lib/data";
import { deepMergeTypography } from "@/lib/utils";

export const metadata = {
  title: "Refund and Cancellation Policy | Shree Radhe Shyam Bhakti Sarover Trust",
};

export default async function RefundPolicy() {
  const settings = await getSettings();

  return (
    <>
      <Navbar />
      <LegalPageLayout title="Refund & Cancellation" lastUpdated="June 2026">
        <p>
          At Shree Radhe Shyam Bhakti Sarover Trust, we deeply appreciate your generous contributions towards Gau Seva and our spiritual programs. As an NGO/Trust, we rely entirely on the voluntary support of devotees to carry forward our mission.
        </p>

        <h2>1. General Donation Policy</h2>
        <p>
          All donations made to Shree Radhe Shyam Bhakti Sarover Trust are strictly non-refundable and non-cancellable. Once an offering or donation has been processed, it is immediately allocated to our ongoing charitable and spiritual initiatives. We request all donors to exercise due care and diligence before initiating a payment.
        </p>

        <h2>2. Technical Errors & Duplicate Deductions</h2>
        <p>
          While donations are non-refundable, we understand that technical glitches can occur during online transactions. We will consider a refund request exclusively under the following exceptional circumstances:
        </p>
        <ul>
          <li>If an amount was accidentally deducted twice (duplicate transaction) from the donor&apos;s account due to a technical error on the payment gateway.</li>
          <li>If a transaction fails, but the amount is still debited from the donor&apos;s bank account without reaching our trust account (in which case, the bank usually auto-refunds within 5-7 business days).</li>
        </ul>

        <h2>3. How to Request a Refund for Technical Errors</h2>
        <p>
          If you experience a duplicate deduction, you must notify us within 7 days of the transaction. Please send a formal request to our contact email with the following details:
        </p>
        <ul>
          <li>Date of donation</li>
          <li>Donation amount</li>
          <li>Payment gateway transaction ID / Reference number</li>
          <li>Proof of double deduction (e.g., bank statement extract showing the duplicate charge)</li>
        </ul>

        <h2>4. Processing Time</h2>
        <p>
          Once we receive a valid refund request for a technical error, our financial team will verify the details with the payment gateway (Razorpay). If the claim is found to be valid, the refund will be processed back to the original source of payment within 7-10 working days.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          For any discrepancies related to your transaction, please reach out to us using the contact email or phone number listed in the footer of this website.
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
