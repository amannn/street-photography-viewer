import {createApi, OrderBy} from 'unsplash-js';
import PhotoViewer from './PhotoViewer';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});

// Since we're using query parameters that are only
// known at request time, make sure we're using
// dynamic rendering (i.e. no SSG).
export const dynamic = 'force-dynamic';

type Props = {
  searchParams?: {
    orderBy?: OrderBy;
    page?: string;
  };
};

export default async function Index({searchParams}: Props) {
  const topicSlug = 'street-photography';
  const orderBy = searchParams.orderBy || OrderBy.POPULAR;
  const page = parseInt(searchParams.page || '1');
  const size = 6;

  const [topicRequest, photosRequest] = await Promise.all([
    unsplash.topics.get({topicIdOrSlug: topicSlug}),
    unsplash.topics.getPhotos({
      topicIdOrSlug: topicSlug,
      perPage: 6,
      orderBy,
      page
    })
  ]);

  return (
    <PhotoViewer
      orderBy={orderBy}
      photos={photosRequest.response.results}
      topic={topicRequest.response}
      pageInfo={{page, size, totalElements: topicRequest.response.total_photos}}
    />
  );
}
