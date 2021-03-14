import { Box } from 'theme-ui';
import React from 'react';

export interface CardsListProps {}

const CardsList: React.SFC<CardsListProps> = () => {
  return (
    <Box
      sx={{
        mt: 1,
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        variant: 'cards.primary',
      }}
    ></Box>
  );
};

export default CardsList;
