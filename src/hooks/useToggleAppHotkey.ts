import { useEffect, useState } from 'react';
import { WindowName } from '~typescript/enums/WindowName';

import { useHotkey } from './overwolf/useHotkey';
import { useWindowManager } from './overwolf/useWindowManager';

interface UseToggleAppHotkey {
  gameId: number;
}

export const useToggleAppHotkey = ({ gameId }: UseToggleAppHotkey) => {
  const [hotkey, setHotkey] = useState<string>();
  const { toggleWindow } = useWindowManager();

  console.log('GAME ID', gameId)

  const [currentHotkey] = useHotkey({
    gameId,
    name: 'toggle_app',
    onChangedCallback: (hotkeyEvent: overwolf.settings.hotkeys.OnChangedEvent) => {
      setHotkey(hotkeyEvent.binding);
    },
    onPressedCallback: () => {
      overwolf.windows.hide(WindowName.IN_GAME_MINI);
      toggleWindow({ name: WindowName.IN_GAME_FULL });
    },
  });

  useEffect(() => {
    setHotkey(currentHotkey);
  }, [currentHotkey])

  return [hotkey] as const;
}