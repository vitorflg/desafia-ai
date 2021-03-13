/** @jsx jsx */
import { ReactNode } from 'react';
import React from 'react';
import { Flex, jsx } from 'theme-ui';

interface LayoutContainer {
  children: ReactNode;
}

const LayoutContainer: React.FC<LayoutContainer> = ({ children }) => {
  return (
    <Flex
      sx={{ pt: 5, maxWidth: ['95%', '512px'], width: '100%' }}
      variant="containers.center"
    >
      {children}
    </Flex>
  );
};

export default LayoutContainer;
