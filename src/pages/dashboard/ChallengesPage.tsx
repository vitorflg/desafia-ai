import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import { Heading, Box, Paragraph, Flex, Badge } from 'theme-ui';
import { badgeStyle } from '../landing-page/sections/HeroSection';
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

function ChallengesPage() {
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const [state, setState] = React.useState({
    search: '',
    categories: [],
    tags: [],
  });

  const [listChallenges, { data }] = useLazyQuery(listChallengesQuery, {
    fetchPolicy: 'cache-first',
  });

  const challenges = data?.challenges ?? [];

  React.useEffect(() => {
    listChallenges();
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
              },
            });
          }}
        />

        <Flex mt={3}>
          <Box sx={{ width: '30%' }}>
            <Select
              size="large"
              multi={false}
              options={categoryOptions}
              onChange={(values: any) => {
                setState({ ...state, categories: values.label });
                listChallenges({
                  variables: {
                    search: state?.search,
                    tags: state?.tags,
                    categories: state?.categories,
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
                const newCategoryValues = values.map((category: any) => category.label);

                setState({ ...state, tags: newTagValues, categories: newCategoryValues });
                listChallenges({
                  variables: {
                    search: state?.search,
                    categories: newCategoryValues,
                    tags: newTagValues,
                  },
                });
              }}
            />
          </Box>
        </Flex>
      </Box>

      {challenges.map((challenge: any) => {
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

              <Box sx={{ flexGrow: 1, cursor: 'pointer' }} ml={3}>
                <Link to={`/dashboard/challenges/${challenge?.id}`}>
                  <Heading sx={{}} as="h3">
                    {challenge.name}
                  </Heading>
                </Link>

                <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                  {challenge.description}
                </Paragraph>

                {/* <Badge sx={badgeStyle}>{challenge.category}</Badge> */}
                {[...challenge?.tags, ...(challenge?.categories ? challenge.categories : [])].map(
                  (tag: string) => {
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
                  }
                )}
              </Box>
            </Flex>
          </Box>
        );
      })}

      <Pagination
        rowsOptions={[5, 10, 15, 20]}
        currentItemFrom={1}
        currentItemTo={10}
        textOf="of"
        textShowRows="show rows"
        totalItems={20}
      />
    </DashboardWrapper>
  );
}

export default ChallengesPage;
