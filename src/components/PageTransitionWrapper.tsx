"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const transitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen w-full transition-colors duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          variants={transitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransitionWrapper;
