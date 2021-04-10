/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Flex, jsx, ThemeUICSSObject } from 'theme-ui';

interface Footer {
  children: ReactNode;
  sx?: ThemeUICSSObject;
}

export const Footer: React.FC<Footer> = ({ children, sx }) => {
  return (
    <Flex
      as="footer"
      sx={{
        ...sx,
        flexDirection: 'row',
        variant: 'stytes.footer',
      }}
    >
      {children}
    </Flex>
  );
};
