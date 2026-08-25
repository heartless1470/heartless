import BriefForm from "@/components/site/BriefForm";
import ClientExperience from "@/components/site/ClientExperience";
import FAQ from "@/components/site/FAQ";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import Navbar from "@/components/site/Navbar";
import Pricing from "@/components/site/Pricing";
import Process from "@/components/site/Process";
import Proof from "@/components/site/Proof";
import Services from "@/components/site/Services";

export default function Home() {
  return (
    <main className="site-shell">
      <Navbar />
      <Hero />
      <Proof />
      <Services />
      <Process />
      <Pricing />
      <ClientExperience />
      <FAQ />
      <BriefForm />
      <Footer />
    </main>
  );
}
