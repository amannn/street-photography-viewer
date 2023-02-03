import {createApi, OrderBy} from 'unsplash-js';
import UnsplashViewer from './UnsplashViewer';

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
  };
};

export default async function Index({searchParams}: Props) {
  const orderBy = searchParams.orderBy || OrderBy.POPULAR;
  const topicSlug = 'street-photography';

  const [topicRequest, photosRequest] = await Promise.all([
    unsplash.topics.get({topicIdOrSlug: topicSlug}),
    unsplash.topics.getPhotos({
      topicIdOrSlug: topicSlug,
      perPage: 6,
      orderBy,
      page: 1
    })
  ]);

  return (
    <UnsplashViewer
      orderBy={orderBy}
      photos={photosRequest.response.results}
      topic={topicRequest.response}
    />
  );
}
