import {Basic as Photo} from 'unsplash-js/dist/methods/photos/types';
import PhotoGridItem from './PhotoGridItem';

type Props = {
  photos: Photo[];
};

export default function PhotoGrid({photos}: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {photos.map((photo) => (
        <PhotoGridItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
