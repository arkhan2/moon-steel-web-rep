"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { fetchCustomerLogos, fetchLogoSliderSpeed } from "@/features/admin/services/customerLogos";
import type { CustomerLogo } from "@/features/admin/types";

const LOGOS_CACHE_KEY = "moonsteel:customer-logos";
const LOGO_SPEED_CACHE_KEY = "moonsteel:logo-slider-speed";

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export function TrustBand() {
  const [logos, setLogos] = useState<CustomerLogo[]>([]);
  const [sliderSpeed, setSliderSpeed] = useState(52);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Render cached logos immediately (helps with perceived mobile load time).
    try {
      const cached = window.sessionStorage.getItem(LOGOS_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as CustomerLogo[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLogos(parsed);
        }
      }
    } catch {
      // Ignore cache parse/storage errors.
    }

    fetchCustomerLogos()
      .then((rows) => {
        if (isMounted) setLogos(rows);
        try {
          window.sessionStorage.setItem(LOGOS_CACHE_KEY, JSON.stringify(rows));
        } catch {
          // Ignore storage write errors.
        }
      })
      .catch(() => {
        // Keep static fallback list when logos cannot be loaded.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Use cached speed instantly to avoid visual jump.
    try {
      const cachedSpeed = window.sessionStorage.getItem(LOGO_SPEED_CACHE_KEY);
      if (cachedSpeed) {
        const parsed = Number(cachedSpeed);
        if (Number.isFinite(parsed) && parsed >= 12 && parsed <= 120) {
          setSliderSpeed(parsed);
        }
      }
    } catch {
      // Ignore cache parse/storage errors.
    }

    fetchLogoSliderSpeed()
      .then((seconds) => {
        if (isMounted) setSliderSpeed(seconds);
        try {
          window.sessionStorage.setItem(LOGO_SPEED_CACHE_KEY, String(seconds));
        } catch {
          // Ignore storage write errors.
        }
      })
      .catch(() => {
        // Keep default when settings cannot be loaded.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (logos.length === 0) {
      setImagesLoaded(false);
      return;
    }

    let cancelled = false;
    setImagesLoaded(false);

    const urls = [...new Set(logos.map((l) => l.image_url).filter(Boolean))];

    Promise.all(urls.map(preloadImage)).then(() => {
      if (!cancelled) setImagesLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [logos]);

  const hasLogos = logos.length > 0;
  const marqueeLogos = useMemo(() => {
    if (logos.length === 0) return [];

    // Build a sufficiently long base set so the marquee never exposes blanks,
    // even when only a few logos are uploaded.
    const minItemsPerSet = 6;
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
            <p className="text-5xl md:text-6xl font-display font-semibold text-foreground leading-none">50+</p>
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

        {hasLogos && imagesLoaded ? (
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className="clients-carousel-track"
              style={
                {
                  "--clients-marquee-duration": `${sliderSpeed}s`,
                } as CSSProperties
              }
            >
              {marqueeLogos.map(({ logo, loopKey }) => (
                <a
                  key={loopKey}
                  href={logo.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clients-carousel-item flex items-center justify-center"
                  aria-label="View customer logo"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.image_url}
                    alt="Customer logo"
                    loading="eager"
                    decoding="async"
                    className="max-h-10 w-auto max-w-full object-contain sm:max-h-[44px]"
                  />
                </a>
              ))}
            </div>
          </div>
        ) : hasLogos ? (
          <div
            className="h-[60px] sm:h-20 w-full rounded-xl border border-border/50 bg-muted/30"
            aria-hidden
          />
        ) : null}
      </div>
    </section>
  );
}