import { useEffect, useMemo, useState } from "react";
import { fetchCustomerLogos } from "@/features/admin/services/customerLogos";
import type { CustomerLogo } from "@/features/admin/types";

const clients = [
  "Mövenpick", "Marriott", "Sheraton", "Serena", "Avari", "Pearl Continental",
  "McDonald's", "KFC", "Pizza Hut", "Nando's", "Costa Coffee",
  "AKUH", "Pfizer", "Novartis", "Searle", "Yamaha", "PSO", "Shell"
];

export function TrustBand() {
  const [logos, setLogos] = useState<CustomerLogo[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetchCustomerLogos()
      .then((rows) => {
        if (isMounted) setLogos(rows);
      })
      .catch(() => {
        // Keep static fallback list when logos cannot be loaded.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const hasLogos = logos.length > 0;
  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) return [];

    // Build a sufficiently long base set so the marquee never exposes blanks,
    // even when only a few logos are uploaded.
    const minItemsPerSet = 12;
    const repeatCount = Math.max(2, Math.ceil(minItemsPerSet / logos.length));
    const baseSet = Array.from({ length: repeatCount }).flatMap((_, repeatIdx) =>
      logos.map((logo) => ({
        logo,
        key: `${logo.id}-set-${repeatIdx}`,
      })),
    );

    // Duplicate the base set for seamless infinite translateX loop.
    return [...baseSet, ...baseSet].map((item, idx) => ({
      ...item,
      loopKey: `${item.key}-loop-${idx}`,
    }));
  }, [logos]);

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

        {hasLogos ? (
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="clients-carousel-track">
              {marqueeLogos.map(({ logo, loopKey }) => (
                <a
                  key={loopKey}
                  href={logo.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clients-carousel-item"
                  aria-label="View customer logo"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.image_url}
                    alt="Customer logo"
                    className="h-10 w-auto max-w-[140px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 opacity-60 grayscale">
            {clients.map((client) => (
              <div
                key={client}
                className="text-lg md:text-xl font-display font-semibold text-muted-foreground"
              >
                {client}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}