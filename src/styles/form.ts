import { styled } from 'stitches.config';

export const ModalFooter = styled('footer', {
  alignSelf: 'flex-end',
  marginTop: 'auto',
  marginBottom: 0
});

export const CancelButton = styled('button', {
  all: 'unset',
  padding: '$2',
  borderRadius: '$1',
  cursor: 'pointer',
  '& + button': { marginLeft: '$3' },

  '&:hover': {
    backgroundColor: 'hsl(0, 0%, 20%, 0.4)'
  }
});

export const SuccessButton = styled('button', {
  all: 'unset',
  padding: '$2',
  borderRadius: '$1',
  cursor: 'pointer',
  backgroundColor: '$brightGreen',

  '&:hover': {
    backgroundColor: 'hsl(0, 0%, 90%, 0.2)'
  }
});

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '& + div': {
    marginTop: '$4'
  },

  '& > label': {
    fontWeight: 'bold',
    fontSize: '$1',
    marginBottom: '4px',
    marginLeft: '$3'
  }
});

export const Input = styled('input', {
  all: 'unset',
  fontSize: '$3',
  padding: '$3',
  marginX: '$3',
  borderRadius: '$2',
  backgroundColor: '#e1e3ff',

  '&:disabled': {
    backgroundColor: 'unset',
    paddingX: 0
  }
});

export const Form = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
});
