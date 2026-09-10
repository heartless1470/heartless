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
        <h2>Project enquiries</h2><p>You do not need an account to enquire about a project. Please do not include passwords, payment details, or sensitive business records in your brief. If the project needs sensitive information, I will agree an appropriate way to share it with you.</p>
        <h2>Questions</h2><p>Contact <a href="mailto:astrocodestudio@gmail.com">astrocodestudio@gmail.com</a> about privacy or project information.</p>
      </article>
    </main>
  );
}
