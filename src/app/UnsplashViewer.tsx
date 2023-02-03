import {Full as Topic} from 'unsplash-js/dist/methods/topics/types';
import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import Image from 'next/image';
import {OrderBy} from 'unsplash-js';
import OrderBySelect from './OrderBySelect';
import Pagination from './Pagination';

type Props = {
  topic: Topic;
  photos: Photo[];
  orderBy: OrderBy;
};

export default function UnsplashViewer({topic, photos, orderBy}: Props) {
  return (
    <div>
      <div className="relative">
        <Image
          sizes="100vw"
          priority
          src={topic.cover_photo.urls.full}
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/75" />
        <div className="relative m-auto max-w-3xl pt-56 pb-14 text-white">
          <h1 className="text-5xl font-bold">Street photography</h1>
          <p className="mt-4 max-w-xl text-base">
            Street photography captures real-life moments and human interactions
            in public places. It is a way to tell visual stories and freeze
            fleeting moments of time, turning the ordinary into the
            extraordinary.
          </p>
        </div>
      </div>
      <div className="m-auto max-w-3xl py-8">
        <div className="flex justify-between gap-4">
          <p className="py-4 text-base text-gray-500">
            {topic.total_photos} photos
          </p>
          <div className="w-24">
            <OrderBySelect orderBy={orderBy} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <a href={photo.links.html} key={photo.id}>
              <div className="relative h-48">
                <Image
                  priority
                  sizes="33vw"
                  src={photo.urls.regular}
                  alt={photo.alt_description || photo.description || photo.id}
                  className="object-cover"
                  fill
                />
              </div>
              <div className="border-l border-b border-r bg-white p-2">
                <div className="flex items-center">
                  <Image
                    src={photo.user.profile_image.small}
                    width={24}
                    height={24}
                    alt={photo.user.name}
                    className="flex shrink-0 rounded-full"
                  />
                  <p className="ml-2 text-sm font-semibold">
                    {photo.user.name}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{photo.updated_at}</p>
              </div>
            </a>
          ))}
        </div>
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
