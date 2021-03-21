import { Input } from '@theme-ui/components';
import React from 'react';
import { SxStyleProp } from 'theme-ui';

export interface TextInputProps {
  placeholder?: string;
  sx?: SxStyleProp;
  type?: string;
}

const TextInput: React.SFC<TextInputProps> = ({ type, placeholder, sx }) => {
  return (
    <Input
      type={type ?? 'text'}
      sx={{ ...sx, width: '100%', padding: '0.75rem 0.5rem', borderRadius: 4 }}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
