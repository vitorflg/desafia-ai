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

const Home: React.FC = () => {
  return (
    <Box>
      <Header
        sx={{
          px: 4,
          py: '1.25rem',
        }}
        behaviour="relative"
      >
        <HeaderRow sx={{ alignItems: 'center' }}>
          <Box
            data-testid="headerLeft"
            sx={{ flexGrow: 1, display: 'inline-block' }}
          >
            <Image
              width="140"
              sx={{ display: 'inline-block', verticalAlign: 'middle' }}
              src={logoSrc}
            />

            <Menu sx={{ ml: 5 }}>
              <MenuItem OnHover={() => <CardsList />}>Criar desafio</MenuItem>
            </Menu>

            <Menu sx={{ ml: 5 }}>Como funciona?</Menu>

            <Menu sx={{ ml: 5 }}>Apoio</Menu>
          </Box>

          <Box sx={{ mr: 2 }}>
            <AiOutlineSearch size="30"></AiOutlineSearch>
          </Box>

          <Menu sx={{ ml: 5 }}>Cadastre-se</Menu>

          <Menu sx={{ ml: 5 }}>Entrar</Menu>
        </HeaderRow>
      </Header>

      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 5,
          px: 4,
          paddingTop: '354px',
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
          sx={{ position: 'absolute', right: '-650px', minWidth: '1400px' }}
          src={illustrationSrc}
        ></Image>
      </Flex>

      <Heading sx={{ py: 2, px: 4 }} as="h1">
        Como funciona?
      </Heading>

      <Flex sx={{ py: 4, px: 4, flexDirection: 'row' }}>
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

        <Card sx={{ maxWidth: '300px', marginLeft: 5 }}>
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

      <Flex sx={{ mt: 5 }}>
        <Image sx={{ width: '100%' }} src={featuresSrc}></Image>
        <Box sx={{ width: '20rem', marginLeft: 4, marginRight: 4 }}>
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
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          py: 7,
        }}
      >
        <Box>
          <Heading>Newsletter</Heading>
          <Text sx={{ maxWidth: '22rem' }} variant="styles.p">
            Receba desafios periodicamente de acordo com o seu perfil
          </Text>
        </Box>
        <Input
          variant="inputs.primary"
          sx={{ maxWidth: '20rem', mr: 3 }}
          placeholder="vitorflg@id.uff.br"
        ></Input>
        <Button>Assinar</Button>
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
