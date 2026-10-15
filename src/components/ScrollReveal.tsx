import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ScrollReveal = ({ children, direction = 'up' }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : (direction === 'left' ? -100 : direction === 'right' ? 100 : 0),
      y: shouldReduceMotion ? 0 : (direction === 'up' ? 100 : direction === 'down' ? -100 : 0),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;