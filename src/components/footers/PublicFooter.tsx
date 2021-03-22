/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Flex, Box, jsx, SxStyleProp } from 'theme-ui';

interface Footer {
  children: ReactNode;
  behaviour: 'sticky' | 'relative' | 'absolute';
  sx?: SxStyleProp;
}
interface FooterRow {
  children: ReactNode;
  sx?: SxStyleProp;
}

export const Footer: React.FC<Footer> = ({ children, behaviour, sx }) => {
  return (
    <Box
      as="footer"
      sx={{
        ...sx,
        position: behaviour,
        flexDirection: 'column',
        variant: 'stytes.footer',
      }}
    >
      {children}
    </Box>
  );
};

export const FooterRow: React.FC<FooterRow> = ({ children, sx }) => {
  return <Flex sx={{ ...sx, flexDirection: 'row' }}>{children}</Flex>;
};
