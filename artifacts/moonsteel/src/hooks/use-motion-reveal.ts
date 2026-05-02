"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

/** Single IntersectionObserver root — share across staggered lists */
export const REVEAL_VIEWPORT = { once: true, amount: 0.15 } as const;

const listContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/** Opacity only — no y transform (avoids iOS scroll/stacking repaint issues). */
const listItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staticVariants: Variants = {
  hidden: {},
  show: {},
};

/**
 * One staggered parent + opacity fades per item. Honors prefers-reduced-motion.
 */
export function useMotionReveal() {
  const reduced = useReducedMotion();
  const skip = reduced ?? false;

  return {
    viewport: REVEAL_VIEWPORT,
    listContainerVariants: skip ? staticVariants : listContainerVariants,
    listItemVariants: skip ? staticVariants : listItemVariants,
  };
}
