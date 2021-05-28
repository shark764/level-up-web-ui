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
    appearance: 'none',
    paddingX: 0,
    overflow: 'hidden',
    backgroundColor: 'unset',
    border: '1px solid transparent'
  }
});

export const Checkbox = styled('input', {
  fontSize: '$bodyNormal',
  padding: '$3',
  borderRadius: '$1',
  border: '1px solid $charcoalLight',
  backgroundColor: '$charcoalMedium',
  color: '$mediumGray',
  '&:disabled': {
    appearance: 'none',
    paddingX: 0,
    overflow: 'hidden',
    backgroundColor: 'unset',
    border: '1px solid transparent'
  }
});

export const Select = styled('select', {
  fontSize: '$bodyNormal',
  padding: '$3',
  borderRadius: '$1',
  border: '1px solid $charcoalLight',
  backgroundColor: '$charcoalMedium',
  color: '$mediumGray',
  '&:disabled': {
    appearance: 'none',
    paddingX: 0,
    overflow: 'hidden',
    backgroundColor: 'unset',
    border: '1px solid transparent'
  }
});

export const SwitchFieldLabel = styled('label', {
  backgroundColor: '$charcoal',
  color: '$lightGray',
  fontSize: '$bodyNormal',
  lineHeight: '$1',
  textAlign: 'center',
  marginRight: '-1px',
  border: '1px solid $charcoalLight',
  boxShadow:
    'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1)',
  transition: 'all 0.1s ease-in-out',
  padding: '$3 $5',
  flex: 1,

  '&:hover': {
    cursor: 'pointer'
  },

  '&:first-of-type': {
    borderRadius: '$1 0 0 $1'
  },

  '&:last-of-type': {
    borderRadius: '0 $1 $1 0'
  }
});
export const SwitchFieldInput = styled('input', {
  position: 'absolute',
  clip: 'rect(0, 0, 0, 0)',
  height: '1px',
  width: '1px',
  border: '0',

  [`&:checked + ${SwitchFieldLabel}`]: {
    backgroundColor: '$charcoalLight',
    boxShadow: 'none'
  }
});
export const SwitchField = styled('div', {
  display: 'flex',
  flexGrow: 1
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
