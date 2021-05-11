import { Box } from '@theme-ui/components';
import React from 'react';

import EditorJs from 'react-editor-js';

import { EDITOR_JS_TOOLS } from './constants';

const ReactEditor = ({ disabled, onChange }) => {
  const instanceRef = React.useRef(null);

  async function handleSave() {
    const savedData = await instanceRef?.current?.save();

    onChange(savedData);
  }

  const renderEditor = () => {
    return (
      <EditorJs
        onChange={() => handleSave()}
        instanceRef={(instance) => {
          return (instanceRef.current = instance);
        }}
        tools={EDITOR_JS_TOOLS}
        data={{
          time: 1556098174501,
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Proposta de Solução',
                level: 2,
              },
            },
            {
              type: 'paragraph',
              data: {
                text: 'Segue o repositório: ',
              },
            },
            {
              type: 'paragraph',
              data: {
                text:
                  '<a href="https://docs.github.com/en/rest/reference/repos">Repositório do Github</a>',
              },
            },
            {
              type: 'code',
              data: {
                code: '$ npm install\n$ npm start',
              },
            },
          ],
          version: '2.12.4',
        }}
      />
    );
  };

  return (
    <>
      {disabled && (
        <Box
          sx={{
            background: '#f2f4f5',
            color: '#979899',
            cursor: 'not-allowed',
            pointerEvents: 'none',
          }}
        >
          {renderEditor()}
        </Box>
      )}

      {!disabled && <Box>{renderEditor()}</Box>}
    </>
  );
};

export default ReactEditor;
