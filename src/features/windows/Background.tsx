import { FC, useEffect } from 'react';
import { initMessageListener } from 'redux-state-sync';
import { useGame } from '~hooks/overwolf/useGame';
import { useLauncher } from '~hooks/overwolf/useLauncher';
import { useWindowManager } from '~hooks/overwolf/useWindowManager';
import { useAppDispatch } from '~hooks/useAppDispatch';
import { setGameId, setLauncherId } from '~store/slices/overwolfSlice';
import { store } from '~store/store';
import { OverwolfGameId } from '~typescript/enums/OverwolfGameId';
import { OverwolfLauncherId } from '~typescript/enums/OverwolfLauncherId';
import { WindowName } from '~typescript/enums/WindowName';

initMessageListener(store);

export const BackgroundWindow: FC = () => {
  const dispatch = useAppDispatch();

  const [isGameRunning] = useGame(OverwolfGameId.LEAGUE_OF_LEGENDS);
  const [isLauncherRunning] = useLauncher(OverwolfLauncherId.LEAGUE_OF_LEGENDS);

  const windowManager = useWindowManager();

  useEffect(() => {
    if (isGameRunning) {
      dispatch(setGameId(OverwolfGameId.LEAGUE_OF_LEGENDS));

      windowManager.closeWindow({ name: WindowName.DESKTOP });

      windowManager.openWindow({ name: WindowName.IN_GAME_MINI });
    } else if (isLauncherRunning) {
      dispatch(setLauncherId(OverwolfLauncherId.LEAGUE_OF_LEGENDS));

      windowManager.closeWindow({ name: WindowName.IN_GAME_FULL });
      windowManager.closeWindow({ name: WindowName.IN_GAME_MINI });

      windowManager.openWindow({ name: WindowName.DESKTOP });
    }
  }, [isGameRunning, isLauncherRunning]);

  return null;
};
