import React from 'react';
import { Heading, Flex } from 'theme-ui';
import { Card, CardContent } from '../../../components/cards/Card';

const HowItWorksSection: React.FC = () => {
  return (
    <>
      <Heading sx={{ py: 2, px: 4 }} as="h1">
        Como funciona?
      </Heading>

      <Flex sx={{ py: 4, px: 4, flexDirection: ['column', 'column', 'row'] }}>
        <Card sx={{ maxWidth: '25rem' }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h4">
              <u>1. Crie um desafio</u>
            </Heading>

            <Heading sx={{ mt: 3 }} as="p">
              Escolha uma categoria e proponha um desafio relacionada à ciência
              da computação
            </Heading>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '18.7rem', marginLeft: [0, 0, 5] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h4">
              <u>2. Convide pessoas</u>
            </Heading>

            <Heading sx={{ mt: 3 }} as="p">
              Lorem ipsum
            </Heading>
          </CardContent>
        </Card>
      </Flex>
    </>
  );
};

export default HowItWorksSection;
