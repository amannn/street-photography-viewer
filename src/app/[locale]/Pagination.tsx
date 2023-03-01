import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
import {Link, useTranslations} from 'next-intl';
import {OrderBy} from 'unsplash-js';
import {UrlObject} from 'url';
import PageInfo from './PageInfo';
import Text from './Text';

type Props = {
  pageInfo: PageInfo;
  orderBy: OrderBy;
};

export default function Pagination({pageInfo, orderBy}: Props) {
  const t = useTranslations('Pagination');
  const totalPages = Math.ceil(pageInfo.totalElements / pageInfo.size);

  function getHref(page: number): UrlObject {
    // Keep an existing `orderBy` parameter if it exists.
    return {
      pathname: '/',
      query: {orderBy, page}
    };
  }

  // Vercel currently doesn't support the `vary` header which is used to
  // differentiate prefetch requests, therefore manually opt-out of these.
  // https://github.com/vercel/vercel/discussions/7612#discussioncomment-2434736
  const prefetch = false;

  return (
    <div className="flex items-center gap-3 py-8">
      {pageInfo.page > 1 && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page - 1)} prefetch={prefetch}>
          <ArrowLeftIcon height={24} />
        </Link>
      )}
      <Text variant="small" color="muted">
        {t('info', {...pageInfo, totalPages})}
      </Text>
      {pageInfo.page < totalPages && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page + 1)} prefetch={prefetch}>
          <ArrowRightIcon height={24} />
        </Link>
      )}
    </div>
  );
}
