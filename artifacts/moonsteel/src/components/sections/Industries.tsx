import { motion } from "framer-motion";
import { Factory, HeartPulse, Building2, Snowflake, Stethoscope, UtensilsCrossed } from "lucide-react";

const industries = [
  {
    icon: UtensilsCrossed,
    name: "Hospitality & Hotels",
    description: "High-volume banquet kitchens and back-of-house."
  },
  {
    icon: Factory,
    name: "Food Service / QSR",
    description: "Efficient, durable setups for rapid service chains."
  },
  {
    icon: Stethoscope,
    name: "Pharmaceuticals",
    description: "Sterile, non-reactive environments and cleanrooms."
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Hygienic prep stations and specialized medical units."
  },
  {
    icon: Building2,
    name: "Industrial Cafeterias",
    description: "Mass-scale dining solutions for corporate facilities."
  },
  {
    icon: Snowflake,
    name: "Cold Storage",
    description: "Corrosion-resistant shelving for deep freeze environments."
  }
];

export function Industries() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="apple-section-title mb-6 section-title-accent">
            Industries We Serve.
          </h2>
          <p className="apple-section-copy max-w-2xl">
            Specialized stainless steel fabrication tailored to the rigorous demands of distinct sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 border border-border bg-card rounded-xl hover:border-primary/40 hover:shadow-sm transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
