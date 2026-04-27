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
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="layer-1 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 relative shadow-sm">
                    <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm shadow-sm">
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
