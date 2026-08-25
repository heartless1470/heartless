import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero section-frame" id="top">
      <div className="hero-ruler" aria-hidden="true">
        <span>00</span><i /><i /><i /><i /><i /><span>100</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow"><span>Web design</span> / business systems</p>
        <h1>Websites that win clients on sight.</h1>
        <p className="hero-lede">
          I redesign business websites that need to look the part and bring in work—and build private web
          systems when the problem is happening behind the scenes.
        </p>
        <div className="button-row">
          <Link className="button" href="#work">View work <span aria-hidden="true">→</span></Link>
          <Link className="button button-secondary" href="#brief">Start a project</Link>
        </div>
        <dl className="hero-signals" aria-label="Service commitments">
          <div><dt>01 / Focus</dt><dd>Business outcomes first</dd></div>
          <div><dt>02 / Delivery</dt><dd>Fast, maintainable web builds</dd></div>
          <div><dt>03 / Base</dt><dd>Jamaica · working remotely</dd></div>
        </dl>
      </div>
      <p className="hero-side-note" aria-hidden="true">SCROLL TO INSPECT / 2026</p>
    </section>
  );
}
