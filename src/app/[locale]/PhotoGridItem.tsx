import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import Image from 'next/image';
import {useFormatter} from 'next-intl';

type Props = {
  photo: Photo;
};

export default function PhotoGridItem({photo}: Props) {
  const format = useFormatter();
  const updatedAt = new Date(photo.updated_at);

  return (
    <a href={photo.links.html + '?utm_source=403665&utm_medium=referral'}>
      <div className="relative h-48 bg-slate-100">
        <Image
          priority
          sizes="33vw"
          src={photo.urls.regular}
          alt={photo.alt_description || photo.description || photo.id}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex items-center flex-wrap justify-between border-l border-b border-r bg-white p-2">
        <div className="flex items-center">
          <Image
            src={photo.user.profile_image.small}
            width={24}
            height={24}
            alt={photo.user.name}
            className="flex shrink-0 rounded-full"
          />
          <p className="ml-2 text-sm font-semibold max-w-[200px] truncate">
            {photo.user.name}
          </p>
        </div>
        <p className="text-sm text-gray-500 leading-[24px]">
          {format.relativeTime(updatedAt)}
        </p>
      </div>
    </a>
  );
}
