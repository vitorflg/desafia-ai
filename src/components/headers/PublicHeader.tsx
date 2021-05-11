/** @jsx jsx */
import React, { ReactNode } from 'react';
import { jsx, ThemeUICSSObject } from 'theme-ui';
import { Flex } from 'theme-ui';

interface Header {
  children: ReactNode;
  sx?: ThemeUICSSObject;
}

export const Header: React.FC<Header> = ({ children, sx }) => {
  return (
    <Flex
      as="header"
      sx={{
        ...sx,
        flexDirection: 'row',
        variant: 'stytes.header',
      }}
    >
      {children}
    </Flex>
  );
};
