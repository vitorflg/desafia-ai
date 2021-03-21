export const theme = {
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
    black: '#000',
    background: '#fff',
    primary: '#333333',
    secondary: '#00B3B6',
    purple: '#3730A3',
    muted: '#f6f6f6',
    grey: '#cfcfcf',
    gray: '#555555',
    yellow: '#FEF7AC',
    red: '#db0404',
  },
  links: {
    clean: {
      textDecoration: 'none',
      color: 'primary',
    },
  },
  cards: {
    primary: {
      border: '1px solid #dedede',
      borderRadius: '2rem',
      padding: '5rem',
      background: 'white',
    },
  },
  inputs: {
    primary: {
      py: 3,
      borderColor: 'grey',
    },
  },
  buttons: {
    primary: {
      bg: 'secondary',
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      cursor: 'pointer',
      fontSize: 3,
      borderRadius: 10,
    },
    secondary: {
      bg: 'grey',
      color: 'primary',
      border: 'none',
      padding: '15px 30px',
      cursor: 'pointer',
      fontSize: 3,
      borderRadius: 10,
    },
    disabled: {
      variant: 'buttons.secondary',
      color: 'primary',
      cursor: 'not-allowed',
    },
  },
  borders: {
    primary: {
      border: '1px solid primary',
    },
    header: {
      borderBottom: '1px solid #dedede',
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
  containers: {
    center: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 'auto',
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
      variant: 'text.display',
      margin: '0 auto',
      color: 'gray',
      fontSize: 3,
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    a: {
      variant: 'text.link',
      texDecoration: 'none',
    },
    menu: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      color: 'gray',
    },
    menuItem: {
      cursor: 'pointer',
    },
  },
};

export default theme;
