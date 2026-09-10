import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Proof from "@/components/site/Proof";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import FAQ from "@/components/site/FAQ";
import BriefForm from "@/components/site/BriefForm";
import Footer from "@/components/site/Footer";
import { Founder, FeaturedCase, CraftLab } from "@/components/site/DeveloperProof";
import PersonalProjects from "@/components/site/PersonalProjects";

export default function Home() {
  return (
    <main className="site-shell developer-site">
      <a className="developer-skip" href="#work">Skip to work</a>
      <Navbar />
      <Hero />
      <Founder />
      <FeaturedCase />
      <Proof />
      <PersonalProjects />
      <CraftLab />
      <Services />
      <Process />
      <FAQ />
      <BriefForm />
      <Footer />
    </main>
  );
}
