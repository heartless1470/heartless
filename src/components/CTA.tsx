"use client";
import type { FormEvent } from "react";
import { useReveal } from "@/hooks/useReveal";

const CONTACT_EMAIL = "howardduffus1470@gmail.com";
const CONTACT_EMAIL_ENCODED = encodeURIComponent(CONTACT_EMAIL);

function buildMailtoFromForm(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const business = String(formData.get("business") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`New enquiry: ${service || "Website Project"}`);
  const body = encodeURIComponent(
    [
      "New contact form enquiry",
      "",
      `Name: ${name}`,
      `Business: ${business || "N/A"}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      `Service Needed: ${service}`,
      `Budget Range: ${budget || "N/A"}`,
      `Timeline: ${timeline || "N/A"}`,
      "",
      "Project Details:",
      message,
    ].join("\n")
  );

  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL_ENCODED}&su=${subject}&body=${body}`;
  const mailtoFallback = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return { gmailCompose, mailtoFallback };
}

export default function CTA() {
  const ref = useReveal();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { gmailCompose, mailtoFallback } = buildMailtoFromForm(formData);
    const popup = window.open(gmailCompose, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = mailtoFallback;
    }
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="reveal cta-section"
      style={{
        background: "#c8f545",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(10,10,15,0.1)",
            border: "1px solid rgba(10,10,15,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0a0a0f", display: "inline-block" }} />
          <span style={{ color: "#0a0a0f", fontSize: 13, fontWeight: 600 }}>3 spots left this month</span>
        </div>
        <h2
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#0a0a0f",
            margin: "0 0 20px",
            lineHeight: 1.0,
          }}
        >
          Ready to grow your business?
        </h2>
        <p style={{ color: "#0a0a0f", opacity: 0.6, fontSize: 18, marginBottom: 40 }}>
          Fill this out and I&apos;ll have what I need to help properly. Your email app opens with everything pre-filled.
        </p>

        <form
          onSubmit={onSubmit}
          style={{
            textAlign: "left",
            background: "rgba(10,10,15,0.08)",
            border: "1px solid rgba(10,10,15,0.18)",
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <input
              className="contact-input"
              name="name"
              placeholder="Your Name *"
              required
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="business"
              placeholder="Business Name"
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="email"
              type="email"
              placeholder="Email *"
              required
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="phone"
              placeholder="Phone Number"
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="service"
              placeholder="Service Needed *"
              required
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="budget"
              placeholder="Budget Range"
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
            <input
              className="contact-input"
              name="timeline"
              placeholder="Preferred Timeline"
              style={{ border: "1px solid rgba(10,10,15,0.2)", borderRadius: 10, padding: "12px 14px", fontSize: 14 }}
            />
          </div>
          <textarea
            className="contact-textarea"
            name="message"
            placeholder="Tell me what you need, your goals, and anything important *"
            required
            rows={5}
            style={{
              width: "100%",
              border: "1px solid rgba(10,10,15,0.2)",
              borderRadius: 10,
              padding: "12px 14px",
              fontSize: 14,
              lineHeight: 1.5,
              marginBottom: 14,
              resize: "vertical",
            }}
          />

          <button
            type="submit"
            style={{
              display: "inline-block",
              background: "#0a0a0f",
              color: "#c8f545",
              fontWeight: 800,
              fontSize: 16,
              padding: "14px 26px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Open Email Draft →
          </button>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "rgba(10,10,15,0.7)" }}>
            Sends to {CONTACT_EMAIL}
          </p>
        </form>
      </div>
    </section>
  );
}
