import React from 'react';
import { Heading, Box, Paragraph, Flex } from 'theme-ui';
import Tag from '@vtex/styleguide/lib/Tag';
import InputSearch from '@vtex/styleguide/lib/InputSearch';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';
import Pagination from '@vtex/styleguide/lib/Pagination';
import { useThemeUI } from 'theme-ui';
import { AiOutlineTags } from 'react-icons/ai';
import { useLazyQuery } from '@apollo/client';
import listChallengesQuery from '../../data/queries/listChallengesQuery.graphql';
import { Image } from '@theme-ui/components';
import { tagOptions, categoryOptions } from '../../utils/constants';
import challengeImgSrc from '../../assets/images/challenges.svg';
import logoSrc from '../../assets/images/logo.png';
import { Header } from '../../components/headers/PublicHeader';
import { Menu } from '../../components/menus/Menu';
import { CgMenuGridO } from 'react-icons/cg';
import { MenuItemType } from '../landing-page/LandingPage';

const MENU_SCHEMA: Record<'left' | 'right', MenuItemType[]> = {
  left: [
    { text: 'Criar desafio', href: '/create-challenge' },
    { text: 'Como funciona?', href: '#como-funciona' },
  ],
  right: [
    { icon: CgMenuGridO, href: '/' },
    { text: 'Entrar', href: '/auth' },
  ],
};

function PublicChallengesPage() {
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const [state, setState] = React.useState({
    search: '',
    categories: [],
    tags: [],
    page: 0,
  });

  const [listChallenges, { data }] = useLazyQuery(listChallengesQuery, {
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
    <>
      <Header
        sx={{
          px: 4,
          py: '1.25rem',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Image
            sx={{
              minWidth: '140px',
              maxWidth: '140px',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            src={logoSrc}
          />
        </Box>

        <Menu schema={MENU_SCHEMA} sx={{ variant: 'styles.menu' }}>
          <Box sx={{ flexGrow: 1, display: 'inherit', ml: 3 }} />
        </Menu>
      </Header>
      <Box sx={{ padding: 4 }}>
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
                  const newCategoryValues = values.map((category: any) => category.label);

                  setState({ ...state, tags: newTagValues, categories: newCategoryValues });
                  listChallenges({
                    variables: {
                      search: state?.search,
                      categories: newCategoryValues,
                      tags: newTagValues,
                      page: state?.page,
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
                  <Heading sx={{}} as="h3">
                    {challenge.name}
                  </Heading>

                  <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                    {challenge.description}
                  </Paragraph>

                  {[...challenge?.tags, ...(challenge?.categories ? challenge.categories : [])].map(
                    (tag: string) => {
                      return (
                        <Box
                          sx={{
                            maxWidth: '16rem',
                            '> div': { mt: 2, ml: 2 },
                            display: 'inline-block',
                          }}
                        >
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
      </Box>
    </>
  );
}

export default PublicChallengesPage;
