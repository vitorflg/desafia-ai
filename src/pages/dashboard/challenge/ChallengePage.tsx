import { Box, Flex, Heading, Paragraph, Image, Button } from 'theme-ui';
import { useThemeUI } from 'theme-ui';
import React from 'react';
import { badgeStyle } from '../../landing-page/sections/HeroSection';
import Tag from '@vtex/styleguide/lib/Tag';
import Tabs from '@vtex/styleguide/lib/Tabs';
import Tab from '@vtex/styleguide/lib/Tab';
import { AiOutlineTags } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
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
import Skeleton from 'react-loading-skeleton';

function ChallengePage({ id }) {
  const [state, setState] = React.useState({ currentTab: 1 });
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const currentUser = useDataState();
  const [updatingCacheStore, setUpdatingCacheStore] = React.useState(false);
  const [acceptChallenge] = useMutation(acceptChallengeQuery);
  const [unacceptChallenge] = useMutation(unacceptChallengeQuery);

  const { data: challengeData, refetch: getChallengeRefetch, loading } = useQuery(getChallenge, {
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
          {loading ? (
            <Skeleton width={106} height={106} />
          ) : (
            <Image sx={{ width: '7rem' }} src={challenge?.imageUrl} />
          )}

          <Box
            sx={{ flexGrow: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            ml={3}
          >
            {loading ? (
              <Skeleton width={300} />
            ) : (
              <Heading sx={{ mt: 2 }} as="h3">
                {challenge?.name}
              </Heading>
            )}

            {loading ? (
              <Skeleton width={400} count={1} />
            ) : (
              <Paragraph sx={{ marginTop: '0.25rem', color: 'gray--300' }}>
                {challenge?.description}
              </Paragraph>
            )}

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
                sx={{ ...badgeStyle, '> svg': { verticalAlign: 'middle' }, maxWidth: '15rem' }}
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
                  maxWidth: '15rem',
                  '> svg': { verticalAlign: 'middle' },
                }}
              >
                {updatingCacheStore && <Loader color="#fff" size={21} />}
                {!updatingCacheStore && <IoMdCheckmark size={21} />}
                <Paragraph sx={{ ml: 1, display: 'inline-block' }}>Desafio aceito</Paragraph>
              </Button>
            )}
          </Box>
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
            <SolutionsTab
              getChallengeRefetch={getChallengeRefetch}
              challenge={challenge}
              challengeId={id}
            />
          </Tab>
        </Tabs>
      </Box>
    </DashboardWrapper>
  );
}

export default ChallengePage;
