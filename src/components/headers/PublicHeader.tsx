/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Flex, Box, jsx, SxStyleProp } from 'theme-ui';

interface Header {
  children: ReactNode;
  behaviour: 'sticky' | 'relative' | 'absolute';
  sx?: SxStyleProp;
}
interface HeaderRow {
  children: ReactNode;
  sx?: SxStyleProp;
}

export const Header: React.FC<Header> = ({ children, behaviour, sx }) => {
  return (
    <Box
      as="header"
      sx={{
        ...sx,
        position: behaviour,
        flexDirection: 'column',
        variant: 'stytes.header',
      }}
    >
      {children}
    </Box>
  );
};

export const HeaderRow: React.FC<HeaderRow> = ({ children, sx }) => {
  return <Flex sx={{ ...sx, flexDirection: 'row' }}>{children}</Flex>;
};
