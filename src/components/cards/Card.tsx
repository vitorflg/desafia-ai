/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Box, jsx, ThemeUICSSObject } from 'theme-ui';

interface Card {
  children: ReactNode;
  sx?: ThemeUICSSObject;
}

export const Card: React.FC<Card> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        ...sx,
        variant: 'styles.cards',
      }}
    >
      {children}
    </Box>
  );
};

export const CardHeader: React.FC<Card> = ({ children }) => {
  return <Box>{children}</Box>;
};

export const CardContent: React.FC<Card> = ({ children }) => {
  return <Box sx={{ textAlign: 'left' }}>{children}</Box>;
};
