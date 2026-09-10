import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-frame footer-main">
        <div><BrandMark /><p>Website redesign and custom business systems for growing companies.</p></div>
        <nav aria-label="Footer services"><strong>Services</strong><Link href="/#services">Website Refresh</Link><Link href="/#services">Business Website Redesign</Link><Link href="/#systems">Custom Business Systems</Link><Link href="/#services">Website Care</Link></nav>
        <nav aria-label="Footer company"><strong>The studio</strong><Link href="/#work">Selected work</Link><Link href="/#about">Meet the developer</Link><Link href="/#craft">The craft</Link><Link href="/#process">Process</Link><Link href="/#brief">Start a brief</Link></nav>
        <nav aria-label="Footer contact"><strong>Contact</strong><a href="mailto:astrocodestudio@gmail.com">astrocodestudio@gmail.com</a><span>Jamaica · Remote</span></nav>
      </div>
      <div className="section-frame footer-legal">
        <span>© {new Date().getFullYear()} AstroCodes</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Project terms</Link><a href="https://github.com/heartless1470" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
      </div>
    </footer>
  );
}
