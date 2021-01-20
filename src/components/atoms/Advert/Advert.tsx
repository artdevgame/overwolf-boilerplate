import React, { FC, useRef } from 'react';

import { useAdvert } from '../../../hooks/overwolf/useAdvert';

export const Advert: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useAdvert(containerRef, { autoplay: true });

  return <div className="Advert" ref={containerRef} />;
};
