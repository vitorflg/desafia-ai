import { Theme } from '@theme-ui/css';

export const theme: Theme = {
  breakpoints: ['40em', '64em', '79em', '120em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Roboto',
    heading: 'Roboto',
    auxiliar: 'Roboto Light',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
  },
  colors: {
    green: '#00B3B6',
    background: '#fff',
    blue: '#2062AC',
    purple: '#3730A3',
    'gray--200': '#E6E6E6',
    'gray--300': '#cfcfcf',
    'gray--400': '#555555',
    'gray-700': '#3F3F46',
    yellow: '#FEF7AC',
    red: '#db0404',
    whiteIce: '#E0E0E0',
    'black--500': '#333333',
    'black--600': '#222222',
  },
  links: {
    clean: {
      textDecoration: 'none',
      color: 'black--600',
    },
  },
  cards: {
    primary: {
      border: '1px solid gray--300',
      borderRadius: '2rem',
      padding: '5rem',
      background: 'white',
    },
  },
  forms: {
    input: {
      primary: {
        py: 3,
        borderColor: 'gray--300',
      },
    },
  },
  buttons: {
    primary: {
      bg: 'green',
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      cursor: 'pointer',
      fontSize: 3,
      borderRadius: 10,
    },
    secondary: {
      bg: 'gray--300',
      color: 'black--600',
      border: 'none',
      padding: '15px 30px',
      cursor: 'pointer',
      fontSize: 3,
      borderRadius: 10,
    },
    disabled: {
      variant: 'buttons.secondary',
      color: 'black--600',
      cursor: 'not-allowed',
    },
  },
  borders: {
    primary: {
      border: '1px solid black--600',
    },
    header: {
      borderBottom: '1px solid gray--300',
    },
  },
  text: {
    heading: {
      fontFamily: 'auxiliar',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'auxiliar',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: [6, 6, 7],
    },
    h2: {
      variant: 'text.heading',
      fontSize: [6, 6, 6],
    },
    h3: {
      variant: 'text.heading',
      fontSize: 4,
      textAlign: 'left',
    },
    h4: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    p: {
      display: 'block',
      variant: 'text.display',
      margin: '0 auto',
      color: 'gray--400',
      fontSize: 3,
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    a: {
      variant: 'text.link',
    },
    menu: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      color: 'gray--400',
    },
    menuItem: {
      cursor: 'pointer',
    },
  },
};

export default theme;
