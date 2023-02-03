import Image from 'next/image';

export default function PhotoGrid({photos}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {photos.map((photo) => (
        <a href={photo.links.html} key={photo.id}>
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
          <div className="border-l border-b border-r bg-white p-2">
            <div className="flex items-center">
              <Image
                src={photo.user.profile_image.small}
                width={24}
                height={24}
                alt={photo.user.name}
                className="flex shrink-0 rounded-full"
              />
              <p className="ml-2 text-sm font-semibold">{photo.user.name}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{photo.updated_at}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
