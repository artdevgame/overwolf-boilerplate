import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { initStateWithPrevTab } from 'redux-state-sync';
import { DesktopAppHeader } from '~src/components/organisms/AppHeader/DesktopAppHeader';
import { MinimalLayout } from '~src/components/templates/MinimalLayout';
import { RootState, store } from '~src/store/store';

initStateWithPrevTab(store);

export const DesktopWindow: FC = () => {
  const { launcherId } = useSelector((state: RootState) => state.overwolf);

  return <MinimalLayout header={<DesktopAppHeader />}>Desktop Window (LauncherID: {launcherId})</MinimalLayout>;
};
