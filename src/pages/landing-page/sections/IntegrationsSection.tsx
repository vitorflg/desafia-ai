import React from 'react';
import { IoLogoDropbox } from 'react-icons/io';
import { Flex, Box, Heading, Button, Text, Image } from 'theme-ui';
import featuresSrc from '../../../assets/images/features.png';

const IntegrationsSection: React.FC = () => {
  return (
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
            <IoLogoDropbox size="25" color="blue"></IoLogoDropbox>

            <Text sx={{ color: 'blue', ml: 2 }}>Integrações</Text>
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
  );
};

export default IntegrationsSection;
