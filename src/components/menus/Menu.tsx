import React, { ReactNode } from 'react';
import { Box, Heading, SxStyleProp } from 'theme-ui';
import { useDataDispatch, useDataState } from '../../data/DataLayer';

export interface MenuProps {
  children: ReactNode;
  sx?: SxStyleProp;
}

export interface MenuItemProps extends MenuProps {
  OnHover?: () => JSX.Element;
}

export type MenuActions = 'setMenuState';

export const menuReducer = {
  setMenuState: (open: boolean): Record<string, unknown> => {
    return { open };
  },
};

export const Menu: React.SFC<MenuProps> = ({ children, sx }) => {
  return <Box sx={{ ...sx, variant: 'styles.menu' }}>{children}</Box>;
};

export const MenuItem: React.SFC<MenuItemProps> = ({
  children,
  sx,
  OnHover,
}) => {
  const state = useDataState();
  const dispatch = useDataDispatch();

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() =>
        dispatch && dispatch({ type: 'setMenuState', payload: { open: true } })
      }
      onMouseLeave={() =>
        dispatch && dispatch({ type: 'setMenuState', payload: { open: false } })
      }
    >
      {state?.open && OnHover && <OnHover></OnHover>}
      <Box sx={{ ...sx, variant: 'styles.menuItem' }}>{children}</Box>
    </Box>
  );
};
