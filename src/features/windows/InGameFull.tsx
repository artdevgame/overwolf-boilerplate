import React, { FC } from 'react';
import { initStateWithPrevTab } from 'redux-state-sync';
import { InGameFullAppHeader } from '~components/organisms/AppHeader/InGameFullAppHeader';
import { MinimalLayout } from '~components/templates/MinimalLayout';
import { store } from '~store/store';

initStateWithPrevTab(store);

export const InGameFullWindow: FC = () => (
  <MinimalLayout header={<InGameFullAppHeader />}>
    Game Window (Full)
  </MinimalLayout>
);
