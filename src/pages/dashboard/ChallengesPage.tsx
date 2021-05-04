import React from 'react';
import DashboardWrapper from './DashboardWrapper';
import { Heading, Box, Paragraph, Flex, Badge } from 'theme-ui';
import Image from '../../components/image/Image';
import { badgeStyle } from '../landing-page/sections/HeroSection';
import Tag from '@vtex/styleguide/lib/Tag';
import InputSearch from '@vtex/styleguide/lib/InputSearch';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';
import Pagination from '@vtex/styleguide/lib/Pagination';
import { useThemeUI } from 'theme-ui';
import { AiOutlineTags } from 'react-icons/ai';
import { Link } from 'wouter';

const OPTIONS = [
  {
    value: { id: 0, name: 'first-option' },
    label: 'First Option',
  },
  {
    value: { id: 1, name: 'second-option' },
    label: 'Second Option',
  },
];

function ChallengesPage() {
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;
  const [state, setState] = React.useState({
    search: '',
    categories: [],
    tags: [],
  });

  return (
    <DashboardWrapper>
      <Box>
        <Image
          sx={{ display: 'inline-block', verticalAlign: 'middle' }}
          src="challenges.svg"
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
            console.log('submitted! search this: ', state.search);
          }}
        />

        <Flex mt={3} sx={{}}>
          <Box sx={{ width: '30%' }}>
            <Select
              defaultValue={OPTIONS[0]}
              size="large"
              multi={true}
              label="Categorias"
              options={OPTIONS}
              onChange={(values: Record<string, string>) => {
                console.log(
                  `[Select] Selected: ${JSON.stringify(values, null, 2)}`
                );
              }}
            />
          </Box>
          <Box sx={{ width: '30%' }} ml={3}>
            <Select
              defaultValue={OPTIONS[0]}
              size="large"
              multi={true}
              label="Tags"
              options={OPTIONS}
              onChange={(values: Record<string, string>) => {
                console.log(
                  `[Select] Selected: ${JSON.stringify(values, null, 2)}`
                );
              }}
            />
          </Box>
        </Flex>
      </Box>

      <Box
        p={4}
        mt={2}
        sx={{
          boxShadow: 'primary',
          borderRadius: '1rem',
        }}
      >
        <Flex mt={2} py={3} sx={{ flexDirection: 'row' }}>
          <Image sx={{ width: '7rem' }} src="xadrez-example.jpg" />

          <Box sx={{ flexGrow: 1, cursor: 'pointer' }} ml={3}>
            <Link to="/dashboard/challenges/1">
              <Heading sx={{}} as="h3">
                Migração de base de dados usando python
              </Heading>
            </Link>

            <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse id iaculis ligula, in ultrices lorem.
            </Paragraph>

            <Badge sx={badgeStyle}>Desenvolvimento web</Badge>
          </Box>

          <Box sx={{ maxWidth: '12rem', '> div': { mt: 2, ml: 2 } }}>
            <Tag bgColor={colors?.purple} color={colors?.white}>
              <Flex sx={{ alignItems: 'center' }}>
                <AiOutlineTags size={17} />
                Django
              </Flex>
            </Tag>
            <Tag bgColor={colors?.purple} color={colors?.white}>
              <Flex sx={{ alignItems: 'center' }}>
                <AiOutlineTags size={17} />
                React
              </Flex>
            </Tag>
            <Tag bgColor={colors?.purple} color={colors?.white}>
              <Flex sx={{ alignItems: 'center' }}>
                <AiOutlineTags size={17} />
                Jest
              </Flex>
            </Tag>
          </Box>
        </Flex>
      </Box>

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
