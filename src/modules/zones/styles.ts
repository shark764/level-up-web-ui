import { Input as BaseInput, Form as BaseForm } from '@styles/form';
import { styled } from 'stitches.config';

export const SplitPane = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 800px',
  gap: '$3'
});

export const PageTitle = styled('h4', {
  color: '$mediumGray',
  fontWeight: '700',
  marginBottom: '$3'
});

export const Form = styled(BaseForm, {
  gridColumn: '1 / span 1',
  flexDirection: 'column',
  gap: '$2',
  paddingX: '$3',
  borderRight: '1px solid $charcoalMedium'
});

export const Input = styled(BaseInput, {
  width: 'calc(100% - 32px)'
});

export const ReadOnlyInput = styled(BaseInput, {
  '&:disabled': {
    padding: '$3',
    borderRadius: '$1',
    border: '1px solid $charcoalLight',
    backgroundColor: '$charcoalMedium',
    color: '$mediumGray',
    cursor: 'not-allowed'
  }
});

export const InputGroup = styled('div', {
  fontSize: '14px',
  lineHeight: '$1',
  color: '$mediumGray',
  '& *': {
    display: 'block',
    margin: 0
  }
});

export const DesignerSizeControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3'
});

export const DesignerContainer = styled('div', {
  gridColumn: '2 / span 1'
});

export const FormActions = styled('div', {
  display: 'flex',
  marginTop: '$3',
  gap: '$3',
  '& button ': { flexGrow: 1, justifyContent: 'center' }
});
