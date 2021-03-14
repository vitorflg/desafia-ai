import React from 'react';
import { Header, HeaderRow } from '../../components/headers/PublicHeader';
import logoSrc from '../../assets/images/logo.jpg';
import { Box, Image, Heading, Flex, Button, Text, Input } from 'theme-ui';
import illustrationSrc from '../../assets/images/illustration2.png';
import featuresSrc from '../../assets/images/features.png';
import icSrc from '../../assets/images/ic.png';
import { Card, CardContent } from '../../components/cards/Card';
import { AiOutlineSearch } from 'react-icons/ai';
import { Menu, MenuItem } from '../../components/menus/Menu';
import CardsList from './self-components/header/CardsList';
import { CgMenuGridO } from 'react-icons/cg';

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
    { text: 'Entrar', url: '/' },
  ],
};

const Home: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
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
              <MenuItem OnHover={() => <CardsList />}>Criar desafio</MenuItem>

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
        <Image
          sx={{ width: '100%', order: [2, 2, 1], marginTop: [4, 4, 0] }}
          src={featuresSrc}
        ></Image>

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
          py: 5,
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

      <Box
        sx={{
          height: '30rem',
          backgroundColor: 'primary',
          position: 'relative',
        }}
      >
        <Image
          sx={{ position: 'absolute', left: 4, bottom: 4 }}
          width="120"
          src={icSrc}
        ></Image>
      </Box>
    </Box>
  );
};

export default Home;
