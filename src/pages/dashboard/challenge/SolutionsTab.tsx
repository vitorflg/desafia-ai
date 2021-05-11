import React from 'react';
import { Heading, Label, Box } from 'theme-ui';
import useForm from '../../../modules/useForm';
import Input from '@vtex/styleguide/lib/Input';
import Button from '@vtex/styleguide/lib/Button';
import ButtonWithIcon from '@vtex/styleguide/lib/ButtonWithIcon';
import Modal from '@vtex/styleguide/lib/Modal';
import SelectableCard from '@vtex/styleguide/lib/SelectableCard';
import Collapsible from '@vtex/styleguide/lib/Collapsible';
import Tag from '@vtex/styleguide/lib/Tag';
import { useMutation, useQuery } from '@apollo/client';
import { Flex } from '@theme-ui/components';
import { IoMdAdd } from 'react-icons/io';
import listSolutionsQuery from '../../../data/queries/listSolutionsQuery.graphql';
import createSolutionQuery from '../../../data/queries/createSolutionQuery.graphql';
import MDEditor from '@uiw/react-md-editor';
import { useDataState } from '../../../data/DataLayer';

export default function SolutionsTab({ challenge, challengeId }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const Form = useForm();
  const formData = Form?.formData;
  const [state, setState] = React.useState();
  const currentUser = useDataState();
  const [previewMode, setPreviewMode] = React.useState('preview');
  const [isSaving, setIsSaving] = React.useState(false);

  const { data: listSolutionsData, refetch } = useQuery(listSolutionsQuery, {
    variables: { challengeId },
  });

  const solutions = listSolutionsData?.solutions;
  const [createSolution] = useMutation(createSolutionQuery);

  const onSubmit = (e) => {
    e.preventDefault();

    createSolution({
      variables: {
        challengeId: challengeId,
        title: formData.solutionTitle,
        description: formData?.solutionDescription,
        userGoogleId: currentUser?.googleId,
      },
    })
      .then(() => {
        setIsModalOpen(false);

        Form.setFormData({});

        refetch();
      })
      .catch(() => {});
  };

  function toggleAccordion(questionNbr) {
    return (e) =>
      setState({
        openQuestion: state?.openQuestion !== questionNbr ? questionNbr : null,
      });
  }

  return (
    <>
      <Flex mt={4} sx={{ justifyContent: 'flex-end' }}>
        <ButtonWithIcon
          onClick={() => setIsModalOpen(true)}
          icon={<IoMdAdd size={20} />}
          iconPosition="right"
        >
          Criar solução
        </ButtonWithIcon>
      </Flex>

      <Modal centered isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Heading mb={4}>Criar solução</Heading>

        <Box onSubmit={onSubmit} as="form">
          <Label htmlFor="challenge-name" pl={1} sx={{ color: 'gray-700' }}>
            Título da solução
          </Label>

          <Input
            required
            size="small"
            type="text"
            name="solution-name"
            id="solution-name"
            placeholder="Ex: Solução com panda.py"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              Form.handleInputChange('solutionTitle', e.target.value);
            }}
          />

          <div className="mt3">
            <MDEditor
              preview={'live'}
              height={400}
              value={formData?.solutionDescription}
              onChange={(value?: string) => Form.handleInputChange('solutionDescription', value)}
            />
          </div>

          <div className="nowrap mt4">
            <span className="mr4">
              <Button type="submit">Salvar</Button>
            </span>
          </div>
        </Box>
      </Modal>

      <Box py={4}>
        {solutions &&
          solutions.map((solution: any, index) => {
            return (
              <>
                <Collapsible
                  header={<div className="pv6 hover-c-on-action-secondary">{solution?.title}</div>}
                  onClick={toggleAccordion(index + 1)}
                  isOpen={state?.openQuestion === index + 1}
                >
                  <div className="pa5 flex justify-end">
                    <SelectableCard
                      noPadding
                      selected={previewMode === 'preview'}
                      onClick={() => setPreviewMode('preview')}
                    >
                      <div className="pa4">
                        <div className="f5 tc">Preview</div>
                      </div>
                    </SelectableCard>

                    {currentUser && challenge && currentUser?.googleId === challenge?.userGoogleId && (
                      <SelectableCard
                        hasGroupLeft
                        noPadding
                        selected={previewMode === 'live'}
                        onClick={() => setPreviewMode('live')}
                      >
                        <div className="pa4">
                          <div className="f5 tc">Editar</div>
                        </div>
                      </SelectableCard>
                    )}
                  </div>
                  <div className="bg-muted-5 pa6">
                    <div className="mt3 mb3">{isSaving && <Tag type="success">Salvo</Tag>}</div>
                    <MDEditor
                      preview={previewMode}
                      height={400}
                      value={solution?.description}
                      onChange={(value?: string) =>
                        Form.handleInputChange('solutionDescription', value)
                      }
                    />

                    {previewMode === 'live' && (
                      <div className="mt3">
                        <Button
                          onClick={() =>
                            createSolution({
                              variables: {
                                challengeId: solution?.challengeId,
                                title: solution?.title,
                                description: formData?.solutionDescription,
                                userGoogleId: solution?.userGoogleId,
                                id: solution?.id,
                              },
                            }).then(() => {
                              setIsSaving(true);

                              setPreviewMode('preview');

                              Form.setFormData({});

                              setTimeout(() => {
                                setIsSaving(false);
                              }, 1500);
                            })
                          }
                        >
                          Salvar
                        </Button>
                      </div>
                    )}
                  </div>
                </Collapsible>

                <hr className="ma0 bb bb-0 b--black-10" />
              </>
            );
          })}
      </Box>
    </>
  );
}
