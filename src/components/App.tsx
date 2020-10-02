import React, { FC, useEffect, useState } from 'react';
import { BackgroundWindow } from '~features/windows/Background';
import { DesktopWindow } from '~features/windows/Desktop';
import { InGameFullWindow } from '~features/windows/InGameFull';
import { InGameMiniWindow } from '~features/windows/InGameMini';
import { WindowName } from '~typescript/enums/WindowName';

const WindowComponent = (windowName: string) => {
  switch (windowName) {
    case WindowName.BACKGROUND:
      return <BackgroundWindow />;
    case WindowName.DESKTOP:
      return <DesktopWindow />;
    case WindowName.IN_GAME_FULL:
      return <InGameFullWindow />;
    case WindowName.IN_GAME_MINI:
      return <InGameMiniWindow />;
    default:
      return null;
  }
};

export const App: FC = () => {
  const [appWindow, setAppWindow] = useState<JSX.Element | null>(null);

  useEffect(() => {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.success) {
        setAppWindow(WindowComponent(result.window.name));
      }
    });
  }, []);

  return appWindow;
};
