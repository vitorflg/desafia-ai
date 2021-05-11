import React from 'react';
import VTEXBox from '@vtex/styleguide/lib/Box';
import SelectableCard from '@vtex/styleguide/lib/SelectableCard';
import Button from '@vtex/styleguide/lib/Button';
import Tag from '@vtex/styleguide/lib/Tag';
import MDEditor from '@uiw/react-md-editor';
import useForm from '../../../modules/useForm';
import exampleMd from './example.md';
import { useDataState } from '../../../data/DataLayer';
import { useMutation } from '@apollo/client';
import createChallengeQuery from '../../../data/queries/createChallengeQuery.graphql';

export default function DetailsTab({ challenge }) {
  const Form = useForm();
  const formData = Form?.formData;
  const [previewMode, setPreviewMode] = React.useState('preview');
  const currentUser = useDataState();
  const [isSaving, setIsSaving] = React.useState(false);

  const [createChallenge] = useMutation(createChallengeQuery, {
    onCompleted: () => {
      setIsSaving(true);

      setPreviewMode('preview');

      setTimeout(() => {
        setIsSaving(false);
      }, 1500);
    },
  });

  React.useEffect(() => {
    Form.setFormData({
      ...formData,
      challengeDetails: challenge?.details ?? exampleMd,
    });
  }, []);

  return (
    <div>
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

      <VTEXBox>
        <div className="mt3 mb3">{isSaving && <Tag type="success">Salvo</Tag>}</div>
        <MDEditor
          preview={previewMode}
          height={700}
          value={formData?.challengeDetails}
          onChange={(value?: string) => {
            Form.handleInputChange('challengeDetails', value);
          }}
        />

        {previewMode === 'live' && (
          <div className="mt3">
            <Button
              onClick={() =>
                createChallenge({
                  variables: {
                    userGoogleId: currentUser?.googleId,
                    name: challenge?.name,
                    id: challenge?.id,
                    description: challenge?.description,
                    tags: challenge?.tags,
                    category: challenge?.category,
                    details: formData?.challengeDetails,
                  },
                })
              }
            >
              Salvar
            </Button>
          </div>
        )}
      </VTEXBox>
    </div>
  );
}
