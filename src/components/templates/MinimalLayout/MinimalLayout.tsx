import './minimal-layout.less';

import React, { FC } from 'react';

interface MinimalLayoutProps {
  header: JSX.Element;
}

export const MinimalLayout: FC<MinimalLayoutProps> = ({
  children,
  header,
}) => (
    <div className='MinimalLayout'>
      {header}
      {children}
    </div>
  )