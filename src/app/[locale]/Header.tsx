import Image from 'next/image';
import {ReactNode} from 'react';
import Text from './Text';
import Wrapper from './Wrapper';

type Props = {
  backgroundUrl: string;
  title: ReactNode;
  description: ReactNode;
};

export default function Header({backgroundUrl, title, description}: Props) {
  return (
    <div className="relative">
      <Image
        sizes="100vw"
        priority
        src={backgroundUrl}
        alt=""
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/75" />
      <Wrapper className="relative pt-32 pb-14 text-white">
        <Text variant="title" as="h1" inverted>
          {title}
        </Text>
        <Text className="mt-4 max-w-xl" inverted>
          {description}
        </Text>
      </Wrapper>
    </div>
  );
}
