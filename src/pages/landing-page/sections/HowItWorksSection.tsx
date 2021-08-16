import React from 'react';
import { Heading, Flex, Paragraph } from 'theme-ui';
import { Card, CardContent } from '../../../components/cards/Card';
import { Box } from '@theme-ui/components';

const HowItWorksSection: React.FC = () => {
  return (
    <Box py={6} px={6}>
      <Heading sx={{ py: 2 }} as="h1">
        Como funciona?
      </Heading>

      <Flex
        sx={{ py: 4, flexDirection: ['column', 'column', 'row'], justifyContent: 'space-between' }}
      >
        <Card sx={{ width: '18.75rem' }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h2">
              Desafie-se
            </Heading>

            <Paragraph variant="styles.p" sx={{ mt: 3, color: 'gray--400' }}>
              Encontre um desafio relacionado à computação.
            </Paragraph>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '18.7rem', marginLeft: [0, 0, 4] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h2">
              Resolva
            </Heading>

            <Paragraph variant="styles.p" sx={{ mt: 3, color: 'gray--400' }}>
              Desenvolva uma solução criativa para o problema proposto.
            </Paragraph>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '18.7rem', marginLeft: [0, 0, 4] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h2">
              Colabore
            </Heading>

            <Paragraph variant="styles.p" sx={{ mt: 3, color: 'gray--400' }}>
              Envie o link para pessoas vinculadas à UFF para colaborar!
            </Paragraph>
          </CardContent>
        </Card>
      </Flex>
    </Box>
  );
};

export default HowItWorksSection;
