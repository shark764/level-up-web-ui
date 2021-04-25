import { global } from 'stitches.config';

export const useGlobalStyles = global({
  '*': {
    boxSizing: 'border-box'
  },
  html: {
    height: '100%',
    margin: 0
  },
  body: {
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    backgroundColor: '$charcoal',
    color: '$offWhite'
  },
  '#root': {
    height: '100%'
  }
});
