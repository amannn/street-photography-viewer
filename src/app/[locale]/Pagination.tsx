import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
import {useTranslations} from 'next-intl';
import {OrderBy} from 'unsplash-js';
import {Link} from '@/navigation';
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

  return (
    <div className="flex items-center gap-3 py-8">
      {pageInfo.page > 1 && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page - 1)}>
          <ArrowLeftIcon height={24} />
        </Link>
      )}
      <Text variant="small" color="muted">
        {t('info', {...pageInfo, totalPages})}
      </Text>
      {pageInfo.page < totalPages && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page + 1)}>
          <ArrowRightIcon height={24} />
        </Link>
      )}
    </div>
  );
}
