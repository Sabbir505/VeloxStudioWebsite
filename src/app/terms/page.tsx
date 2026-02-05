"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import CustomCursor from "@/components/CustomCursor";

export default function TermsOfServicePage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border-custom bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="md" variant="full" />
            </Link>
            <Link
              href="/"
              className="group text-text-secondary hover:text-accent-primary transition-colors text-sm flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent-primary/10"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Terms of Service
            </h1>
            <p className="text-text-secondary">
              Last Updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-text-secondary space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">1. Introduction & Acceptance</h2>
              <p>
                Welcome to Velox Studio. By accessing or using our website at veloxstudio.tech and our services, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our website or services.
              </p>
              <p>
                Velox Studio is a software development company established in January 2026. We provide digital solutions including software development, design, and marketing services to clients worldwide.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Velox Studio. Please read them carefully before using our services.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">2. Services We Offer</h2>
              <p>
                Velox Studio provides the following professional services: custom website development, mobile application development for iOS and Android platforms, marketing and publicity services, design services including logo and branding, UI/UX design, software product development, and SaaS solutions.
              </p>
              <p>
                The specific scope, deliverables, and terms for each project will be documented in a separate project agreement or proposal prior to commencement of work.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">3. Partnership Program</h2>
              <p>
                Velox Studio offers a unique profit-sharing collaboration model for qualifying partners. This program provides the opportunity to collaborate with us without upfront costs for partners who meet our criteria. Revenue sharing is based on product performance and mutually agreed terms.
              </p>
              <p>
                Partnership arrangements are subject to approval and require execution of a separate partnership agreement that outlines specific terms, conditions, and revenue-sharing percentages. All terms are documented and communicated transparently before any work commences.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">4. Intellectual Property</h2>
              <p>
                All work product created during projects belongs to Velox Studio until final delivery and receipt of full payment. Upon full payment, agreed deliverables and associated rights transfer to the client as specified in the project agreement.
              </p>
              <p>
                Velox Studio retains the right to use completed work in our portfolio and marketing materials unless otherwise agreed in writing. Clients must not claim ownership of Velox Studio&apos;s proprietary tools, methodologies, or pre-existing code libraries. Open-source components used in projects remain subject to their respective licenses.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">5. Confidentiality</h2>
              <p>
                Both parties agree to maintain strict confidentiality regarding project details and sensitive information. Confidential information includes source code, business strategies, financial data, analytics, user data, trade secrets, and any information marked as confidential.
              </p>
              <p>
                Neither party shall share confidential information with third parties without prior written consent from the disclosing party. Confidentiality obligations survive the termination of any agreement and remain in effect indefinitely.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">6. Client Responsibilities</h2>
              <p>
                Clients engaging our services agree to provide accurate and complete project requirements and specifications, respond to queries and provide feedback within agreed timeframes, provide necessary assets, credentials, and access required for project completion, make payments according to the agreed schedule and terms, and ensure that project content complies with applicable laws and does not infringe third-party rights.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">7. Payment Terms</h2>
              <p>
                Project-based pricing is agreed upon before work commences and documented in the project proposal. Subscription services are billed according to the specified billing cycle. Profit-sharing arrangements are documented separately in partnership agreements. Accepted payment methods will be communicated during project setup.
              </p>
              <p>
                Late payments may result in project suspension until outstanding balances are cleared. Continued non-payment may lead to termination of services.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">8. Project Delivery</h2>
              <p>
                Project timelines are established and documented in project agreements. Quality assurance testing is included as part of our delivery process. Client review and feedback periods are defined for each milestone. Changes to project scope may affect timeline and cost, requiring written agreement from both parties. Final delivery occurs upon completion of all milestones and receipt of final payment.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">9. Limitation of Liability</h2>
              <p>
                Velox Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability for any claim arising from our services shall not exceed the total fees paid by the client for the specific service giving rise to the claim.
              </p>
              <p>
                We do not guarantee specific business outcomes, revenue increases, or user engagement metrics. Force majeure events including natural disasters, wars, pandemics, and government actions excuse performance delays.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">10. Termination</h2>
              <p>
                Either party may terminate with 30 days written notice. All outstanding payments become due immediately upon termination. Deliverables for completed and paid work will be provided to the client. Work in progress may be delivered at Velox Studio&apos;s discretion upon pro-rata payment. Confidentiality obligations survive termination indefinitely. Immediate termination is permitted for material breach by either party.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">11. Dispute Resolution</h2>
              <p>
                In the event of any dispute arising from these Terms or our services, parties agree to first attempt resolution through good faith negotiation within 30 days. Unresolved disputes shall be submitted to binding arbitration. These Terms are governed by the laws of the People&apos;s Republic of China.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">12. Website Use</h2>
              <p>
                When using our website, you agree to use the site only for lawful purposes and in accordance with these Terms, not to attempt to hack, disrupt, or interfere with our website or services, not to scrape, copy, or reproduce our content without express written permission, not to use automated systems to access the website in a manner that sends more requests than a human could reasonably produce, and not to impersonate any person or entity or misrepresent your affiliation.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">13. Disclaimer</h2>
              <p>
                Our website and services are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; without warranties of any kind, either express or implied. Information on this website may change without notice. We do not guarantee uninterrupted or error-free access to our website. We are not responsible for any third-party content linked from our website. Technical specifications and service offerings are subject to change.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our website or services constitutes acceptance of modified Terms. Material changes will be notified via email or prominent website notice. For active projects, existing contractual terms remain in effect unless mutually agreed otherwise.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">15. Contact</h2>
              <p>
                For any questions or concerns regarding these Terms of Service, please contact us at{" "}
                <a href="mailto:theveloxstudio@gmail.com" className="text-accent-primary hover:underline">
                  theveloxstudio@gmail.com
                </a>.
              </p>
            </section>

          </div>

          {/* Back to Home Button */}
          <div className="mt-12 pt-8 border-t border-border-custom">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-accent-primary hover:underline"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border-custom py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-text-muted text-sm">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link href="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-text-muted"></span>
              <Link href="/terms" className="text-accent-primary">Terms of Service</Link>
            </div>
            <p>© {new Date().getFullYear()} Velox Studio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
