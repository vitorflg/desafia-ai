import React from 'react';
import { Box, Button, Flex, Heading, Label } from 'theme-ui';
import { categoryOptions, tagOptions } from '../../../utils/constants';
import Input from '@vtex/styleguide/lib/Input';
import Modal from '@vtex/styleguide/lib/Modal';
import Textarea from '@vtex/styleguide/lib/Textarea';
import VTEXBox from '@vtex/styleguide/lib/Box';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';
import useForm from '../../../modules/useForm';

export default function PrincipalTab({ challenge }: any) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const Form = useForm();
  const formData = Form?.formData;

  React.useEffect(() => {
    Form.setFormData({
      challengeName: challenge?.name,
      challengeDescription: challenge?.description,
      challengeCategories: challenge?.categories?.map((category: any) => {
        return { label: category };
      }),
      challengeTags: challenge?.tags?.map((tag: any) => {
        return { label: tag };
      }),
    });
  });

  return (
    <>
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

      <div className="bg-muted-5 pa8">
        <VTEXBox>
          <Box as="form">
            <Flex>
              <Label htmlFor="challenge-name" pl={1} sx={{ color: 'gray-700' }}>
                Título do desafio
              </Label>
            </Flex>

            <Input
              disabled
              required
              value={formData?.challengeName}
              size="small"
              type="text"
              name="challenge-name"
              id="challenge-name"
            />

            <Flex mt={3}>
              <Label htmlFor="challenge-description" pl={1} sx={{ color: 'gray-700' }}>
                Descreva o desafio com suas palavras
              </Label>
            </Flex>

            <Textarea
              value={formData?.challengeDescription}
              disabled
              name="challenge-description"
              id="challenge-description"
            />

            <Flex mt={3}>
              <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>
                Categorias
              </Label>
            </Flex>

            <Select
              value={formData?.challengeCategories}
              disabled
              size="small"
              multi={false}
              options={categoryOptions}
            />

            <Flex mt={3}>
              <Label htmlFor="challenge-category" pl={1} sx={{ color: 'gray-700' }}>
                Tags
              </Label>
            </Flex>

            <Select
              value={formData?.challengeTags}
              disabled
              size="small"
              multi={true}
              options={tagOptions}
            />
          </Box>
        </VTEXBox>
      </div>
    </>
  );
}
