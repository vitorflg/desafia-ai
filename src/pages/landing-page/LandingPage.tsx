import React from 'react';
import { Box, Image, Flex, Text, Link } from 'theme-ui';
import { Header } from '../../components/headers/PublicHeader';
import { Menu } from '../../components/menus/Menu';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import IntegrationsSection from './sections/IntegrationsSection';
import NewsletterSection from './sections/NewsletterSection';
import { Footer } from '../../components/footers/PublicFooter';
import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import logoSrc from '../../assets/images/logo.png';
import whiteLogoSrc from '../../assets/images/white-logo.png';

export type MenuItemType = {
  text?: string;
  icon?: React.ComponentType;
  href: string;
};

const MENU_SCHEMA: Record<'left' | 'right', MenuItemType[]> = {
  left: [
    { text: 'Criar desafio', href: '/create-challenge' },
    { text: 'Como funciona?', href: '#como-funciona' },
    { text: 'Apoio', href: '/' },
  ],
  right: [
    { icon: CgMenuGridO, href: '/' },
    { text: 'Entrar', href: '/auth' },
  ],
};

const footerLinks = [
  {
    id: 0,
    name: 'Direitos Autorais',
    link: '',
  },
  {
    id: 1,
    name: 'Termos de Uso',
    link: '',
  },
  {
    id: 2,
    name: 'Políticas de privacidade',
    link: '',
  },
];

const LandingPage: React.FC = () => {
  React.useEffect(() => {
    clearAllBodyScrollLocks();
  });

  return (
    <Box
      sx={{
        width: '100%',
        background:
          'radial-gradient(254.64% 159.5% at 92.27% 17.71%, #E6E6E6 0%, rgba(247, 247, 247, 0) 100%)',
      }}
    >
      <HeaderSection />
      <HeroSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <NewsletterSection />
      <FooterSection />
    </Box>
  );
};

const HeaderSection = () => {
  return (
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
  );
};

const FooterSection = () => {
  return (
    <Footer
      sx={{
        minHeight: '11rem',
        px: [2, 4],
        py: '1.25rem',
        backgroundColor: 'black--600',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'inline-block', mb: [2, 0] }}>
        <Image width="160" sx={{ display: 'block', verticalAlign: 'middle' }} src={whiteLogoSrc} />
      </Box>

      {footerLinks.map((link) => (
        <Link key={link.id} sx={{ ml: [0, 4], color: 'whiteIce', width: ['100%', 'auto'] }}>
          {link.name}
        </Link>
      ))}

      <Flex sx={{ width: '100%', alignItems: 'center', mt: [3, 0] }}>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            sx={{
              backgroundColor: 'gray-700',
              display: 'inline-grid',
              padding: 1,
            }}
          >
            <AiOutlineFacebook color="#fff" />
          </Link>

          <Link
            sx={{
              backgroundColor: 'gray-700',
              ml: 3,
              display: 'inline-grid',
              padding: 1,
            }}
          >
            <AiOutlineTwitter color="#fff" />
          </Link>

          <Link
            sx={{
              backgroundColor: 'gray-700',
              ml: 3,
              display: 'inline-grid',
              padding: 1,
            }}
          >
            <AiOutlineWhatsApp color="#fff" />
          </Link>

          <Link
            sx={{
              ml: [0, 4],
              color: 'whiteIce',
              display: ['inline-block', 'auto'],
            }}
          >
            Central de Ajuda
          </Link>
        </Box>

        <Text
          sx={{
            color: 'blue',
            fontSize: 2,
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Desafie você mesmo!
        </Text>

        <Link
          sx={{
            backgroundColor: 'gray-700',
            ml: 4,
            display: 'inline-grid',
            padding: 1,
          }}
        >
          <AiOutlineArrowUp color="#fff" />
        </Link>
      </Flex>
    </Footer>
  );
};

export default LandingPage;
