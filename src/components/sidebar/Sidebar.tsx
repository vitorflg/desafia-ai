import React from 'react';
import { Box, Image, Heading, Flex } from '@theme-ui/components';
import logoSrc from '../../assets/images/white-logo--no-cursor.png';
import { AiFillHome, AiFillTrophy } from 'react-icons/ai';

import { GiNetworkBars } from 'react-icons/gi';
import { IconType } from 'react-icons';
import routes from '../../routes/index';
import { Link } from 'wouter';

type Link = {
  Icon: IconType;
  label: string;
  href?: string;
};

const LINKS: Link[] = [
  { Icon: AiFillHome, label: 'Home', href: routes.dashboard.home },
  { Icon: AiFillTrophy, label: 'Desafios', href: routes.dashboard.challenges },
  { Icon: GiNetworkBars, label: 'Ranking', href: routes.dashboard.ranking },
];
function Sidebar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        top: 0,
        width: '17rem',
        bg: 'black--600',
        height: '100vh',
        padding: '2rem',
      }}
    >
      <Box sx={{ '> *': { display: 'inline-block' } }}>
        <Image width="125" src={logoSrc} />
        <div className="cursor"></div>
      </Box>

      <Box mt={5}>
        {LINKS.map((link) => {
          const Icon = link.Icon;

          return (
            <Link href={`${link.href}`}>
              <Flex sx={{ cursor: 'pointer', alignItems: 'center' }} mt={4} ml="auto">
                <Icon
                  style={{ position: 'relative', bottom: '0.17rem' }}
                  color="#bebebe"
                  size={20}
                />

                <Heading sx={{ color: 'gray--200', ml: 3 }} as="h4">
                  {link.label}
                </Heading>
              </Flex>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

export default Sidebar;
