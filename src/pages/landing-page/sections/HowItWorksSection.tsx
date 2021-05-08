import React from 'react';
import { Heading, Flex, Paragraph } from 'theme-ui';
import { Card, CardContent } from '../../../components/cards/Card';
import { Box } from '@theme-ui/components';

const HowItWorksSection: React.FC = () => {
  return (
    <Box py={5} px={4}>
      <Heading sx={{ py: 2 }} as="h1">
        Como funciona?
      </Heading>

      <Flex sx={{ py: 4, flexDirection: ['column', 'column', 'row'] }}>
        <Card sx={{ maxWidth: '25rem' }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h2">
              Encontre/crie um desafio
            </Heading>

            <Paragraph sx={{ mt: 3, color: 'gray--400' }}>
              Escolha uma categoria e proponha/aceite um desafio relacionado à
              ciência da computação
            </Paragraph>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '18.7rem', marginLeft: [0, 0, 4] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h2">
              Convide pessoas
            </Heading>

            <Paragraph sx={{ mt: 3, color: 'gray--400' }}>
              Envie o link para pessoas vinculadas à UFF para colaborar, seja
              com soluções ou avaliações!
            </Paragraph>
          </CardContent>
        </Card>
      </Flex>
    </Box>
  );
};

export default HowItWorksSection;
