"use client";

import { FormEvent, useRef, useState } from "react";

const CONTACT_EMAIL = "astrocodestudio@gmail.com";

const services = ["Website design & redesign", "Custom business web apps", "Website care"];

export default function BriefForm() {
  const [step, setStep] = useState(1);
  const [summary, setSummary] = useState("");
  const [opened, setOpened] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function goTo(nextStep: number) {
    setStep(nextStep);
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(".form-step.active input, .form-step.active select, .form-step.active textarea")?.focus());
  }

  function advanceTo(nextStep: number) {
    const fieldset = form.current?.querySelector(".form-step.active");
    const controls = fieldset?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    );
    const firstInvalid = controls ? Array.from(controls).find((control) => !control.checkValidity()) : null;

    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }

    if (nextStep === 4 && form.current) {
      const data = new FormData(form.current);
      const labels: Record<string, string> = {name: "Name", business: "Business", email: "Email", phone: "Phone / WhatsApp", service: "Service", website: "Current website", timeline: "Timeline", budget: "Budget (optional)", problem: "The project", outcome: "Desired outcome"};
      setSummary(Array.from(data.entries()).filter(([key]) => key !== "summary").map(([key, value]) => `${labels[key] || key}: ${String(value).trim() || "Not provided"}`).join("\n"));
    }
    goTo(nextStep);
  }

  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 4) { advanceTo(step + 1); return; }
    const summaryField = event.currentTarget.querySelector<HTMLTextAreaElement>('[name="summary"]');
    if (!summaryField?.reportValidity()) return;
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry — ${String(data.get("service") || "AstroCodes")}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(summary)}`;
    setOpened(true);
  }

  return (
    <section className="brief-section" id="brief">
      <div className="section-frame brief-layout">
        <div className="brief-intro">
          <p className="eyebrow">05 / Your next project</p>
          <h2>Let’s make something that feels like you.</h2>
          <p>
            You do not need a technical specification. Share the situation, the outcome you want, and any
            constraints. I will help define the right next step.
          </p>
          <p>Prefer a simple email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          <div className="expectation-card">
            <strong>What happens next</strong>
            <ol><li>I review the brief.</li><li>I reply with useful next questions.</li><li>If there is a fit, I schedule discovery and confirm scope with you.</li></ol>
          </div>
        </div>
        <form className="brief-form" ref={form} onSubmit={submitBrief} noValidate>
          <div className="form-progress" aria-label={`Brief step ${step} of 4`}>
            {[1, 2, 3, 4].map((number) => <span aria-current={number === step ? "step" : undefined} className={number <= step ? "active" : ""} key={number}>{number}</span>)}
          </div>
          <fieldset className={step === 1 ? "form-step active" : "form-step"}>
            <legend>About you</legend>
            <label>Your name<input name="name" autoComplete="name" required /></label>
            <label>Business name<input name="business" autoComplete="organization" required /></label>
            <div className="field-row">
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Phone / WhatsApp<input name="phone" autoComplete="tel" /></label>
            </div>
            <button className="button" type="submit">Continue</button>
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
              <label>Budget (optional)<input name="budget" placeholder="Include your currency" /></label>
            </div>
            <div className="form-actions"><button className="text-button" type="button" onClick={() => goTo(1)}>Back</button><button className="button" type="submit">Continue</button></div>
          </fieldset>
          <fieldset className={step === 3 ? "form-step active" : "form-step"}>
            <legend>The outcome</legend>
            <label>What would you like to build or improve?<textarea name="problem" rows={4} required maxLength={1000} /></label>
            <label>What should be different when this succeeds?<textarea name="outcome" rows={4} required /></label>
            <div className="form-actions"><button className="text-button" type="button" onClick={() => goTo(2)}>Back</button><button className="button" type="submit">Review brief</button></div>
          </fieldset>
          <fieldset className={step === 4 ? "form-step active" : "form-step"}>
            <legend>Make it yours, then send</legend>
            <label>Your editable brief<textarea name="summary" rows={12} value={summary} onChange={(event) => setSummary(event.target.value)} required /></label>
            <div className="form-actions"><button className="text-button" type="button" onClick={() => goTo(3)}>Back</button><button className="button" type="submit">Open email draft ↗</button></div>
            <p className="form-note">I only receive your brief after you send it from your email app. This website does not store your form entries. You can also copy your brief and email it directly.</p>
            {opened && <p className="form-note" role="status">Your email app was requested. Nothing has been sent yet. If it did not open, copy the brief above and email astrocodestudio@gmail.com.</p>}
          </fieldset>
        </form>
      </div>
    </section>
  );
}
