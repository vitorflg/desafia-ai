import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import { Heading, Box, Paragraph, Flex, Badge } from 'theme-ui';
import Tag from '@vtex/styleguide/lib/Tag';
import InputSearch from '@vtex/styleguide/lib/InputSearch';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';
import Pagination from '@vtex/styleguide/lib/Pagination';
import { useThemeUI } from 'theme-ui';
import { AiOutlineTags } from 'react-icons/ai';
import { Link } from 'wouter';
import { useLazyQuery } from '@apollo/client';
import listChallengesQuery from '../../data/queries/listChallengesQuery.graphql';
import { Image } from '@theme-ui/components';
import { tagOptions, categoryOptions } from '../../utils/constants';
import challengeImgSrc from '../../assets/images/challenges.svg';
import Skeleton from 'react-loading-skeleton';

function ChallengesPage() {
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const [state, setState] = React.useState({
    search: '',
    categories: [],
    tags: [],
    page: 0,
  });

  const [listChallenges, { data, loading }] = useLazyQuery(listChallengesQuery, {
    fetchPolicy: 'network-only',
  });

  const challenges = data?.challenges?.list ?? [];

  React.useEffect(() => {
    listChallenges({
      variables: {
        page: state?.page,
      },
    });
  }, []);

  return (
    <DashboardWrapper>
      <Box>
        <Image
          sx={{ display: 'inline-block', verticalAlign: 'middle' }}
          src={challengeImgSrc}
        ></Image>
        <Heading ml={3} sx={{ display: 'inline-block' }} as="h2">
          Desafios
        </Heading>
      </Box>

      <Box my={4}>
        <InputSearch
          placeholder="Search..."
          value={state.search}
          size="large"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, search: e.target.value })
          }
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();

            listChallenges({
              variables: {
                tags: state?.tags,
                categories: state?.categories,
                search: state?.search,
                page: state?.page,
              },
            });
          }}
        />

        <Flex mt={3}>
          <Box sx={{ width: '30%' }}>
            <Select
              size="large"
              multi={true}
              options={categoryOptions}
              onChange={(values: any) => {
                const newCategoryValues = values.map((category: any) => category.label);

                setState({ ...state, categories: newCategoryValues });
                listChallenges({
                  variables: {
                    search: state?.search,
                    tags: state?.tags,
                    categories: newCategoryValues,
                    page: state?.page,
                  },
                });
              }}
            />
          </Box>
          <Box sx={{ width: '30%' }} ml={3}>
            <Select
              size="large"
              multi={true}
              options={tagOptions}
              onChange={(values: any) => {
                const newTagValues = values.map((tag: any) => tag.label);

                setState({ ...state, tags: newTagValues });
                listChallenges({
                  variables: {
                    search: state?.search,
                    categories: state?.categories,
                    tags: newTagValues,
                    page: state?.page,
                  },
                });
              }}
            />
          </Box>
        </Flex>
      </Box>

      {loading && (
        <Box sx={{ span: { mt: '0.75rem' } }}>
          <Skeleton width="100%" height={210} count={3}></Skeleton>
        </Box>
      )}

      {!loading &&
        challenges.map((challenge: any) => {
          return (
            <Box
              p={4}
              mt={2}
              sx={{
                boxShadow: 'primary',
                borderRadius: '1rem',
              }}
            >
              <Flex mt={2} py={3} sx={{ flexDirection: 'row' }}>
                <Image sx={{ width: '7rem' }} src={challenge.imageUrl} />

                <Link to={`/dashboard/challenges/${challenge?.id}`}>
                  <Box sx={{ flexGrow: 1, cursor: 'pointer' }} ml={3}>
                    <Heading sx={{}} as="h3">
                      {challenge.name}
                    </Heading>

                    <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                      {challenge.description}
                    </Paragraph>

                    <Flex
                      sx={{
                        flexDirection: 'row',
                        '> div': { mt: 2, ml: 2, ':first-child': { ml: 0 } },
                      }}
                    >
                      {challenge?.categories.map((tag: string) => {
                        return (
                          <Tag bgColor={'#f2f2f2'} color={colors?.black}>
                            <Paragraph sx={{ fontSize: 1 }}>{tag}</Paragraph>
                          </Tag>
                        );
                      })}
                    </Flex>

                    {challenge?.tags.map((tag: string) => {
                      return (
                        <Flex
                          sx={{
                            flexDirection: 'row',
                            '> div': { mt: 2, ml: 2, ':first-child': { ml: 0 } },
                          }}
                        >
                          <Tag bgColor={colors?.purple} color={colors?.white}>
                            <Flex sx={{ alignItems: 'center' }}>
                              <AiOutlineTags size={17} />
                              <Paragraph sx={{ fontSize: 1 }}>{tag}</Paragraph>
                            </Flex>
                          </Tag>
                        </Flex>
                      );
                    })}
                  </Box>
                </Link>
              </Flex>
            </Box>
          );
        })}

      <Box sx={{ mb: 3 }}>
        <Pagination
          onNextClick={() => {
            listChallenges({
              variables: {
                tags: state?.tags,
                categories: state?.categories,
                search: state?.search,
                page: state?.page + 1,
              },
            });

            setState({ ...state, page: state.page + 1 });
          }}
          onPrevClick={() => {
            listChallenges({
              variables: {
                tags: state?.tags,
                categories: state?.categories,
                search: state?.search,
                page: state?.page - 1,
              },
            });

            setState({ ...state, page: state.page - 1 });
          }}
          currentItemFrom={state?.page * 5 > 0 ? state?.page * 5 : 1}
          currentItemTo={state?.page * 5 + 5}
          totalItems={data?.challenges?.count}
          textOf="de"
        />
      </Box>
    </DashboardWrapper>
  );
}

export default ChallengesPage;
