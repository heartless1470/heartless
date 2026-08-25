import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero section-frame" id="top">
      <div className="orbital-visual" aria-hidden="true">
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="orbit-node node-one" />
        <span className="orbit-node node-two" />
        <span className="orbit-core" />
      </div>
      <div className="hero-copy">
        <p className="eyebrow"><span>Digital infrastructure</span> for growing businesses</p>
        <h1>Your website should move your business forward.</h1>
        <p className="hero-lede">
          AstroCodes redesigns underperforming websites and builds tailored business systems that help
          companies attract customers, manage work, and grow with confidence.
        </p>
        <div className="button-row">
          <Link className="button" href="#brief">Plan my website redesign</Link>
          <Link className="button button-secondary" href="#systems">Discuss a business system</Link>
        </div>
        <dl className="hero-signals" aria-label="Service commitments">
          <div><dt>Built around</dt><dd>Your business goals</dd></div>
          <div><dt>Delivered as</dt><dd>Modern web experiences</dd></div>
          <div><dt>Based in</dt><dd>Jamaica · working remotely</dd></div>
        </dl>
      </div>
    </section>
  );
}
