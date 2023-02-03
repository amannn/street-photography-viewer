'use client';

import {useLocalizedRouter} from 'next-intl/client';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {OrderBy} from 'unsplash-js';
import Select from './Select';

type Props = {
  orderBy: OrderBy;
  children: ReactNode;
};

export default function OrderBySelect({orderBy, children}: Props) {
  const [isTransitioning, startTransition] = useTransition();
  const router = useLocalizedRouter();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      router.replace('/?orderBy=' + event.target.value);
    });
  }

  return (
    <Select
      defaultValue={orderBy}
      onChange={onChange}
      disabled={isTransitioning}
    >
      {children}
    </Select>
  );
}
