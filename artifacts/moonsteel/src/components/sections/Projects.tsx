import { motion } from "framer-motion";

const projects = [
  {
    image: "/images/projects/hotel-kitchen.png",
    title: "Hotel Kitchen Prep Area",
    scope: "Prep Tables, Sinks, Wall Shelving",
  },
  {
    image: "/images/projects/hospital-prep.png",
    title: "Hospital Sterile Prep Station",
    scope: "Custom Fabrication, Seamless Welds",
  },
  {
    image: "/images/projects/restaurant-line.png",
    title: "Restaurant Cooking Line",
    scope: "Exhaust Hood, Equipment Stands",
  },
  {
    image: "/images/projects/pharma-cleanroom.png",
    title: "Pharma Cleanroom Workbench",
    scope: "Hygienic Workstations, Drawers",
  },
  {
    image: "/images/projects/qsr-kitchen.png",
    title: "QSR Back-of-House",
    scope: "Prep Counters, Assembly Tables",
  },
  {
    image: "/images/projects/industrial-cafeteria.png",
    title: "Industrial Cafeteria Serving Line",
    scope: "Hot/Cold Displays, Tray Slides",
  },
  {
    image: "/images/projects/custom-shelving.png",
    title: "Cold Storage Shelving",
    scope: "Heavy-Duty Racking, Slotted Shelves",
  },
  {
    image: "/images/projects/grease-trap.png",
    title: "Commercial Grease Interceptor",
    scope: "Custom Sized Grease Trap, Plumbing",
  }
];

export function Projects() {
  return (
    <section id="projects" className="layer-1 py-24 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="apple-section-title mb-6 section-title-accent">
            Proven Installations.
          </h2>
          <p className="apple-section-copy">
            Our fabrication speaks for itself. Explore recent high-performance stainless steel installations across various rigorous environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="motion-reveal group cursor-pointer"
            >
              <div className="layer-2 aspect-[4/3] overflow-hidden mb-4 relative rounded-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {project.scope}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
