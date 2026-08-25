import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/site/BrandMark";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="access-nav"><BrandMark /><Link href="/">Back to website</Link></header>
      <article>
        <p className="eyebrow">Privacy summary</p><h1>Clear handling of project information.</h1>
        <p>Last updated August 25, 2026.</p>
        <h2>Information you choose to share</h2><p>The public project brief opens your email application. I do not store that form content on this website. I use information you send by email only to evaluate and respond to your enquiry.</p>
        <h2>Site measurement</h2><p>The site uses Vercel Analytics and Speed Insights to understand aggregate usage and performance. These services may process technical request information according to Vercel’s policies.</p>
        <h2>Client and studio access</h2><p>I collect secure project data only through authenticated access. Client sign-in is not live yet, and you should not send sensitive project data by email. When enabled, access will be invitation-only and limited to your assigned project records; I will not use shared client credentials.</p>
        <h2>Questions</h2><p>Contact <a href="mailto:astrocodestudio@gmail.com">astrocodestudio@gmail.com</a> about privacy or project information.</p>
      </article>
    </main>
  );
}
