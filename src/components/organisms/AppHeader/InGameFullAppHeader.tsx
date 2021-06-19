import './app-header.less';

import React, { FC } from 'react';
import { WindowName } from '~/src/@types/enums/WindowName';
import { CloseButton } from '~src/components/atoms/CloseButton';
import { Logo } from '~src/components/atoms/Logo/Logo';
import { SettingsButton } from '~src/components/atoms/SettingsButton';
import { AppHeaderActions } from '~src/components/molecules/AppHeaderActions';
import { useWindowManager } from '~src/hooks/overwolf/useWindowManager';

export const InGameFullAppHeader: FC = () => {
  const { moveWindow } = useWindowManager();
  return (
    <div
      className="AppHeader InGameFullAppHeader"
      onMouseDown={() => moveWindow({ windowName: WindowName.IN_GAME_FULL })}
    >
      <Logo />

      <AppHeaderActions>
        <SettingsButton />
        <CloseButton />
      </AppHeaderActions>
    </div>
  );
};
