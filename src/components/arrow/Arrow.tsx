/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Button } from 'theme-ui';

interface Arrow {
  direction: string;
  onClick: () => void;
  disabled?: boolean;
}

const Arrow: React.FC<Arrow> = ({ direction = 'right', onClick, disabled }) => {
  return (
    <Button
      sx={{ borderRadius: '99rem', px: 3, py: 2 }}
      variant={disabled ? 'buttons.disabled' : 'buttons.secondary'}
      onClick={disabled ? undefined : onClick}
    >
      {direction === 'right' ? '>' : '<'}
    </Button>
  );
};

export default Arrow;
