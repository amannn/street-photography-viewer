import clsx from 'clsx';
import {ReactNode} from 'react';

type Props = {
  className?: string;
  children: ReactNode;
};

export default function Wrapper({children, className}: Props) {
  return (
    <div className={clsx('m-auto max-w-3xl px-4', className)}>{children}</div>
  );
}
