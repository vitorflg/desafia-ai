/** @jsx jsx */
import React, { ReactNode } from 'react';
import { Flex, jsx, SxStyleProp } from 'theme-ui';

interface Footer {
  children: ReactNode;
  sx?: SxStyleProp;
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
