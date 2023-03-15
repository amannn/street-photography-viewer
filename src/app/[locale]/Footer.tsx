import {useTranslations} from 'next-intl';
import LocaleLink from './LocaleLink';
import Text from './Text';
import Wrapper from './Wrapper';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <div className="bg-slate-50 grow">
      <Wrapper className="py-16 md:flex md:justify-between">
        <div className="flex gap-4">
          <LocaleLink locale="en" />
          <LocaleLink locale="es" />
        </div>
        <Text color="muted" variant="small" className="mt-4 md:mt-0">
          {t.rich('credits', {
            unsplash: (chunks) => (
              <a className="underline" href="https://unsplash.com">
                {chunks}
              </a>
            )
          })}
        </Text>
      </Wrapper>
    </div>
  );
}
