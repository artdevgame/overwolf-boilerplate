import './app-header.less';

import React, { FC } from 'react';
import { CloseButton } from '~components/atoms/CloseButton';
import { DiscordButton } from '~components/atoms/DiscordButton';
import { MinimizeButton } from '~components/atoms/MinimizeButton';
import { SettingsButton } from '~components/atoms/SettingsButton';
import { AppHeaderActions } from '~components/molecules/AppHeaderActions';
import { useWindowManager } from '~hooks/overwolf/useWindowManager';
import { WindowName } from '~typescript/enums/WindowName';

import Logo from './logo.svg';

export const DesktopAppHeader: FC = () => {
  const { moveWindow } = useWindowManager();
  return (
    <div className='AppHeader DesktopAppHeader' onMouseDown={() => moveWindow({ name: WindowName.DESKTOP })}>
      <Logo className='AppHeader__Logo' />

      <AppHeaderActions>
        <DiscordButton />
        <SettingsButton />
        <MinimizeButton />
        <CloseButton />
      </AppHeaderActions>
    </div>
  );
}