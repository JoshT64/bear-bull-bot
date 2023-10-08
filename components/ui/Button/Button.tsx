'use client';

import styles from './Button.module.css';
import LoadingDots from '@/components/ui/LoadingDots';
import cn from 'classnames';
import React, { forwardRef, useRef, ButtonHTMLAttributes } from 'react';
import { mergeRefs } from 'react-merge-refs';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'slim' | 'flat' | 'subscribe';
  active?: boolean;
  width?: number;
  loading?: boolean;
  Component?: React.ComponentType;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef(null);
  const rootClassName = cn(
    {
      [styles.root]: variant !== 'subscribe',
      [styles.slim]: variant === 'slim',
      [styles.subscribe]: variant === 'subscribe',
      [styles.loading]: loading,
      [styles.disabled]: disabled
    },
    className
  );

  console.log(variant);
  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
