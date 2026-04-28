import { motion } from "framer-motion";
import { MessageSquare, PenTool, Hammer, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "We analyze your space, workflow requirements, and operational capacity.",
  },
  {
    icon: PenTool,
    title: "Design / Drawing",
    description: "Detailed AutoCAD/DXF layouts provided for precision alignment and approval.",
  },
  {
    icon: Hammer,
    title: "Fabrication",
    description: "Engineered in our Karachi facility using certified SS 304 and precision machinery.",
  },
  {
    icon: Truck,
    title: "Delivery & Installation",
    description: "Seamless on-site installation by our expert teams to ensure perfect fit and finish.",
  }
];

export function Process() {
  return (
    <section id="process" className="layer-0 py-24 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="apple-section-title mb-6">
            From Concept to Kitchen.
          </h2>
          <p className="apple-section-copy">
            A systematic, transparent process ensuring your facility is delivered on time, to spec, without surprises.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(i, 5) * 0.06 }}
                  className="motion-reveal flex flex-col items-center text-center group overflow-visible pt-2 md:pt-0"
                >
                  <div className="layer-1 relative mb-6 flex h-20 w-20 shrink-0 items-center justify-center overflow-visible rounded-full shadow-sm transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
                    <Icon className="h-7 w-7 text-foreground transition-colors group-hover:text-primary md:h-8 md:w-8" />
                    <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground shadow-sm md:-right-2 md:-top-2 md:h-8 md:w-8 md:text-sm">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
