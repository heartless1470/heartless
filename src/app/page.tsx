"use client";

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ background: "#0a0a0f", color: "#f0ede8", minHeight: "100vh" }}>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <Features />
      <Testimonials />
      <About />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

