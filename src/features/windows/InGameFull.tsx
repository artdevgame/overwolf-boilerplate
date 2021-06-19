import React, { FC } from 'react';
import { initStateWithPrevTab } from 'redux-state-sync';
import { InGameFullAppHeader } from '~src/components/organisms/AppHeader/InGameFullAppHeader';
import { MinimalLayout } from '~src/components/templates/MinimalLayout';
import { store } from '~src/store/store';

initStateWithPrevTab(store);

export const InGameFullWindow: FC = () => (
  <MinimalLayout header={<InGameFullAppHeader />}>Game Window (Full)</MinimalLayout>
);
