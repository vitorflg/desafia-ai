import React from 'react';
import { Box, Heading, Flex, Text, Badge, Button, Image } from 'theme-ui';
import illustrationSrc from '../../../assets/images/illustration.png';

export const badgeStyle = {
  padding: 2,
  borderRadius: '99px',
  border: '2px solid',
  mt: 2,
  borderColor: 'purple',
  background: 'transparent',
  fontFamily: 'Roboto Light',
  color: 'purple',
  fontSize: 2,
};

const HeroSection: React.FC = () => {
  return (
    <>
      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'left',
          px: 4,
          paddingTop: '1rem',
        }}
      >
        <Box>
          <Badge sx={badgeStyle}>Desenvolvimento Web</Badge>

          <Badge
            sx={{
              marginLeft: '0.5rem',
              ...badgeStyle,
            }}
          >
            Lógica de Programação
          </Badge>

          <Badge
            sx={{
              marginLeft: '0.5rem',
              ...badgeStyle,
            }}
          >
            Internet das Coisas
          </Badge>

          <Badge
            sx={{
              marginLeft: '0.5rem',
              ...badgeStyle,
            }}
          >
            Machine Learning
          </Badge>

          <Badge
            sx={{
              marginLeft: '0.5rem',
              ...badgeStyle,
            }}
          >
            Redes
          </Badge>

          <Badge
            sx={{
              marginLeft: '0.5rem',
              ...badgeStyle,
            }}
          >
            Ciência de Dados
          </Badge>
        </Box>
      </Flex>

      <Flex
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 4,
          paddingTop: ['12.5rem', '12.5rem', '22.1rem'],
        }}
      >
        <Box sx={{ position: 'relative', bottom: '9.3rem' }}>
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
                backgroundColor: 'purple',
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
            top: ['-3.1rem', '-3.1rem', '0', '3.1rem'],
            right: ['0', '-50rem', '-50rem', '-40.6rem'],
            minWidth: '87.5rem',
            display: ['none', 'none', 'block'],
          }}
          src={illustrationSrc}
        ></Image>
      </Flex>
    </>
  );
};

export default HeroSection;
