'use client';

import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';

type Props = {};

{
  /* <div>
          <- Page 1 of 3 (20 results in total) ->
        </div> */
}

export default function Pagination({page}: Props) {
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <div>
      <Link
        href={{
          query: new URLSearchParams([
            ...searchParams.entries(),
            ['page', '2']
          ]).toString()
        }}
      >
        <ArrowLeftIcon className="h-6 w-6 text-blue-500" />
      </Link>
    </div>
  );
}
