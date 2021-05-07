import React from 'react';
import { Box, Flex, Image, Button, Label, Text } from '@theme-ui/components';
import { Heading, Paragraph } from 'theme-ui';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { GoFile, GoTag } from 'react-icons/go';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';
import Modal from '@vtex/styleguide/lib/Modal';
import Input from '@vtex/styleguide/lib/Input';
import Textarea from '@vtex/styleguide/lib/Textarea';

import logoSrc from '../../assets/images/logo.png';
import useForm from '../../modules/useForm';
import { useMutation, gql } from '@apollo/client';
import { useLocation } from 'wouter';
import PrivateHeader from '../../components/headers/PrivateHeader';

type Options = {
  label: string;
  value: string | {};
}[];

const CreateChallengePage: React.FC = () => {
  const Form = useForm();
  const formData = Form.formData;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const CREATE_CHALLENGE_QUERY = gql`
    mutation Challenge(
      $name: String!
      $description: String!
      $tags: [JSON]
      $category: String
    ) {
      challenge(
        input: {
          name: $name
          description: $description
          tags: $tags
          category: $category
        }
      )
    }
  `;
  const [createChallenge] = useMutation(CREATE_CHALLENGE_QUERY, {});

  React.useEffect(() => {
    clearAllBodyScrollLocks();
  });

  const optionsCategory: Options = [
    {
      value: 'dev-web',
      label: 'Desenvolvimento Web',
    },
    {
      value: 'logica-programacao',
      label: 'Lógica de Programação',
    },
    {
      value: 'iot',
      label: 'Internet das Coisas',
    },
    {
      value: 'machine-learning',
      label: 'Machine Learning',
    },
    {
      value: 'redes',
      label: 'Redes',
    },
    {
      value: 'ciencia-dados',
      label: 'Ciência de Dados',
    },
  ];

  const optionsTags: Options = [
    {
      value: { id: 0, name: 'ReactJs' },
      label: 'ReactJs',
    },
    {
      value: { id: 1, name: 'NodeJs' },
      label: 'NodeJs',
    },
    {
      value: { id: 2, name: 'DynamoDB' },
      label: 'DynamoDB',
    },
  ];

  const isFilled = () => {
    return (
      formData.challengeName &&
      formData.challengeDescription &&
      formData.challengeTags?.length &&
      formData.challengeCategory
    );
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    createChallenge({
      variables: {
        name: formData.challengeName,
        description: formData.challengeDescription,
        tags: formData.challengeTags,
        category: formData.challengeCategory.value,
      },
    })
      .then(() => {
        setLocation('/dashboard');
      })
      .catch(() => {
        setIsModalOpen(true);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: ['auto', '100vh'],
        }}
      >
        <PrivateHeader />

        <Flex
          px={7}
          py={7}
          sx={{
            flexDirection: ['column', 'row'],
            justifyContent: 'center',
            height: ['100%', '90%'],
          }}
        >
          <Box
            sx={{
              width: ['100%', '40%'],
              padding: '0rem 2rem',
              color: 'gray-700',
              opacity: '0.8',
            }}
          >
            <Image
              mb={3}
              sx={{
                minWidth: '200px',
                maxWidth: '200px',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
              src={logoSrc}
            />

            <Heading variant="caps" sx={{ fontFamily: 'monospace' }}>
              Crie seu desafio!
            </Heading>

            <Text as="p" mt={1}>
              Tenha certeza de que o título contenha todas as palavras chaves do
              seu desafio e que ao mesmo tempo seja uma síntese do que precisa.
            </Text>

            <Text as="p" mt={1}>
              Na descrição você pode desenvolver mais a ideia, quanto mais
              completa ela for, mais rápido o desafiante resolverá seu desafio!
            </Text>
          </Box>
          <Box
            sx={{
              padding: '0rem 2rem',
              width: ['100%', '60%'],
              marginTop: ['1rem', '0'],
            }}
          >
            <Box onSubmit={onSubmit} as="form">
              <Flex>
                <HiOutlineLightBulb size="20px" color="#3F3F46" />
                <Label
                  htmlFor="challenge-name"
                  pl={1}
                  sx={{ color: 'gray-700' }}
                >
                  Título do desafio
                </Label>
              </Flex>

              <Input
                required
                size="large"
                type="text"
                name="challenge-name"
                id="challenge-name"
                placeholder="Ex: Aplicação web de xadrez com IA"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  Form.handleInputChange('challengeName', e.target.value)
                }
              />

              <Flex mt={3}>
                <GoFile size="20px" color="#3F3F46" />
                <Label
                  htmlFor="challenge-description"
                  pl={1}
                  sx={{ color: 'gray-700' }}
                >
                  Descreva o desafio com suas palavras
                </Label>
              </Flex>

              <Textarea
                name="challenge-description"
                id="challenge-description"
                placeholder="Ex: Meu desafio consiste em uma aplicação web de xadrez online com IA. A IA precisa apenas responder a jogada após o jogador humano ter feito uma jogada."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  Form.handleInputChange('challengeDescription', e.target.value)
                }
              />

              <Flex mt={3}>
                <RiCheckboxMultipleBlankLine size="20px" color="#3F3F46" />
                <Label
                  htmlFor="challenge-category"
                  pl={1}
                  sx={{ color: 'gray-700' }}
                >
                  Categoria
                </Label>
              </Flex>

              <Select
                size="large"
                multi={false}
                options={optionsCategory}
                onChange={(values: any) =>
                  Form.handleInputChange('challengeCategory', values)
                }
              />

              <Flex mt={3}>
                <GoTag size="20px" color="#3F3F46" />
                <Label
                  htmlFor="challenge-category"
                  pl={1}
                  sx={{ color: 'gray-700' }}
                >
                  Tags
                </Label>
              </Flex>

              <Select
                size="large"
                multi={true}
                options={optionsTags}
                onChange={(values: any) =>
                  Form.handleInputChange('challengeTags', values)
                }
              />

              <Box mt={3} sx={{ float: 'right' }}>
                <Button
                  sx={{ float: 'right' }}
                  variant={isFilled() ? 'primary' : 'disabled'}
                  my={3}
                >
                  Criar desafio!
                </Button>

                <Label>
                  {!isFilled() && (
                    <Paragraph
                      sx={{ textAlign: 'right', margin: '0 0 auto auto' }}
                    >
                      Todos os campos são obrigatórios!
                    </Paragraph>
                  )}
                </Label>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Modal
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button onClick={() => setIsModalOpen(false)}>Ok</Button>
            </span>
          </div>
        }
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Heading>Error</Heading>
        <div className="dark-gray">
          <p>Ocorreu um problema, tente novamente mais tarde! 😞</p>
        </div>
      </Modal>
    </>
  );
};

export default CreateChallengePage;
