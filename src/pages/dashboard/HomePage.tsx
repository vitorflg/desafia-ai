import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import { Heading, Box, Flex, Paragraph } from 'theme-ui';
import Table from '@vtex/styleguide/lib/Table';
import { useQuery, gql } from '@apollo/client';
import { Image } from '@theme-ui/components';
import { useDataState } from '../../data/DataLayer';
import { useLocation } from 'wouter';
import routes from '../../routes';
import Skeleton from 'react-loading-skeleton';

function HomePage() {
  const currentUser = useDataState();
  const [, setLocation] = useLocation();

  const { data: theOneData, loading } = useQuery(
    gql`
      {
        theOne {
          id
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
          interactions
        }
      }
    `
  );

  const ranking = usersData?.ranking.map((userRanking: any) => {
    return { ...userRanking, interactions: userRanking.interactions ?? 0 };
  });
  const theOne = theOneData?.theOne;
  const userName = currentUser?.email?.match(/^([^@]*)@/)?.[1];
  const formattedUserName = `@${userName}!`;

  return (
    <div>
      <DashboardWrapper>
        <Heading as="h1">{`👋 Bem-vindo ${userName ? formattedUserName : ''}`}</Heading>

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

            <Flex onClick={() => setLocation(routes.dashboard.challenge.replace(':id', theOne.id))} mt={2} py={3} sx={{ flexDirection: 'row', cursor: 'pointer'}}>
              {loading ? <Skeleton width={80} height={80} /> : <Image sx={{ minWidth: 80, height: 80 }} src={theOne?.imageUrl} />}

              <Box ml={3}>
                {loading ? <Skeleton width={250} /> : <Heading sx={{ maxWidth: '25rem' }} as="h3">
                  {theOne?.name}
                </Heading> }

                {loading ? <Skeleton width={500} count={2} /> : <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                  {theOne?.description}
                </Paragraph>}
              </Box>
            </Flex>
          </Box>

          <Box mt={6}>
            <Heading mb={3} as="h2">
              Ranking
            </Heading>

            <Box sx={{ maxWidth: '40rem' }} >
            <Table
              highlightOnHover
              items={ranking ?? []}
              schema={{
                properties: {
                  name: {
                    title: 'Name',
                    width: 300,
                  },
                  interactions: {
                    title: 'Interações',
                    width: 300,
                  },
                },
              }}
            />
            </Box>
          </Box>
        </Box>
      </DashboardWrapper>
    </div>
  );
}

export default HomePage;
