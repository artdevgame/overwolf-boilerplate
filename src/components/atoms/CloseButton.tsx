import { Button } from 'antd';
import React, { FC, useCallback } from 'react';
import { WindowName } from '~typescript/enums/WindowName';

import { CloseOutlined } from '@ant-design/icons';

export const CloseButton: FC = () => {
  const onPressed = useCallback(() => {
    overwolf.windows.close(WindowName.BACKGROUND);
  }, []);

  return (
    <Button icon={<CloseOutlined />} onClick={onPressed} type="link" />
  )
}