import { createCss } from '@stitches/react';

export const { styled, css, global, getCssString } = createCss({
  theme: {
    colors: {
      deepBlue: '#24263F',
      offWhite: '#F5F9FF',
      royalPurple: '#6461EC',
      brightGreen: '#50E5C3',
      magenta: '#E53176',
      lightGray: '#C6D6EE',
      mediumGray: '#9BB1D2',
      charcoalLight: '#5D5F83;',
      charcoalMedium: '#393B60',
      charcoal: '#14162B',
      error: '#F83f3f',
      info: '#4b8ef3',
      warning: '#FADC64'
    },
    fontSizes: {
      bodySmall: '12px',
      bodyNormal: '14px',
      bodyMedium: '16px',
      bodyLarge: '18px',
      display1: '40px',
      display2: '32px'
    },
    space: {
      1: '8px',
      2: '12px',
      3: '16px',
      4: '32px'
    },
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
