import {useTranslations} from 'next-intl';
import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import {OrderBy} from 'unsplash-js';
import OrderBySelect from './OrderBySelect';
import Header from './Header';
import PhotoGrid from './PhotoGrid';
import Wrapper from './Wrapper';
import Pagination from './Pagination';
import PageInfo from './PageInfo';
import ScrollManager from './ScrollManager';
import Footer from './Footer';

type Props = {
  coverPhoto: Photo;
  orderBy: OrderBy;
  pageInfo: PageInfo;
  photos: Photo[];
};

export default function PhotoViewer({
  coverPhoto,
  orderBy,
  photos,
  pageInfo
}: Props) {
  const t = useTranslations('PhotoViewer');

  return (
    <>
      <Header
        backgroundUrl={coverPhoto.urls.full}
        title={t('title')}
        description={t('description')}
      />
      <ScrollManager routeKey={pageInfo.page}>
        <Wrapper className="py-8">
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
      </ScrollManager>
      <Footer />
    </>
  );
}
