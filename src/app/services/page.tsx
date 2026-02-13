"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import RevealOnScroll from "@/components/RevealOnScroll";

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_dk4dm0o";
const EMAILJS_TEMPLATE_ID = "template_075xrrl";
const EMAILJS_PUBLIC_KEY = "9Dp5pnekQXzVGJhcb";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    company: "",
    
    // Project Vision
    problemAndUsers: "",
    coreFeatures: "",
    inspiration: "",
    
    // Scope and Features
    mustHaveFeatures: "",
    integrations: "",
    platform: "",
    
    // Technical and Design
    brandingGuidelines: "",
    techRequirements: "",
    dataHandling: "",
    
    // Timeline and Budget
    launchDate: "",
    budget: "",
    scalability: "",
    
    // Business and Support
    successMetrics: "",
    feedbackProvider: "",
    ongoingSupport: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success/10 rounded-full blur-[100px] animate-float-delayed" />
        
        <div className="max-w-md text-center relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center border border-success/30 shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-pulse-glow">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Thank You!</h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Your service request has been submitted successfully. Our team will review your requirements and get back to you within 24-48 hours.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-mesh opacity-20 pointer-events-none" />
        <div className="fixed top-20 right-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-accent-primary/3 rounded-full blur-[100px] pointer-events-none animate-float-delayed" />

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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Page Header */}
          <RevealOnScroll>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                </span>
                <span className="text-accent-primary text-sm font-medium">Service Request</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
                Tell Us About Your <span className="text-shimmer">Project</span>
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-primary/50" />
                <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-primary/50" />
              </div>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Fill out the form below to help us understand your needs. We&apos;ll review your request and get back to you with a tailored proposal.
              </p>
            </div>
          </RevealOnScroll>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information */}
            <RevealOnScroll delay={100}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-primary/20 text-accent-primary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)]">1</span>
                  Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Full Name *
                    </label>
                    <div className={`transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address *
                    </label>
                    <div className={`transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary mb-2">
                      Company / Organization (Optional)
                    </label>
                    <div className={`transition-all duration-300 ${focusedField === 'company' ? 'scale-[1.02]' : ''}`}>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Section 2: Project Vision */}
            <RevealOnScroll delay={150}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-secondary/20 text-accent-secondary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]">2</span>
                  Project Vision
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="problemAndUsers" className="block text-sm font-medium text-text-secondary mb-2">
                      What problem does this software solve for your users, and who are the primary target users? *
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., age, location, tech-savviness</p>
                    <textarea
                      id="problemAndUsers"
                      value={formData.problemAndUsers}
                      onChange={(e) => setFormData({ ...formData, problemAndUsers: e.target.value })}
                      onFocus={() => setFocusedField('problemAndUsers')}
                      onBlur={() => setFocusedField(null)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Describe the problem you're solving and your target audience..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="coreFeatures" className="block text-sm font-medium text-text-secondary mb-2">
                      Describe the core features or user flow in simple terms *
                    </label>
                    <p className="text-xs text-text-muted mb-2">What should a user be able to do? (1-2 sentences)</p>
                    <textarea
                      id="coreFeatures"
                      value={formData.coreFeatures}
                      onChange={(e) => setFormData({ ...formData, coreFeatures: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., Users can sign up, browse products, and make purchases..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="inspiration" className="block text-sm font-medium text-text-secondary mb-2">
                      What inspired this idea?
                    </label>
                    <p className="text-xs text-text-muted mb-2">Are there any existing apps/websites it should emulate or improve upon?</p>
                    <textarea
                      id="inspiration"
                      value={formData.inspiration}
                      onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Share links or names of similar products for reference..."
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Section 3: Scope and Features */}
            <RevealOnScroll delay={200}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-primary/20 text-accent-primary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)]">3</span>
                  Scope and Features
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="mustHaveFeatures" className="block text-sm font-medium text-text-secondary mb-2">
                      What are the must-have features versus nice-to-haves? *
                    </label>
                    <p className="text-xs text-text-muted mb-2">Prioritize top 3-5 features to avoid scope creep</p>
                    <textarea
                      id="mustHaveFeatures"
                      value={formData.mustHaveFeatures}
                      onChange={(e) => setFormData({ ...formData, mustHaveFeatures: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Must-have: 1. User authentication 2. Dashboard...&#10;Nice-to-have: 1. Dark mode 2. Analytics..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="integrations" className="block text-sm font-medium text-text-secondary mb-2">
                      Will it need user accounts, payments, integrations, or admin dashboards?
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., APIs for email, maps, databases, payment gateways</p>
                    <textarea
                      id="integrations"
                      value={formData.integrations}
                      onChange={(e) => setFormData({ ...formData, integrations: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., Stripe payments, Google Maps, SendGrid for emails..."
                    />
                  </div>
                  <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-text-secondary mb-2">
                      Platform *
                    </label>
                    <select
                      id="platform"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 cursor-pointer"
                      required
                    >
                      <option value="">Select platform</option>
                      <option value="web-only">Web Only</option>
                      <option value="mobile-ios">Mobile (iOS)</option>
                      <option value="mobile-android">Mobile (Android)</option>
                      <option value="mobile-both">Mobile (iOS & Android)</option>
                      <option value="desktop">Desktop Application</option>
                      <option value="cross-platform">Cross-Platform (Web + Mobile)</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Section 4: Technical and Design Needs */}
            <RevealOnScroll delay={250}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-secondary/20 text-accent-secondary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]">4</span>
                  Technical and Design Needs
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="brandingGuidelines" className="block text-sm font-medium text-text-secondary mb-2">
                      Do you have branding guidelines, logos, or preferred design styles?
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., modern, minimalist, colorful, corporate</p>
                    <textarea
                      id="brandingGuidelines"
                      value={formData.brandingGuidelines}
                      onChange={(e) => setFormData({ ...formData, brandingGuidelines: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Describe your brand style or share links to brand guidelines..."
                    />
                  </div>
                  <div>
                    <label htmlFor="techRequirements" className="block text-sm font-medium text-text-secondary mb-2">
                      Any specific technologies or platforms required?
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., must run on iOS 15+, integrate with Shopify, use specific cloud provider</p>
                    <textarea
                      id="techRequirements"
                      value={formData.techRequirements}
                      onChange={(e) => setFormData({ ...formData, techRequirements: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="List any technical requirements or constraints..."
                    />
                  </div>
                  <div>
                    <label htmlFor="dataHandling" className="block text-sm font-medium text-text-secondary mb-2">
                      How should it handle data?
                    </label>
                    <p className="text-xs text-text-muted mb-2">User-generated content, file uploads, real-time updates like chat</p>
                    <textarea
                      id="dataHandling"
                      value={formData.dataHandling}
                      onChange={(e) => setFormData({ ...formData, dataHandling: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Describe data requirements - uploads, real-time features, storage needs..."
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Section 5: Timeline and Budget */}
            <RevealOnScroll delay={300}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-primary/20 text-accent-primary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)]">5</span>
                  Timeline and Budget
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="launchDate" className="block text-sm font-medium text-text-secondary mb-2">
                      What is your target launch date? *
                    </label>
                    <p className="text-xs text-text-muted mb-2">Are there any hard deadlines or phases? (e.g., MVP first)</p>
                    <textarea
                      id="launchDate"
                      value={formData.launchDate}
                      onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., MVP by March 2026, full launch by June 2026..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-text-secondary mb-2">
                      What budget range do you have in mind? *
                    </label>
                    <p className="text-xs text-text-muted mb-2">How flexible is it for changes?</p>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 cursor-pointer"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1k">Under $1,000</option>
                      <option value="1k-5k">$1,000 - $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="flexible">Flexible / Open to Discussion</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="scalability" className="block text-sm font-medium text-text-secondary mb-2">
                      How many users do you expect initially, and what are your scalability needs?
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., 100 vs. 10,000 concurrent users</p>
                    <textarea
                      id="scalability"
                      value={formData.scalability}
                      onChange={(e) => setFormData({ ...formData, scalability: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., Starting with 500 users, expecting 10,000 within first year..."
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Section 6: Business and Support */}
            <RevealOnScroll delay={350}>
              <div className="p-6 sm:p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/0 group-hover:via-accent-primary/30 to-transparent transition-all duration-500" />
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-accent-secondary/20 text-accent-secondary text-sm flex items-center justify-center font-bold shadow-[0_0_20px_rgba(168,85,247,0.2)]">6</span>
                  Business and Support
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="successMetrics" className="block text-sm font-medium text-text-secondary mb-2">
                      What are your success metrics?
                    </label>
                    <p className="text-xs text-text-muted mb-2">e.g., user sign-ups, revenue goals, engagement rates</p>
                    <textarea
                      id="successMetrics"
                      value={formData.successMetrics}
                      onChange={(e) => setFormData({ ...formData, successMetrics: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., 1,000 sign-ups in first month, $10k MRR within 6 months..."
                    />
                  </div>
                  <div>
                    <label htmlFor="feedbackProvider" className="block text-sm font-medium text-text-secondary mb-2">
                      Who will provide content, testing feedback, or approvals during development?
                    </label>
                    <textarea
                      id="feedbackProvider"
                      value={formData.feedbackProvider}
                      onChange={(e) => setFormData({ ...formData, feedbackProvider: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="e.g., I will be the primary contact, or our marketing team..."
                    />
                  </div>
                  <div>
                    <label htmlFor="ongoingSupport" className="block text-sm font-medium text-text-secondary mb-2">
                      Do you need ongoing maintenance, hosting, or post-launch support after delivery?
                    </label>
                    <select
                      id="ongoingSupport"
                      value={formData.ongoingSupport}
                      onChange={(e) => setFormData({ ...formData, ongoingSupport: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      <option value="yes-full">Yes, full maintenance and hosting</option>
                      <option value="yes-maintenance">Yes, maintenance only</option>
                      <option value="yes-hosting">Yes, hosting only</option>
                      <option value="maybe">Maybe, let&apos;s discuss</option>
                      <option value="no">No, just delivery</option>
                    </select>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error rounded-xl text-error text-center animate-shake">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <RevealOnScroll delay={400}>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group px-10 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl btn-enhanced text-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </RevealOnScroll>
          </form>

          {/* Note */}
          <p className="text-center text-text-muted text-sm mt-8">
            By submitting this form, you agree to our privacy policy. We&apos;ll only use your information to respond to your inquiry.
          </p>
        </main>
      </div>
    </>
  );
}
