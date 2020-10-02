import retry from 'async-retry';
import { useCallback, useEffect, useState } from 'react';

interface CloseWindow {
  name: string;
}

interface GetOpenWindow {
  name: string;
}

interface GetWindow {
  name: string;
}

interface MoveWindow {
  name: string;
}

interface OpenWindow {
  name: string;
}

interface ToggleWindow {
  name: string;
}

export const useWindowManager = () => {
  const [domWindows, setDomWindows] = useState<overwolf.Dictionary<Window>>();

  const closeWindow = useCallback(async ({ name }: CloseWindow) => {
    const owWindow = await getWindow({ name });
    overwolf.windows.close(owWindow.id);
  }, []);

  const getOpenWindow = useCallback(({ name }: GetOpenWindow) => {
    if (typeof domWindows !== 'undefined') {
      for (const [owWindowName, domWindow] of Object.entries(domWindows)) {
        if (owWindowName === name) {
          return domWindow;
        }
      }
    }
  }, [domWindows]);

  const getWindow = useCallback(({ name }: GetWindow): Promise<overwolf.windows.WindowInfo> =>
    new Promise((resolve, reject) => {
      overwolf.windows.obtainDeclaredWindow(name, (result) => {
        if (result.success) {
          return resolve(result.window);
        }

        if (typeof result.error !== 'undefined') {
          return reject(result.error);
        }
      });
    }), []);

  const moveWindow = useCallback(({ name }: MoveWindow) => {
    overwolf.windows.dragMove(name);
  }, []);

  const openWindow = useCallback(async ({ name }: OpenWindow) => {
    const owWindow = await getWindow({ name });
    overwolf.windows.restore(owWindow.id);
  }, []);

  const toggleWindow = useCallback(async ({ name }: ToggleWindow) => {
    const owWindow = await getWindow({ name });

    if (owWindow.isVisible) {
      overwolf.windows.hide(owWindow.id);
    } else {
      overwolf.windows.restore(owWindow.id);
    }
  }, []);

  const onWindowStateChanged = useCallback((windowState: overwolf.windows.WindowStateChangedEvent) => {
    overwolf.windows.getOpenWindows((windows) => setDomWindows(windows));
  }, []);

  useEffect(() => {
    overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
    overwolf.windows.onStateChanged.addListener(onWindowStateChanged);

    return () => {
      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
    }
  }, []);

  return {
    closeWindow,
    domWindows,
    getOpenWindow,
    getWindow,
    moveWindow,
    openWindow,
    toggleWindow,
  };
};
