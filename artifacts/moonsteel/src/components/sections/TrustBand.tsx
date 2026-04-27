import { motion } from "framer-motion";

const clients = [
  "Mövenpick", "Marriott", "Sheraton", "Serena", "Avari", "Pearl Continental",
  "McDonald's", "KFC", "Pizza Hut", "Nando's", "Costa Coffee",
  "AKUH", "Pfizer", "Novartis", "Searle", "Yamaha", "PSO", "Shell"
];

export function TrustBand() {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-border/50 pb-16">
          <div className="flex flex-col items-center justify-start min-h-[88px] text-center">
            <p className="text-5xl md:text-6xl font-display font-semibold text-foreground leading-none">15+</p>
            <p className="text-sm font-medium text-muted-foreground mt-3">Years Experience</p>
          </div>
          <div className="flex flex-col items-center justify-start min-h-[88px] text-center">
            <p className="text-5xl md:text-6xl font-display font-semibold text-foreground leading-none">850+</p>
            <p className="text-sm font-medium text-muted-foreground mt-3">Projects Delivered</p>
          </div>
          <div className="flex flex-col items-center justify-start min-h-[88px] text-center">
            <p className="text-5xl md:text-6xl font-display font-semibold text-foreground leading-none">100%</p>
            <p className="text-sm font-medium text-muted-foreground mt-3">Certified SS 304</p>
          </div>
          <div className="flex flex-col items-center justify-start min-h-[88px] text-center">
            <p className="text-5xl md:text-6xl font-display font-semibold text-primary leading-none">0</p>
            <p className="text-sm font-medium text-muted-foreground mt-3">Compromises</p>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="apple-eyebrow">
            Trusted by Industry Leaders
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 opacity-60 grayscale">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-lg md:text-xl font-display font-semibold text-muted-foreground"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}