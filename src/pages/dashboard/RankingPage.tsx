import React from 'react';
import { Box, Heading } from 'theme-ui';
import DashboardWrapper from './DashboardWrapper';
import Image from '../../components/image/Image';
import { useQuery, gql } from '@apollo/client';
import Table from '@vtex/styleguide/lib/Table';

export default function RankingPage() {
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

  return (
    <DashboardWrapper>
      <Box>
        <Image
          sx={{
            width: '40px',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
          src="ranking.svg"
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
            },
          }}
        />
      </Box>
    </DashboardWrapper>
  );
}
