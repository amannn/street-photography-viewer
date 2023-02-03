'use client';

import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import PageInfo from './PageInfo';
import Text from './Text';

type Props = {
  pageInfo: PageInfo;
};

export default function Pagination({pageInfo}: Props) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(pageInfo.totalElements / pageInfo.size);

  function linkToPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return {query: params.toString()};
  }

  return (
    <div className="flex items-center gap-3 py-8">
      {pageInfo.page > 1 && (
        <Link aria-label="Previous" href={linkToPage(pageInfo.page - 1)}>
          <ArrowLeftIcon height={24} />
        </Link>
      )}
      <Text variant="small" color="muted">
        Page {pageInfo.page} of {totalPages} ({pageInfo.totalElements} results
        in total)
      </Text>
      {pageInfo.page < totalPages && (
        <Link aria-label="Next" href={linkToPage(pageInfo.page + 1)}>
          <ArrowRightIcon height={24} />
        </Link>
      )}
    </div>
  );
}
