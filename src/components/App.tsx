import i18n from 'i18next';
import React, { FC, useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { BackgroundWindow } from '~features/windows/Background';
import { DesktopWindow } from '~features/windows/Desktop';
import { InGameFullWindow } from '~features/windows/InGameFull';
import { InGameMiniWindow } from '~features/windows/InGameMini';
import { WindowName } from '~typescript/enums/WindowName';

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



export const App: FC = () => {
  const [appWindow, setAppWindow] = useState<JSX.Element | null>(null);

  useEffect(() => {
    overwolf.settings.language.get(result => {
      if (result.success) {
        console.log(resources);

        const languageConfig = {
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
          lng: result.language,
          resources,
        }

        i18n.use(initReactI18next).init(languageConfig, () => {
          overwolf.windows.getCurrentWindow((result) => {
            if (result.success) {
              setAppWindow(WindowComponent(result.window.name));
            }
          });
        });
      }
    })
  }, []);

  return appWindow;
};
