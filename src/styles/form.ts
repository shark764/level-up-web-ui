import { styled } from 'stitches.config';

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '& h4': {
    fontWeight: 'bold',
    marginBottom: '$1'
  }
});

export const Input = styled('input', {
  all: 'unset',
  fontSize: '$bodyNormal',
  padding: '$3',
  borderRadius: '$1',
  border: '1px solid $charcoalLight',
  backgroundColor: '$charcoalMedium',
  color: '$mediumGray',
  '&:disabled': {
    paddingX: 0,
    overflow: 'hidden',
    backgroundColor: 'unset',
    border: '1px solid transparent'
  }
});

export const Form = styled('form', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px',
  width: '100%',
  marginBottom: '64px',

  [`& ${InputGroup}`]: {
    flexBasis: 'calc(50% - 16px)'
  },

  [`& ${InputGroup}:nth-last-child(2)`]: {
    flexBasis: '100%'
  }
});

export const FormActions = styled('div', {
  flexBasis: '100%'
});
