import './app-header.less';

import React, { FC } from 'react';
import { WindowName } from '~/src/@types/enums/WindowName';
import { CloseButton } from '~src/components/atoms/CloseButton';
import { Logo } from '~src/components/atoms/Logo/Logo';
import { SettingsButton } from '~src/components/atoms/SettingsButton';
import { AppHeaderActions } from '~src/components/molecules/AppHeaderActions';
import { useWindowManager } from '~src/hooks/overwolf/useWindowManager';

export const InGameMiniAppHeader: FC = () => {
  const { moveWindow } = useWindowManager();
  return (
    <div
      className="AppHeader InGameMiniAppHeader"
      onMouseDown={() => moveWindow({ windowName: WindowName.IN_GAME_MINI })}
    >
      <Logo />

      <AppHeaderActions>
        <SettingsButton />
        <CloseButton />
      </AppHeaderActions>
    </div>
  );
};
