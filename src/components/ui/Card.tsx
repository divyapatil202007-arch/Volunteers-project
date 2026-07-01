import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import styles from './Card.module.css';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles.card,
        glass && styles.glass,
        hoverable && styles.hoverable,
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const MotionCard = forwardRef<HTMLDivElement, CardProps & HTMLMotionProps<"div">>(
  ({ className, glass, hoverable, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        styles.card,
        glass && styles.glass,
        hoverable && styles.hoverable,
        className
      )}
      {...props}
    />
  )
);
MotionCard.displayName = 'MotionCard';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.header, className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(styles.title, className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(styles.description, className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.content, className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.footer, className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, MotionCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
