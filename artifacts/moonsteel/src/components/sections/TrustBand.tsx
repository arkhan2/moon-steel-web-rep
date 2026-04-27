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
          <div>
            <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">15+</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">850+</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Projects Delivered</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">100%</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Certified SS 304</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">0</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Compromises</p>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-sm font-display font-bold uppercase tracking-widest text-muted-foreground">
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
              className="text-lg md:text-xl font-display font-bold text-muted-foreground"
            >
              {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}