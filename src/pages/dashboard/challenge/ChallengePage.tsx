import { Box, Flex, Heading, Paragraph, Badge } from 'theme-ui';
import { useThemeUI } from 'theme-ui';
import React from 'react';
import Image from '../../../components/image/Image';
import { badgeStyle } from '../../landing-page/sections/HeroSection';
import Tag from '@vtex/styleguide/lib/Tag';
import Tabs from '@vtex/styleguide/lib/Tabs';
import Tab from '@vtex/styleguide/lib/Tab';
import { AiOutlineTags } from 'react-icons/ai';
import DashboardWrapper from '../DashboardWrapper';
import getChallenge from '../../../data/queries/getChallengeQuery.graphql';
import { useQuery } from '@apollo/client';
import PrincipalTab from './PrincipalTab';
import DetailsTab from './DetailsTab';
import SolutionsTab from './SolutionsTab';

function ChallengePage({ id }) {
  const [state, setState] = React.useState({ currentTab: 1 });
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;

  const { data: challengeData } = useQuery(getChallenge, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const challenge = challengeData?.challenge;

  return (
    <DashboardWrapper>
      <Box
        p={4}
        mt={2}
        sx={{
          boxShadow: 'primary',
          borderRadius: '1rem',
        }}
      >
        <Flex mt={2} py={3} sx={{ flexDirection: 'row' }}>
          <Image sx={{ width: '7rem' }} src={challenge?.imageUrl} />

          <Box sx={{ flexGrow: 1, cursor: 'pointer' }} ml={3}>
            <Heading sx={{}} as="h3">
              {challenge?.name}
            </Heading>

            <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
              {challenge?.description}
            </Paragraph>

            <Badge sx={badgeStyle}>{challenge?.category}</Badge>
          </Box>

          {challenge?.tags?.map((tag: string) => {
            return (
              <Box sx={{ maxWidth: '12rem', '> div': { mt: 2, ml: 2 } }}>
                <Tag bgColor={colors?.purple} color={colors?.white}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <AiOutlineTags size={17} />
                    {tag}
                  </Flex>
                </Tag>
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box m={3}>
        <Tabs fullWidth>
          <Tab
            label="Principal"
            active={state.currentTab === 1}
            onClick={() => setState({ currentTab: 1 })}
          >
            <PrincipalTab challenge={challenge} />
          </Tab>

          <Tab
            label="Detalhes"
            active={state.currentTab === 2}
            onClick={() => setState({ currentTab: 2 })}
          >
            <DetailsTab challenge={challenge} />
          </Tab>

          <Tab
            label="Soluções"
            active={state.currentTab === 3}
            onClick={() => setState({ currentTab: 3 })}
          >
            <SolutionsTab challenge={challenge} challengeId={id} />
          </Tab>
        </Tabs>
      </Box>
    </DashboardWrapper>
  );
}

export default ChallengePage;
