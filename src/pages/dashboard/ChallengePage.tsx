import { Box, Flex, Heading, Paragraph, Badge } from 'theme-ui';
import { useThemeUI } from 'theme-ui';
import React from 'react';
import Image from '../../components/image/Image';
import { Link } from 'wouter';
import { badgeStyle } from '../landing-page/sections/HeroSection';
import Tag from '@vtex/styleguide/lib/Tag';
import Tabs from '@vtex/styleguide/lib/Tabs';
import Tab from '@vtex/styleguide/lib/Tab';
import VTEXBox from '@vtex/styleguide/lib/Box';
import FloatingActionBar from '@vtex/styleguide/lib/FloatingActionBar';
import { AiOutlineTags, AiOutlineLike } from 'react-icons/ai';
import DashboardWrapper from './DashboardWrapper';

function ChallengePage() {
  const [state, setState] = React.useState({ currentTab: 1 });
  const context = useThemeUI();
  const colors = context?.theme?.rawColors;

  return (
    <DashboardWrapper>
      <FloatingActionBar
        save={{
          label: 'Aceitar desafio',
          onClick: () => {
            setTimeout(() => {
              alert('This was invoked because save was pressed');
            }, 2000);
          },
        }}
        cancel={{
          label: 'cancel',
        }}
      />

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

      <Box m={3}>
        <Tabs fullWidth>
          <Tab
            label="Principal"
            active={state.currentTab === 1}
            onClick={() => setState({ currentTab: 1 })}
          >
            <div className="bg-muted-5 pa8">
              <VTEXBox title="Distributed Order Management">
                <ul className="mid-gray">
                  <li className="mb4">
                    Integrate all sales channels through a single order
                    management system.
                  </li>
                  <li className="mb4">
                    Optimize time and costs through multiple fulfillment
                    scenarios as pickup points, ship from store, scheduled
                    delivery and more.
                  </li>
                  <li className="mb4">
                    Simplify order's change and reverse logistics.
                  </li>
                  <li className="mb4">
                    Create a single source of truth for inventory, logistics,
                    and fulfillment.
                  </li>
                  <li>
                    Stay up to date with our real-time, customizable order flow.
                  </li>
                </ul>
              </VTEXBox>
            </div>
          </Tab>
          <Tab
            label="Detalhes"
            active={state.currentTab === 2}
            onClick={() => setState({ currentTab: 2 })}
          >
            <p>Content from rich-text</p>
          </Tab>
          <Tab
            label="Soluções"
            active={state.currentTab === 3}
            onClick={() => setState({ currentTab: 3 })}
          >
            <Box
              p={4}
              mt={4}
              sx={{
                boxShadow: 'primary',
                borderRadius: '1rem',
              }}
            >
              <Flex mt={2} py={3} sx={{ flexDirection: 'row' }}>
                <Box sx={{ flexGrow: 1, cursor: 'pointer' }} ml={3}>
                  <Link to="/dashboard/challenges/1">
                    <Heading sx={{}} as="h3">
                      Solução com panda.py
                    </Heading>
                  </Link>

                  <Paragraph sx={{ marginTop: '0.5rem', color: 'gray--300' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse id iaculis ligula, in ultrices lorem.
                  </Paragraph>
                </Box>
                <Box>
                  <Box
                    sx={{
                      border: '1px solid #000',
                      height: '2rem',
                      borderRadius: '99rem',
                      padding: '0.25rem 0.5rem',
                    }}
                  >
                    <AiOutlineLike />
                  </Box>
                  <Paragraph
                    sx={{
                      width: '100%',
                      margin: 'auto',
                      display: 'inline-block',
                      textAlign: 'center',
                    }}
                  >
                    +4
                  </Paragraph>
                </Box>
              </Flex>
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </DashboardWrapper>
  );
}

export default ChallengePage;
