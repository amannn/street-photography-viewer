'use client';

import {ReactNode, useEffect, useRef} from 'react';
import usePrevious from 'use-previous';

type Props = {
  routeKey: unknown;
  children: ReactNode;
};

export default function ScrollManager({routeKey, children}: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const prevRouteKey = usePrevious(routeKey);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (prevRouteKey != null && prevRouteKey !== routeKey) {
      const isVisible = node.getBoundingClientRect().top > 0;

      if (!isVisible) {
        node.scrollIntoView();
      }
    }
  }, [prevRouteKey, routeKey]);

  return <div ref={nodeRef}>{children}</div>;
}
