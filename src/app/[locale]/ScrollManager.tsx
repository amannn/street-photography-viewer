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
    if (prevRouteKey != null && prevRouteKey !== routeKey) {
      nodeRef.current.scrollIntoView();
    }
  }, [prevRouteKey, routeKey]);

  return <div ref={nodeRef}>{children}</div>;
}
