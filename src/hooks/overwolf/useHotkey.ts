import { useCallback, useEffect, useState } from 'react';

const overwolfNs = overwolf.settings.hotkeys

interface UseHotKey {
  gameId: number;
  name: string;
  onChangedCallback?(hotkeyEvent: overwolf.settings.hotkeys.OnChangedEvent): void;
  onHoldCallback?(hotkeyEvent: overwolf.settings.hotkeys.OnHoldEvent): void;
  onPressedCallback?(hotkeyEvent: overwolf.settings.hotkeys.OnPressedEvent): void;
}

export const useHotkey = ({
  gameId,
  name,
  onChangedCallback,
  onHoldCallback,
  onPressedCallback,
}: UseHotKey) => {
  const [hotkey, setHotkey] = useState<string>();

  const onChanged = useCallback((hotkeyEvent: overwolf.settings.hotkeys.OnChangedEvent) => {
    if (hotkeyEvent.name === name && gameId === hotkeyEvent.gameId && typeof onChangedCallback !== 'undefined') {
      onChangedCallback(hotkeyEvent);
    }
  }, [name, gameId, onChangedCallback]);

  const onHold = useCallback((hotkeyEvent: overwolf.settings.hotkeys.OnHoldEvent) => {
    if (hotkeyEvent.name === name && typeof onHoldCallback !== 'undefined') {
      onHoldCallback(hotkeyEvent);
    }
  }, [name, onHoldCallback]);

  const onPressed = useCallback((hotkeyEvent: overwolf.settings.hotkeys.OnPressedEvent) => {
    if (hotkeyEvent.name === name && typeof onPressedCallback !== 'undefined') {
      onPressedCallback(hotkeyEvent);
    }
  }, [name, onPressedCallback]);

  const onRetrieved = useCallback((result: overwolf.settings.hotkeys.GetAssignedHotkeyResult) => {
    if (result.success) {
      if (typeof result.games === 'undefined') {
        const globalHotkey = result.globals.find(hotkey => hotkey.name === name);

        if (typeof globalHotkey !== 'undefined') {
          setHotkey(globalHotkey.binding);
        }

        return;
      }

      const gameHotkeys = result.games[gameId];
      const gameHotkey = gameHotkeys?.find(hotkey => hotkey.name === name);

      if (typeof gameHotkey !== 'undefined') {
        setHotkey(gameHotkey.binding);
      }
    }
  }, [gameId]);

  useEffect(() => {
    overwolfNs.onChanged.removeListener(onChanged)
    overwolfNs.onChanged.addListener(onChanged)

    overwolfNs.onHold.removeListener(onHold)
    overwolfNs.onHold.addListener(onHold)

    overwolfNs.onPressed.removeListener(onPressed)
    overwolfNs.onPressed.addListener(onPressed)

    overwolfNs.get(onRetrieved);

    return () => {
      overwolfNs.onChanged.removeListener(onChanged)
      overwolfNs.onHold.removeListener(onHold)
      overwolfNs.onPressed.removeListener(onPressed)
    }
  }, [gameId]);

  return [hotkey] as const;
}