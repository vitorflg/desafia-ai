import React from 'react';
import { Box, Heading, Image } from 'theme-ui';
import DashboardWrapper from './DashboardWrapper';
import { useQuery, gql } from '@apollo/client';
import Table from '@vtex/styleguide/lib/Table';
import rankingImgSrc from '../../assets/images/ranking.svg';

export default function RankingPage() {
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

  return (
    <DashboardWrapper>
      <Box>
        <Image
          sx={{
            width: '40px',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
          src={rankingImgSrc}
        ></Image>

        <Heading ml={3} sx={{ display: 'inline-block' }} as="h2">
          Ranking
        </Heading>
      </Box>
      <Box>
        <Table
          fullWidth
          highlightOnHover
          items={ranking ?? []}
          schema={{
            properties: {
              name: {
                title: 'Name',
              },
              interactions: {
                title: 'Interações',
              },
            },
          }}
        />
      </Box>
    </DashboardWrapper>
  );
}
