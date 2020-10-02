import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { initStateWithPrevTab } from 'redux-state-sync';
import { InGameMiniAppHeader } from '~components/organisms/AppHeader/InGameMiniAppHeader';
import { MinimalLayout } from '~components/templates/MinimalLayout';
import { useToggleAppHotkey } from '~hooks/useToggleAppHotkey';
import { RootState, store } from '~store/store';

initStateWithPrevTab(store);

export const InGameMiniWindow: FC = () => {
  const { gameId } = useSelector((state: RootState) => state.overwolf);
  const [hotkey] = useToggleAppHotkey({ gameId });

  return (
    <MinimalLayout header={<InGameMiniAppHeader />}>
      <p>Game Window (Mini) (GameID: {gameId})</p>
      <p>App Ready: {hotkey}</p>
    </MinimalLayout>
  );
}
