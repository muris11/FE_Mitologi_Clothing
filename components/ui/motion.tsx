"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";

const easeOutExpo = [0.25, 1, 0.5, 1] as const;

// ─────────────────────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// ─────────────────────────────────────────────────────────────
// Reusable Motion Components
// ─────────────────────────────────────────────────────────────

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * MotionSection - Section wrapper with fade-in-up animation
 * Usage: <MotionSection>Content</MotionSection>
 */
export const MotionSection = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, delay = 0, ...props }, ref) => (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      transition={{ delay, duration: 0.6 }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  ),
);
MotionSection.displayName = "MotionSection";

/**
 * MotionDiv - Generic motion div with fade-in-up
 * Usage: <MotionDiv>Content</MotionDiv>
 */
export const MotionDiv = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      transition={{ delay, duration: 0.6 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
MotionDiv.displayName = "MotionDiv";

/**
 * MotionHeading - Heading with fade-in animation
 * Usage: <MotionHeading as="h2">Title</MotionHeading>
 */
export const MotionHeading = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ delay, duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
MotionHeading.displayName = "MotionHeading";

/**
 * MotionCard - Card with scale-in animation
 * Usage: <MotionCard>Content</MotionCard>
 */
export const MotionCard = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, delay = 0, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleIn}
      transition={{ delay, duration: 0.5 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
MotionCard.displayName = "MotionCard";

/**
 * MotionImage - Image with reveal animation
 * Usage: <MotionImage src="..." alt="..." />
 */
interface MotionImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  className?: string;
}

export const MotionImage = forwardRef<HTMLImageElement, MotionImageProps>(
  ({ src, alt, className, ...props }, ref) => (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className={className}
      {...props}
    />
  ),
);
MotionImage.displayName = "MotionImage";

/**
 * StaggerGrid - Container for staggered grid animations
 * Usage:
 * <StaggerGrid>
 *   <StaggerGridItem>Item 1</StaggerGridItem>
 *   <StaggerGridItem>Item 2</StaggerGridItem>
 * </StaggerGrid>
 */
export const StaggerGrid = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
StaggerGrid.displayName = "StaggerGrid";

/**
 * StaggerGridItem - Individual item in staggered grid
 */
export const StaggerGridItem = forwardRef<HTMLDivElement, MotionSectionProps>(
  ({ children, className, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
StaggerGridItem.displayName = "StaggerGridItem";

/**
 * MotionNumber - Animated counter for numbers
 * Usage: <MotionNumber value={10} suffix="+" />
 */
interface MotionNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export const MotionNumber = ({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: MotionNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, hasStarted, value]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={className}
      onViewportEnter={() => setHasStarted(true)}
    >
      {prefix}
      <span>{displayValue}</span>
      {suffix}
    </motion.span>
  );
};

// ─────────────────────────────────────────────────────────────
// Export variants for custom usage
// ─────────────────────────────────────────────────────────────

export { motion };
export default motion;
