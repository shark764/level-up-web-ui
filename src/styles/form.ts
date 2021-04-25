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
    backgroundColor: 'unset',
    border: '1px solid transparent'
  }
});
