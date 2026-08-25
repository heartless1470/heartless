"use client";

import { FormEvent, MouseEvent, useState } from "react";

const CONTACT_EMAIL = "astrocodestudio@gmail.com";

const services = ["Website Refresh", "Business Website Redesign", "Custom Business Systems", "Website Care"];

export default function BriefForm() {
  const [step, setStep] = useState(1);

  function advanceTo(nextStep: number, event: MouseEvent<HTMLButtonElement>) {
    const fieldset = event.currentTarget.closest("fieldset");
    const controls = fieldset?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    );
    const firstInvalid = controls ? Array.from(controls).find((control) => !control.checkValidity()) : null;

    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }

    setStep(nextStep);
  }

  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [
      ["Name", data.get("name")],
      ["Business", data.get("business")],
      ["Email", data.get("email")],
      ["Phone / WhatsApp", data.get("phone")],
      ["Service", data.get("service")],
      ["Current website", data.get("website")],
      ["Timeline", data.get("timeline")],
      ["Budget / investment range", data.get("budget")],
      ["What needs to improve", data.get("problem")],
      ["What success should look like", data.get("outcome")],
    ];
    const body = fields.map(([label, value]) => `${label}: ${String(value || "Not provided").trim() || "Not provided"}`).join("\n");
    const subject = encodeURIComponent(`Project enquiry — ${String(data.get("service") || "AstroCodes")}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="brief-section" id="brief">
      <div className="section-frame brief-layout">
        <div className="brief-intro">
          <p className="eyebrow">Start with the business problem</p>
          <h2>Tell me what needs to work better.</h2>
          <p>
            You do not need a technical specification. Share the situation, the outcome you want, and any
            constraints. I will help define the right next step.
          </p>
          <div className="expectation-card">
            <strong>What happens next</strong>
            <ol><li>I review the brief.</li><li>I reply with useful next questions.</li><li>If there is a fit, I schedule discovery and confirm scope with you.</li></ol>
          </div>
        </div>
        <form className="brief-form" onSubmit={submitBrief}>
          <div className="form-progress" aria-label={`Brief step ${step} of 3`}>
            {[1, 2, 3].map((number) => <span className={number <= step ? "active" : ""} key={number}>{number}</span>)}
          </div>
          <fieldset className={step === 1 ? "form-step active" : "form-step"}>
            <legend>About you</legend>
            <label>Your name<input name="name" autoComplete="name" required /></label>
            <label>Business name<input name="business" autoComplete="organization" required /></label>
            <div className="field-row">
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone / WhatsApp<input name="phone" autoComplete="tel" /></label>
            </div>
            <button className="button" type="button" onClick={(event) => advanceTo(2, event)}>Continue</button>
          </fieldset>
          <fieldset className={step === 2 ? "form-step active" : "form-step"}>
            <legend>The project</legend>
            <label>Service
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>
            <label>Current website, if any<input name="website" type="url" placeholder="https://" /></label>
            <div className="field-row">
              <label>Preferred timeline<input name="timeline" placeholder="e.g. 6–8 weeks" /></label>
              <label>Investment range<input name="budget" placeholder="USD or JMD" /></label>
            </div>
            <div className="form-actions"><button className="text-button" type="button" onClick={() => setStep(1)}>Back</button><button className="button" type="button" onClick={(event) => advanceTo(3, event)}>Continue</button></div>
          </fieldset>
          <fieldset className={step === 3 ? "form-step active" : "form-step"}>
            <legend>The outcome</legend>
            <label>What is not working today?<textarea name="problem" rows={4} required /></label>
            <label>What should be different when this succeeds?<textarea name="outcome" rows={4} required /></label>
            <div className="form-actions"><button className="text-button" type="button" onClick={() => setStep(2)}>Back</button><button className="button" type="submit">Email my project brief</button></div>
            <p className="form-note">Your information is not stored on this website. This button opens your email app with the brief pre-filled for review before sending.</p>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
