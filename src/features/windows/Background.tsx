import { useCallback, useEffect } from 'react';
import { initMessageListener } from 'redux-state-sync';
import { WindowName } from '~/src/@types/enums/WindowName';
import { useGame } from '~/src/hooks/overwolf/useGame';
import { useWindowManager } from '~/src/hooks/overwolf/useWindowManager';
import { useAppDispatch } from '~/src/hooks/useAppDispatch';
import { setGameId } from '~/src/store/slices/overwolfSlice';
import { store } from '~/src/store/store';
import { useAppSelector } from '~src/hooks/useAppSelector';

initMessageListener(store);

export function BackgroundWindow() {
  const dispatch = useAppDispatch();
  const { miniWindowHidden } = useAppSelector((state) => state.settings);

  const [isGameRunning, gameInfo] = useGame();

  const { getWindowState, openWindow } = useWindowManager();

  const onDesktopWindowStateRetrieved = useCallback((windowStateResult: overwolf.windows.GetWindowStateResult) => {
    const shouldOpen = windowStateResult.window_state === 'minimized' && windowStateResult.window_state_ex === 'closed';
    if (shouldOpen) openWindow({ windowName: WindowName.DESKTOP });
  }, []);

  const onMiniWindowStateRetrieved = useCallback(() => {
    if (typeof gameInfo === 'undefined' || miniWindowHidden) return;

    dispatch(setGameId(gameInfo.classId));
    openWindow({ windowName: WindowName.IN_GAME_MINI });
  }, [gameInfo]);

  useEffect(() => {
    const isGameFocused = gameInfo?.isRunning && gameInfo?.isInFocus;

    if (isGameFocused) {
      getWindowState({ onWindowStateRetrieved: onMiniWindowStateRetrieved, windowName: WindowName.IN_GAME_MINI });
      return;
    }

    getWindowState({ onWindowStateRetrieved: onDesktopWindowStateRetrieved, windowName: WindowName.DESKTOP });
  }, [isGameRunning, gameInfo]);

  return null;
}
