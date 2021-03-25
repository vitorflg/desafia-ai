import React from 'react';
import { Header, HeaderRow } from '../../components/headers/PublicHeader';
import logoSrc from '../../assets/images/logo.png';
import whiteLogoSrc from '../../assets/images/white-logo.png';
import { Box, Image, Heading, Flex, Button, Text, Input, Link } from 'theme-ui';
import illustrationSrc from '../../assets/images/illustration2.png';
import featuresSrc from '../../assets/images/features.png';
import { Card, CardContent } from '../../components/cards/Card';
import { AiOutlineSearch, AiOutlineFacebook, AiOutlineTwitter, AiOutlineWhatsApp, AiOutlineArrowUp } from 'react-icons/ai';
import { Menu, MenuItem } from '../../components/menus/Menu';
import { Footer, FooterRow } from '../../components/footers/PublicFooter';
import { CgMenuGridO } from 'react-icons/cg';
import { IoLogoDropbox } from 'react-icons/io';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

export type MenuItemType = {
  text?: string;
  icon?: React.ComponentType;
  url: string;
};

const MENU_SCHEMA: Record<'left' | 'right', MenuItemType[]> = {
  left: [
    { text: 'Criar desafio', url: '/' },
    { text: 'Como funciona?', url: '/' },
    { text: 'Apoio', url: '/' },
  ],
  right: [
    { icon: CgMenuGridO, url: '/' },
    { text: 'Cadastre-se', url: '/' },
    { text: 'Entrar', url: '/auth' },
  ],
};

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
      <Header
        sx={{
          px: 4,
          py: '1.25rem',
        }}
        behaviour="relative"
      >
        <HeaderRow sx={{ alignItems: 'center' }}>
          <Image
            width="140"
            sx={{
              display: 'inline-block',
              verticalAlign: 'middle',
              minWidth: '140px',
              flexGrow: 1,
            }}
            src={logoSrc}
          />

          <Menu schema={MENU_SCHEMA} sx={{ variant: 'styles.menu' }}>
            <Box
              data-testid="headerLeft"
              sx={{ flexGrow: 1, display: 'inherit', ml: 3 }}
            >
              <MenuItem>Criar desafio</MenuItem>

              <MenuItem sx={{ ml: 5 }}>Como funciona?</MenuItem>

              <MenuItem sx={{ ml: 5 }}>Apoio</MenuItem>
            </Box>

            <MenuItem sx={{ ml: 5 }}>
              <Box sx={{ mr: 2 }}>
                <AiOutlineSearch size="30"></AiOutlineSearch>
              </Box>
            </MenuItem>

            <MenuItem sx={{ ml: 5 }}>Cadastre-se</MenuItem>

            <MenuItem sx={{ ml: 5 }}>Entrar</MenuItem>
          </Menu>
        </HeaderRow>
      </Header>

      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          paddingTop: ['200px', '200px', '354px'],
        }}
      >
        <Box sx={{ position: 'relative', bottom: '150px' }}>
          <Flex
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'purple',
              borderRadius: '99rem',
              maxWidth: 'fit-content',
              padding: '0.25rem 0.75rem',
              color: 'white',
              fontFamily: 'Roboto Light',
              fontSize: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: '99rem',
                backgroundColor: '#6366F1',
                padding: '0.2rem 0.5rem',
                marginRight: 2,
              }}
            >
              BETA
            </Box>
            <Text sx={{ whiteSpace: 'nowrap' }}>
              Em fase de teste no instituto de computação da UFF
            </Text>
          </Flex>
          <Heading
            as="h1"
            sx={{
              variant: 'styles.h1',
              mr: 2,
              mt: 3,
              maxWidth: '48.5rem',
              flexGrow: 1,
            }}
          >
            Encontre desafios reais junto à uma comunidade acadêmica e
            colaborativa.
          </Heading>

          <Button sx={{ marginTop: 4 }}>Buscar desafios</Button>
        </Box>

        <Image
          width="1200"
          sx={{
            position: 'absolute',
            top: ['-50px', '-50px', '0', '50px'],
            right: ['0', '-800px', '-800px', '-650px'],
            minWidth: '1400px',
            display: ['none', 'none', 'block'],
          }}
          src={illustrationSrc}
        ></Image>
      </Flex>

      <Heading sx={{ py: 2, px: 4 }} as="h1">
        Como funciona?
      </Heading>

      <Flex sx={{ py: 4, px: 4, flexDirection: ['column', 'column', 'row'] }}>
        <Card sx={{ maxWidth: '400px' }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h4">
              <u>1. Crie um desafio</u>
            </Heading>

            <Heading sx={{ mt: 3 }} as="p">
              Escolha uma categoria e proponha um desafio relacionada à ciência
              da computação
            </Heading>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: '300px', marginLeft: [0, 0, 5] }}>
          <CardContent>
            <Heading sx={{ mt: 2 }} as="h4">
              <u>2. Convide pessoas</u>
            </Heading>

            <Heading sx={{ mt: 3 }} as="p">
              Lorem ipsum
            </Heading>
          </CardContent>
        </Card>
      </Flex>

      <Flex sx={{ mt: 5, flexDirection: ['column', 'column', 'row'] }}>
        <Box
          sx={{
            backgroundColor: 'purple',
            color: 'white',
            width: ['100%', '100%', '80%'],
            padding: ['7rem 2rem', '7rem 2rem', '7rem 7rem'],
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              bottom: '3rem',
            }}
          >
            <Box
              sx={{
                padding: '0.5rem',
                backgroundColor: 'white',
                borderRadius: 4,
                width: 'fit-content',
                '> *': { display: 'inline-block', verticalAlign: 'middle' },
              }}
            >
              <IoLogoDropbox size="25" color="#3730A3"></IoLogoDropbox>

              <Text sx={{ color: 'purple', ml: 2 }}>Integrações</Text>
            </Box>

            <Heading
              sx={{ maxWidth: '40rem', mt: 4 }}
              variant="styles.h1"
              as="h1"
            >
              Integrações para diferentes tipos de desafios.
            </Heading>

            <Heading
              sx={{ maxWidth: '40rem', mt: 4 }}
              variant="styles.h3"
              as="h3"
            >
              Conecte outras aplicações com a nossa plataforma para facilmente
              permitir uma maior range de desafios!
            </Heading>
          </Box>

          <Image src={featuresSrc} />
        </Box>

        <Box
          sx={{
            width: ['10rem', '10rem', '20rem'],
            marginLeft: 4,
            marginRight: 4,
            order: [1, 1, 2],
          }}
        >
          <Button
            sx={{ width: '100%', textDecoration: 'underline' }}
            variant="disabled"
          >
            Integrações
          </Button>
        </Box>
      </Flex>

      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          justifyContent: 'center',
          alignItems: 'center',
          py: 6,
        }}
      >
        <Box sx={{ textAlign: ['center', 'center', 'left'] }}>
          <Heading as="h1">Newsletter</Heading>

          <Text sx={{ maxWidth: '22rem', mt: 3 }} variant="styles.p">
            Receba desafios periodicamente de acordo com o seu perfil
          </Text>
        </Box>

        <Input
          variant="inputs.primary"
          sx={{ maxWidth: '20rem', mr: [0, 0, 3], mt: 3 }}
          placeholder="vitorflg@id.uff.br"
        ></Input>

        <Button
          sx={{ mt: 3, width: ['100%', '100%', 'auto'], maxWidth: '20rem' }}
        >
          Assinar
        </Button>
      </Flex>

      <Footer
        sx={{
          height: '11rem',
          px: 4,
          py: '1.25rem',
          backgroundColor: 'black2'
        }}
        behaviour="relative"
      >
        <FooterRow sx={{ alignItems: 'center' }}>
          <Box
            data-testid="footerLeft"
            sx={{ flexGrow: 1, display: 'inline-block' }}
          >
            <Image
              width="160"
              sx={{ display: 'inline-block', verticalAlign: 'middle' }}
              src={whiteLogoSrc}
            />
          </Box>

          <Link sx={{ ml: 5, color: 'whiteIce' }}>Direitos autorais</Link>

          <Link sx={{ ml: 5, color: 'whiteIce' }}>Termos de uso</Link>

          <Link sx={{ ml: 5, color: 'whiteIce' }}>Políticas de privacidade</Link>
        </FooterRow>
        <FooterRow sx={{ alignItems: 'center', marginTop: 4 }}>
          <Box
            data-testid="footerLeft"
            sx={{ flexGrow: 1, display: 'inline-block' }}
          >
            <Link
              sx={{
                backgroundColor: 'grai',
                padding: 1,
              }}
            >
              <AiOutlineFacebook color="#fff" />
            </Link>
            <Link
              sx={{
                backgroundColor: 'grai',
                ml: 3,
                padding: 1,
              }}
            >
              <AiOutlineTwitter color="#fff"  />
            </Link>
            <Link
              sx={{
                backgroundColor: 'grai',
                ml: 3,
                padding: 1,
              }}
            >
              <AiOutlineWhatsApp color="#fff"  />
            </Link>

            <Link sx={{ ml: 3, color: 'whiteIce' }}>Central de Ajuda</Link>
          </Box>

          <Text sx={{
            color: '#2062AC',
            fontSize: 2,
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}>
            Desafie você mesmo!
          </Text>

          <Link
            sx={{
              backgroundColor: 'grai',
              ml: 4,
              padding: 1,
            }}
          >
            <AiOutlineArrowUp color="#fff" />
          </Link>
        </FooterRow>
      </Footer>
    </Box>
  );
};

export default LandingPage;
