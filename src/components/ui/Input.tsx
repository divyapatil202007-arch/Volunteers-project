import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              styles.input,
              icon && styles.withIcon,
              error && styles.error,
              className
            )}
            {...props}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
