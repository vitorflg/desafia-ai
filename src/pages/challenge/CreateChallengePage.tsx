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
import { useMutation } from '@apollo/client';
import { useLocation } from 'wouter';
import PrivateHeader from '../../components/headers/PrivateHeader';
import CreateChallengeQuery from '../../data/queries/createChallengeQuery.graphql';
import { categoryOptions, tagOptions } from '../../utils/constants';
import { useDataState } from '../../data/DataLayer';
import useForm from '../../modules/useForm';

const CreateChallengePage: React.FC = () => {
  const Form = useForm();
  const formData = Form.formData;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [, setLocation] = useLocation();
  const currentUser = useDataState();
  const userGoogleId = currentUser?.googleId;
  const [createChallenge] = useMutation(CreateChallengeQuery, {});

  React.useEffect(() => {
    clearAllBodyScrollLocks();
  });

  // React.useEffect(() => {
  //   if (!currentUser?.email.includes('ic.uff.br')) {
  //     setLocation('/dashboard');
  //   }
  // }, []);

  const isFilled = () => {
    return (
      formData.challengeName &&
      formData.challengeDescription &&
      formData.challengeTags?.length &&
      formData.challengeCategories
    );
  };

  const onSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    createChallenge({
      variables: {
        userGoogleId,
        name: formData.challengeName,
        searchName: formData.challengeName?.toUpperCase(),
        description: formData.challengeDescription,
        tags: formData.challengeTags.map((tag: any) => tag.label),
        categories: formData.challengeCategories.map((category: any) => category.label),
      },
    })
      .then((payload) => {
        setLocation(`/dashboard/challenges/${payload?.data?.challenge}`);
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
          px={4}
          py={6}
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
              Tenha certeza de que o título contenha todas as palavras chaves do seu desafio e que
              ao mesmo tempo seja uma síntese do que precisa.
            </Text>

            <Text as="p" mt={1}>
              Na descrição você pode desenvolver mais a ideia, quanto mais completa ela for, mais
              rápido o desafiante resolverá seu desafio!
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
                <Label htmlFor="challenge-name" pl={1} sx={{ color: 'gray-700' }}>
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
                <Label htmlFor="challenge-description" pl={1} sx={{ color: 'gray-700' }}>
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
                <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>
                  Categorias
                </Label>
              </Flex>

              <Select
                size="large"
                multi={true}
                options={categoryOptions}
                onChange={(values: any) => Form.handleInputChange('challengeCategories', values)}
              />

              <Flex mt={3}>
                <GoTag size="20px" color="#3F3F46" />
                <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>
                  Tags
                </Label>
              </Flex>

              <Select
                size="large"
                multi={true}
                options={tagOptions}
                onChange={(values: any) => Form.handleInputChange('challengeTags', values)}
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
                    <Paragraph sx={{ textAlign: 'right', margin: '0 0 auto auto' }}>
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
