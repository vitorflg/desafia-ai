import React from 'react';
import { Box, Paragraph, Textarea, Button, Flex } from 'theme-ui';
import useForm from '../../../modules/useForm';
import commentSolutionQuery from '../../../data/queries/commentSolutionQuery.graphql';
import listSolutionCommentsQuery from '../../../data/queries/listSolutionCommentsQuery.graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useDataState } from '../../../data/DataLayer';
import { AiFillDelete } from 'react-icons/ai';
import deleteInteractionQuery from '../../../data/queries/deleteInteractionQuery.graphql';

export default function SolutionComments({ solution }) {
  const Form = useForm();
  const formData = Form.formData;
  const [limit, setLimit] = React.useState(5);
  const [commentSolution] = useMutation(commentSolutionQuery);
  const currentUser = useDataState();
  const [deleteInteraction] = useMutation(deleteInteractionQuery);
  const { data: listSolutionComments, refetch } = useQuery(listSolutionCommentsQuery, {
    variables: { solutionId: solution.id, limit: limit || 5 },
  });

  const comments = listSolutionComments?.solutionComments.list ?? [];
  const hasMore = listSolutionComments?.solutionComments.hasMore
    ? listSolutionComments?.solutionComments.hasMore
    : false;

  async function onSubmit(e) {
    e.preventDefault();
    console.log(formData);

    await commentSolution({
      variables: {
        solutionId: solution.id,
        challengeId: solution.challengeId,
        message: formData.message,
        currentUserId: currentUser?.googleId,
        currentUserEmail: currentUser?.email,
        currentUserName: currentUser?.name,
        interactions: currentUser?.interactions ? currentUser.interactions + 1 : 1,
      },
    }).finally(() => {
      Form.setFormData({});
      setTimeout(() => {
        refetch();
      }, 250);
    });
  }

  return (
    <Box sx={{ mt: 4 }}>
      Comentários
      {hasMore && (
        <Button
          sx={{ display: 'block', mt: 4 }}
          variant="tertiary"
          onClick={() => {
            setLimit(limit + 5);

            refetch();
          }}
        >
          Carregar mais
        </Button>
      )}
      <Box sx={{ paddingY: 3 }}>
        {!comments.length && <Paragraph variant="display">Ainda não possui comentários</Paragraph>}
        {comments.map((comment) => {
          return (
            <Box sx={{ mt: 2 }}>
              {(comment.userEmail || comment.userName) && (
                <Paragraph sx={{ mb: 1 }}>{`${comment.userName ?? comment.userEmail}:`}</Paragraph>
              )}
              <Flex
                sx={{
                  mt: 2,
                  flexDirection: 'row',
                  border: '1px solid #dedede',
                  borderRadius: '0.25rem',
                }}
              >
                <Paragraph
                  variant="display"
                  sx={{
                    text: 'body',
                    flexGrow: 1,
                    padding: 3,
                  }}
                >
                  {comment.message}
                </Paragraph>

                {currentUser?.googleId === solution.userGoogleId && (
                  <Box sx={{ mt: 3, mr: 2, cursor: 'pointer' }}>
                    <AiFillDelete
                      onClick={(e) => {
                        e.stopPropagation();

                        deleteInteraction({
                          variables: {
                            solutionId: solution.id,
                            commentId: comment.id,
                          },
                        }).then(() => {
                          refetch();
                        });
                      }}
                      color="#DD372C"
                      size={20}
                    />
                  </Box>
                )}
              </Flex>
            </Box>
          );
        })}
      </Box>
      <Box as="form" onSubmit={onSubmit}>
        <Textarea
          value={formData.message || ''}
          onChange={(e) => Form.handleInputChange('message', e.target.value)}
          sx={{
            resize: 'none',
            display: 'block',
            borderColor: 'gray--300',
            mt: 4,
            fontSize: 1,
          }}
        />

        <Box sx={{ my: 3 }}>
          <Button variant="primary" type="submit" sx={{ borderRadius: 99 }}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
