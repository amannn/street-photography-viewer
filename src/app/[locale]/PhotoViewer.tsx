import {useTranslations} from 'next-intl';
import {Full as Topic} from 'unsplash-js/dist/methods/topics/types';
import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import {OrderBy} from 'unsplash-js';
import OrderBySelect from './OrderBySelect';
import Header from './Header';
import PhotoGrid from './PhotoGrid';
import Wrapper from './Wrapper';
import Pagination from './Pagination';
import PageInfo from './PageInfo';

type Props = {
  pageInfo: PageInfo;
  topic: Topic;
  photos: Photo[];
  orderBy: OrderBy;
};

export default function PhotoViewer({pageInfo, topic, photos, orderBy}: Props) {
  const t = useTranslations('PhotoViewer');

  return (
    <>
      <Header
        backgroundUrl={topic.cover_photo.urls.full}
        title={t('title')}
        description={t('description')}
      />
      <Wrapper>
        <OrderBySelect orderBy={orderBy}>
          {[OrderBy.POPULAR, OrderBy.LATEST].map((value) => (
            <option key={value} value={value}>
              {t('orderBy', {value})}
            </option>
          ))}
        </OrderBySelect>
        <PhotoGrid photos={photos} />
        <Pagination orderBy={orderBy} pageInfo={pageInfo} />
      </Wrapper>
    </>
  );
}
