import { Box, Flex, Heading, Paragraph, Image, Button } from 'theme-ui';
import { useThemeUI } from 'theme-ui';
import React from 'react';
import { badgeStyle } from '../../landing-page/sections/HeroSection';
import Tag from '@vtex/styleguide/lib/Tag';
import Tabs from '@vtex/styleguide/lib/Tabs';
import Tab from '@vtex/styleguide/lib/Tab';
import { AiOutlineTags } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import DashboardWrapper from '../DashboardWrapper';
import getChallenge from '../../../data/queries/getChallengeQuery.graphql';
import { useMutation, useQuery } from '@apollo/client';
import PrincipalTab from './PrincipalTab';
import DetailsTab from './DetailsTab';
import SolutionsTab from './SolutionsTab';
import { useDataState } from '../../../data/DataLayer';
import acceptChallengeQuery from '../../../data/queries/acceptChallengeQuery.graphql';
import unacceptChallengeQuery from '../../../data/queries/unacceptChallengeQuery.graphql';
import Loader from '../../../components/loadings/loader';

function ChallengePage({ id }) {
  const [state, setState] = React.useState({ currentTab: 1 });
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const currentUser = useDataState();
  const [updatingCacheStore, setUpdatingCacheStore] = React.useState(false);
  const [acceptChallenge] = useMutation(acceptChallengeQuery);
  const [unacceptChallenge] = useMutation(unacceptChallengeQuery);

  const { data: challengeData, refetch: getChallengeRefetch } = useQuery(getChallenge, {
    variables: { id, currentUserId: currentUser?.googleId },
    fetchPolicy: 'network-only',
  });

  const challenge = challengeData?.challenge;

  React.useEffect(() => {
    setUpdatingCacheStore(false);
  }, [challenge]);

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

            {!challenge?.acceptedByCurrentUser ? (
              <Button
                onClick={() => {
                  setUpdatingCacheStore(true);

                  acceptChallenge({
                    variables: {
                      currentUserId: currentUser?.googleId,
                      challengeId: id,
                    },
                  }).then(() => {
                    getChallengeRefetch();
                  });
                }}
                sx={{ ...badgeStyle, '> svg': { verticalAlign: 'middle' } }}
              >
                {updatingCacheStore && <Loader size={21} />}
                <Paragraph sx={{ ml: 1, display: 'inline-block' }}>Aceitar desafio</Paragraph>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setUpdatingCacheStore(true);

                  unacceptChallenge({
                    variables: {
                      currentUserId: currentUser?.googleId,
                      challengeId: id,
                    },
                    update: async (proxy: any) => {
                      await proxy.writeQuery({
                        query: getChallenge,
                        data: {
                          challenge: {
                            ...challenge,
                            acceptedByCurrentUser: false,
                          },
                        },
                        variables: {
                          challengeId: id,
                          currentUserId: currentUser?.googleId,
                        },
                      });
                    },
                  });
                }}
                sx={{
                  ...badgeStyle,
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  '> svg': { verticalAlign: 'middle' },
                }}
              >
                {updatingCacheStore && <Loader size={21} />}
                {!updatingCacheStore && <GiConfirmed size={21} />}
                <Paragraph sx={{ ml: 1, display: 'inline-block' }}>Desafio aceito</Paragraph>
              </Button>
            )}
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
            <DetailsTab getChallengeRefetch={getChallengeRefetch} challenge={challenge} />
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
