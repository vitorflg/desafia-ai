/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Box, jsx, SxStyleProp } from 'theme-ui';

interface Card {
  children: ReactNode;
  sx?: SxStyleProp;
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
  return <Box sx={{ padding: 3, textAlign: 'left' }}>{children}</Box>;
};