import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import { Heading, Box, Flex, Paragraph } from 'theme-ui';
import Table from '@vtex/styleguide/lib/Table';
import { useAuthentication } from '../../modules/useAuthentication';
import { useQuery, gql } from '@apollo/client';
import { Image } from '@theme-ui/components';

function HomePage() {
  const Authentication = useAuthentication();

  const { data: theOneData } = useQuery(
    gql`
      {
        theOne {
          name
          description
          imageUrl
        }
      }
    `
  );

  const { data: usersData } = useQuery(
    gql`
      {
        ranking {
          name
        }
      }
    `
  );

  const ranking = usersData?.ranking;
  const theOne = theOneData?.theOne;
  const userName = Authentication.getUserProfile()?.email?.match(
    /^([^@]*)@/
  )?.[1];
  const formattedUserName = `@${userName}!`;

  return (
    <div>
      <DashboardWrapper>
        <Heading as="h1">{`👋 Bem-vindo ${
          userName ? formattedUserName : ''
        }`}</Heading>

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
              <Image sx={{ minWidth: 80, height: 80 }} src={theOne?.imageUrl} />

              <Box ml={3}>
                <Heading sx={{ maxWidth: '25rem' }} as="h3">
                  {theOne?.name}
                </Heading>
                <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                  {theOne?.description}
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
              items={ranking ?? []}
              schema={{
                properties: {
                  name: {
                    title: 'Name',
                    width: 300,
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
