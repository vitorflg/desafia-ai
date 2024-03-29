import React from 'react';
import { Image, Label, Box, Paragraph, Button } from 'theme-ui';
import useForm from '../../../modules/useForm';
import Input from '@vtex/styleguide/lib/Input';
import Modal from '@vtex/styleguide/lib/Modal';
import SelectableCard from '@vtex/styleguide/lib/SelectableCard';
import Collapsible from '@vtex/styleguide/lib/Collapsible';
import Tag from '@vtex/styleguide/lib/Tag';
import { useMutation, useQuery } from '@apollo/client';
import { Flex } from '@theme-ui/components';
import { AiFillDelete, AiFillHeart } from 'react-icons/ai';
import listSolutionsQuery from '../../../data/queries/listSolutionsQuery.graphql';
import createSolutionQuery from '../../../data/queries/createSolutionQuery.graphql';
import deleteInteractionQuery from '../../../data/queries/deleteInteractionQuery.graphql';
import likeSolutionQuery from '../../../data/queries/likeSolutionQuery.graphql';
import dislikeSolutionQuery from '../../../data/queries/dislikeSolutionQuery.graphql';
import loaderGifSrc from '../../../assets/images/loader.gif';

import MDEditor from '@uiw/react-md-editor';
import { useDataState } from '../../../data/DataLayer';
import Loader from '../../../components/loadings/loader';
import SolutionComments from './SolutionComments';
import exampleMd from './solution-example.md';
import acceptChallengeQuery from '../../../data/queries/acceptChallengeQuery.graphql';

export default function SolutionsTab({ challenge, challengeId, getChallengeRefetch }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updatingCacheStore, setUpdatingCacheStore] = React.useState(null);
  const Form = useForm({ solutionDescription: exampleMd });
  const formData = Form?.formData;
  const [state, setState] = React.useState();
  const [limit, setLimit] = React.useState(5);
  const currentUser = useDataState();
  const [previewMode, setPreviewMode] = React.useState('preview');
  const [isSaving, setIsSaving] = React.useState(false);

  const { data: listSolutionsData, refetch, loading } = useQuery(listSolutionsQuery, {
    variables: { challengeId, currentUserId: currentUser?.googleId, limit },
    fetchPolicy: 'network-only',
  });

  const solutions = listSolutionsData?.solutions.list;
  const hasMore = listSolutionsData?.solutions.hasMore ?? false;
  const [solutionTitle, setSolutionTitle] = React.useState('');
  const [solutionDescription, setSolutionDescription] = React.useState('');
  const [createSolution] = useMutation(createSolutionQuery);
  const [acceptChallenge] = useMutation(acceptChallengeQuery);
  const [deleteInteraction] = useMutation(deleteInteractionQuery);
  const [likeSolution] = useMutation(likeSolutionQuery);
  const [dislikeSolution] = useMutation(dislikeSolutionQuery);

  const onSubmit = (e) => {
    e.preventDefault();

    createSolution({
      variables: {
        challengeId: challengeId,
        title: solutionTitle,
        description: solutionDescription,
        userGoogleId: currentUser?.googleId,
      },
    })
      .then(() => {
        setIsModalOpen(false);

        refetch({ limit, challengeId, currentUserId: currentUser?.googleId });

        Form.setFormData({});

        acceptChallenge({
          variables: {
            currentUserId: currentUser?.googleId,
            challengeId,
          },
        }).then(() => {
          getChallengeRefetch();
        });
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    setUpdatingCacheStore(null);
  }, [solutions]);

  function toggleAccordion(questionNbr) {
    return (e) =>
      setState({
        openQuestion: state?.openQuestion !== questionNbr ? questionNbr : null,
      });
  }

  function CollapsibleHeader({ solution }) {
    return (
      <div className="flex flex-row pv6 mh3">
        <Box sx={{ flexGrow: 1 }}>{solution?.title}</Box>

        <Flex
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            ':hover': { color: 'purple' },
            color: solution.likedByCurrentUser ? 'purple' : 'black--600',
            svg: { verticalAlign: 'middle' },
          }}
        >
          <Box
            onClick={(e) => {
              e.stopPropagation();
              setUpdatingCacheStore(solution.id);

              if (solution.likedByCurrentUser) {
                dislikeSolution({
                  variables: {
                    solutionId: solution.id,
                    challengeId: solution.challengeId,
                    likes: solution.likes?.count ? solution.likes.count - 1 : 0,
                    currentUserId: currentUser?.googleId,
                  },
                  update: async (proxy: any) => {
                    await proxy.writeQuery({
                      query: listSolutionsQuery,
                      data: {
                        solutions: [
                          {
                            id: solution.id,
                            likedByCurrentUser: false,
                            likes: {
                              count: solution.likes?.count ? solution.likes.count - 1 : 0,
                            },
                          },
                          ...solutions,
                        ],
                      },
                      variables: {
                        challengeId: solution.challengeId,
                        currentUserId: currentUser?.googleId,
                        limit,
                      },
                    });
                  },
                });
              } else {
                likeSolution({
                  variables: {
                    solutionId: solution.id,
                    challengeId: solution.challengeId,
                    likes: solution.likes?.count ? solution.likes.count + 1 : 1,
                    currentUserId: currentUser?.googleId,
                    currentUserEmail: currentUser?.email,
                    interactions: currentUser?.interactions ? currentUser?.interactions + 1 : 1,
                  },
                  update: async (proxy) => {
                    await proxy.writeQuery({
                      query: listSolutionsQuery,
                      data: {
                        solutions: [
                          ...solutions,
                          {
                            id: solution.id,
                            likedByCurrentUser: true,
                            likes: {
                              count: solution.likes?.count ? solution.likes.count + 1 : 1,
                              users: solution.likes?.users,
                            },
                          },
                        ],
                      },
                      variables: {
                        challengeId: solution.challengeId,
                        currentUserId: currentUser?.googleId,
                        limit,
                      },
                    });
                  },
                });
              }
            }}
          >
            <AiFillHeart size={20} />
            <Paragraph as="span" sx={{ fontSize: 1, mr: 1 }}>
              {updatingCacheStore && updatingCacheStore === solution.id ? (
                <Loader size="20" />
              ) : (
                `(${solution.likes?.count ?? 0})`
              )}
            </Paragraph>
          </Box>

          <Box pl={3}>
            {currentUser?.googleId === solution.userGoogleId && (
              <AiFillDelete
                onClick={(e) => {
                  e.stopPropagation();

                  deleteInteraction({
                    variables: {
                      solutionId: solution.id,
                      challengeId: challenge.id,
                    },
                  }).then(() => {
                    refetch();
                  });
                }}
                color="#DD372C"
                size={20}
              />
            )}
          </Box>
        </Flex>
      </div>
    );
  }

  return (
    <>
      <Flex mt={4} sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={() => setIsModalOpen(true)} iconPosition="right" sx={{ borderRadius: 99 }}>
          Criar solução
        </Button>
      </Flex>

      <Modal centered isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSolutionTitle(e.target.value);
            }}
          />

          <Box
            mt={3}
            sx={{
              '.w-md-editor-show-preview': { height: '405px !important' },
              '.w-md-editor-show-edit': { height: '405px !important' },
              '.w-md-editor-show-live': { height: '405px !important' },
            }}
          >
            <MDEditor
              height={400}
              preview={'live'}
              value={formData?.solutionDescription ?? exampleMd}
              onChange={(value?: string) => setSolutionDescription(value ?? '')}
            />
          </Box>

          <div className="nowrap mt4">
            <span className="mr4">
              <Button type="submit">Salvar</Button>
            </span>
          </div>
        </Box>
      </Modal>

      {loading && (
        <Image mt={6} mb={6} ml={'50%'} sx={{ display: 'block' }} src={loaderGifSrc} width="30" />
      )}

      {!loading && (
        <Box mt={4}>
          {solutions &&
            solutions.map((solution: any, index) => {
              return (
                <Box
                  px={3}
                  sx={{
                    border: '1px solid #dedede',
                    borderBottom: 'none',
                    ':last-child': { borderBottom: '1px solid #dedede' },
                  }}
                >
                  <Collapsible
                    caretColor="muted"
                    header={<CollapsibleHeader solution={solution} />}
                    onClick={toggleAccordion(index + 1)}
                    isOpen={state?.openQuestion === index + 1}
                  >
                    {state?.openQuestion === index + 1 && (
                      <>
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

                          {currentUser &&
                            challenge &&
                            currentUser?.googleId === solution?.userGoogleId && (
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
                        <div className="pa6">
                          <div className="mt3 mb3">
                            {isSaving && <Tag type="success">Salvo</Tag>}
                          </div>
                          <Box
                            mt={3}
                            sx={{
                              '.w-md-editor-show-preview': { height: '405px !important' },
                              '.w-md-editor-show-edit': { height: '405px !important' },
                              '.w-md-editor-show-live': { height: '405px !important' },
                            }}
                          >
                            <MDEditor
                              preview={previewMode}
                              height={400}
                              value={solution?.description}
                              onChange={(value?: string) =>
                                Form.handleInputChange('solutionDescription', value)
                              }
                            />
                          </Box>

                          {previewMode === 'live' && (
                            <Box sx={{ mt: 4, float: 'right' }}>
                              <Button
                                sx={{ borderRadius: 99 }}
                                onClick={() => {
                                  createSolution({
                                    variables: {
                                      challengeId: solution?.challengeId,
                                      title: solution?.title,
                                      description: formData?.solutionDescription,
                                      userGoogleId: solution?.userGoogleId,
                                      id: solution?.id,
                                      date: solution?.date,
                                    },
                                    update: async (proxy) => {
                                      console.log(solutions);
                                      const s = solutions.map((item) => {
                                        if (item.id === solution.id) {
                                          return {
                                            ...item,
                                            title: solution?.title,
                                            description: formData?.solutionDescription,
                                          };
                                        }

                                        return item;
                                      });
                                      console.log(s);
                                      await proxy.writeQuery({
                                        query: listSolutionsQuery,
                                        data: {
                                          solutions: s,
                                        },
                                        variables: {
                                          challengeId: solution.challengeId,
                                          currentUserId: currentUser?.googleId,
                                          limit,
                                        },
                                      });
                                    },
                                  }).then(() => {
                                    setIsSaving(true);

                                    setPreviewMode('preview');

                                    Form.setFormData({});

                                    setTimeout(() => {
                                      setIsSaving(false);
                                    }, 1500);
                                  });
                                }}
                              >
                                Salvar
                              </Button>
                            </Box>
                          )}

                          <SolutionComments solution={solution} />
                        </div>
                      </>
                    )}
                  </Collapsible>
                </Box>
              );
            })}
        </Box>
      )}

      {hasMore && (
        <Button
          sx={{ margin: 'auto', display: 'block', marginTop: 3 }}
          variant="tertiary"
          onClick={() => {
            setLimit(limit + 5).then(() => {
              refetch();
            });
          }}
        >
          Carregar mais
        </Button>
      )}
    </>
  );
}
