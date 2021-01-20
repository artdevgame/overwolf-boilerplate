import { FC, useEffect } from 'react';
import { initMessageListener } from 'redux-state-sync';
import { useGame } from '~hooks/overwolf/useGame';
import { useWindowManager } from '~hooks/overwolf/useWindowManager';
import { useAppDispatch } from '~hooks/useAppDispatch';
import { setGameId } from '~store/slices/overwolfSlice';
import { store } from '~store/store';
import { WindowName } from '~typescript/enums/WindowName';

initMessageListener(store);

export const BackgroundWindow: FC = () => {
  const dispatch = useAppDispatch();

  const [isGameRunning, gameInfo] = useGame();

  const windowManager = useWindowManager();

  useEffect(() => {
    if (isGameRunning) {
      if (typeof gameInfo !== 'undefined' && windowManager?.lastWindowOpened?.name !== WindowName.IN_GAME_MINI) {
        dispatch(setGameId(gameInfo.classId));

        windowManager.closeWindow({ name: WindowName.DESKTOP });
        windowManager.openWindow({ name: WindowName.IN_GAME_MINI });
      }
      return
    }

    if (windowManager?.lastWindowOpened?.name !== WindowName.DESKTOP) {
      windowManager.closeWindow({ name: WindowName.IN_GAME_MINI });
      windowManager.openWindow({ name: WindowName.DESKTOP });
    }
  }, [isGameRunning, gameInfo, windowManager.lastWindowOpened]);

  return null;
};
