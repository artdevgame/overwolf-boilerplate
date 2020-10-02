import './app-header.less';

import React, { FC } from 'react';
import { CloseButton } from '~components/atoms/CloseButton';
import { SettingsButton } from '~components/atoms/SettingsButton';
import { AppHeaderActions } from '~components/molecules/AppHeaderActions';
import { useWindowManager } from '~hooks/overwolf/useWindowManager';
import { WindowName } from '~typescript/enums/WindowName';

import Logo from './logo.svg';

export const InGameFullAppHeader: FC = () => {
  const { moveWindow } = useWindowManager();
  return (
    <div className='AppHeader InGameFullAppHeader' onMouseDown={() => moveWindow({ name: WindowName.IN_GAME_MINI })}>
      <Logo className='AppHeader__Logo' />

      <AppHeaderActions>
        <SettingsButton />
        <CloseButton />
      </AppHeaderActions>
    </div>
  );
}