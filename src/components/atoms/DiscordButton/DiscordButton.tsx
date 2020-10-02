import './discord-button.less';

import { Button } from 'antd';
import React, { FC, useCallback } from 'react';

import DiscordIcon from './discord.svg';

export const DiscordButton: FC = () => {
  const onPressed = useCallback(() => {
    overwolf.utils.openUrlInDefaultBrowser('https://discord.gg/overwolf-developers')
  }, []);

  return (
    <Button icon={<DiscordIcon className="DiscordButton" />} onClick={onPressed} type="link" />
  )
}