import clsx from 'clsx';
import {ElementType, ReactNode} from 'react';

type Props = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  inverted?: boolean;
  variant?: 'title' | 'body' | 'small';
  color?: 'default' | 'muted';
};

export default function Text({
  as: Component = 'p',
  children,
  className,
  inverted = false,
  color = 'default',
  variant = 'body',
  ...rest
}: Props) {
  return (
    <Component
      className={clsx(
        className,
        {
          title: 'text-5xl font-bold',
          body: 'text-base',
          small: 'text-sm'
        }[variant],
        (inverted
          ? {
              default: 'text-white',
              muted: 'text-white/75'
            }
          : {
              default: 'text-gray-900',
              muted: 'text-slate-500'
            })[color]
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
