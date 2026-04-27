import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-secondary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Brushed stainless steel background"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-primary font-display font-bold tracking-widest text-sm uppercase">
              Engineering Grade Fabrication
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6"
          >
            Precision Stainless Steel <br className="hidden md:block" />
            For Kitchens That <span className="text-transparent bg-clip-text bg-gradient-to-r from-muted to-muted-foreground">Actually Last.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Certified SS 304. Accurate gauges. Flawless TIG welding. We build commercial kitchen equipment, hospital sterile prep stations, and industrial solutions designed to endure 15+ years of severe use. No compromises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-highlight/15 border border-highlight/40 rounded-sm"
          >
            <Zap className="w-3.5 h-3.5 text-highlight" strokeWidth={2.5} />
            <span className="text-highlight font-semibold tracking-wide text-xs uppercase">
              Quote Returned in 24 Hours
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide text-base h-14 px-8 group"
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Request a Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold tracking-wide text-base h-14 px-8 group"
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Download className="mr-2 w-5 h-5" />
              Upload Drawings
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Industrial accent detail */}
      <div className="absolute bottom-0 right-0 w-64 h-64 border-t border-l border-white/5 rounded-tl-full opacity-50 pointer-events-none" />
    </section>
  );
}