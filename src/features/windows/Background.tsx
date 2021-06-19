import { useCallback, useEffect, useRef } from 'react';
import { initMessageListener } from 'redux-state-sync';
import { WindowName } from '~/src/@types/enums/WindowName';
import { useGame } from '~/src/hooks/overwolf/useGame';
import { useWindowManager } from '~/src/hooks/overwolf/useWindowManager';
import { useAppDispatch } from '~/src/hooks/useAppDispatch';
import { setGameId } from '~/src/store/slices/overwolfSlice';
import { store } from '~/src/store/store';

initMessageListener(store);

export function BackgroundWindow() {
  const dispatch = useAppDispatch();
  const lastWindowOpened = useRef<overwolf.windows.WindowInfo>();

  const [isGameRunning, gameInfo] = useGame();

  const { closeWindow, openWindow, resizeWindow } = useWindowManager();

  const onWindowOpened = useCallback((windowInfo: overwolf.windows.WindowInfo) => {
    lastWindowOpened.current = windowInfo;
  }, []);

  useEffect(() => {
    const isGameFocused = gameInfo?.isRunning && gameInfo?.isInFocus;

    if (
      typeof gameInfo !== 'undefined' &&
      isGameFocused &&
      lastWindowOpened.current?.name !== WindowName.IN_GAME_MINI
    ) {
      dispatch(setGameId(gameInfo.classId));
      openWindow({ onWindowOpened, windowName: WindowName.IN_GAME_MINI });
      return;
    }

    if (lastWindowOpened.current?.name !== WindowName.DESKTOP) {
      if (!isGameFocused) {
        closeWindow({ windowName: WindowName.IN_GAME_MINI });
      }
      openWindow({ onWindowOpened, windowName: WindowName.DESKTOP });
    }
  }, [isGameRunning, gameInfo, lastWindowOpened]);

  return null;
}
