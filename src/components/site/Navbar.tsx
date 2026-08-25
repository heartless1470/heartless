"use client";

import Link from "next/link";
import { useState } from "react";
import BrandMark from "./BrandMark";

const links = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["Client portal", "/client-portal"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <BrandMark />
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <div className={`site-menu${open ? " is-open" : ""}`} id="site-menu">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="button button-small" href="#brief" onClick={() => setOpen(false)}>
            Start a project
          </Link>
        </div>
      </nav>
    </header>
  );
}
