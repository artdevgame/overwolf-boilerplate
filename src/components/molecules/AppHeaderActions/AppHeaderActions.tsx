import './app-header-actions.less';

import React, { FC } from 'react';

export const AppHeaderActions: FC = ({
  children,
}) => (
    <div className='AppHeaderActions'>
      {children}
    </div>
  );