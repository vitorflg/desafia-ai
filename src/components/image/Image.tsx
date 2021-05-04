import React from 'react';
import { Image as ThemeUIImage, ThemeUICSSObject } from 'theme-ui';

type Props = { src: string; sx?: ThemeUICSSObject };

function Image({ src, sx }: Props) {
  return <ThemeUIImage sx={sx} src={`dist/images/${src}`} />;
}

export default Image;
