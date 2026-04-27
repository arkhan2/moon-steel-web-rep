import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Steel Grade",
    moon: "Certified SS 304",
    others: "Uncertified SS 200 Series",
  },
  {
    feature: "Gauge Thickness",
    moon: "Spec-accurate (Heavy Duty)",
    others: "Reduced / Compromised",
  },
  {
    feature: "Welds",
    moon: "Precision TIG, ground & polished",
    others: "Spot/MIG, unfinished",
  },
  {
    feature: "Finish",
    moon: "#4 Food-grade satin",
    others: "Mill finish",
  },
  {
    feature: "Edges",
    moon: "Radiused, deburred (Safe)",
    others: "Sharp, hazardous",
  },
  {
    feature: "Lifespan",
    moon: "10–15+ years",
    others: "2–4 years",
  },
  {
    feature: "Hygiene Compliance",
    moon: "HACCP-ready",
    others: "Fails health inspection",
  },
];

export function Comparison() {
  return (
    <section id="comparison" className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            The Moon Steel Difference.
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't risk your operation on subpar materials. Here's exactly how our fabrication compares to standard market offerings.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {/* Headers */}
            <div className="hidden md:flex bg-secondary-foreground/5 p-6 items-center border-b border-white/10">
              <span className="font-display font-bold text-muted-foreground uppercase tracking-wider text-sm">Specification</span>
            </div>
            <div className="bg-primary p-6 items-center border-b border-white/10 md:border-l md:border-white/10">
              <span className="font-display font-bold text-primary-foreground uppercase tracking-wider text-sm">Moon Steel Standard</span>
            </div>
            <div className="bg-secondary-foreground/10 p-6 items-center border-b border-white/10 md:border-l md:border-white/10">
              <span className="font-display font-bold text-muted-foreground uppercase tracking-wider text-sm">Typical Workshop</span>
            </div>

            {/* Rows */}
            {comparisons.map((row, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="contents md:grid md:grid-cols-3"
              >
                {/* Mobile Feature Label */}
                <div className="md:hidden bg-secondary-foreground/5 p-4 border-t border-white/10 flex items-center justify-center">
                   <span className="font-display font-bold text-white text-sm">{row.feature}</span>
                </div>
                
                {/* Desktop Feature Label */}
                <div className="hidden md:flex bg-secondary-foreground/5 p-6 border-t border-white/10 items-center">
                  <span className="font-semibold text-white">{row.feature}</span>
                </div>

                <div className="bg-primary/10 p-6 border-t border-white/10 md:border-l md:border-white/10 flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-white font-medium">{row.moon}</span>
                </div>

                <div className="bg-secondary-foreground/10 p-6 border-t border-white/10 md:border-l md:border-white/10 flex items-center gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="text-muted-foreground">{row.others}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
