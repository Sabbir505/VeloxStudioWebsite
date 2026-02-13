"use client";

import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import MagneticButton from "./MagneticButton";

const EMAILJS_SERVICE_ID = "service_dk4dm0o";
const EMAILJS_TEMPLATE_ID = "template_7qiv8et";
const EMAILJS_PUBLIC_KEY = "9Dp5pnekQXzVGJhcb";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      setFormData({ name: "", email: "", type: "general", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent-primary/3 rounded-full blur-[120px] animate-float-delayed" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-l from-transparent via-accent-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-primary/10 rounded-full mb-6 border border-accent-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
              </span>
              <span className="text-accent-primary text-sm font-medium">Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s Start a <span className="text-shimmer">Conversation</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-primary/50" />
              <div className="w-2 h-2 rotate-45 border border-accent-primary/50" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-primary/50" />
            </div>
            <p className="max-w-3xl mx-auto text-lg text-text-secondary">
              Have a project in mind? Want to partner with us? We&apos;d love to hear from you.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <RevealOnScroll direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                Contact Information
              </h3>
              <p className="text-text-secondary mb-8">
                Fill out the form or reach out directly. We typically respond within 24 hours.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                <RevealOnScroll delay={100}>
                  <div className="group flex items-start gap-4 p-4 rounded-xl stat-card-glass relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Email</h4>
                      <a href="mailto:theveloxstudio@gmail.com" className="text-text-secondary hover:text-accent-primary transition-colors">
                        theveloxstudio@gmail.com
                      </a>
                    </div>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                  <div className="group flex items-start gap-4 p-4 rounded-xl stat-card-glass relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-semibold text-text-primary group-hover:text-accent-primary transition-colors">Location</h4>
                      <p className="text-text-secondary">
                        Qixia District, Nanjing, Jiangsu, China
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Social Links */}
              <RevealOnScroll delay={300}>
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Connect With Us</h4>
                  <div className="flex gap-3">
                    {[
                      { name: "Instagram", href: "https://www.instagram.com/velox_studio_26?igsh=bGFncjViYTdnd3Vz", icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61586575063794", icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                      { name: "Email", href: "mailto:theveloxstudio@gmail.com", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, isStroke: true },
                      { name: "X", href: "https://x.com/velox_studio_26?s=21", icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                      { name: "TikTok", href: "https://www.tiktok.com/@velox_studio_26", icon: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" /> },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target={social.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        className="group w-11 h-11 rounded-xl stat-card-glass flex items-center justify-center text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all duration-300"
                        aria-label={social.name}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill={social.isStroke ? "none" : "currentColor"} stroke={social.isStroke ? "currentColor" : "none"} viewBox="0 0 24 24">
                          {social.icon}
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </RevealOnScroll>

          {/* Right: Contact Form */}
          <RevealOnScroll direction="right">
            <div className="p-8 rounded-2xl stat-card-glass relative overflow-hidden group">
              {/* Animated border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Name
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
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
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
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

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-text-secondary mb-2">
                    Inquiry Type
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'type' ? 'scale-[1.02]' : ''}`}>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      onFocus={() => setFocusedField('type')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 cursor-pointer"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="project">Project Discussion</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="careers">Careers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Your Message
                  </label>
                  <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border-custom text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary focus:shadow-[0_0_0_3px_rgba(0,255,255,0.1),0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or idea..."
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-error/10 border border-error rounded-xl text-error text-center text-sm animate-shake">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-success/10 border border-success rounded-xl text-success text-center text-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Thank you for your message! We&apos;ll get back to you soon.
                  </div>
                )}

                <MagneticButton strength={0.2} className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="w-full px-6 py-4 bg-gradient-primary text-velox-black font-semibold rounded-xl transition-all duration-300 btn-enhanced disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : submitted ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message Sent
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
