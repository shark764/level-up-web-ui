import { createCss } from '@stitches/core';

export const { css, global, getCssString } = createCss({
  theme: {
    colors: {},
    fonts: {},
    fontSizes: {},
    space: {},
    sizes: {},
    lineHeights: {},
    radii: {
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
      value: keyof typeof config.theme['space'] | number
    ) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    paddingY: (config) => (
      value: keyof typeof config.theme['space'] | number
    ) => ({
      paddingTop: value,
      paddingBottom: value
    }),
    marginX: (config) => (
      value: keyof typeof config.theme['space'] | number
    ) => ({
      marginLeft: value,
      marginRight: value
    }),
    marginY: (config) => (
      value: keyof typeof config.theme['space'] | number
    ) => ({
      marginTop: value,
      marginBottom: value
    })
  }
});
