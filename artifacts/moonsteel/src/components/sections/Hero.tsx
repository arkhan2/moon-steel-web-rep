import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Zap } from "lucide-react";

const stripeImages = [
  {
    src: "/images/pc-karachi-receiving-area.png",
    label: "PC Karachi - Receiving Area",
  },
  {
    src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80",
    label: "Prep & Sinks",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=80",
    label: "Stainless Workstations",
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=80",
    label: "Industrial Flow",
  },
];

export function Hero() {
  const [hoveredStripe, setHoveredStripe] = useState<number | null>(null);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background pt-20 md:pt-24">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid min-h-[calc(90vh-5rem)] grid-cols-1 items-center gap-8 md:min-h-[calc(90vh-6rem)] md:grid-cols-[minmax(0,6fr)_minmax(0,4fr)] md:gap-0">
          <div className="relative flex items-center self-center">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.25) 70%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-primary" />
                <span className="apple-eyebrow text-primary">Engineering Grade Fabrication</span>
              </div>

              <h1 className="mb-6 text-5xl font-display font-semibold leading-[1.1] tracking-tight text-foreground md:text-7xl">
                Precision Stainless Steel <br className="hidden md:block" />
                For Kitchens That <span className="text-primary">Actually Last.</span>
              </h1>

              <p className="apple-section-copy mb-10 max-w-2xl">
                Certified SS 304. Accurate gauges. Flawless TIG welding. We build commercial kitchen
                equipment, hospital sterile prep stations, and industrial solutions designed to endure 15+
                years of severe use. No compromises.
              </p>

              <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                <span className="text-xs font-medium uppercase tracking-[0.06em] text-primary">
                  Quote Returned in 24 Hours
                </span>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="group bg-primary font-medium text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-foreground/20 font-medium text-foreground hover:bg-foreground/5"
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Upload Drawings
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden h-[80vh] max-h-[calc(90vh-5rem)] self-end overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm md:-ml-16 md:relative md:z-20 md:flex md:flex-col lg:-ml-20">
            {stripeImages.map((stripe, i) => {
              const active = hoveredStripe === i;
              const hasHover = hoveredStripe !== null;
              return (
                <div
                  key={stripe.label}
                  onMouseEnter={() => setHoveredStripe(i)}
                  onMouseLeave={() => setHoveredStripe(null)}
                  className={`group relative overflow-hidden border-t border-border/50 first:border-t-0 transition-all duration-500 ease-in-out ${
                    active ? "flex-[5]" : hasHover ? "flex-[0.9]" : "flex-1"
                  }`}
                >
                  <img
                    src={stripe.src}
                    alt={stripe.label}
                    className={`h-full w-full object-cover object-center transition-all duration-500 ease-in-out ${
                      active
                        ? "scale-100 grayscale-0 brightness-100 contrast-100"
                        : "scale-100 grayscale-[0.25] brightness-90 contrast-90"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                  <div
                    className={`absolute bottom-3 right-3 rounded bg-black/45 px-2 py-1 text-xs font-medium text-white transition-all duration-500 ease-in-out ${
                      active ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {stripe.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="md:hidden">
            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
              {stripeImages.map((stripe) => (
                <article
                  key={stripe.label}
                  className="relative h-40 min-w-[75%] snap-start overflow-hidden rounded-lg border border-border/70"
                >
                  <img
                    src={stripe.src}
                    alt={stripe.label}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 rounded bg-black/45 px-2 py-1 text-xs font-medium text-white">
                    {stripe.label}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-tl-full border-l border-t border-foreground/10 opacity-60" />
    </section>
  );
}