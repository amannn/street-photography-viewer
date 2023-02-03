'use client';

import {useRouter} from 'next/navigation';
import {ChangeEvent, useTransition} from 'react';
import {OrderBy} from 'unsplash-js';
import Select from './Select';

type Props = {
  orderBy: OrderBy;
};

export default function OrderBySelect({orderBy}: Props) {
  const [isTransitioning, startTransition] = useTransition();
  const router = useRouter();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      const url = new URL(document.location.href);
      url.searchParams.set('orderBy', event.target.value);
      router.replace(url.pathname + url.search);
    });
  }

  return (
    <Select
      defaultValue={orderBy}
      onChange={onChange}
      disabled={isTransitioning}
    >
      <Select.Option value={OrderBy.POPULAR}>Popular</Select.Option>
      <Select.Option value={OrderBy.LATEST}>Latest</Select.Option>
    </Select>
  );
}
