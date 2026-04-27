import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Products } from "@/components/sections/Products";
import { Comparison } from "@/components/sections/Comparison";
import { MaterialEducation } from "@/components/sections/MaterialEducation";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Industries } from "@/components/sections/Industries";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        <TrustBand />
        <ProblemSolution />
        <Products />
        <Comparison />
        <MaterialEducation />
        <Process />
        <Projects />
        <Industries />
        <ContactForm />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
