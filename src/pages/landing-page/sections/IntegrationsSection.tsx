import React from 'react';
import { BiWorld } from 'react-icons/bi';
import { Flex, Box, Heading, Button, Text, Image } from 'theme-ui';
import featuresSrc from '../../../assets/images/features.png';

type State = {
  currentSlideIndex: number;
};

const CHALLENGE_EXAMPLES = [
  {
    title: 'Desenvolvimento Web',
    description:
      'Consumir a api do github para listar os repositórios de uma organização.',
    link: 'https://docs.github.com/en/rest/reference/repos',
    imageSrc:
      'https://vitorflg-assets.s3-sa-east-1.amazonaws.com/webdev-prog.svg',
  },
  {
    title: 'Lógica de programação',
    description: 'Desenvolver um jogo de xadrez utilizando pygames.',
    link: 'https://www.pygame.org/tags/chess',
    imageSrc:
      'https://vitorflg-assets.s3-sa-east-1.amazonaws.com/webdev-prog.svg',
  },
  {
    title: 'Internet das Coisas',
    description: 'Ligar luz RGB do setup/escritório com um Raspberry PI.',
    link:
      'https://labprototipando.com.br/2020/06/19/como-utilizar-a-fita-de-led-apa102-no-raspberry-pi/',
    imageSrc: featuresSrc,
  },
  {
    title: 'Machine Learning',
    description:
      'Crie um algoritmo que consegue identificar flores utilizando Python, utilizando um modelo supervisionado de algoritmo de Classificação.',
    link:
      'https://paulovasconcellos.com.br/como-criar-seu-primeiro-aplicativo-de-machine-learning-7b6af291ba11',
    imageSrc: featuresSrc,
  },
  {
    title: ' Redes',
    description: 'Configure um roteador como repetidor',
    link:
      'https://www.techtudo.com.br/dicas-e-tutoriais/noticia/2016/08/como-usar-um-roteador-como-repetidor-para-melhorar-o-wi-fi.html',
    imageSrc: featuresSrc,
  },
  {
    title: ' Ciência de Dados',
    description: 'Extraia um conteúdo de uma página da Web no KNIME',
    link:
      'https://hupdata.com/knime-na-pratica-raspando-dados-da-web-com-knime/',
    imageSrc: featuresSrc,
  },
];

const IntegrationsSection: React.FC = () => {
  const [state, setState] = React.useState<State>({ currentSlideIndex: 0 });

  const currentSlide = CHALLENGE_EXAMPLES[state.currentSlideIndex];

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
              borderRadius: 99,
              width: 'fit-content',
              '> *': { display: 'inline-block', verticalAlign: 'middle' },
            }}
          >
            <BiWorld size="25" color="blue" />

            <Text sx={{ color: 'blue', ml: 2 }}>dev-web</Text>
          </Box>

          <Heading
            sx={{ maxWidth: '40rem', mt: 4 }}
            variant="styles.h1"
            as="h1"
          >
            {currentSlide.title}
          </Heading>

          <Heading
            sx={{ maxWidth: '40rem', mt: 4 }}
            variant="styles.h3"
            as="h3"
          >
            {currentSlide.description}
          </Heading>
        </Box>

        <Image
          sx={{
            width: '300px',
            margin: ['auto', 'auto', '0 1rem 0 0'],
            filter: 'opacity(0.5)',
            display: ['block', 'block', 'inline-block'],
          }}
          src={currentSlide.imageSrc}
        />
      </Box>

      <Flex
        sx={{
          width: ['100%', '100%', '20%'],
          flexDirection: ['row', 'row', 'column'],
          overflow: ['auto', 'auto', 'hidden'],
          marginLeft: [0, 0, 4],
          marginRight: 4,
          order: [2, 2, 1],
        }}
      >
        {CHALLENGE_EXAMPLES.map((challenge, index) => {
          return (
            <Button
              mt={3}
              onClick={() =>
                setState({
                  currentSlideIndex: index,
                })
              }
              sx={{
                minWidth: '15rem',
                backgroundColor: 'gray--300',
                ml: [3, 3, 0],
                color: 'gray--400',
                textDecoration: 'underline',
              }}
            >
              {challenge.title}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default IntegrationsSection;
