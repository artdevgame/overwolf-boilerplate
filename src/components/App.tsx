import i18n from 'i18next';
import React, { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { WindowName } from '~/src/@types/enums/WindowName';
import { BackgroundWindow } from '~/src/features/windows/Background';
import { DesktopWindow } from '~/src/features/windows/Desktop';
import { InGameFullWindow } from '~/src/features/windows/InGameFull';
import { InGameMiniWindow } from '~/src/features/windows/InGameMini';

import { resources } from '../locales';

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

export function App() {
  const [appWindow, setAppWindow] = useState<JSX.Element | null>(null);

  useEffect(() => {
    overwolf.settings.language.get((result) => {
      const languageConfig = {
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        lng: result.language,
        resources,
      };

      i18n.use(initReactI18next).init(languageConfig, () => {
        overwolf.windows.getCurrentWindow((result) => {
          if (result.success) {
            setAppWindow(WindowComponent(result.window.name));
          }
        });
      });
    });
  }, []);

  return appWindow;
}
