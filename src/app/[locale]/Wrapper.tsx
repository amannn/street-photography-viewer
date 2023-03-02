import clsx from 'clsx';

export default function Wrapper({children, className}) {
  return (
    <div className={clsx('m-auto max-w-3xl px-4', className)}>{children}</div>
  );
}
