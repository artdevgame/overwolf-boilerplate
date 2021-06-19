import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { WindowName } from '~/src/@types/enums/WindowName';

import { MinusOutlined } from '@ant-design/icons';

export const MinimizeButton: FC = () => {
  const onPressed = useCallback(() => {
    overwolf.windows.minimize(WindowName.DESKTOP);
  }, []);

  return <Button icon={<MinusOutlined />} onClick={onPressed} type="link" />;
};
