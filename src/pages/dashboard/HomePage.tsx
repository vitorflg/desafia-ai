import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import Image from '../../components/image/Image';
import { Heading, Box, Flex, Paragraph } from 'theme-ui';
import Table from '@vtex/styleguide/lib/Table';

function HomePage() {
  return (
    <div>
      <DashboardWrapper>
        <Heading as="h1">👋 Bem-vindo @vitorflg!</Heading>

        <Box>
          <Box
            p={4}
            mt={6}
            sx={{
              boxShadow: 'primary',
              borderRadius: '1rem',
              maxWidth: '45rem',
            }}
          >
            <Heading as="h2">🏆 Desafio da rodada</Heading>

            <Flex mt={2} py={3} sx={{ flexDirection: 'row' }}>
              <Image src="xadrez-example.jpg" />

              <Box ml={3}>
                <Heading sx={{ maxWidth: '25rem' }} as="h3">
                  Migração de base de dados usando python
                </Heading>
                <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse id iaculis ligula, in ultrices lorem.
                </Paragraph>
              </Box>
            </Flex>
          </Box>

          <Box mt={6}>
            <Heading mb={3} as="h2">
              Ranking
            </Heading>

            <Table
              highlightOnHover
              items={[
                { name: '1. Vitor Gomes', solutions: 199, interactions: 1231 },
                {
                  name: '2. Nicholas Ferrer',
                  solutions: 199,
                  interactions: 1231,
                },
                {
                  name: '3. Flávio Seixas',
                  solutions: 199,
                  interactions: 1231,
                },
                {
                  name: '4. Vitor Ferreira',
                  solutions: 199,
                  interactions: 1231,
                },
                { name: '5. Vitor Leal', solutions: 199, interactions: 1231 },
              ]}
              schema={{
                properties: {
                  name: {
                    title: 'Name',
                    width: 300,
                  },
                  solutions: {
                    title: 'Soluções',
                    minWidth: 199,
                  },
                  interactions: {
                    title: 'Interações',
                    // default is 200px
                    minWidth: 199,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </DashboardWrapper>
    </div>
  );
}

export default HomePage;
