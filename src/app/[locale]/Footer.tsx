import LocaleLink from './LocaleLink';
import Wrapper from './Wrapper';

export default function Footer() {
  return (
    <div className="bg-slate-50 grow">
      <Wrapper className="py-16 flex gap-4">
        <LocaleLink locale="en" />
        <LocaleLink locale="es" />
      </Wrapper>
    </div>
  );
}
