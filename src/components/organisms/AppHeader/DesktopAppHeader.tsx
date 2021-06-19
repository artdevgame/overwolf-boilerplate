import './app-header.less';

import React, { FC } from 'react';
import { WindowName } from '~/src/@types/enums/WindowName';
import { CloseButton } from '~src/components/atoms/CloseButton';
import { DiscordButton } from '~src/components/atoms/DiscordButton';
import { Logo } from '~src/components/atoms/Logo/Logo';
import { MinimizeButton } from '~src/components/atoms/MinimizeButton';
import { SettingsButton } from '~src/components/atoms/SettingsButton';
import { AppHeaderActions } from '~src/components/molecules/AppHeaderActions';
import { useWindowManager } from '~src/hooks/overwolf/useWindowManager';

export const DesktopAppHeader: FC = () => {
  const { moveWindow } = useWindowManager();
  return (
    <div className="AppHeader DesktopAppHeader" onMouseDown={() => moveWindow({ windowName: WindowName.DESKTOP })}>
      <Logo />

      <AppHeaderActions>
        <DiscordButton />
        <SettingsButton />
        <MinimizeButton />
        <CloseButton />
      </AppHeaderActions>
    </div>
  );
};
