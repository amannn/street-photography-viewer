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
  return (
    <>
      <Header
        backgroundUrl={topic.cover_photo.urls.full}
        title="Street photography browser"
        description="Street photography captures real-life moments and human interactions in public places. It is a way to tell visual stories and freeze fleeting moments of time, turning the ordinary into the extraordinary."
      />
      <Wrapper>
        <OrderBySelect orderBy={orderBy} />
        <PhotoGrid photos={photos} />
        <Pagination pageInfo={pageInfo} />
      </Wrapper>
    </>
  );
}
