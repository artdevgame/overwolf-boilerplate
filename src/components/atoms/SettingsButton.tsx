import { Button } from 'antd';
import React, { FC, useCallback } from 'react';

import { SettingOutlined } from '@ant-design/icons';

export const SettingsButton: FC = () => {
  const onPressed = useCallback(() => {
    window.location.href = 'overwolf://settings/games-overlay';
  }, []);

  return (
    <Button icon={<SettingOutlined />} onClick={onPressed} type="link" />
  )
}