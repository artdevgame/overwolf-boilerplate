import { useEffect, useState } from 'react';
import { WindowName } from '~/src/@types/enums/WindowName';
import { setMiniWindowHidden } from '~src/store/slices/settingsSlice';

import { useHotkey } from './overwolf/useHotkey';
import { useWindowManager } from './overwolf/useWindowManager';
import { useAppDispatch } from './useAppDispatch';

interface UseToggleAppHotkey {
  gameId: number;
}

export const useToggleAppHotkey = ({ gameId }: UseToggleAppHotkey) => {
  const dispatch = useAppDispatch();
  const [hotkey, setHotkey] = useState<string>();
  const { toggleWindow } = useWindowManager();

  const [currentHotkey] = useHotkey({
    gameId,
    name: 'toggle_app',
    onChangedCallback: (hotkeyEvent: overwolf.settings.hotkeys.OnChangedEvent) => {
      setHotkey(hotkeyEvent.binding);
    },
    onPressedCallback: () => {
      dispatch(setMiniWindowHidden(true));
      overwolf.windows.hide(WindowName.IN_GAME_MINI);
      toggleWindow({ windowName: WindowName.IN_GAME_FULL });
    },
  });

  useEffect(() => {
    setHotkey(currentHotkey);
  }, [currentHotkey]);

  return [hotkey] as const;
};
