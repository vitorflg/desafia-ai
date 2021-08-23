import React from 'react';
import { Box, Paragraph, Textarea, Button } from 'theme-ui';
import useForm from '../../../modules/useForm';
import commentSolutionQuery from '../../../data/queries/commentSolutionQuery.graphql';
import listSolutionCommentsQuery from '../../../data/queries/listSolutionCommentsQuery.graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useDataState } from '../../../data/DataLayer';

export default function SolutionComments({ solution }) {
  const Form = useForm();
  const formData = Form.formData;
  const [limit, setLimit] = React.useState(5);
  const [commentSolution] = useMutation(commentSolutionQuery);
  const currentUser = useDataState();
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
        interactions: currentUser?.interactions ? currentUser.interactions + 1 : 1,
      },
    }).finally(() => {
      console.log('refetching');
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
        {comments.map((comment) => {
          return (
            <Box sx={{ mt: 4 }}>
              {comment.userEmail && <Paragraph sx={{ mb: 1 }}>{`${comment.userEmail}:`}</Paragraph>}

              <Paragraph
                sx={{
                  text: 'body',
                  padding: 3,
                  border: '1px solid #dedede',
                  borderRadius: '0.25rem',
                }}
              >
                {comment.message}
              </Paragraph>
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
        <Box sx={{ float: 'right', my: 3 }}>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
