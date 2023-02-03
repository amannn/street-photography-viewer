'use client';

import {useRouter} from 'next/navigation';
import {ChangeEvent, useTransition} from 'react';
import {OrderBy} from 'unsplash-js';

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
    <select
      className="w-full rounded-md border-gray-300 py-4 text-base text-gray-500 disabled:opacity-50"
      defaultValue={orderBy}
      onChange={onChange}
      disabled={isTransitioning}
    >
      <option value={OrderBy.POPULAR}>Popular</option>
      <option value={OrderBy.LATEST}>Latest</option>
    </select>
  );
}
