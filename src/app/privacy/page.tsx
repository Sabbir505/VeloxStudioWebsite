"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function PrivacyPolicyPage() {
  return (
    <>
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
              Privacy Policy
            </h1>
            <p className="text-text-secondary">
              Last Updated: January 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none text-text-secondary space-y-8">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">1. Introduction</h2>
              <p>
                Welcome to Velox Studio (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are a software development company established in January 2026.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website veloxstudio.tech or use our services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
              <p>
                By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our website:</p>
              <p>
                <strong className="text-text-primary">Personal Information:</strong> This includes your name, email address, and phone number that you provide through our contact forms.
              </p>
              <p>
                <strong className="text-text-primary">Project Information:</strong> We collect business details, project requirements, budget ranges, and timeline preferences that you share with us when inquiring about our services.
              </p>
              git push              git push origin main              git push origin main              git push origin main              git push origin main              git push origin main              git push origin main              git push origin main              <p>
                <strong className="text-text-primary">Communication Data:</strong> This includes messages, inquiries, and any correspondence you send through our contact forms or other communication channels.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <p>
                We use your information to respond to your inquiries and service requests promptly, to provide our software development, design, and marketing services, and to communicate with you about ongoing projects and partnerships. Additionally, we use this information to improve our website functionality and user experience, to send marketing communications about our services (only with your consent), and to comply with legal obligations and protect our rights.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. These measures include SSL encryption for secure data transmission, access controls to limit data access to authorized personnel only, regular security audits and assessments, and secure storage in protected databases.
              </p>
              <p>
                While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">5. Your Rights</h2>
              <p>
                You have certain rights regarding your personal data. You have the right to access and receive a copy of your personal data, to rectify any inaccurate personal data we hold about you, to request deletion of your personal data, to object to the processing of your personal data, and to withdraw your consent at any time where we rely on consent to process your information.
              </p>
              <p>
                To exercise any of these rights, please contact us using the contact information provided below.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-text-primary mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please contact us at{" "}
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
              <Link href="/privacy" className="text-accent-primary">Privacy Policy</Link>
              <span className="w-1 h-1 rounded-full bg-text-muted"></span>
              <Link href="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link>
            </div>
            <p>© {new Date().getFullYear()} Velox Studio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
