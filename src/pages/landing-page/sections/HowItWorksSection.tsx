import React from 'react';
import { Heading, Flex, Paragraph } from 'theme-ui';
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
              <u>1. Encontre/crie um desafio</u>
            </Heading>

            <Paragraph sx={{ mt: 3 }}>
              Escolha uma categoria e proponha/aceite um desafio relacionado à
              ciência da computação
            </Paragraph>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '18.7rem', marginLeft: [0, 0, 5] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h4">
              <u>2. Convide pessoas</u>
            </Heading>

            <Paragraph sx={{ mt: 3 }}>
              Envie o link para pessoas vinculadas à UFF para colaborar, seja
              com soluções ou avaliações!
            </Paragraph>
          </CardContent>
        </Card>
      </Flex>
    </>
  );
};

export default HowItWorksSection;
