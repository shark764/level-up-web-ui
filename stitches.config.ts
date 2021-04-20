import { createCss } from '@stitches/react';

export const { styled, css, global, getCssString } = createCss({
  theme: {
    colors: {
      deepBlue: '#24263F',
      royalPurple: '#6461EC',
      brightGreen: '#50E5C3',
      magenta: '#E53176',
      white: '#F5F9FF',
      background: '#14162A',
      text: '#ADB1D3',
      textSecondary: '#C7C9D9'
    },
    fonts: {},
    fontSizes: {
      1: '14px',
      2: '16px',
      3: '18px',
      4: '20px',
      5: '22px'
    },
    space: {
      1: '8px',
      2: '12px',
      3: '16px',
      4: '32px'
    },
    sizes: {},
    lineHeights: {
      1: 1.3,
      2: 1.5,
      3: 1.7
    },
    radii: {
      1: '8px',
      2: '16px',
      3: '32px',
      round: '9999px'
    }
  },
  media: {
    bp1: '(min-width: 575px)',
    bp2: '(min-width: 750px)',
    bp3: '(min-width: 1000px)',
    bp4: '(min-width: 1200px)'
  },
  utils: {
    paddingX: (config) => (
      value: keyof typeof config.theme['space'] | number | string
    ) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    paddingY: (config) => (
      value: keyof typeof config.theme['space'] | number | string
    ) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    marginX: (config) => (
      value: keyof typeof config.theme['space'] | number | string
    ) => ({
      marginLeft: value,
      marginRight: value
    }),
    marginY: (config) => (
      value: keyof typeof config.theme['space'] | number | string
    ) => ({
      marginTop: value,
      marginBottom: value
    })
  }
});
