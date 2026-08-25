const PORTAL_EMAIL = "astrocodestudio@gmail.com";

const PORTAL_REQUEST_SUBJECT = "Request for AstroCodes client portal access";

const PORTAL_REQUEST_BODY = `Hello AstroCodes,

I would like to request invitation-only access to the AstroCodes client portal.

Name: [Your name]
Business: [Your business]
Project name: [Your project name]
Preferred email for invitation: [Your email]

I understand this request does not automatically create an account. Portal access is invitation-only, and AstroCodes will confirm eligibility before sending an invitation to the verified email address.

Thank you.`;

export const portalAccessMailto = `mailto:${PORTAL_EMAIL}?subject=${encodeURIComponent(PORTAL_REQUEST_SUBJECT)}&body=${encodeURIComponent(PORTAL_REQUEST_BODY)}`;
