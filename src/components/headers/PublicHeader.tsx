/** @jsx jsx */
import React, { ReactNode } from 'react';
import { jsx, SxStyleProp } from 'theme-ui';
import { Flex } from 'theme-ui';

interface Header {
  children: ReactNode;
  sx?: SxStyleProp;
}

export const Header: React.FC<Header> = ({ children, sx }) => {
  return (
    <Flex
      as="header"
      sx={{
        ...sx,
        position: 'relative',
        flexDirection: 'row',
        variant: 'stytes.header',
      }}
    >
      {children}
    </Flex>
  );
};
